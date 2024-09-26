import { FC } from "react"

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CalendarClock } from "lucide-react"
import { cn } from "@/lib/utils"

interface InputScheduleProps {
	value: {
		start: string
		end: string
	}
	onChange: (value: { start: string; end: string }) => void
	disabled?: boolean
}

export const InputSchedule: FC<InputScheduleProps> = ({ onChange, value, disabled }) => {
	return (
		<Dialog>
			<DialogTrigger
				disabled={disabled}
				className={cn(
					"flex items-center gap-3 h-14 w-full rounded-[12px] bg-lynch-50 px-3 py-4 text-sm file:bg-transparent file:text-base file:font-normal placeholder:text-lynch-400 disabled:cursor-default disabled:text-lynch-500 outline-none min-w-44",
					value.start ? "" : "!text-red-300"
				)}>
				<CalendarClock className={value.start ? "!text-mountain-400" : ""} />
				{value.start ? `${value.start}-${value.end}` : "Libre"}
			</DialogTrigger>
			<DialogContent className="[&>.Icon]:hidden p-5 rounded-[14px] max-w-[42.5rem] w-full gap-[1.875rem]">
				<DialogTitle className="text-[1.375rem] font-normal text-lynch-400">Afficher les colonnes</DialogTitle>
			</DialogContent>
		</Dialog>
	)
}
