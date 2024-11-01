import { Layout } from '@/components/Layout/Layout'
import { Payment } from '@/components/payment'
import { Operations } from '@/components/payment/PaymentDetails'
import { PaymentDeliveries } from './validationLivraisons'
import { defaultDataPaymentDeliveriesTable } from '@/components/payment/business/column/paymentDeliveriesColumn'

interface PaymentPageProps {}

export default async function PaymentPage({}: PaymentPageProps) {
    return (
        <Layout>
            <PaymentDeliveries payments={defaultDataPaymentDeliveriesTable} />
        </Layout>
    )
}
