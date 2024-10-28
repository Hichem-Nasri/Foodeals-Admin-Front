import api from '@/api/Auth'
import { API_PARTNERS, API_PROSPECTS } from '@/lib/api_url'
import { CrmType } from '@/types/CrmType'
import { exportAllPartnerGET, PartnerGET } from '@/types/partenairUtils'
import { PartnerType } from '@/types/partners'

export async function fetchProspect(
    currentPage: number,
    pageSize: number,
    archived?: boolean
): Promise<{ status: number; totalPage: number; data: CrmType[] }> {
    try {
        const url =
            `${API_PROSPECTS}?page=${currentPage - 1}&size=${pageSize}` +
            (archived ? '&status=CANCELED' : '')
        console.log('url', url)
        const response = await api.get(url).catch((error) => {
            throw error
        })
        // console.log('response', response)
        return {
            status: response.status,
            totalPage: response.data.totalPages,
            data: response.data.content,
        }
    } catch (error) {
        console.error('Error fetching partners:', error)
        return { status: 500, totalPage: 0, data: [] }
    }
}
