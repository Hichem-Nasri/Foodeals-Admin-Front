'localhost:8080/api/v1/payments/commissions/02ad89b9-80f5-427e-a3d7-42889c38fb5f/monthly-operations/2024/10'

import api from '@/api/Auth'
import { API_PAYMENT_COMMISSIONS } from '@/lib/api_url'
import { partnerCommissionMonthType } from '@/types/PaymentType'

export async function fetchPaymentCommissionMonth(
    currentPage: number,
    pageSize: number,
    id: string,
    date: string
): Promise<{ status: number; data: any }> {
    try {
        const { month, year } = {
            month: date.split('-')[0],
            year: date.split('-')[1],
        }
        const response = await api
            .get(
                `${API_PAYMENT_COMMISSIONS}/${id}/monthly-operations/${year}/${month}?page=${currentPage}&size=${pageSize}`
            )
            .catch((error) => {
                throw error
            })
        return {
            status: response.status,
            data: dimoData,
        }
    } catch (error) {
        console.error('Error fetching partners:', error)
        return { status: 200, data: dimoData }
    }
}

const dimoData = {
    partner: {
        id: 'bef9df70-ca37-4261-876c-5a52bcc27bdc',
        name: 'Marjane',
        avatarPath: null,
    },
    statistics: {
        total: {
            amount: 30.0,
            currency: 'MAD',
        },
        totalCommission: {
            amount: 0.6,
            currency: 'MAD',
        },
    },
    operations: {
        totalPages: 1,
        totalElements: 2,
        pageable: {
            pageNumber: 0,
            pageSize: 20,
            sort: {
                sorted: false,
                unsorted: true,
                empty: true,
            },
            offset: 0,
            paged: true,
            unpaged: false,
        },
        first: true,
        last: true,
        size: 20,
        content: [
            {
                product: {
                    name: 'Perly',
                    avatarPath: null,
                },
                id: '53bd1adc-5541-4b82-8bb4-09628ec4d708',
                amount: {
                    amount: 20.0,
                    currency: 'MAD',
                },
                quantity: 10,
                cashAmount: {
                    amount: 20.0,
                    currency: 'MAD',
                },
                cashCommission: {
                    amount: 0.4,
                    currency: 'MAD',
                },
                cardAmount: {
                    amount: 0,
                    currency: 'MAD',
                },
                commissionCard: {
                    amount: 0,
                    currency: 'MAD',
                },
            },
            {
                product: {
                    name: 'Raibi',
                    avatarPath: null,
                },
                id: 'f70dcbe8-dbac-4d8b-b00c-4d486ce33166',
                amount: {
                    amount: 10.0,
                    currency: 'MAD',
                },
                quantity: 12,
                cashAmount: {
                    amount: 10.0,
                    currency: 'MAD',
                },
                cashCommission: {
                    amount: 0.2,
                    currency: 'MAD',
                },
                cardAmount: {
                    amount: 0,
                    currency: 'MAD',
                },
                commissionCard: {
                    amount: 0,
                    currency: 'MAD',
                },
            },
        ],
        number: 0,
        sort: {
            sorted: false,
            unsorted: true,
            empty: true,
        },
        numberOfElements: 2,
        empty: false,
    },
    details: {
        id: '384ae8a9-e6f2-4f86-a224-3162a6ea123f',
        payable: false,
        status: 'IN_VALID',
        direction: 'PARTNER_TO_FOODEALS',
    },
}
