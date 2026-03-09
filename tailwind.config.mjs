/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			screens: {
				// Viewport width at which cutoff: styles apply (e.g. desktop layout)
				'cutoff': '78px',
			},
			colors: {
				primary: 'var(--text-primary)',
				secondary: 'var(--text-secondary)',
				'off-white': 'var(--off-white)',
			},
		},
	},
	plugins: [],
};
