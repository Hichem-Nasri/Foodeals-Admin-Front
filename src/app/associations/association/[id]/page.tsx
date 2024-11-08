import { NewAssociation } from '@/components/Association/NewAssociation'
import { Layout } from '@/components/Layout/Layout'
import { getAssociationData } from '@/lib/api/association/fetchAssociationData'

interface AssociationPageProps {
    params: {
        id: string
    }
}

export default async function AssociationPage({
    params,
}: AssociationPageProps) {
    const data = await getAssociationData(params.id) // TODO: add params.id to fetch data
    return (
        <Layout formTitle="Nouvelle association">
            <NewAssociation
                id={params.id != 'new' ? params.id : ''}
                partnerDetails={data!}
            />
        </Layout>
    )
}
