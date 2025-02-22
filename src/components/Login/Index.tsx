'use client'
import Image from 'next/image'
import { FormLogin } from './FormLogin'
import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Lottie from 'react-lottie'
import animationData from '@/lotties/loginAnimation.json'
import { useRouter } from 'next/navigation'
import { LoginSchema } from '@/schemas'
import SplashScreen from '../custom/SplashScreen'
import { LogIn } from '@/app/actions'
import { useNotification } from '@/context/NotifContext'
import { NotificationType } from '@/types/GlobalType'
import Notif from '../Layout/Notif'

export const Login: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()
    const notify = useNotification()

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        mode: 'onBlur',
        defaultValues: {
            email: '',
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

    const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
        console.log(data)
        try {
            console.log('+++++++++++++++++++++++')
            const result = await LogIn(data)
            console.log('result: ', result)
            if (!result.success) {
                notify.notify(
                    NotificationType.ERROR,
                    'Erreur User ou mot de passe'
                )
            } else {
                notify.notify(NotificationType.SUCCESS, 'Connexion réussie')
                console.log('result: ', result)
                setTimeout(() => {
                    router.push('/')
                }, 1000)
                // router.push('/')
            }
        } catch (e) {
            notify.notify(NotificationType.ERROR, "Erreur d'authentification")
            console.log(e)
        }
    }

    const [loading, setLoading] = useState(true)
    const finishLoading = () => {
        setLoading(false)
    }

    const handleShowPassword = () => setShowPassword((prev) => !prev)

    return (
        <div className="w-full h-full  overflow-hidden">
            {loading ? (
                <SplashScreen finishLoading={finishLoading} />
            ) : (
                <div className="w-full min-h-screen flex lg:flex-row flex-col  justify-center lg:justify-between items-center bg-[url('/background-auth-partners.svg')] overflow-hidden">
                    <div className="w-full lg:w-1/2 h-auto lg:min-h-screen flex flex-col justify-center items-center  p-4 lg:p-0">
                        <div className="h-auto flex flex-col justify-center lg:justify-between items-center gap-4 lg:gap-7">
                            <Image
                                className=""
                                src={'/logo-foodeals.svg'}
                                alt="Logo"
                                width={200}
                                height={200}
                            />
                            <div className="w-80 block lg:hidden ">
                                <Lottie options={defaultOptions} width="100%" />
                            </div>

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
                    <div className="lg:flex hidden min-h-screen justify-center items-center bg-primary rounded-l-[48px] p-8 w-1/2">
                        <div className="w-[38.75rem] h-[25.625rem]">
                            <Lottie options={defaultOptions} width="100%" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
