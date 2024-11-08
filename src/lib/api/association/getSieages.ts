import api from '@/api/Auth'
import { API_SIEGES } from '@/lib/api_url'

export async function fetchSieages(
    id: string,
    currentPage: number,
    pageSize: number
) {
    try {
        const res = await api
            .get(
                `${API_SIEGES}/${id}?page=${currentPage}&size=${pageSize}&sort=createdAt,desc`
            )
            .catch((error) => {
                throw new Error('Error fetching sieages')
            })
        return res
    } catch (error) {
        console.log(error)
        return { status: 500, data: [] }
    }
}
