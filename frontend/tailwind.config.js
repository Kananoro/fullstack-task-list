/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				background: "var(--background-color)",
				primary: "var(--primary-color)",
				secondary: "var(--secondary-color)",
				text: "var(--text-color)",
				error: "var(--error-color)",
				focus: "var(--focus-color)",
			},
			spacing: {
				large: "var(--spacing-large)",
			},
		},
	},
	plugins: [
		function ({ addUtilities }) {
			addUtilities({
				".no-scrollbar": {
					"scrollbar-width": "none",
					"-ms-overflow-style": "none",
				},
				".no-scrollbar::-webkit-scrollbar": {
					display: "none",
				},
			});
		},
	],
};
