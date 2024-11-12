import api from '@/api/Auth'
import { API_DELIVERY_PARTNERS } from '@/lib/api_url'

export async function getCollaboratorDelivery(
    id: string,
    currentPage: number,
    pageSize: number
): Promise<{
    status: number
    data: any
}> {
    try {
        const res = await api
            .get(
                API_DELIVERY_PARTNERS +
                    `/${id}` +
                    `?page=${currentPage}&size=${pageSize}&sort=name.firstName,asc`
            )
            .catch((error) => {
                throw new Error(error.response.data.message)
            })

        return { status: res.status, data: res.data }
    } catch (error) {
        console.error(error)
        return { status: 500, data: [] }
    }
}
