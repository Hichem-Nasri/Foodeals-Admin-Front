import type { Config } from "tailwindcss"

const config: Config = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			screens: {
				xsHeight: { 'raw': '(min-height: 720px)' },
			},
			colors: {
				primary: {
					DEFAULT: "#34D39E",
				},
				Mountain: {
					"500": "#10B981",
				},
				lynch: {
					"50": "#F6F7F9",
					"100": "#ECEEF2",
					"300": "#B1BBC8",
					"400": "#8695AA",
					"500": "#64748B",
					"700": "#434E61",
					"950": "#23272E",
				},
				subtitle: "#565656",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
}
export default config
