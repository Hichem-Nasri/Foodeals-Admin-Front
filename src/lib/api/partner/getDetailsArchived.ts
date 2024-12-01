import api from '@/lib/Auth'
import { API_URL } from '..'
import { DetailsArchiveType } from '@/types/GlobalType'

export async function fetchDetailsArchived(
    id: string,
    type: 'prospect' | 'organisation' | 'sub-entites' | 'users',
    currentPage: number,
    pageSize: number
): Promise<{ status: number; data: DetailsArchiveType[] }> {
    try {
        let url = ''
        if (['prospect', 'organisation'].includes(type)) url = `${API_URL}/v1/`
        else url = `${API_URL.replace('api', 'v1')}/`
        switch (type) {
            case 'prospect':
                url += `crm/prospects`
                break
            case 'organisation':
                url += `organizations`
                break
            case 'sub-entites':
                url += `sub-entities`
                break
            case 'users':
                url += `users`
                break
            default:
                return { status: 404, data: [] }
        }

        url += `/${id}/deletion-details?page=${currentPage}&size=${pageSize}`
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
