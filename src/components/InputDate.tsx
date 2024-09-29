import { Input } from "./ui/input"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface InputDateProps {
	placeholder: string
	className?: string
	onChange: (date: Date) => void
}

export const InputDate: React.FC<InputDateProps> = ({ placeholder, className, onChange }): JSX.Element => {
	const [isDateTouched, setIsDateTouched] = useState<boolean>(false)
	const [date, setDate] = useState("")
	return (
		<div className={cn("flex flex-col w-full h-fit", className)}>
			<Input
				onBlur={() => onChange(new Date(date))}
				onChange={(value) => setDate(value.currentTarget.value)}
				value={isDateTouched ? date : ""}
				type={!isDateTouched ? "text" : "date"}
				placeholder={placeholder}
				onSelect={() => setIsDateTouched(true)}
				className="w-full py-4 px-3 h-full"
			/>
		</div>
	)
}
