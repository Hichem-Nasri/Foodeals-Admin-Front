'use client'
import { Layout } from '@/components/Layout/Layout'
import { NewPartner } from '@/components/Partners/NewPartner/'
import IsLoading from '@/components/utils/IsLoading'
import { getPartnerData } from '@/lib/api/partner/fetchPartnerData'
import { defaultPartnerData, PartnerDataType } from '@/types/PartnerSchema'
import { useQuery } from '@tanstack/react-query'

interface PartnersPageProps {
    params: { id: string }
    searchParams: {
        mode: string
    }
}

export default function PartnersPage({
    params,
    searchParams,
}: PartnersPageProps) {
    const data = usePartner(params.id)
    console.log('params', data)
    return (
        <Layout formTitle="Partenaire">
            {data.isLoading ? (
                <IsLoading />
            ) : (
                <>
                    {data.isError ? (
                        <div className="text-coral-500 font-semibold text-2xl w-full h-full flex justify-center items-center">
                            Partner Not found
                        </div>
                    ) : (
                        <NewPartner
                            partner={data.data as PartnerDataType}
                            id={params.id}
                            mode={searchParams.mode}
                        />
                    )}
                </>
            )}
        </Layout>
    )
}

const usePartner = (id: string) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['partner', id],
        queryFn: async () => {
            if (id === 'new') return defaultPartnerData
            return getPartnerData(id)
        },
        refetchOnWindowFocus: false,
    })
    console.log('data', data)
    return { data, isLoading, isError }
}
