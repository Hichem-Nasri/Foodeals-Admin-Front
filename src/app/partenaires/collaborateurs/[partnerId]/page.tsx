import { Layout } from '@/components/Layout/Layout'
import { Collaborators } from '@/components/Partners/collaborators'

interface CollaboratorsPageProps {
    params: { partnerId: string }
}

export default async function CollaboratorsPage({
    params,
}: CollaboratorsPageProps) {
    return (
        <Layout>
            <Collaborators partnerId={params.partnerId} />
        </Layout>
    )
}
