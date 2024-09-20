import { FC } from "react"
import { AvatarProfile } from "../AvatarProfile"
import { FormField } from "../ui/form"
import { UseFormReturn } from "react-hook-form"

interface AvatarFieldProps {
	form: UseFormReturn<any>
	name: string
	alt?: string
	width?: string
	height?: string
	label?: string
}

export const AvatarField: FC<AvatarFieldProps> = ({ form, name, alt = "", width, height, label }) => {
	const { control } = form
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<div className="flex flex-col items-start">
					<AvatarProfile iUrl={field.value} alt={alt} width={width} height={height} label={label} />
				</div>
			)}
		/>
	)
}
