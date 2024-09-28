"use client"

import { FC, useState } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DatePickerProps {
	id?: string
}

export const DatePicker: FC<DatePickerProps> = ({ id }) => {
	const [date, setDate] = useState<Date>()

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className="justify-start gap-3 text-left font-normal text-lynch-950 hover:text-lynch-700 [&>span]:hover:text-lynch-700 bg-lynch-50 rounded-[12px] px-3 py-4 w-full h-14"
					id={id}>
					<CalendarIcon className="text-green-400" size={24} />
					{date ? format(date, "MM/dd/yyyy") : <span className="text-lynch-400">Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border h-fit" id={id} />
			</PopoverContent>
		</Popover>
	)
}
