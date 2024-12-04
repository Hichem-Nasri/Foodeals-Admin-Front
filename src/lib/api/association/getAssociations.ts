import api from '@/lib/Auth'
import { API_URL } from '..'

export async function fetchAssociations(
    currentPage: number,
    pageSize: number
): Promise<{ status: number; data: any }> {
    try {
        const response = await api
            .get(
                `${API_URL}/api/v1/organizations/associations?page=${currentPage}&size=${pageSize}`
            )
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
