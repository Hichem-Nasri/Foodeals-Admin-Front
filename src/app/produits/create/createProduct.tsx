'use client'
import { AvatarProfile } from '@/components/AvatarProfile'
import { CustomButton } from '@/components/custom/CustomButton'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { ArrowLeft, CheckCheck, CheckCircle, SaveIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/custom/Input'
import React, { useState } from 'react'

const CreateProduct = () => {
    const router = useRouter()
    const [product, setProduct] = useState({
        avatar: '',
        title: '',
        marque: '',
        description: '',
        categories: '',
        subCategories: '',
        codeBar: '',
    })

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between p-2 bg-white w-full rounded-[18px]">
                <CustomButton
                    label="Retour"
                    IconLeft={ArrowLeft}
                    variant="outline"
                    onClick={router.back}
                    size="sm"
                />
                <div className="flex justify-center items-center space-x-2">
                    <CustomButton
                        label="Enregistrer"
                        variant="outline"
                        size="sm"
                        IconRight={SaveIcon}
                    />
                    <CustomButton
                        label="Confirmer"
                        size="sm"
                        IconRight={CheckCircle}
                        disabled
                    />
                </div>
            </div>
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
                        <div className="flex flex-col justify-center items-center gap-[1.875rem]">
                            <div className="flex w-fit gap-5 lg:pb-0 pb-14">
                                <AvatarProfile
                                    iUrl=""
                                    alt={'upload image'}
                                    label="Photo de produit"
                                    className="!rounded-full size-[130px] flex justify-center items-center"
                                />
                            </div>
                            <div className="flex lg:flex-row flex-col items-center gap-3 w-full">
                                <Input
                                    placeholder={'Saisir le titre'}
                                    name={product.title}
                                    value={product.title}
                                    onChange={() => {
                                        setProduct({
                                            ...product,
                                            title: product.title,
                                        })
                                    }}
                                    label="Titre"
                                />
                                <Input
                                    placeholder={'Saisir la marque '}
                                    name={product.marque}
                                    value={product.marque}
                                    onChange={() => {
                                        setProduct({
                                            ...product,
                                            marque: product.marque,
                                        })
                                    }}
                                    label="Marque"
                                />
                                <Input
                                    placeholder={'Saisir le description'}
                                    name={product.description}
                                    value={product.description}
                                    onChange={() => {
                                        setProduct({
                                            ...product,
                                            description: product.description,
                                        })
                                    }}
                                    label="Description"
                                />
                            </div>
                            <div className="flex lg:flex-row flex-col items-center gap-3 w-full">
                                <Input
                                    placeholder={'Saisir les categories'}
                                    name={product.categories}
                                    value={product.categories}
                                    onChange={() => {
                                        setProduct({
                                            ...product,
                                            categories: product.categories,
                                        })
                                    }}
                                    label="Catégories"
                                />
                                <Input
                                    placeholder={'Saisir les subCategories'}
                                    name={product.subCategories}
                                    value={product.subCategories}
                                    onChange={() => {
                                        setProduct({
                                            ...product,
                                            subCategories:
                                                product.subCategories,
                                        })
                                    }}
                                    label="Sous catégories"
                                />
                                <Input
                                    placeholder={'Saisir le code bar'}
                                    name={product.codeBar}
                                    value={product.codeBar}
                                    onChange={() => {
                                        setProduct({
                                            ...product,
                                            codeBar: product.codeBar,
                                        })
                                    }}
                                    label="Code Bar"
                                />
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default CreateProduct
