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
					label: 'Profile & Portfolio',
					items: [
						{ label: 'CV & About Me', slug: 'cv' },
					],
				},
				{
					label: 'Academic Vault',
					items: [
						{ label: 'Course Overview', slug: 'lectures' },
					],
				},
				{
					label: 'Core Computer Science',
					items: [{ autogenerate: { directory: 'lectures/core-cs' } }],
				},
				{
					label: 'AI, Robotics & Medical Informatics',
					items: [{ autogenerate: { directory: 'lectures/ai-and-med' } }],
				},
				{
					label: 'Language Electives',
					items: [{ autogenerate: { directory: 'lectures/languages' } }],
				},
			],
		}),
	],
});
