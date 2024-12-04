import api from '@/lib/Auth'
import { API_URL } from '..'

async function fetchSubPartner(
    id: string,
    currentPage: number,
    pageSize: number
): Promise<{
    status: number
    data: any
}> {
    const url = `${API_URL}/v1/sub-entities/partners/${id}?page=${currentPage}&size=${pageSize}`

    try {
        const response = await api.get(url).catch((error) => {
            throw error
        })
        return {
            status: 200,
            data: response.data,
        }
    } catch (error) {
        console.error('Error fetching subpartner:', error)
        return { status: 404, data: [] }
    }
}

export default fetchSubPartner
