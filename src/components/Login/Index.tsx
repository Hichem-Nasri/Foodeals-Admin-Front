"use client"
import Image from "next/image"
import { FormLogin } from "./FormLogin"
import { useForm } from "@mantine/form"
import { useState } from "react"

export const Login: React.FC = () => {
	const [showPassword, setShowPassword] = useState(false)
	const form = useForm({
		initialValues: {
			email: "",
			password: "",
		},
		mode: "uncontrolled",
		validate: {
			email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
			password: (value) => (value.length > 7 ? null : "Password is too short"),
		},
	})
	const { onSubmit } = form

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		onSubmit((values) => {
			console.log(values)
		})
	}
	const handleShowPassword = () => setShowPassword((prev) => !prev)
	return (
		<div className="flex flex-col justify-center items-center gap-[3.125rem]">
			<Image src="/logo-foodeals.svg" alt="login Illustrator" width={191} height={32} objectFit="cover" />
			<h2 className="text-[1.375rem] font-medium text-center">Administration</h2>
			<FormLogin handleSubmit={handleSubmit} form={form} handleShowPassword={handleShowPassword} showPassword={showPassword} />
		</div>
	)
}
