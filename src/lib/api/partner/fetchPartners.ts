import api from '@/api/Auth'
import { API_PARTNERS } from '@/lib/api_url'
import { PartnerType } from '@/types/partnersType'

export async function fetchPartners(
    currentPage: number,
    pageSize: number
): Promise<{ status: number; data: any }> {
    try {
        const response = await api
            .get(`${API_PARTNERS}?page=${currentPage}&size=${pageSize}`)
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
