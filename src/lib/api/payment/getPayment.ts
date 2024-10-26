import api from '@/api/Auth'
import { API_PARTNERS, API_PAYMENT_COMMISSIONS } from '@/lib/api_url'
import { exportAllPartnerGET, PartnerGET } from '@/types/partenairUtils'
import { PartnerType } from '@/types/partners'
import { PaymentCommision } from '@/types/paymentUtils'

export async function fetchPaymentCommission(
    currentPage: number,
    pageSize: number,
    date: Date
): Promise<{ status: number; data: PaymentCommision[] }> {
    try {
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        const response = await api
            .get(
                `${API_PAYMENT_COMMISSIONS}/${year}/${month}?page=${currentPage}&size=${pageSize}`
            )
            .catch((error) => {
                throw error
            })
        return {
            status: response.status,
            data: response.data.content as PaymentCommision[],
        }
    } catch (error) {
        console.error('Error fetching partners:', error)
        return { status: 500, data: [] }
    }
}
