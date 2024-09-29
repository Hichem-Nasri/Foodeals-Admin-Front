import { Checkbox } from "@/components/ui/checkbox"
import { FormField } from "@/components/ui/form"
import { Label } from "@/components/ui/label"

interface CheckboxFieldProps {
	control: any
	name: string
	label: string
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({ control, name, label }) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<div className="flex gap-2 items-center">
					<Checkbox {...field} id={name} />
					<Label htmlFor={name} className="text-sm font-normal text-lynch-400 cursor-pointer">
						{label}
					</Label>
				</div>
			)}
		/>
	)
}
