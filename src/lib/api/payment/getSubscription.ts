import api from '@/lib/Auth'
import { API_SUBSCRIPTIONS } from '@/lib/api_url'
import { PaymentCommission } from '@/types/paymentUtils'

export async function fetchSubscription(
    currentPage: number,
    pageSize: number,
    date: string,
    partner: string
): Promise<{ status: number; data: any }> {
    try {
        const year = new Date(date).getFullYear()
        const url =
            `${API_SUBSCRIPTIONS}/${year}?page=${currentPage}&size=${pageSize}` +
            (partner !== 'all' ? `&id=${partner}` : '')
        console.log('url', url)
        const response = await api.get(url).catch((error) => {
            throw error
        })
        return {
            status: response.status,
            data: response.data as any,
        }
    } catch (error) {
        console.error('Error fetching Subscriptions:', error)
        return { status: 500, data: [] }
    }
}
