import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "../Label"
import { Control } from "react-hook-form"
import { FormField } from "../ui/form"

interface RadioButtonProps {
	control: Control<any>
	options: { key: string; label: string }[]
	name: string
}

export const RadioButton: React.FC<RadioButtonProps> = ({ options, control, name }) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<RadioGroup defaultValue={field.value} className="flex items-center gap-7">
					{options.map((option) => (
						<div className="flex items-center space-x-2" key={option.key}>
							<RadioGroupItem
								value={option.key}
								id={option.key}
								checked={field.value === option.key}
								onClick={() => field.onChange(option.key)}
							/>
							<Label htmlFor={option.key} label={option.label} className="cursor-pointer" />
						</div>
					))}
				</RadioGroup>
			)}
		/>
	)
}
