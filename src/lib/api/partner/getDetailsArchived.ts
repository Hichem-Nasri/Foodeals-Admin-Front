import api from '@/api/Auth'
import { API_URL } from '..'
import { DetailsArchiveType } from '@/types/GlobalType'

export async function fetchDetailsArchived(id: string) {
    try {
        const response = await api
            .get(`${API_URL}/v1/organizations/${id}/deletion-details`)
            .catch((error) => {
                throw new Error(error)
            })
        console.log('response: ', response)
        return {
            status: response.status,
            data: {
                ...response.data,
                deletedAt: new Date(response.data.deletedAt),
            } as DetailsArchiveType,
        }
    } catch (error) {
        console.error(error)
        return { status: 500, data: null }
    }
}
