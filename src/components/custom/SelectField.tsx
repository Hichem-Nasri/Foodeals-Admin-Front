import { FC } from "react"
import { Control } from "react-hook-form"
import { Select } from "./Select"
import { FormField, FormMessage } from "../ui/form"
import { cn } from "@/lib/utils"

interface SelectFieldProps {
	control: Control<any>
	placeholder?: string
	label: string
	options: {
		key: string | number
		label: string
	}[]
	name: string
	disabled?: boolean
	className?: string
}

export const SelectField: FC<SelectFieldProps> = ({
	control,
	placeholder = "Sélectionnez",
	options,
	name,
	label,
	disabled = false,
	className,
}) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<div className={cn("flex flex-col w-full", className)}>
					<Select
						options={options}
						disabled={options.length === 0 || disabled}
						value={field.value}
						onChange={(value) => field.onChange(value)}
						placeholder={placeholder}
						label={label}
					/>
					<FormMessage />
				</div>
			)}
		/>
	)
}
