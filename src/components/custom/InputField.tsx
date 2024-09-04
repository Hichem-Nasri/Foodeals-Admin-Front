import { FC, ForwardRefExoticComponent, ReactNode, RefAttributes } from "react"
import { Control } from "react-hook-form"
import { FormField, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LucideProps } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "../ui/label"

interface InputFieldProps {
	control: Control<any>
	placeholder: string
	type?: "number" | "text" | "email" | "password"
	name: string
	className?: string
	IconLeft?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
	IconRight?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
	onClickRight?: () => void
	disabled?: boolean
	label?: string
	IconLeftColor?: string
}

export const InputField: FC<InputFieldProps> = ({
	control,
	name,
	placeholder,
	type = "text",
	className,
	IconRight = null,
	IconLeft = null,
	disabled = false,
	onClickRight: handleShowPassword = () => {},
	label,
	IconLeftColor,
}) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<div className="flex flex-col items-start gap-3 w-full text-lynch-400">
					{label && (
						<Label htmlFor={name} className="text-xs font-semibold text-lynch-950">
							{label}
						</Label>
					)}
					<div
						className={`relative w-full  ${
							field.value > 0 || field.value != "" ? "[&>svg]:text-description" : "[&>svg]:text-label-grayLight"
						}`}>
						{IconLeft && (
							<IconLeft
								className={cn("cursor-pointer absolute left-3 top-1/2 -translate-y-1/2 text-primary ", IconLeftColor)}
							/>
						)}
						<Input
							{...field}
							type={type}
							disabled={disabled}
							onChange={(e) => (type === "number" && field.onChange(+e.target.value)) || field.onChange(e.target.value)}
							value={type === "number" && field.value === 0 ? undefined : field.value}
							placeholder={placeholder}
							className={cn("h-[3.25rem] text-base font-normal", className, IconLeft && "ps-10")}
						/>
						{IconRight && (
							<IconRight
								onClick={handleShowPassword}
								className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2"
							/>
						)}
					</div>
					<FormMessage />
				</div>
			)}
		/>
	)
}
