import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "../Label"
import { Control } from "react-hook-form"
import { FormField } from "../ui/form"

interface RadioButtonProps {
	control: Control<any>
	options: { key: string; label: string }[]
	name: string
	disabled?: boolean
}

export const RadioButton: React.FC<RadioButtonProps> = ({ options, control, name, disabled }) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<RadioGroup defaultValue={field.value} className="flex lg:flex-row flex-col lg:items-center gap-7">
					{options.map((option) => (
						<div className="flex items-center space-x-2" key={option.key}>
							<RadioGroupItem
								value={option.key}
								id={option.key}
								checked={field.value === option.key}
								onClick={() => field.onChange(option.key)}
								disabled={disabled}
							/>
							<Label htmlFor={option.key} label={option.label} className="cursor-pointer" />
						</div>
					))}
				</RadioGroup>
			)}
		/>
	)
}
