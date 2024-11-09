import CollaboratorAssociations from '@/components/Association/Collaborator'
import { Layout } from '@/components/Layout/Layout'

interface CollaboratorPageProps {
    params: {
        id: string
    }
}

export default async function CollaboratorPage({
    params,
}: CollaboratorPageProps) {
    return (
        <Layout>
            <CollaboratorAssociations id={params.id} />
        </Layout>
    )
}
