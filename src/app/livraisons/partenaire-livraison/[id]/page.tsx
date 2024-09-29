import { NewDelivery } from "@/components/Deliveries/newDeliveryPartner"
import { Layout } from "@/components/Layout/Layout"

export default async function DeliveryPage() {
	return (
		<Layout formTitle="Nouvelle partenaire - livraison">
			<NewDelivery  />
		</Layout>
	)
}
