import { z } from 'zod'
import { PartnerStatusType } from './partnersType'
import { subscribe } from 'diagnostics_channel'

export const PartnerInformationSchema = z.object({
    logo: z.instanceof(File).optional(),
    cover: z.instanceof(File).optional(),
    companyName: z.string().min(3),
    companyType: z.array(z.string()).min(1),
    responsible: z.string().min(3),
    managerId: z.string().min(1),
    phone: z
        .string()
        .min(9, 'Le numéro de téléphone doit contenir au moins 9 chiffres')
        .refine((value) => /^\d+$/.test(value), {
            message: 'Le numéro de téléphone ne doit contenir que des chiffres',
        }),
    email: z.string().email('Veuillez entrer une adresse email valide'),
    commercialRegisterNumber: z.number().min(1),
    partnerType: z.array(z.string()).min(1),
    country: z.string().min(3),
    city: z.string().min(3),
    region: z.string().min(3),
    address: z.string().min(3),
    mapLocation: z.string().optional(),
})

export const defaultPartnerInformationData = {
    logo: null,
    cover: null,
    companyName: '',
    companyType: [],
    responsible: '',
    managerId: '',
    phone: '',
    email: '',
    commercialRegisterNumber: 0,
    partnerType: [],
    country: '',
    city: '',
    region: '',
    address: '',
    mapLocation: '',
}

export interface PartnerInformationSchemaType {
    logo: File | null
    cover: File | null
    companyName: string
    companyType: string[]
    responsible: string
    managerId: string
    phone: string
    email: string
    commercialRegisterNumber: number
    partnerType: string[]
    country: string
    city: string
    region: string
    address: string
    mapLocation: string
}

export const PartnerSubscriptionSchema = z.object({
    subscriptionType: z.string().min(3),
    bank: z.string().min(3),
    beneficiary: z.string().min(3),
    rib: z.string().min(3),
    accountType: z.string().min(3),
    subscribtionByEntity: z.boolean().default(false),
    subscriptionPayedBySubEntities: z.string().default('mainEntities'),
    marketPro: z
        .object({
            selected: z.boolean().default(false),
            duration: z.number(),
            amount: z.number(),
            expiration: z.number(),
            managerId: z.string(),
            commissionCash: z.number().min(1).max(100),
            commissionCard: z.number().min(1).max(100),
            name: z.string().nullish().default('pro_market'),
        })
        .optional(),
    dlcPro: z
        .object({
            selected: z.boolean().default(false),
            duration: z.number(),
            amount: z.number(),
            expiration: z.number(),
            name: z.string().nullish().default('pro_dlc'),
            commissionCash: z.number().optional(),
            commissionCard: z.number().optional(),
        })
        .optional(),
    donate: z
        .object({
            selected: z.boolean().default(false),
            duration: z.number(),
            amount: z.number(),
            expiration: z.number(),
            name: z.string().nullish().default('donate'),
            commissionCash: z.number().optional(),
            commissionCard: z.number().optional(),
        })
        .optional(),
    solutions: z
        .object({
            solutionsId: z.array(z.string()),
            duration: z.number(),
            amount: z.number(),
            expiration: z.number(),
            managerId: z.string().optional(),
            commissionCash: z.number().optional(),
            commissionCard: z.number().optional(),
        })
        .optional(),
})

export const defaultPartnerSubscriptionData = {
    subscriptionType: 'general',
    bank: '',
    paymentMethod: '',
    beneficiary: '',
    rib: '',
    accountType: '',
    subscriptionPayedBySubEntities: 'mainEntities',
    marketPro: {
        selected: false,
        duration: 0,
        amount: 0,
        expiration: 0,
        managerId: '',
        commissionCash: 0,
        commissionCard: 0,
        name: 'pro_market',
    },
    dlcPro: {
        selected: false,
        duration: 0,
        amount: 0,
        expiration: 0,
        name: 'pro_dlc',
        commissionCash: 0,
    },
    donate: {
        selected: false,
        duration: 0,
        amount: 0,
        expiration: 0,
        name: 'pro_donate',
        commissionCash: 0,
    },
    solutions: {
        solutionsId: [],
        duration: 0,
        amount: 0,
        expiration: 0,
        managerId: '',
        commissionCash: 0,
        commissionCard: 0,
    },
}

export interface PartnerSubscriptionSchemaType {
    subscriptionType: string
    bank: string
    paymentMethod: string
    beneficiary: string
    rib: string
    accountType: string
    marketPro: {
        selected: boolean
        duration: number
        amount: number
        expiration: number
        managerId: string
        commissionCash: number
        commissionCard: number
        name: string
    }
    dlcPro: {
        selected: boolean
        duration: number
        amount: number
        expiration: number
        name: string
        commissionCash: number
    }
    donate: {
        selected: boolean
        duration: number
        amount: number
        expiration: number
        name: string
        commissionCash: number
    }
    solutions: {
        solutionsId: string[]
        duration: number
        amount: number
        expiration: number
        managerId: string
        commissionCash: number
        commissionCard: number
        marketPro?: {
            selected: boolean
            duration: number
            amount: number
            expiration: number
            managerId: string
            commissionCash: number
            commissionCard: number
            name: string
        }
        dlcPro?: {
            selected: boolean
            duration: number
            amount: number
            expiration: number
            name: string
            commissionCash: number
        }
    }
}

export const PartnerFeaturesSchema = z.object({
    numberOfStores: z
        .number()
        .min(1, 'Le nombre de magasins doit être supérieur ou égal à 1'),
    maxNumberOfAccounts: z
        .number()
        .min(1, 'Le nombre de compte doit être supérieur ou égal à 1'),
    minimumReduction: z
        .number()
        .min(1, 'La réduction minimale doit être supérieure ou equal 1'),
})

export const defaultPartnerFeaturesData = {
    numberOfStores: 0,
    maxNumberOfAccounts: 0,
    minimumReduction: 0,
    fileType: [],
}

export interface PartnerFeaturesSchemaType {
    numberOfStores: number
    maxNumberOfAccounts: number
    minimumReduction: number
    fileType: string[]
}

export interface PartnerDataType
    extends PartnerInformationSchemaType,
        PartnerSubscriptionSchemaType,
        PartnerFeaturesSchemaType {
    contractId: string
    status: PartnerStatusType
    id?: string
    subscriptionPayedBySubEntities: string
}

export const defaultPartnerData: PartnerDataType = {
    contractId: '',
    status: PartnerStatusType.DRAFT,
    ...defaultPartnerInformationData,
    ...defaultPartnerSubscriptionData,
    ...defaultPartnerFeaturesData,
}

export const ArchivePartnerSchema = z.object({
    archiveType: z.string(),
    archiveReason: z
        .string()
        .min(20, "Le type d'archive doit contenir au moins 20 caractères"),
})

export const defaultArchivePartnerData = {
    archiveType: '',
    archiveReason: '',
}
