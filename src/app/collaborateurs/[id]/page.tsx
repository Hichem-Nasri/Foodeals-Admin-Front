import { Layout } from '@/components/Layout/Layout'
import { PartnerType } from '@/types/partnersType'
import Collaborateurs from '../../../components/Collaborators'

interface CollaboratorsPageProps {
    params: {
        pathParams: string[]
        lang: string
        id: string
    }
    searchParams: {
        partnerType: string
        type: string
    }
}

export default async function CollaboratorsPage({
    searchParams,
    params,
}: CollaboratorsPageProps) {
    return (
        <Layout>
            <Collaborateurs
                id={params.id}
                type={searchParams.type}
                partnerType={searchParams.partnerType}
            />
        </Layout>
    )
}
