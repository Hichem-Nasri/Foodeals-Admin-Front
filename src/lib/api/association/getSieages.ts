import api from '@/lib/Auth'
import { API_URL } from '..'

export async function fetchSieages(
    id: string,
    currentPage: number,
    pageSize: number
) {
    try {
        const res = await api
            .get(
                `${API_URL}/v1/sub-entities/associations/${id}?page=${currentPage}&size=${pageSize}&sort=createdAt,desc`
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
