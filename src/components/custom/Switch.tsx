import { FC } from "react"
import { Label } from "../Label"
import { Switch as SwitchShadCn } from "../ui/switch"

interface SwitchProps {
	label: string
	checked: boolean
	onChange: (e: unknown) => void
}

export const Switch: FC<SwitchProps> = ({ label, checked, onChange }) => {
	return (
		<div
			onClick={onChange}
			className={`flex gap-3 items-center border cursor-pointer ${
				checked ? "bg-white border-primary text-primary" : "border-lynch-50 bg-lynch-50"
			} px-3 py-4 rounded-[12px]`}>
			<Label
				label={label}
				htmlFor={label}
				className={`cursor-pointer ${checked ? "text-primary" : "text-lynch-400"}`}
			/>
			<SwitchShadCn name={label} checked={checked} />
		</div>
	)
}
