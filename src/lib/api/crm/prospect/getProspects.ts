import api from '@/api/Auth'
import { API_PROSPECTS } from '@/lib/api_url'
import { CrmType } from '@/types/CrmType'

export async function fetchProspect(
    currentPage: number,
    pageSize: number,
    archived?: boolean
): Promise<{ status: number; data: any }> {
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
            data: response.data,
        }
    } catch (error) {
        console.error('Error fetching partners:', error)
        return { status: 500, data: null }
    }
}
