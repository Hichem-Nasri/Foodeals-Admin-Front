'use client'
import { NewAssociation } from '@/components/Association/NewAssociation'
import { Layout } from '@/components/Layout/Layout'
import IsLoading from '@/components/utils/IsLoading'
import { getAssociationData } from '@/lib/api/association/fetchAssociationData'
import { AssociationInformationSchemaType } from '@/types/associationSchema'
import { useQuery } from '@tanstack/react-query'

interface AssociationPageProps {
    params: {
        id: string
    }
	searchParams: {
	mode: string
	}
}

export default function AssociationPage({ params, searchParams }: AssociationPageProps) {
    const data = useAssociation(params.id) as {
        data: AssociationInformationSchemaType
        isLoading: boolean
        isError: boolean
    } // TODO: add params.id to fetch data

    console.log(data.data)
    return (
        <Layout
            formTitle={
                params.id == 'new' ? 'Nouvelle association' : 'Association'
            }
        >
            {data.isLoading ? (
                <IsLoading />
            ) : (
                <NewAssociation
                    id={params.id != 'new' ? params.id : ''}
                    partnerDetails={data.data}
			mode={searchParams.mode}
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
