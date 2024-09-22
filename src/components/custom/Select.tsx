import { FC } from "react"
import { Select as SelectShadCn, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Label } from "../Label"

interface SelectProps {
	onChange: (value: string) => void
	transform?: (value: string | number) => JSX.Element
	value: string
	options: {
		key: string | number
		label: string
	}[]
	placeholder?: string
	disabled?: boolean
	label: string
}

export const Select: FC<SelectProps> = ({
	options,
	onChange,
	transform,
	value,
	disabled = false,
	placeholder,
	label,
}) => {
	return (
		<div className="flex flex-col items-start gap-3 w-full text-lynch-400">
			<Label label={label} className="text-xs font-semibold text-lynch-950" />
			<SelectShadCn disabled={options.length === 0 || disabled} value={value} onValueChange={onChange}>
				<SelectTrigger
					className={`text-lynch-400 hover:text-lynch-700 border-0 ${
						options.find((option) => option.key == value)?.label ? "border-textGray" : ""
					}`}>
					{!value || value === "" ? (
						<span className="text-base text-start font-normal line-clamp-1">{placeholder}</span>
					) : transform ? (
						transform(options.find((option) => option.key == value)!.label)
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
