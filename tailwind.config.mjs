/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: 'var(--text-primary)',
				secondary: 'var(--text-secondary)',
				'off-white': 'var(--off-white)',
			},
			keyframes: {
				pulsate: {
					'0%, 100%': { transform: 'rotate(55deg) scale(1)' },
					'50%': { transform: 'rotate(55deg) scale(1.1)' },
				},
			},
			animation: {
				pulsate: 'pulsate 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
			},
		},
	},
	plugins: [],
};
