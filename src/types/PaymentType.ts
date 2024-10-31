import { z } from 'zod'
import { PartnerSolutionType } from './partners'
import { PaymentStatusEnum } from './paymentUtils'
import { ContactType, PartnerInfoDto, PriceType } from './GlobalType'

export enum PaymentStatusType {
    PAID = 'PAID',
    IN_PROGRESS = 'IN_PROGRESS',
    CANCELED = 'CANCELED',
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
    amount: number
    cashAmount: number
    cardAmount: number
    cashCommission: number
    commissionCard: number
    quantity: number
    product: Omit<PartnerInfoDto, 'id'>
    payable: boolean
    paymentStatus: PaymentStatusEnum
}
export interface partnerSubscriptionType {
    id: string
    ref: string
    type: string
    date: string
    magasin: {
        id: string
        name: string
        avatar: string
    }
    totalEcheance: number
    solution: string[]
}

export const PaymentFilterSchema = z.object({
    date: z.date().optional(),
    partner: z
        .object({
            id: z.string(),
            name: z.string(),
            avatar: z.string(),
        })
        .optional(),
})

export const defaultValuesPaymentFilter = {
    date: undefined,
    partner: undefined,
}

export enum PaymentMethod {
    CASH = 'CASH',
    CARD_BANK = 'CARD',
    TRANSFER = 'BANKTRANSFER',
    CHECK = 'CHEQUE',
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
    ref: string
    createdAt: string
    nbrEcheance: number
    prixEcheance: number
    totalEcheance: number
    solution: PartnerSolutionType
}

export const defaultDataSubscriptionOnesTable: partnerSubscriptonOnesType[] = [
    {
        id: '1',
        ref: '1',
        createdAt: '2021-10-10',
        nbrEcheance: 3,
        prixEcheance: 5000,
        totalEcheance: 15000,
        solution: PartnerSolutionType.MARKET_PRO,
    },
    {
        id: '2',
        ref: '2',
        createdAt: '2021-10-10',
        nbrEcheance: 3,
        prixEcheance: 5000,
        totalEcheance: 15000,
        solution: PartnerSolutionType.DONATE_PRO,
    },
    {
        id: '3',
        ref: '3',
        createdAt: '2021-10-10',
        nbrEcheance: 3,
        prixEcheance: 5000,
        totalEcheance: 15000,
        solution: PartnerSolutionType.DLC_PRO,
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
