import { Layout } from "@/components/Layout/Layout";
import { Payment } from "@/components/payment";
import { defaultDataPaymentsTable } from "@/types/PaymentType";

interface PaymentPageProps {}

export default async function PaymentPage({}: PaymentPageProps) {
	return (
		<Layout>
      <Payment payments={defaultDataPaymentsTable} />
		</Layout>
	)
}
