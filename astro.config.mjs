// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import { readdirSync } from 'node:fs';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// German pages that really exist (src/content/docs/de/**). Every other /de/ URL is a
// Starlight fallback copy of an English page and is kept out of the sitemap
// (src/routeData.ts points those pages' canonical URL at the English original).
const germanPaths = new Set(
	readdirSync(new URL('./src/content/docs/de/', import.meta.url), { recursive: true })
		.filter((file) => /\.mdx?$/.test(file))
		.map((file) => `/de/${file.replace(/\\/g, '/').replace(/(^|\/)?index\.mdx?$|\.mdx?$/, '')}`.replace(/\/?$/, '/')),
);

// https://astro.build/config
export default defineConfig({
	site: 'https://nikku.tech',
	base: '/',
	redirects: {
		// Pre-i18n URLs (German pages used to live in de/ or en/ subfolders)
		'/lectures/core-cs/numerik-prototype': '/lectures/core-cs/numerik/',
		'/lectures/core-cs/de/numerik-prototype': '/de/lectures/core-cs/numerik/',
		'/lectures/ai-and-med/de/rmi-anatomy': '/de/lectures/ai-and-med/rmi-anatomy/',
		'/lectures/languages/japanese/b1-1/de': '/de/lectures/languages/japanese/b1-1/',
		'/lectures/languages/chinese/en': '/lectures/languages/chinese/',
		// Older prototype URLs
		'/lectures/languages/chinese/prototype': '/de/lectures/languages/chinese/',
		'/lectures/languages/chinese/en/prototype': '/lectures/languages/chinese/',
		'/lectures/languages/japanese/prototype': '/lectures/languages/japanese/b1-1/',
		'/lectures/languages/japanese/de/prototype': '/de/lectures/languages/japanese/b1-1/',
		'/lectures/ai-and-med/rmi-prototype': '/lectures/ai-and-med/rmi-anatomy/',
		'/lectures/ai-and-med/de/rmi-prototype': '/de/lectures/ai-and-med/rmi-anatomy/',
		'/lectures/ai-and-med/rmi': '/lectures/ai-and-med/rmi-anatomy/',
	},
	markdown: {
		processor: unified({
			remarkPlugins: [remarkMath],
			rehypePlugins: [rehypeKatex],
		}),
	},
	integrations: [
		// Configured here (instead of Starlight's automatic sitemap) to drop fallback pages.
		sitemap({
			i18n: { defaultLocale: 'root', locales: { root: 'en', de: 'de' } },
			filter: (page) => {
				const path = new URL(page).pathname;
				return !path.startsWith('/de/') || germanPaths.has(path);
			},
		}),
		starlight({
			title: 'Nikku · Nick Blassmann',
			description: 'Computer Science at Heidelberg University: portfolio, interactive lecture notes and language-learning tools by Nick Blassmann (Nikku).',
			locales: {
				root: { label: 'English', lang: 'en' },
				de: { label: 'Deutsch', lang: 'de' },
			},
			head: [
				{ tag: 'meta', attrs: { property: 'og:image', content: 'https://nikku.tech/og-image.jpg' } },
				{ tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
				{ tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
				{ tag: 'meta', attrs: { property: 'og:image:alt', content: 'Pixel-art of Nikku reading under a cherry blossom tree, with the text Nick Blassmann, Computer Science, Heidelberg University' } },
				{ tag: 'meta', attrs: { name: 'twitter:image', content: 'https://nikku.tech/og-image.jpg' } },
				{
					tag: 'meta',
					attrs: {
						name: 'google-site-verification',
						content: 'dY33SKpCdgDZZy2TzhXmT1kAcfsr2pguvURDv-gagMo',
					},
				},
				{
					tag: 'script',
					attrs: {
						defer: true,
						src: 'https://cloud.umami.is/script.js',
						'data-website-id': 'fa626c1d-716d-42d6-b58a-88bf59b35a19',
					},
				},
			],
			customCss: ['./src/styles/custom.css'],
			routeMiddleware: './src/routeData.ts',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/NikkuIsRyu' }
			],
			sidebar: [
				{
					label: 'Profile & Portfolio',
					translations: { de: 'Profil & Portfolio' },
					items: [
						{ label: 'CV & About Me', translations: { de: 'Lebenslauf & Über mich' }, slug: 'cv' },
						{ label: 'Heidelberg & Student Life', translations: { de: 'Heidelberg & Studentenleben' }, slug: 'heidelberg' },
					],
				},
				{
					label: 'Academic Vault',
					translations: { de: 'Studienarchiv' },
					items: [
						{ label: 'Course Overview', translations: { de: 'Kursübersicht' }, slug: 'lectures' },
					],
				},
				{
					label: 'Core Computer Science',
					translations: { de: 'Kerninformatik' },
					items: [{ autogenerate: { directory: 'lectures/core-cs' } }],
				},
				{
					label: 'AI, Robotics & Medical Informatics',
					translations: { de: 'KI, Robotik & Medizininformatik' },
					items: [{ autogenerate: { directory: 'lectures/ai-and-med' } }],
				},
				{
					label: 'Language Electives',
					translations: { de: 'Sprachkurse' },
					items: [
						{
							label: 'Japanese',
							translations: { de: 'Japanisch' },
							items: [
								{ label: 'Overview', translations: { de: 'Übersicht' }, slug: 'lectures/languages/japanese' },
								{ label: 'Japanese B1.1', translations: { de: 'Japanisch B1.1' }, slug: 'lectures/languages/japanese/b1-1' },
								{ label: 'Japanese B1.2', translations: { de: 'Japanisch B1.2' }, slug: 'lectures/languages/japanese/b1-2' },
							],
						},
						{ label: 'Chinese & Audio Dialogues', translations: { de: 'Chinesisch & Audio-Dialoge' }, slug: 'lectures/languages/chinese' },
						{ label: 'Deutsch üben (ドイツ語練習)', link: 'https://nikku.tech/deutsch/' },
					],
				},
			],
		}),
	],
});
