'use client'
import api from '@/lib/Auth'
import { Layout } from '@/components/Layout/Layout'
import { CollaboratorDetails } from '@/components/Partners/collaborators/CollaboratorDetails'
import { API_URL } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

interface CollaboratorsPageProps {
    params: { partnerId: string; collaboratorId: string }
}

export default function DetailsCollaboratorPage({
    params,
}: CollaboratorsPageProps) {
    const data = useCollaborators(params.partnerId, params.collaboratorId)
    return (
        <Layout>
            {!data.isError ? (
                <>
                    {data.isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        <CollaboratorDetails collaborator={data.data} />
                    )}
                </>
            ) : (
                <div className="w-full h-full m-auto text-xl justify-center items-center text-lynch-950">
                    User Not Found
                </div>
            )}
        </Layout>
    )
}

const useCollaborators = (partnerId: string, collaboratorId: string) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['collaborator', collaboratorId],
        queryFn: async () => {
            const res = await api
                .get(
                    API_URL.replace('api', 'v1') +
                        `/users/${collaboratorId}/profile`
                )
                .then((data) => {
                    console.log('res', data)
                    return data
                })
                .catch((error) => {
                    console.error('Error fetching collaborator:', error)
                    return { status: 500, data: [] }
                })
            if (res.status === 200) {
                return res.data
            }
        },
    })
    return { data, isLoading, isError }
    // return collaboratorData
}
