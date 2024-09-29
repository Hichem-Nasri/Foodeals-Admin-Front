import { FC } from "react"
import { AvatarProfile } from "../AvatarProfile"
import { FormField } from "../ui/form"
import { UseFormReturn } from "react-hook-form"
import { cn } from "@/lib/utils"

interface AvatarFieldProps {
	form: UseFormReturn<any>
	name: string
	alt?: string
	label?: string
	className?: string
	classNameAvatar?: string
}

export const AvatarField: FC<AvatarFieldProps> = ({ form, name, alt = "", classNameAvatar, label, className }) => {
	const { control } = form
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<div className={cn("flex flex-col items-start", className)}>
					<AvatarProfile iUrl={field.value} alt={alt} className={classNameAvatar} label={label} />
				</div>
			)}
		/>
	)
}
