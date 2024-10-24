import { Deliveries } from '@/components/Deliveries'
import { Layout } from '@/components/Layout/Layout'
import { deliveriesData } from '@/types/deliveries'

export default async function DeliveriesPage() {
    return (
        <Layout>
            <Deliveries deliveries={deliveriesData} />
        </Layout>
    )
}
