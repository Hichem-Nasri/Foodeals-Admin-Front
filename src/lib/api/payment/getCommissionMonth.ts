import api from '@/lib/Auth'
import { API_URL } from '..'

export async function fetchPaymentCommissionMonth(
    currentPage: number,
    pageSize: number,
    id: string,
    date: string,
    type: string
): Promise<{ status: number; data: any }> {
    try {
        const { month, year } = {
            month: date.split('-')[0],
            year: date.split('-')[1],
        }
        const url = `${API_URL}/api/v1/payments/commissions/${id}/monthly-operations/${year}/${month}?page=${currentPage}&size=${pageSize}&type=${type}`
        console.log('url: ', url)
        const response = await api
            .get(
                `${API_URL}/api/v1/payments/commissions/${id}/monthly-operations/${year}/${month}?page=${currentPage}&size=${pageSize}&type=${type}`
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

export async function getMultiProduct(
    id: string,
    currentPage: number,
    pageSize: number
): Promise<{ status: number; data: any }> {
    try {
        const response = await api
            .get(
                `${API_URL}/v1/orders/${id}/operations?page=${currentPage}&size=${pageSize}`
            )
            .catch((error) => {
                throw error
            })
        return {
            status: response.status,
            data: multiPro,
        }
    } catch (error) {
        console.error('Error fetching partners:', error)
        return { status: 200, data: multiPro }
    }
}

const multiPro = [
    {
        type: 'SINGLE',
        product: {
            name: 'Pizza ',
            avatarPath:
                'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/23/71/2f/68/pizzas-and-panozzos.jpg',
        },
        id: '7b3dd8dd-0df5-47a2-95c1-180d106cf1ae',
        amount: {
            amount: 80.0,
            currency: 'MAD',
        },
        quantity: 1,
        cashAmount: {
            amount: 80.0,
            currency: 'MAD',
        },
        cashCommission: {
            amount: 1.6,
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
        type: 'SINGLE',
        product: {
            name: 'Pizza ',
            avatarPath:
                'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/23/71/2f/68/pizzas-and-panozzos.jpg',
        },
        id: '2ac4bd31-66f3-4ab1-8e05-e6c891f97e68',
        amount: {
            amount: 80.0,
            currency: 'MAD',
        },
        quantity: 1,
        cashAmount: {
            amount: 80.0,
            currency: 'MAD',
        },
        cashCommission: {
            amount: 1.6,
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
]

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
                type: 'MULTIPLE',
                product: {
                    id: '53bd1adc-5541-4b82-8bb4-09628ec4d708',
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
                commission: {
                    amount: 0,
                    currency: 'MAD',
                },
                deliveryBoy: {
                    id: 103,
                    name: 'Amine',
                    avatarPath: '',
                },
            },
            {
                type: 'SINGLE',
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
                commission: {
                    amount: 0,
                    currency: 'MAD',
                },
                deliveryBoy: {
                    id: 103,
                    name: 'Amine',
                    avatarPath: '',
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
