import api from '@/api/Auth'
import { API_PARTNERS } from '@/lib/api_url'
import { exportAllPartnerGET, PartnerGET } from '@/types/partenairUtils'
import { PartnerType } from '@/types/partners'

export async function fetchPartners(
    currentPage: number,
    pageSize: number
): Promise<{ status: number; data: PartnerType[] }> {
    try {
        const response = await api
            .get(`${API_PARTNERS}?page=${currentPage}&size=${pageSize}`)
            .catch((error) => {
                throw error
            })
        return {
            status: response.status,
            data: exportAllPartnerGET(response.data.content as PartnerGET[]),
        }
    } catch (error) {
        console.error('Error fetching partners:', error)
        return { status: 500, data: [] }
    }
}
