import { Layout } from "@/components/Layout/Layout";
import { Payment } from "@/components/payment";
import { Operations } from "@/components/payment/PaymentDetails";
import { defaultDataPaymentsTable } from "@/types/PaymentType";

interface PaymentPageProps { }

export default async function PaymentPage({ }: PaymentPageProps) {
	return (
		<Layout>
			<Operations />
		</Layout>
	)
}
