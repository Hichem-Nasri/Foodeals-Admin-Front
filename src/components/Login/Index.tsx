'use client'
import Image from 'next/image'
import { FormLogin } from './FormLogin'
import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Lottie from 'react-lottie'
import animationData from '@/lotties/loginAnimation.json'
import { AppRoutes } from '@/lib/routes'
import { useRouter } from 'next/navigation'
import { LoginSchema } from '@/schemas'
import SplashScreen from '../custom/SplashScreen'

export const Login: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        mode: 'onBlur',
        defaultValues: {
            user: '',
            password: '',
            remember: false,
        },
    })
    const { handleSubmit } = form

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    }

    const onSubmit = (data: z.infer<typeof LoginSchema>) => {
        router.push(AppRoutes.partners)
    }
    const [loading, setLoading] = useState(true)
    const finishLoading = () => {
        setLoading(false)
    }
    const handleShowPassword = () => setShowPassword((prev) => !prev)
    return (
        <>
            {loading ? (
                <SplashScreen finishLoading={finishLoading} />
            ) : (
                <div className="w-full min-h-screen flex lg:flex-row flex-col-reverse justify-center items-center">
                    <div className="w-full lg:w-1/2 h-auto lg:min-h-screen flex flex-col justify-center items-center bg-[url('/background-auth-partners.svg')] p-4 lg:p-0">
                        <div className="h-auto flex flex-col justify-center lg:justify-between items-center gap-4 lg:gap-7">
                            <Image
                                className=""
                                src={'/logo-foodeals.svg'}
                                alt="Logo"
                                width={200}
                                height={200}
                            />
                            <Image
                                src={'/auth-partners.svg'}
                                alt="Partner Auth Image"
                                width={500}
                                height={500}
                                className="block lg:hidden w-80"
                            />
                            <h1 className="text-xl text-lynch-400 font-base">
                                Administration
                            </h1>
                        </div>
                        <FormLogin
                            handleSubmit={handleSubmit(onSubmit)}
                            form={form}
                            handleShowPassword={handleShowPassword}
                            showPassword={showPassword}
                        />
                    </div>
                    <div className="w-full lg:w-1/2 min-h-full lg:min-h-screen hidden lg:flex flex-col justify-center items-center bg-transparent lg:bg-mountain-400    rounded-none lg:rounded-l-3xl ">
                        <Image
                            src={'/auth-partners.svg'}
                            alt="Partner Auth Image"
                            width={500}
                            height={500}
                        />
                    </div>
                </div>
            )}
        </>
    )
}
