import { Input } from "@mantine/core"
import { UseFormReturnType } from "@mantine/form"
import { InputField } from "@/components/custom/InputField"
import { Eye, EyeOffIcon, Lock, User } from "lucide-react"

interface FormLoginProps {
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
	form: UseFormReturnType<{
		email: string
		password: string
	}>
	showPassword: boolean
	handleShowPassword: () => void
}

export const FormLogin: React.FC<FormLoginProps> = ({ handleSubmit, form, handleShowPassword, showPassword }) => {
	return (
		<form onSubmit={handleSubmit}>
			<div className="flex flex-col gap-[1.875rem] ">
				<InputField {...form.getInputProps("email")} placeholder="email" key={form.key("email")} IconLeft={User} />
				<InputField
					{...form.getInputProps("password")}
					placeholder="password"
					key={form.key("password")}
					IconLeft={Lock}
					IconRight={showPassword ? EyeOffIcon : Eye}
					handleShowPassword={handleShowPassword}
					type={showPassword ? "text" : "password"}
				/>
			</div>
		</form>
	)
}
