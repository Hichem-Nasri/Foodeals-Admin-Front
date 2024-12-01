import { Layout } from '@/components/Layout/Layout'
import React from 'react'
import { Create } from './create'

export default function CreatePage({
    searchParams,
}: {
    searchParams: {
        type: string
    }
}) {
    console.log(searchParams.type)
    return (
        <Layout formTitle="Nouveau Prospect">
            <Create
                type={searchParams.type as 'PARTNER' | 'ASSOCIATION,FOOD_BANK'}
            />
        </Layout>
    )
}
