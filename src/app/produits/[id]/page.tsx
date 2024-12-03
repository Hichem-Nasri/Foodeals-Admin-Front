'use client'

import { Layout } from '@/components/Layout/Layout'
import React, { FC } from 'react'
import CreateProduct from '@/components/Products/newProducts'
import { useQuery } from '@tanstack/react-query'
import { emptyProduct, fetchProduct } from '@/lib/api/product/fetchProduct'

interface CreateProductPageProps {
    params: {
        id: string
    }
}

const CreateProductPage: FC<CreateProductPageProps> = ({ params }) => {
    const { data, isLoading, error } = {
        data: emptyProduct,
        isLoading: false,
        error: null,
    } // GetProduct(params.id)
    console.log('data', data)

    return (
        <Layout>
            <CreateProduct
                data={{
                    product: data,
                    isLoading,
                    error,
                }}
            />
        </Layout>
    )
}

// const GetProduct = (id: string) => {
//     if (!id || id === 'new') {
//         return { data: null, isLoading: false, error: null }
//     }
//     const { data, isLoading, error } = useQuery({
//         queryKey: ['product', id],
//         queryFn: async () => {
//             const response = await fetchProduct(id)
//             if (response.status === 200) {
//                 return response.data
//             }
//             return null
//         },
//          refetchOnWindowFocus: false,
//
//     })
//     return { data: demoData, isLoading, error } // TODO: replace demoData with data
// }

export default CreateProductPage
