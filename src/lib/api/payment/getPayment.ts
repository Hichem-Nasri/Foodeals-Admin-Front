import api from '@/lib/Auth'
import { API_PAYMENT_COMMISSIONS } from '@/lib/api_url'

export async function fetchPaymentCommission(
    currentPage: number,
    pageSize: number,
    date: string,
    id?: string
): Promise<{ status: number; data: any }> {
    try {
        const newDate = new Date(date)
        const month = newDate.getMonth() + 1
        const year = newDate.getFullYear()
        console.log('fetchPaymentCommission', year, month)
        const response = await api
            .get(
                `${API_PAYMENT_COMMISSIONS}/${year}/${month}?page=${currentPage}&size=${pageSize}` +
                    (id ? `&id=${id}` : '')
            )
            .catch((error) => {
                throw error
            })
        if (response.status !== 200) {
            throw new Error('Error fetching commissions')
        }
        return {
            status: response.status,
            data: response.data,
        }
    } catch (error) {
        console.error('Error fetching partners:', error)
        return { status: 500, data: [] }
    }
}
