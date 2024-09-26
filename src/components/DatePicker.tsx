"use client"

import { FC, useState } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DatePickerProps {
	id?: string
	onChange?: (date: Date) => void
	value?: Date
	disabled?: boolean
}

export const DatePicker: FC<DatePickerProps> = ({ id, disabled, onChange, value = undefined }) => {
	const [date, setDate] = useState<Date | undefined>(value)

	return (
		<Popover>
			<PopoverTrigger asChild disabled={disabled}>
				<Button
					variant={"outline"}
					disabled={disabled}
					className="justify-start gap-3 text-left font-normal text-lynch-950 hover:text-lynch-700 [&>span]:hover:text-lynch-700 bg-lynch-50 rounded-[12px] px-3 py-4 w-full h-14"
					id={id}>
					<CalendarIcon className="text-green-400" size={24} />
					{date ? format(date, "MM/dd/yyyy") : <span className="text-lynch-400">Sélectionner une date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
					mode="single"
					selected={date}
					onSelect={(value) => {
						setDate(value)
						if (value && onChange) onChange(value)
					}}
					className="rounded-md border h-fit"
					id={id}
				/>
			</PopoverContent>
		</Popover>
	)
}
