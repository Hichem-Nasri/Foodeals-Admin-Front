import api from '@/api/Auth'
import { API_DELIVERY_PARTNERS } from '@/lib/api_url'
import { API_URL } from '..'

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
                API_URL.replace('api', '') +
                    `v1/users/delivery-partners/${id}` +
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
