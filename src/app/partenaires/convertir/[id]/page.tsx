'use client'
import { Layout } from '@/components/Layout/Layout'
import { NewPartner } from '@/components/Partners/NewPartner'
import { fetchConvertirPartners } from '@/lib/api/partner/fetchConvertirPartners'
import { defaultPartnerData, PartnerDataType } from '@/types/PartnerSchema'
import React, { FC, Suspense, useEffect, useState } from 'react'
interface PartnerConvertirProps {
    params: {
        id: string
    }
}

const PartnerConvertirPage: FC<PartnerConvertirProps> = ({ params }) => {
    const [convertirData, setconvertirData] = useState<PartnerDataType | null>(
        null
    )
    useEffect(() => {
        const fetch = async () => {
            const data = await fetchConvertirPartners(params.id)
            console.log(data)
            setconvertirData(data!)
        }
        if (convertirData === null) fetch()
    }, [])

    return (
        <Layout>
            <Suspense fallback={<div>Loading...</div>}>
                <NewPartner partner={convertirData!} id={'convertir'} />
            </Suspense>
        </Layout>
    )
}

export default PartnerConvertirPage
