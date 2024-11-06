'use client'
import React, { FC, useState } from 'react'
import { ProductSchema, ProductSchemaType } from '@/types/products'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import TopBar from '@/components/Products/TopBar'
import FormProduct from './FormProduct'
import { demoData } from '@/lib/api/product/fetchProduct'
import { CustomButton } from '@/components/custom/CustomButton'
import { Archive, CheckCheck } from 'lucide-react'

interface CreateProductProps {
    data: {
        product: any
        isLoading: boolean
        error: any
    }
}

const CreateProduct: FC<CreateProductProps> = ({ data }) => {
    const [product, setProduct] = useState<ProductSchemaType>(
        () => data.product
    )
    const [edit, setEdit] = useState(product ? false : true)
    const form = useForm<z.infer<typeof ProductSchema>>({
        resolver: zodResolver(ProductSchema),
        mode: 'onBlur',
        defaultValues: { ...product },
    })
    console.log('product', product)
    const onSubmit = (data: z.infer<typeof ProductSchema>) => {
        console.log(data)
    }
    const { handleSubmit } = form

    return (
        <>
            <div className="flex flex-col  w-full fixed bg-lynch-50 lg:bg-transparent lg:relative top-0 h-full left-0 right-0 overflow-auto gap-4">
                <TopBar
                    onSubmit={handleSubmit(onSubmit)}
                    edit={edit}
                    setEdit={setEdit}
                />
                <FormProduct
                    form={form}
                    data={data}
                    onSubmit={onSubmit}
                    disabled={edit}
                    edit={edit}
                />
                {!edit && (
                    <div className="hidden lg:flex justify-end p-2 bg-white w-full rounded-[18px] items-center">
                        <CustomButton
                            label="Archive"
                            size="sm"
                            onClick={() => console.log('Archive')}
                            className="bg-coral-50 text-coral-500 border border-coral-500 hover:bg-coral-500 hover:text-coral-50 transition-all delay-75 duration-100 text-center"
                            IconRight={Archive}
                        />
                    </div>
                )}
                <div className="flex lg:hidden rounded-t-lg bg-white p-3 fixed bottom-0 w-full">
                    {!edit ? (
                        <CustomButton
                            label="Archive"
                            size="sm"
                            onClick={() => console.log('Archive')}
                            className="bg-coral-50 text-coral-500 border border-coral-500 hover:bg-coral-500 hover:text-coral-50 transition-all delay-75 duration-100 text-center w-full"
                            IconRight={Archive}
                        />
                    ) : (
                        <CustomButton
                            label="CONFIRMER"
                            size="sm"
                            onClick={handleSubmit(onSubmit)}
                            className=" bg-primary text-white w-full"
                            IconRight={CheckCheck}
                        />
                    )}
                </div>
            </div>
        </>
    )
}

export default CreateProduct
