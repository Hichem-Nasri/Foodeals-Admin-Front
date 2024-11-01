'use client'
import { AvatarField } from '@/components/custom/AvatarField'
import { InputFieldForm } from '@/components/custom/InputField'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { ProductSchema } from '@/types/products'
import React, { FC } from 'react'
import { Form } from '@/components/ui/form'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { PencilLine } from 'lucide-react'

interface FormProductProps {
    form: UseFormReturn<z.infer<typeof ProductSchema>>
    data: {
        product: any
        isLoading: boolean
    }
    onSubmit: (data: z.infer<typeof ProductSchema>) => void
    disabled?: boolean
}

const FormProduct: FC<FormProductProps> = ({
    form,
    data,
    onSubmit,
    disabled = false,
}) => {
    return (
        <>
            <div className="w-full lg:flex hidden">
                <Accordion
                    type="single"
                    collapsible
                    className="bg-white  lg:p-5 px-4 py-6 rounded-[14px] w-full"
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
                            <NewFormProduct
                                form={form}
                                onSubmit={onSubmit}
                                isLoaded={data.isLoading}
                                disabled={disabled}
                            />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            <div className="flex lg:hidden justify-center items-start p-4 gap-4 min-w-full">
                <NewFormProduct
                    form={form}
                    onSubmit={onSubmit}
                    isLoaded={data.isLoading}
                    disabled={disabled}
                />
            </div>
        </>
    )
}

interface NewFormProduct {
    form: UseFormReturn<z.infer<typeof ProductSchema>>
    onSubmit: (data: z.infer<typeof ProductSchema>) => void
    isLoaded: boolean
    disabled?: boolean
}

export const NewFormProduct: FC<NewFormProduct> = ({
    form,
    onSubmit,
    isLoaded,
    disabled = false,
}) => {
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col justify-center items-center gap-[1.875rem] w-full"
            >
                <div className="flex justify-between lg:justify-center items-center w-full gap-5 lg:pb-0 ">
                    <div className="flex justify-start lg:justify-center items-center space-x-2">
                        <AvatarField
                            name="avatar"
                            form={form}
                            alt={'upload image'}
                            label="Photo de produit"
                            className="!rounded-full size-[130px] flex justify-center items-center lg:bg-transparent bg-white"
                            classNameAvatar="!rounded-full size-[130px] lg:bg-transparent bg-white"
                            isLoaded={isLoaded}
                            disabled={disabled}
                        />
                        {
                            <div className="lg:hidden flex flex-col space-y-3 items-start justify-center text-wrap">
                                <h1 className="text-md text-lynch-950">
                                    {form.getValues('title')}
                                </h1>
                                <h3 className="text-sm text-primary">
                                    {form.getValues('categories')}
                                </h3>
                            </div>
                        }
                    </div>
                    <Button className=" flex lg:hidden bg-white text-lynch-400 rounded-full size-14">
                        <PencilLine size={20} />
                    </Button>
                </div>
                <h1 className="flex text-xl font-medium text-lynch-400 lg:hidden">
                    Information du produit
                </h1>
                <div className="w-full h-full flex flex-col bg-white lg:bg-transparent lg:rounded-none rounded-[30px] py-[25px] px-4 gap-6 lg:mb-0 mb-20">
                    <div className="flex lg:flex-row flex-col items-start gap-3 w-full">
                        <InputFieldForm
                            control={form.control}
                            placeholder={'Saisir le titre'}
                            name={'title'}
                            label="Titre"
                            isLoaded={isLoaded}
                            disabled={disabled}
                        />
                        <InputFieldForm
                            control={form.control}
                            placeholder={'Saisir la marque'}
                            name={'marque'}
                            label="Marque"
                            disabled={disabled}
                            isLoaded={isLoaded}
                        />
                        <InputFieldForm
                            control={form.control}
                            placeholder={'Saisir la description'}
                            name={'description'}
                            label="Description"
                            isLoaded={isLoaded}
                            disabled={disabled}
                        />
                    </div>
                    <div className="flex lg:flex-row flex-col items-start gap-3 w-full">
                        <InputFieldForm
                            control={form.control}
                            placeholder={'Saisir les categories'}
                            name={'categories'}
                            label="Catégories"
                            isLoaded={isLoaded}
                            disabled={disabled}
                        />
                        <InputFieldForm
                            control={form.control}
                            placeholder={'Saisir les sous categories'}
                            name={'subCategories'}
                            label="Sous Catégories"
                            isLoaded={isLoaded}
                            disabled={disabled}
                        />
                        <InputFieldForm
                            control={form.control}
                            placeholder={'Saisir le code bar'}
                            name={'codeBar'}
                            label="Code Bar"
                            isLoaded={isLoaded}
                            disabled={disabled}
                        />
                    </div>
                </div>
            </form>
        </Form>
    )
}

export default FormProduct
