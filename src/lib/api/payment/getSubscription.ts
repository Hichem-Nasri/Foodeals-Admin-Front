import api from '@/lib/Auth'
import { API_URL } from '..'

export async function fetchSubscription(
    currentPage: number,
    pageSize: number,
    date: string,
    partner: string
): Promise<{ status: number; data: any }> {
    try {
        const year = new Date(date).getFullYear()
        const url =
            `${API_URL}/api/v1/payments/subscriptions/${year}?page=${currentPage}&size=${pageSize}` +
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
