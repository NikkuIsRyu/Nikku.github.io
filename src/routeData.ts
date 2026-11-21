import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import { getCollection } from 'astro:content';

// SEO for the EN/DE setup. English is the root locale and German lives under /de/.
// Starlight builds a /de/ copy of every page, and pages without a German translation
// show the English text there ("fallback" pages). Without this middleware, search
// engines would see those copies as German duplicates of the English pages.
//  - Fallback pages point their canonical URL at the English original.
//  - hreflang alternates are only kept when a real translation exists in both locales.
// The sitemap filter in astro.config.mjs leaves the same fallback pages out.

const DE = 'de';
let docIds: Set<string> | undefined;

/** Starlight route ids: '' (home), 'cv', 'de', 'de/cv', 'lectures/core-cs/numerik', ... */
function counterpartId(id: string): string {
	if (id === DE) return '';
	if (id.startsWith(`${DE}/`)) return id.slice(DE.length + 1);
	return id === '' ? DE : `${DE}/${id}`;
}

export const onRequest = defineRouteMiddleware(async (context) => {
	const route = context.locals.starlightRoute;
	// Collection ids use 'index' for the homepage; Starlight route ids use ''.
	docIds ??= new Set((await getCollection('docs')).map((entry) => (entry.id === 'index' ? '' : entry.id)));

	if (route.isFallback) {
		const canonical = route.head.find((tag) => tag.tag === 'link' && tag.attrs?.rel === 'canonical');
		const href = canonical?.attrs?.href;
		if (canonical && typeof href === 'string') {
			canonical.attrs!.href = href.replace(/\/de(\/|$)/, '/');
		}
		for (const tag of route.head) {
			if (tag.tag !== 'meta') continue;
			if (tag.attrs?.property === 'og:url') tag.attrs.content = canonical?.attrs?.href;
			if (tag.attrs?.property === 'og:locale') tag.attrs.content = 'en';
		}
	}

	const hasTranslation = !route.isFallback && docIds.has(counterpartId(route.id));
	if (!hasTranslation) {
		route.head = route.head.filter((tag) => !(tag.tag === 'link' && tag.attrs?.rel === 'alternate' && tag.attrs?.hreflang));
	}
});
