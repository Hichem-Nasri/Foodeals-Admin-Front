import api from '@/lib/Auth'
import { API_URL } from '..'

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
                API_URL +
                    `/api/v1/payments/commissions/delivery/${id}/${year}` +
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

export async function getPartnerDeliveryPaymentByMonth(
    currentPage: number,
    pageSize: number,
    partnerId: string
) {
    try {
        const res = await api
            .get(
                API_URL +
                    `/v1/orders/${partnerId}/operations?page=${currentPage}&size=${pageSize}&sort=name.firstName,asc`
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
