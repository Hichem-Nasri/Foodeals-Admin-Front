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
				xs: "376px",
			},
			colors: {
				primary: {
					DEFAULT: "#34D39E",
				},
				tulip: {
					"100": "#FEF0C3",
					"500": "#EAB308",
				},
				scooter: {
					"100": "#CFF7FE",
					"500": "#06B6D4",
				},
				amethyst: {
					"100": "#F4E8FF",
					"500": "#A855F7",
				},
				mountain: {
					"100": "#D1FAEC",
					400: "#34D39E",
					"500": "#10B981",
				},
				lynch: {
					"50": "#F6F7F9",
					"100": "#ECEEF2",
					"200": "#D5D9E2",
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
			keyframes: {
				"accordion-down": {
					from: {
						height: "0",
					},
					to: {
						height: "var(--radix-accordion-content-height)",
					},
				},
				"accordion-up": {
					from: {
						height: "var(--radix-accordion-content-height)",
					},
					to: {
						height: "0",
					},
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
}
export default config
