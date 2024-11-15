import api from '@/api/Auth'
import { API_PAYMENT_COMMISSIONS } from '@/lib/api_url'

export async function getPartnerDeliveryPayment(
    id: string,
    year: string,
    currentPage: number,
    pageSize: number
): Promise<{
    status: number
    data: any
}> {
    try {
        const res = await api
            .get(
                API_PAYMENT_COMMISSIONS +
                    `/delivery/${id}/${year}` +
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
