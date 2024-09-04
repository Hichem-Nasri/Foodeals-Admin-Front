import { Input } from "@mantine/core"
import { LucideProps } from "lucide-react"
import { ForwardRefExoticComponent, RefAttributes } from "react"

interface InputFieldProps {
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	handleShowPassword?: () => void
	placeholder: string
	type?: string
	value?: string
	name?: string
	required?: boolean
	IconLeft?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
	IconRight?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
	[key: string]: any
}

export const InputField: React.FC<InputFieldProps> = ({
	onChange = null,
	handleShowPassword = null,
	required = false,
	IconLeft = null,
	IconRight = null,
	...rest
}) => {
	return (
		<div className="relative w-full h-full ">
			<Input
				{...rest}
				radius="12px"
				classNames={{
					input: "py-4 px-3 h-14 w-full bg-lynch-50 text-lynch-400",
				}}
				leftSection={IconLeft && <IconLeft size={24} className="text-primary" />}
				rightSection={IconRight && handleShowPassword && <IconRight size={24} onClick={handleShowPassword} />}
				rightSectionPointerEvents="all"
			/>
		</div>
	)
}
