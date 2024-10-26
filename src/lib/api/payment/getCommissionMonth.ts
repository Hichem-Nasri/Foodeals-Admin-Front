'localhost:8080/api/v1/payments/commissions/02ad89b9-80f5-427e-a3d7-42889c38fb5f/monthly-operations/2024/10'

import api from '@/api/Auth'
import { API_PARTNERS, API_PAYMENT_COMMISSIONS } from '@/lib/api_url'
import { exportAllPartnerGET, PartnerGET } from '@/types/partenairUtils'
import { PartnerType } from '@/types/partners'
import { partnerCommissionMonthType } from '@/types/PaymentType'
import { PaymentCommision } from '@/types/paymentUtils'

export async function fetchPaymentCommissionMonth(
    currentPage: number,
    pageSize: number,
    id: string,
    date: Date
): Promise<{ status: number; data: partnerCommissionMonthType[] }> {
    try {
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        const response = await api
            .get(
                `${API_PAYMENT_COMMISSIONS}/${id}/monthly-operations/${year}/${month}?page=${currentPage}&size=${pageSize}`
            )
            .catch((error) => {
                throw error
            })
        return {
            status: response.status,
            data: response.data.content as partnerCommissionMonthType[],
        }
    } catch (error) {
        console.error('Error fetching partners:', error)
        return { status: 500, data: [] }
    }
}
