'use client'
import React, { Fragment, useState } from 'react'
import Image from 'next/image'
import { Label } from '../Label'
import { InputFieldForm } from '../custom/InputField'
import { Form, FormField } from '../ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Lock, User, UserRound } from 'lucide-react'
import { CustomButton } from '../custom/CustomButton'
import { Checkbox } from '../ui/checkbox'
import { CheckboxField } from '../custom/CheckboxField'
import Link from 'next/link'
import SplashScreen from '../custom/SplashScreen'

const PartnerAuthSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(6),
    seSouvenirDeMoi: z.boolean(),
})

const defaultPartnerSchema = {
    username: '',
    password: '',
    seSouvenirDeMoi: false,
}

const PartnerAuth = () => {
    const form = useForm<z.infer<typeof PartnerAuthSchema>>({
        resolver: zodResolver(PartnerAuthSchema),
        mode: 'onBlur',
        defaultValues: {
            ...defaultPartnerSchema,
        },
    })
    const { handleSubmit, control } = form
    const [loading, setLoading] = useState(true)

    const onSignIn = (data: any) => {
        console.log(data)
    }

    const finishLoading = () => {
        setLoading(false)
    }
    return (
        <Fragment>
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
                        <div>
                            <Form {...form}>
                                <form className="w-96 flex flex-col gap-6">
                                    <InputFieldForm
                                        IconLeft={UserRound}
                                        control={control}
                                        name="username"
                                        type="text"
                                        placeholder="ID"
                                        label="Nom"
                                    />
                                    <InputFieldForm
                                        IconLeft={Lock}
                                        label="Mot de passe"
                                        control={control}
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                    />
                                    <div className="flex justify-between items-center">
                                        <CheckboxField
                                            control={control}
                                            name="seSouvenirDeMoi"
                                            label="Se souvenir de moi"
                                        />
                                        <Link
                                            href="#"
                                            className="text-blue-500 text-xs hover:underline-offset-1 hover:underline"
                                        >
                                            Mot de passe oublié ?
                                        </Link>
                                    </div>
                                    <CustomButton
                                        type="submit"
                                        IconRight={User}
                                        label="Se connecter"
                                        onClick={handleSubmit((data) =>
                                            onSignIn(data)
                                        )}
                                    />
                                </form>
                            </Form>
                        </div>
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
        </Fragment>
    )
}

export default PartnerAuth
