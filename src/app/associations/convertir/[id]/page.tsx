'use client'
import { NewAssociation } from '@/components/Association/NewAssociation'
import { Layout } from '@/components/Layout/Layout'
import { NewPartner } from '@/components/Partners/NewPartner'
import IsLoading from '@/components/utils/IsLoading'
import { API_URL } from '@/lib/api'
import { fetchConvertirPartners } from '@/lib/api/partner/fetchConvertirPartners'
import api from '@/lib/Auth'
import { exportAssociationConvertir } from '@/types/association'
import {
    defaultAssociationInformationData,
    defaultEngagementData,
} from '@/types/associationSchema'
import { defaultPartnerData, PartnerDataType } from '@/types/PartnerSchema'
import { useQuery } from '@tanstack/react-query'
import React, { FC, Suspense, useEffect, useState } from 'react'
interface PartnerConvertirProps {
    params: {
        id: string
    }
    searchParams: {
        mode: string
    }
}

const PartnerConvertirPage: FC<PartnerConvertirProps> = ({
    params,
    searchParams,
}) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['partners', params.id],
        queryFn: async () => {
            try {
                const url = `${API_URL}/api/v1/crm/prospects/${params.id}`
                const data = await api
                    .get(url)
                    .then((res) => res.data)
                    .catch((error) => {
                        throw new Error(error)
                    })

                if (!data)
                    return {
                        ...defaultAssociationInformationData,
                        ...defaultEngagementData,
                    }
                return exportAssociationConvertir(data)
            } catch (error) {
                console.log(error)
                return {
                    ...defaultAssociationInformationData,
                    ...defaultEngagementData,
                }
            }
        },
        refetchOnWindowFocus: false,
    })

    return (
        <Layout>
            {error ? (
                <div>Error</div>
            ) : isLoading ? (
                <IsLoading />
            ) : (
                <NewAssociation
                    id={params.id + '?convertir'}
                    partnerDetails={data!}
                    mode={searchParams.mode}
                />
            )}
        </Layout>
    )
}

export default PartnerConvertirPage
