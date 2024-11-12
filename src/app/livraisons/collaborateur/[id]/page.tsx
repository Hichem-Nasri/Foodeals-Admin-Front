'use client'
import { Collaborator } from '@/components/Deliveries/Collaborators/Collaborator'
import { Layout } from '@/components/Layout/Layout'
import { getCollaboratorDelivery } from '@/lib/api/delivery/getCollaboratorDelivery'
import {
    CollaboratorDeliveryType,
    defaultCollaboratorDeliveryData,
} from '@/types/DeliverySchema'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

interface CollaboratorsPageProps {
    params: { id: string }
}

export default async function DeliveryCollaboratorsPage({
    params,
}: CollaboratorsPageProps) {
    const [collaborator, setCollaborator] = useState<CollaboratorDeliveryType>(
        defaultCollaboratorDeliveryData
    )

    // ...

    const { data, isLoading, isError, isSuccess } = useQuery({
        queryKey: ['collaborator', params.id],
        queryFn: async () => getCollaboratorDelivery(params.id),
    })

    useEffect(() => {
        if (isError) {
            throw new Error('Error fetching partners')
        }
        if (isSuccess) {
            console.log('collaborator', data)
            setCollaborator(data.data)
        }
    }, [isSuccess, isError])
    console.log('data', data)
    // ...
    return (
        <Layout formTitle="Nouvelle Collaboratour - livraison">
            {isLoading ? (
                <div>Loading ...</div>
            ) : (
                <Collaborator partnerDetails={collaborator} />
            )}
        </Layout>
    )
}
