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
			colors: {
				primary: {
					DEFAULT: "#34D39E",
				},
				Mountain: {
					"500": "#10B981",
				},
				lynch: {
					"50": "#F6F7F9",
					"300": "#B1BBC8",
					"400": "#8695AA",
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
