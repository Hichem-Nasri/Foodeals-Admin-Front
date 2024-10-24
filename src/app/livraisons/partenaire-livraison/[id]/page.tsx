import api from '@/api/Auth'
import { NewDelivery } from '@/components/Deliveries/newDeliveryPartner'
import { Layout } from '@/components/Layout/Layout'
import { getDelivery } from '@/lib/api/delivery/fetchDeliveryParnters'
import { API_PARTNERS } from '@/lib/api_url'
import { DeliveryPartnerType } from '@/types/DeliverySchema'
import { PartnerPOST } from '@/types/partenairUtils'

export default async function DeliveryPage({
    params,
}: {
    params: { id: string }
}) {
    const delivery = await getDelivery(params.id)
    console.log('delivery', delivery)
    return (
        <Layout formTitle="Nouvelle partenaire - livraison">
            <NewDelivery id={params.id} partnerDetails={delivery!} />
        </Layout>
    )
}
