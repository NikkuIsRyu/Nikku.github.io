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
	redirects: {
		'/lectures/languages/chinese/prototype': '/lectures/languages/chinese/',
		'/lectures/languages/chinese/en/prototype': '/lectures/languages/chinese/en/',
		'/lectures/languages/japanese/prototype': '/lectures/languages/japanese/b1-1/',
		'/lectures/languages/japanese/de/prototype': '/lectures/languages/japanese/b1-1/de/',
		'/lectures/ai-and-med/rmi-prototype': '/lectures/ai-and-med/rmi-anatomy/',
		'/lectures/ai-and-med/de/rmi-prototype': '/lectures/ai-and-med/de/rmi-anatomy/',
		'/lectures/ai-and-med/rmi': '/lectures/ai-and-med/rmi-anatomy/',
	},
	markdown: {
		processor: unified({
			remarkPlugins: [remarkMath],
			rehypePlugins: [rehypeKatex],
		}),
	},
	integrations: [
		starlight({
			title: 'Nikku | Academic Vault & Portfolio',
			head: [
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
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/NikkuIsRyu' }
			],
			sidebar: [
				{
					label: 'Profile & Portfolio',
					items: [
						{ label: 'CV & About Me', slug: 'cv' },
						{ label: 'Heidelberg & Student Life', slug: 'heidelberg' },
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
					items: [
						{
							label: 'Japanisch (Japanese)',
							items: [
								{ label: 'Overview', slug: 'lectures/languages/japanese' },
								{ label: 'Japanisch B1.1', slug: 'lectures/languages/japanese/b1-1' },
								{ label: 'Japanisch B1.2', slug: 'lectures/languages/japanese/b1-2' },
							],
						},
						{ label: 'Chinesisch & Audio-Dialoge', slug: 'lectures/languages/chinese' },
					],
				},
			],
		}),
	],
});
