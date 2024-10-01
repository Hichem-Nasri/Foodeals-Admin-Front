import { Collaborator } from "@/components/Deliveries/Collaborators/Collaborator"
import { Layout } from "@/components/Layout/Layout"

interface CollaboratorsPageProps {
	params: { id: string }
}

export default async function DeliveryCollaboratorsPage({ params }: CollaboratorsPageProps) {
	return <Layout formTitle="Nouvelle Collaboratour - livraison">
    <Collaborator />
  </Layout>
}
