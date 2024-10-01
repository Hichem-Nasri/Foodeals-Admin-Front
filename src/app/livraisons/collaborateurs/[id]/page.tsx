import { DeliveryCollaborators } from "@/components/Deliveries/Collaborators"
import { Layout } from "@/components/Layout/Layout"
import { deliveryCollaboratorsData } from "@/types/deliveries"

interface CollaboratorsPageProps {
	params: { id: string }
}

export default async function DeliveryCollaboratorsPage({ params }: CollaboratorsPageProps) {
	return (
		<Layout>
			<DeliveryCollaborators deliveryId={params.id} deliveryCollaborators={deliveryCollaboratorsData} />
		</Layout>
	)
}
