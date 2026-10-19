// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
	site: 'https://nikku.tech',
	base: '/',
	markdown: {
		processor: unified({
			remarkPlugins: [remarkMath],
			rehypePlugins: [rehypeKatex],
		}),
	},
	integrations: [
		starlight({
			title: 'Nikku | Academic Vault & Portfolio',
			customCss: ['./src/styles/custom.css'],
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/NikkuIsRyu' }
			],
			sidebar: [
				{
					label: 'Profile',
					items: [
						{ label: 'CV & About Me', slug: 'cv' },
					],
				},
				{
					label: 'Lectures & Courses',
					items: [
						{ autogenerate: { directory: 'lectures' } },
					],
				},
			],
		}),
	],
});
