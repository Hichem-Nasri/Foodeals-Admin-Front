'use client'
import { AvatarProfile } from '@/components/AvatarProfile'
import { CustomButton } from '@/components/custom/CustomButton'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/custom/Input'
import React, { useState } from 'react'
import { ProductSchema } from '@/types/products'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { AvatarField } from '@/components/custom/AvatarField'
import { InputFieldForm } from '@/components/custom/InputField'
import TopBar from '@/components/Products/TopBar'

const CreateProduct = () => {
    const [product, setProduct] = useState({
        avatar: '',
        title: '',
        marque: '',
        description: '',
        categories: '',
        subCategories: '',
        codeBar: '',
    })
    const form = useForm<z.infer<typeof ProductSchema>>({
        resolver: zodResolver(ProductSchema),
        mode: 'onBlur',
        defaultValues: product,
    })

    const onSubmit = (data: z.infer<typeof ProductSchema>) => {
        console.log(data)
    }
    const { handleSubmit, control } = form

    return (
        <div className="flex flex-col gap-2 w-full">
            <TopBar onSubmit={handleSubmit(onSubmit)} />
            <Accordion
                type="single"
                collapsible
                className="bg-white lg:p-5 px-4 py-6 rounded-[14px]"
                defaultValue="Product"
            >
                <AccordionItem
                    value="Product"
                    className="text-lynch-400 text-[1.375rem] font-normal"
                >
                    <AccordionTrigger className="font-normal text-[1.375rem] py-0">
                        Information du produit
                    </AccordionTrigger>
                    <AccordionContent className="pt-7">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="flex flex-col justify-center items-center gap-[1.875rem]"
                            >
                                <div className="flex w-fit gap-5 lg:pb-0 pb-14">
                                    <AvatarField
                                        disabled={false}
                                        name="avatar"
                                        form={form}
                                        alt={'upload image'}
                                        label="Photo de produit"
                                        className="!rounded-full size-[130px] flex justify-center items-center"
                                        classNameAvatar="!rounded-full size-[130px]"
                                    />
                                </div>
                                <div className="flex lg:flex-row flex-col items-center gap-3 w-full">
                                    <InputFieldForm
                                        control={control}
                                        placeholder={'Saisir le titre'}
                                        name={'title'}
                                        disabled={false}
                                        label="Titre"
                                    />
                                    <InputFieldForm
                                        control={control}
                                        placeholder={'Saisir la marque'}
                                        name={'marque'}
                                        disabled={false}
                                        label="Marque"
                                    />
                                    <InputFieldForm
                                        control={control}
                                        placeholder={'Saisir la description'}
                                        name={'description'}
                                        disabled={false}
                                        label="Description"
                                    />
                                </div>
                                <div className="flex lg:flex-row flex-col items-center gap-3 w-full">
                                    <InputFieldForm
                                        control={control}
                                        placeholder={'Saisir les categories'}
                                        name={'categories'}
                                        disabled={false}
                                        label="Catégories"
                                    />
                                    <InputFieldForm
                                        control={control}
                                        placeholder={
                                            'Saisir les sous categories'
                                        }
                                        name={'subCategories'}
                                        disabled={false}
                                        label="Sous Catégories"
                                    />
                                    <InputFieldForm
                                        control={control}
                                        placeholder={'Saisir le code bar'}
                                        name={'codeBar'}
                                        disabled={false}
                                        label="Code Bar"
                                    />
                                </div>
                            </form>
                        </Form>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default CreateProduct
