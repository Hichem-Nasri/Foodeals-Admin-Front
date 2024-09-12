import { FC } from "react"
import { Select as SelectShadCn, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"

interface SelectProps {
	onChange: (value: string) => void
	value: string
	options: {
		key: string | number
		label: string
	}[]
	placeholder?: string
	isNumber?: boolean
	disabled?: boolean
}

export const Select: FC<SelectProps> = ({
	options,
	onChange,
	value,
	disabled = false,
	isNumber = false,
	placeholder,
}) => {
	return (
		<div className="flex flex-col w-full">
			<SelectShadCn disabled={options.length === 0 || disabled} value={value} onValueChange={onChange}>
				<SelectTrigger
					className={`text-lynch-400 hover:text-lynch-700 ${
						options.find((option) => option.key == value)?.label ? "border-textGray" : ""
					}`}>
					{!value || value === "" ? (
						<span className="text-base text-start font-normal line-clamp-1">{placeholder}</span>
					) : (
						<span className="text-base text-start font-normal line-clamp-1 text-lynch-950">
							{options.find((option) => option.key == value)?.label}
						</span>
					)}
				</SelectTrigger>
				<SelectContent>
					{options.map((option) => (
						<SelectItem
							key={option.key}
							value={option.key.toString()}
							defaultChecked={option.key == value}
							className="cursor-pointer">
							{option.label}
						</SelectItem>
					))}
				</SelectContent>
			</SelectShadCn>
		</div>
	)
}
