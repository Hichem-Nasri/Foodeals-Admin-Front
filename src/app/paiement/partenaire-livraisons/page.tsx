import { Layout } from '@/components/Layout/Layout'
import { Payment } from '@/components/payment'
import { Operations } from '@/components/payment/PaymentDetails'
import {
    defaultDataPaymentDeliveriesTable,
    defaultDataPaymentsTable,
} from '@/types/PaymentType'
import { PaymentDeliveries } from './validationLivraisons'

interface PaymentPageProps {}

export default async function PaymentPage({}: PaymentPageProps) {
    return (
        <Layout>
            <PaymentDeliveries payments={defaultDataPaymentDeliveriesTable} />
        </Layout>
    )
}
