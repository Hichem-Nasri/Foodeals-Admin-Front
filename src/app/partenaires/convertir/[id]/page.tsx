'use client'
import { Layout } from '@/components/Layout/Layout'
import { NewPartner } from '@/components/Partners/NewPartner'
import { fetchConvertirPartners } from '@/lib/api/partner/fetchConvertirPartners'
import { defaultPartnerData, PartnerDataType } from '@/types/PartnerSchema'
import { useQuery } from '@tanstack/react-query'
import React, { FC, Suspense, useEffect, useState } from 'react'
interface PartnerConvertirProps {
    params: {
        id: string
    }
}

const PartnerConvertirPage: FC<PartnerConvertirProps> = ({ params }) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['partners', params.id],
        queryFn: async () => {
            try {
                const data = await fetchConvertirPartners(params.id)
                if (!data) return defaultPartnerData
                return data
            } catch (error) {
                console.log(error)
                return []
            }
        },
    })

    return (
        <Layout>
            <Suspense fallback={<div>Loading...</div>}>
                {error ? (
                    <div>Error</div>
                ) : isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <NewPartner
                        partner={data as PartnerDataType}
                        id={params.id + '?convertir'}
                    />
                )}
            </Suspense>
        </Layout>
    )
}

export default PartnerConvertirPage
