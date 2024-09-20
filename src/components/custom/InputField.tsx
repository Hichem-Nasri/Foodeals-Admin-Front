import { FC, ForwardRefExoticComponent, RefAttributes } from "react"

import { UseFormReturn } from "react-hook-form"
import { FormField, FormMessage } from "../ui/form"
import { Input } from "./Input"
import { LucideProps } from "lucide-react"

interface InputFieldProps {
	label?: string
	name: string
	form: UseFormReturn<any>
	type?: "number" | "text" | "email" | "password"
	placeholder?: string
	className?: string
	disabled?: boolean
	IconLeft?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
	IconRight?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
  iconLeftColor?: string
	onClickIconRight?: () => void
}

export const InputFieldForm: FC<InputFieldProps> = ({
	label,
	name,
	form,
	IconLeft,
	IconRight,
	className,
	disabled,
	placeholder,
	type,
	iconLeftColor,
	onClickIconRight = () => { },
}) => {
	const { control } = form
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<div className="flex flex-col items-start w-full">
					<div
						className={`relative w-full  ${
							field.value != "" ? "[&>svg]:text-description" : "[&>svg]:text-label-grayLight"
						}`}>
						<Input
							{...field}
							type={type}
							label={label}
							disabled={disabled}
							onChange={(value) => (type === "number" && field.onChange(+value)) || field.onChange(value)}
							value={type === "number" && field.value === "" ? undefined : field.value}
							placeholder={placeholder}
							className={className}
							IconLeft={IconLeft}
							IconRight={IconRight}
              iconLeftColor={iconLeftColor}
							onClickRight={onClickIconRight}
						/>
					</div>
					<FormMessage />
				</div>
			)}
		/>
	)
}
