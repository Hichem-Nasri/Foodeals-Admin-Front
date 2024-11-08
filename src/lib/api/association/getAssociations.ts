import api from '@/api/Auth'
import { API_ASSOCIATIONS } from '@/lib/api_url'

export async function fetchAssociations(
    currentPage: number,
    pageSize: number
): Promise<{ status: number; data: any }> {
    try {
        const response = await api
            .get(`${API_ASSOCIATIONS}?page=${currentPage}&size=${pageSize}`)
            .catch((error) => {
                throw error
            })
        return {
            status: response.status,
            data: response.data,
        }
    } catch (error) {
        console.error('Error fetching partners:', error)
        return { status: 500, data: null }
    }
}
