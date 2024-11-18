'use client'
import { NewDelivery } from '@/components/Deliveries/newDeliveryPartner'
import { Layout } from '@/components/Layout/Layout'
import { useNotification } from '@/context/NotifContext'
import { getDelivery } from '@/lib/api/delivery/fetchDeliveryParnters'
import { API_PARTNERS } from '@/lib/api_url'
import {
    DeliveryPartnerType,
    emptyDeliveryPartner,
} from '@/types/DeliverySchema'
import { NotificationType } from '@/types/GlobalType'
import { PartnerPOST } from '@/types/partenairUtils'
import { useQuery } from '@tanstack/react-query'

const Error = ({
    error,
}: {
    error: {
        message: string
    }
}) => {
    const notify = useNotification()
    notify.notify(NotificationType.ERROR, 'Error fetching partners')
    return (
        <div className="flex justify-center items-center w-full h-full">
            <div className="text-coral-500 text-2xl  m-auto">
                <p className="text-black">
                    Erreur lors du chargement des données
                </p>
                <p className="text-xl">{error.message}</p>
            </div>
        </div>
    )
}

export default function DeliveryPage({ params }: { params: { id: string } }) {
    const { data, error, isLoading } = useQuery({
        queryKey: ['partners', params.id],
        queryFn: async () => {
            try {
                if (params.id === 'new') {
                    return emptyDeliveryPartner
                }
                const data = await getDelivery(params.id)
                return data
            } catch (error) {
                console.log(error)
                return emptyDeliveryPartner
            }
        },
    })
    console.log('delivery', data)
    return (
        <Layout formTitle="Nouvelle partenaire - livraison">
            {error ? (
                <Error error={error} />
            ) : isLoading ? (
                <div>Loading...</div>
            ) : (
                <NewDelivery
                    id={params.id}
                    partnerDetails={data as DeliveryPartnerType}
                />
            )}
        </Layout>
    )
}
