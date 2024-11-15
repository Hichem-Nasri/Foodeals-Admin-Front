import { Layout } from '@/components/Layout/Layout'
import { Operations } from '@/components/payment/PaymentDetails'
import { defaultDataPaymentDeliveriesTable } from '@/components/payment/business/column/paymentDeliveriesColumn'
import { PaymentDeliveries } from './validationLivraisons'

interface PaymentPageProps {
    params: {
        id: string
    }
}

export default async function PaymentPage({ params }: PaymentPageProps) {
    return (
        <Layout>
            <PaymentDeliveries id={params.id} />
        </Layout>
    )
}
