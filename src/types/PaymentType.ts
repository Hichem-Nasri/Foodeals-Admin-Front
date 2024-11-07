import { z } from 'zod'
import { PaymentStatusEnum } from './paymentUtils'
import {
    ContactType,
    PartnerEntitiesType,
    PartnerInfoDto,
    PriceType,
} from './GlobalType'
import { PartnerSolutionType, PartnerType } from './partnersType'

export enum PaymentStatusType {
    PAID = 'PAID',
    IN_PROGRESS = 'IN_PROGRESS',
    CANCELED = 'CANCELED',
}

export enum PaymentMethod {
    CASH = 'CASH',
    CARD_BANK = 'CARD',
    TRANSFER = 'BANKTRANSFER',
    CHECK = 'CHEQUE',
}

export enum SubscriptionStatusType {
    VALID = 'VALID',
    CANCELED = 'CANCELED',
    IN_PROGRESS = 'IN_PROGRESS',
    NOT_STARTED = 'NOT_STARTED',
}

export interface ConfirmPaymentType {
    type: PaymentMethod
    partner: PartnerInfoDto
    emitter: ContactType['name']
    price: PriceType
    documentPath: string | null
    date: string
}

export const defaultValuesConfirmPayment: ConfirmPaymentType = {
    type: PaymentMethod.CARD_BANK,
    partner: {
        id: '',
        name: '',
        avatarPath: '',
    },
    emitter: {
        firstName: '',
        lastName: '',
    },
    price: {
        amount: 0,
        currency: 'MAD',
    },
    documentPath: 'example.pdf',
    date: new Date().toISOString(),
}

export interface PaymentDeliveriesType {
    id: string
    month: string
    deliveryCost: number
    commissionCost: number
    NbrOrder: number
    commissionfoodleas: number
    toReceive: number
    validation: string
}

export interface PaymentType {
    id: string
    ref: string
    date: Date
    type: string
    store: {
        id: string
        name: string
        logo: string
    }
    engagement: number
    totalSales: number
    totalCommission: number
    toPay: number
    receiver: number
    status: PaymentStatusType
    payByFoodeals: boolean
}

export interface partnerCommissionType {
    id: string
    ref: string
    type: string
    magasin: {
        id: string
        name: string
        avatar: string
    }
    date: Date
    totalVente: number
    commission: number
    toPaid: number
    toReceive: number
    typeCommission: 'paid' | 'receive'
    validation: PaymentStatusType
}

export type partnerCommissionMonthType = {
    id: string
    ref: string
    amount: PriceType
    cashAmount: PriceType
    cardAmount: PriceType
    cashCommission: PriceType
    commissionCard: PriceType
    quantity: number
    product: Omit<PartnerInfoDto, 'id'>
}
export interface partnerSubscriptionType {
    id: string
    reference: string
    partner: PartnerInfoDto
    type: PartnerEntitiesType
    total: PriceType
    solution: PartnerSolutionType[]
    payable: boolean
}

export const PaymentFilterSchema = z.object({
    date: z.string().optional(),
    partner: z.string().optional(),
})

export const defaultValuesPaymentFilter = {
    date: undefined,
    partner: undefined,
}

export const paymentSchemas = {
    [PaymentMethod.CASH]: z.object({
        date: z.string().min(1, 'La date est obligatoire'),
        amount: z.number().min(1, 'Le montant doit être supérieur à 0'),
    }),
    [PaymentMethod.CARD_BANK]: z.object({
        amount: z.number().min(1, 'Le montant doit être supérieur à 0'),
    }),
    [PaymentMethod.TRANSFER]: z.object({
        amount: z.number().min(1, 'Le montant doit être supérieur à 0'),
        document: z.string().min(1, 'Le fichier est obligatoire'),
    }),
    [PaymentMethod.CHECK]: z.object({
        amount: z.number().min(1, 'Le montant doit être supérieur à 0'),
        checkNumber: z.string().min(1, 'Le numéro du chèque est obligatoire'),
        dateOfWrite: z
            .string()
            .min(1, "La date d'émission du chèque est obligatoire"),
        dateOfGet: z
            .string()
            .min(1, 'La date de réception du chèque est obligatoire'),
        bankCompany: z.string().min(1, 'La banque est obligatoire'),
        issuerName: z.string().min(1, "Le nom de l'émetteur est obligatoire"),
        document: z.string().min(1, 'Le fichier est obligatoire'),
    }),
}

export const defaultValuesPayment = {
    date: '',
    amount: 0,
    document: '',
    checkNumber: '',
    dateOfWrite: '',
    dateOfGet: '',
    bankCompany: '',
    issuerName: '',
}

export interface FormData {
    paymentMethod: PaymentMethod
    date?: string
    amount?: number
    checkNumber?: string
    dateOfWrite?: string
    dateOfGet?: string
    bankCompany?: string
    issuerName?: string
    document?: string
    file?: string
}

export type partnerSubscriptonOnesType = {
    id: string
    reference: string
    total: PriceType
    date: string
    amount: PriceType
    deadlines: deadlineType[]
    solution: PartnerSolutionType[]
}

export enum DeadlineStatus {
    PAYED_BY_PARTNER = 'PAYED_BY_PARTNER',
    CONFIRMED_BY_FOODEALS = 'CONFIRMED_BY_FOODEALS',
    IN_VALID = 'IN_VALID',
}

export type deadlineType = {
    id: string
    ref: string
    date: string
    deadlineStatus: DeadlineStatus
    amount: PriceType
    payable: boolean
}

export const defaultDataSubscriptionOnesTable: partnerSubscriptonOnesType[] = [
    {
        id: '1',
        reference: '123456789',
        total: {
            amount: 1000,
            currency: 'MAD',
        },
        date: '2021-06-01',
        amount: {
            amount: 1000,
            currency: 'MAD',
        },
        deadlines: [
            {
                id: '1',
                ref: '123456789',
                date: '2021-06-01',
                deadlineStatus: DeadlineStatus.CONFIRMED_BY_FOODEALS,
                amount: {
                    amount: 1000,
                    currency: 'MAD',
                },
                payable: true,
            },
            {
                id: '2',
                ref: '123456789',
                date: '2021-07-01',
                deadlineStatus: DeadlineStatus.PAYED_BY_PARTNER,
                amount: {
                    amount: 1000,
                    currency: 'MAD',
                },
                payable: true,
            },
        ],
        solution: [PartnerSolutionType.DLC_PRO],
    },
    {
        id: '2',
        reference: '123456789',
        total: {
            amount: 1000,
            currency: 'MAD',
        },
        date: '2021-06-01',
        amount: {
            amount: 1000,
            currency: 'MAD',
        },
        deadlines: [
            {
                id: '1',
                ref: '123456789',
                date: '2021-06-01',
                deadlineStatus: DeadlineStatus.IN_VALID,
                amount: {
                    amount: 1000,
                    currency: 'MAD',
                },
                payable: true,
            },
            {
                id: '2',
                ref: '123456789',
                date: '2021-07-01',
                deadlineStatus: DeadlineStatus.PAYED_BY_PARTNER,
                amount: {
                    amount: 1000,
                    currency: 'MAD',
                },
                payable: false,
            },
        ],
        solution: [PartnerSolutionType.DLC_PRO],
    },
    {
        id: '3',
        reference: '123456789',
        total: {
            amount: 1000,
            currency: 'MAD',
        },
        date: '2021-06-01',
        amount: {
            amount: 1000,
            currency: 'MAD',
        },
        deadlines: [
            {
                id: '1',
                ref: '123456789',
                date: '2021-06-01',
                deadlineStatus: DeadlineStatus.IN_VALID,
                amount: {
                    amount: 1000,
                    currency: 'MAD',
                },
                payable: true,
            },
            {
                id: '2',
                ref: '123456789',
                date: '2021-07-01',
                deadlineStatus: DeadlineStatus.PAYED_BY_PARTNER,
                amount: {
                    amount: 1000,
                    currency: 'MAD',
                },
                payable: false,
            },
        ],
        solution: [PartnerSolutionType.DLC_PRO],
    },
]

export interface PaymentDetailsOperationsType {
    withCard: number
    withCash: number
    commissionCard: number
    commissionCash: number
    commissionTotal: number
    status: PaymentStatusType
}

export interface ValidationSubscriptionType {
    id: string
    ref: string
    deadline: Date
    price: number
    solution: PartnerSolutionType[]
    validation: PaymentStatusType
}

export type SubscriptionsValidationsType = {
    id: string
    ref: string
    deadline: string
    price: number
    validation: string
}
