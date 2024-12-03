'use client'
import { NewAssociation } from '@/components/Association/NewAssociation'
import { Layout } from '@/components/Layout/Layout'
import { getAssociationData } from '@/lib/api/association/fetchAssociationData'
import { AssociationInformationSchemaType } from '@/types/associationSchema'
import { useQuery } from '@tanstack/react-query'

interface AssociationPageProps {
    params: {
        id: string
    }
}

export default function AssociationPage({ params }: AssociationPageProps) {
    const data = useAssociation(params.id) as {
        data: AssociationInformationSchemaType
        isLoading: boolean
        isError: boolean
    } // TODO: add params.id to fetch data

    console.log(data.data)
    return (
        <Layout formTitle="Nouvelle association">
            {data.isLoading ? (
                <div>Loading...</div>
            ) : (
                <NewAssociation
                    id={params.id != 'new' ? params.id : ''}
                    partnerDetails={data.data}
                />
            )}
        </Layout>
    )
}

const useAssociation = (id: string) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['association', id],
        queryFn: async () => getAssociationData(id),
        refetchOnWindowFocus: false,
    })
    return { data, isLoading, isError }
}
