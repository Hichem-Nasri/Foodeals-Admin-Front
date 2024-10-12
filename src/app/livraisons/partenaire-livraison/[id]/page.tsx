import api from '@/api/Auth'
import { NewDelivery } from '@/components/Deliveries/newDeliveryPartner'
import { Layout } from '@/components/Layout/Layout'

export default async function DeliveryPage() {
    return (
        <Layout formTitle="Nouvelle partenaire - livraison">
            <NewDelivery />
        </Layout>
    )
}

const getDelivery = async (id: string) => {
    try {
        const res = api
            .get(
                `http://localhost:8080/api/v1/organizations/delivery-partners/${id}`
            )
            .then((res) => res.data)
            .catch((error) => {
                throw new Error(error)
            })
    } catch (e) {
        console.log(e)
    }
}
