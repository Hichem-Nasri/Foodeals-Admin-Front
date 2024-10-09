import { FC } from "react"

import { UserRoundCheck, UserRoundX } from "lucide-react"
import { cn } from "@/lib/utils"

export const BadgeDisponibility: FC<{ isDisponible: boolean }> = ({ isDisponible }) => {
	return (
		<span
			className={cn(
				"flex items-center gap-1 text-sm font-medium text-lynch-400 py-1.5 px-5 rounded-full text-nowrap cursor-pointer w-fit",
				isDisponible ? "text-primary bg-mountain-100" : "bg-red-50 text-red-500"
			)}>
			{isDisponible ? "En ligne" : "Hors ligne"}
			{isDisponible ? <UserRoundCheck size={18} /> : <UserRoundX size={18} />}
		</span>
	)
}
