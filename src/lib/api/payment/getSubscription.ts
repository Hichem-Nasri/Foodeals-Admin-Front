import api from '@/api/Auth'
import { API_SUBSCRIPTIONS } from '@/lib/api_url'
import { PaymentCommision } from '@/types/paymentUtils'

export async function fetchSubscription(
    currentPage: number,
    pageSize: number
): Promise<{ status: number; data: PaymentCommision[] }> {
    try {
        const response = await api
            .get(`${API_SUBSCRIPTIONS}/?page=${currentPage}&size=${pageSize}`)
            .catch((error) => {
                throw error
            })
        return {
            status: response.status,
            data: response.data.content as PaymentCommision[],
        }
    } catch (error) {
        console.error('Error fetching Subscriptions:', error)
        return { status: 500, data: [] }
    }
}
