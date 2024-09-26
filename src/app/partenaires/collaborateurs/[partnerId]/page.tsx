import { Layout } from "@/components/Layout/Layout"
import { Collaborators } from "@/components/Partners/collaborators"
import { PartnerCollaboratorsData } from "@/types/collaborators"

interface CollaboratorsPageProps {
  params: { partnerId: string }
}

export default async function CollaboratorsPage({ params }: CollaboratorsPageProps) {
  const collaborators = await getCollaborators(params.partnerId)
  return (
    <Layout>
      <Collaborators collaborators={PartnerCollaboratorsData} partnerId={params.partnerId} />
    </Layout>
  )
}

const getCollaborators = async (partnerId: string) => {
  // TODO: Fetch Collaborators with id of the partner
}