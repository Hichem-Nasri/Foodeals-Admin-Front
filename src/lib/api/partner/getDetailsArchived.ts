import api from '@/api/Auth'
import { API_URL } from '..'
import { DetailsArchiveType } from '@/types/GlobalType'

export async function fetchDetailsArchived(
    id: string,
    leadKo: boolean,
    currentPage: number,
    pageSize: number
): Promise<{ status: number; data: DetailsArchiveType[] }> {
    try {
        const url =
            `${API_URL}/v1/` +
            (leadKo ? `crm/prospects/` : `organizations/`) +
            `${id}/deletion-details` +
            `?page=${currentPage}&size=${pageSize}`
        console.log('url: ---', url)
        const response = await api.get(url).catch((error) => {
            throw new Error(error)
        })
        console.log('response: ', response)
        return {
            status: response.status,
            data: response.data.content as any[],
        }
    } catch (error) {
        console.error(error)
        return { status: 500, data: [] }
    }
}
