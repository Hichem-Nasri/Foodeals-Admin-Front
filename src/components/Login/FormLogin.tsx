import { InputField } from "@/components/custom/InputField"
import { Eye, EyeOffIcon, Lock, User } from "lucide-react"
import { UseFormReturn } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { CheckboxField } from "../custom/CheckboxField"
import Link from "next/link"
import { CustomButton } from "../custom/CustomButton"

interface FormLoginProps {
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
	form: UseFormReturn<{
		user: string
		password: string
		remember: boolean
	}>
	showPassword: boolean
	handleShowPassword: () => void
}

export const FormLogin: React.FC<FormLoginProps> = ({ handleSubmit, form, handleShowPassword, showPassword }) => {
	const { control } = form
	return (
		<Form {...form}>
			<form onSubmit={handleSubmit} className="w-full">
				<div className="flex flex-col gap-[1.875rem] max-w-[438px] mx-auto">
					<InputField label="Nom" control={control} name="user" placeholder="ID" IconLeft={User} />
					<InputField
						control={control}
						label="Mot de passe"
						name="password"
						placeholder="*******"
						type={showPassword ? "text" : "password"}
						IconLeft={Lock}
						IconRight={showPassword ? Eye : EyeOffIcon}
						onClickRight={handleShowPassword}
					/>
					<div className="flex justify-between items-center gap-1 ">
						<CheckboxField control={control} name="remember" label="Se souvenir" />
						<div className="flex gap-1 text-primary">
							<Lock size={22} />
							<Link href="/forgot-password">Mot de passe oublié?</Link>
						</div>
					</div>
					<CustomButton label="SE CONNECTER" IconRight={User} />
				</div>
			</form>
		</Form>
	)
}
