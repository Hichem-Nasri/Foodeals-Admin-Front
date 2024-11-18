import { Layout } from '@/components/Layout/Layout'
import { Operations } from '@/components/payment/PaymentDetails'
import { defaultDataPaymentDeliveriesTable } from '@/components/payment/business/column/paymentDeliveriesColumn'
import { PaymentDeliveries } from './validationLivraisons'

interface PaymentPageProps {
    params: {
        id: string
    }
    searchParams: {
        deliveryId: string
    }
}

export default async function PaymentPage({
    params,
    searchParams,
}: PaymentPageProps) {
    console.log('searchParams', searchParams)
    return (
        <Layout>
            <PaymentDeliveries id={searchParams.deliveryId} />
        </Layout>
    )
}
