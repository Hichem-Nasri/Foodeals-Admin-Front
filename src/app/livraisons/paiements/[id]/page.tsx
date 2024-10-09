import { DeliveryPayments } from "@/components/Deliveries/DeliveryPayments"
import { Layout } from "@/components/Layout/Layout"
import { defaultDeliveryPaymentsData } from "@/types/deliveries"

export default async function DeliveryPage() {
	return (
		<Layout>
			<DeliveryPayments payments={defaultDeliveryPaymentsData} />
		</Layout>
	)
}
