import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const countryCodes = [
	{ value: "+212", flag: "🇲🇦" },
	{ value: "+1", flag: "🇺🇸" },
	{ value: "+86", flag: "🇨🇳" },
	{ value: "+91", flag: "🇮🇳" },
	{ value: "+81", flag: "🇯🇵" },
	{ value: "+82", flag: "🇰🇷" },
	{ value: "+7", flag: "🇷🇺" },
	{ value: "+55", flag: "🇧🇷" },
	{ value: "+49", flag: "🇩🇪" },
	{ value: "+33", flag: "🇫🇷" },
	{ value: "+44", flag: "🇬🇧" },
	{ value: "+61", flag: "🇦🇺" },
	{ value: "+52", flag: "🇲🇽" },
	{ value: "+39", flag: "🇮🇹" },
	{ value: "+34", flag: "🇪🇸" },
	{ value: "+234", flag: "🇳🇬" },
	{ value: "+20", flag: "🇪🇬" },
	{ value: "+27", flag: "🇿🇦" },
	{ value: "+62", flag: "🇮🇩" },
	{ value: "+84", flag: "🇻🇳" },
	{ value: "+31", flag: "🇳🇱" },
	{ value: "+32", flag: "🇧🇪" },
	{ value: "+41", flag: "🇨🇭" },
	{ value: "+213", flag: "🇩🇿" },
	{ value: "+221", flag: "🇸🇳" },
	{ value: "+216", flag: "🇹🇳" },
	{ value: "+225", flag: "🇨🇮" },
]
