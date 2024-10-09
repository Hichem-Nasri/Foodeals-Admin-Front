"use client"
import Image from "next/image"
import { FormLogin } from "./FormLogin"
import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Lottie from "react-lottie"
import animationData from "@/lotties/loginAnimation.json"
import { appRoutes } from "@/lib/routes"
import { useRouter } from "next/navigation"

export const Login: React.FC = () => {
	const [showPassword, setShowPassword] = useState(false)
	const router = useRouter()
	const schema = z.object({
		user: z.string().min(4, "Le nom d'utilisateur doit contenir au moins 4 caractères"),
		password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
		remember: z.boolean(),
	})
	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		mode: "onBlur",
		defaultValues: {
			user: "",
			password: "",
			remember: false,
		},
	})
	const { handleSubmit } = form

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	}

	const onSubmit = (data: z.infer<typeof schema>) => {
		router.push(appRoutes.partners)
	}
	const handleShowPassword = () => setShowPassword((prev) => !prev)
	return (
		<div className="flex flex-col justify-center items-center lg:gap-[3.125rem] gap-6 w-full">
			<Image src="/logo-foodeals.svg" alt="login Illustrator" width={191} height={32} objectFit="cover" />
			<div className="xs:inline-flex lg:hidden hidden">
				<Lottie options={defaultOptions} width="100%" height="197px" />
			</div>
			<h2 className="text-[1.375rem] font-medium text-center text-lynch-400">Administration</h2>
			<FormLogin
				handleSubmit={handleSubmit(onSubmit)}
				form={form}
				handleShowPassword={handleShowPassword}
				showPassword={showPassword}
			/>
		</div>
	)
}
