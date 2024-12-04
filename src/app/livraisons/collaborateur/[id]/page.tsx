'use client'
import { Collaborator } from '@/components/Deliveries/Collaborators/Collaborator'
import { Layout } from '@/components/Layout/Layout'
import IsLoading from '@/components/utils/IsLoading'
import { getCollaboratorDelivery } from '@/lib/api/delivery/getCollaboratorDelivery'
import { defaultCollaboratorDeliveryData } from '@/types/DeliverySchema'
import { useQuery } from '@tanstack/react-query'

interface CollaboratorsPageProps {
    params: { id: string }
}

export default function DeliveryCollaboratorsPage({
    params,
}: CollaboratorsPageProps) {
    const { data, isLoading, error } = useQuery({
        queryKey: ['collaborator', params.id],
        queryFn: async () => {
            const data = await getCollaboratorDelivery(params.id).then(
                (res) => ({
                    status: res.status,
                    data: {
                        ...res.data,
                        partner: {
                            name: res?.data.organizationInfo.organization.name,
                            city: res?.data.organizationInfo.organization.city,
                            avatarPath:
                                res?.data.organizationInfo.organization
                                    .avatarPath,
                        },
                    },
                })
            )
            if (data.status === 500) return defaultCollaboratorDeliveryData
            return data.data
        },
        refetchOnWindowFocus: false,
    })
    console.log('data', data)
    return (
        <Layout formTitle="Nouvelle Collaboratour - livraison">
            {isLoading ? (
                <IsLoading />
            ) : (
                <Collaborator collaborator={data} id={params.id} />
            )}
        </Layout>
    )
}
