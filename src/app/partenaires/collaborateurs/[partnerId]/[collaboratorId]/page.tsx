import { Layout } from '@/components/Layout/Layout'
import { CollaboratorDetails } from '@/components/Partners/collaborators/CollaboratorDetails'

interface CollaboratorsPageProps {
    params: { partnerId: string; collaboratorId: string }
}

export default async function DetailsCollaboratorPage({
    params,
}: CollaboratorsPageProps) {
    const collaborators = await getCollaborators(
        params.partnerId,
        params.collaboratorId
    )
    return (
        <Layout>
            {/* <CollaboratorDetails collaborator={collaborators} />
             */}
            <h1>Collaborator Details</h1>
        </Layout>
    )
}

const getCollaborators = async (partnerId: string, collaboratorId: string) => {
    // TODO: Fetch Collaborator with id of the partnerID and collaboratorID
    // return collaboratorData
}
