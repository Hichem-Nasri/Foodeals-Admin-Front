import { CrmType } from './CrmType'
import {
    ContractStatusPartner,
    PartnerEntitiesType,
    PartnerInfoDto,
} from './GlobalType'
import {
    exportSolutionType,
    PartnerCompanyTypeOptions,
    PartnerSolutionType,
    PartnerStatusOptions,
    PartnerStatusType,
    PartnerType,
    SubAccountPartners,
} from './partnersType'
import { defaultPartnerData, PartnerDataType } from './PartnerSchema'
import { z } from 'zod'

export interface PartnerGET {
    id: string
    offers: number
    orders: number
    users: number
    subEntities: number
    type: string
    city: string
    solutions: string[]
    createdAt: Date
    partnerInfoDto: PartnerInfoDto
    contractStatus: string
    contactDto: ContactDto
}

export interface SubPartnerGET {
    id: string
    offers: number
    orders: number
    users: number
    reference: string
    city: string
    solutions: string[]
    createdAt: Date
    partnerInfoDto: PartnerInfoDto
    contactDto: ContactDto
}

const ParnterSolutionExport: (solution: string) => PartnerSolutionType = (
    solution: string
) => {
    switch (solution) {
        case 'pro_market':
            return PartnerSolutionType.MARKET_PRO
        case 'pro_dlc':
            return PartnerSolutionType.DLC_PRO
        case 'pro_donate':
            return PartnerSolutionType.DONATE_PRO
        default:
            return PartnerSolutionType.NONE
    }
}

export const exportPartnerConvertir: (partner: CrmType) => PartnerDataType = (
    partner
) => {
    let marketPro = {
            selected: false,
            duration: 0,
            amount: 0,
            expiration: 0,
            managerId: partner.managerInfo.id + '',
            commissionCash: 0,
            commissionCard: 0,
            name: 'pro_market',
        },
        dlcPro = {
            selected: false,
            duration: 0,
            amount: 0,
            expiration: 0,
            name: 'pro_dlc',
            commissionCash: 0,
        },
        donate = {
            selected: false,
            duration: 0,
            amount: 0,
            expiration: 0,
            name: 'pro_donate',
            commissionCash: 0,
        }
    partner.solutions.forEach((solution) => {
        switch (solution) {
            case 'pro_market':
                marketPro = {
                    ...marketPro,
                    selected: true,
                }
                break
            case 'pro_dlc':
                dlcPro = {
                    ...dlcPro,
                    selected: true,
                }
                break
            case 'pro_donate':
                donate = {
                    ...donate,
                    selected: true,
                }
                break
        }
    })

    return {
        ...defaultPartnerData,
        companyName: partner.companyName,
        companyType: [partner.category],
        responsible:
            partner.contact.name.firstName +
            ' ' +
            (partner.contact.name.lastName || ''),
        solutions: {
            solutionsId: partner.solutions.map((solution) =>
                ParnterSolutionExport(solution)
            ),
            duration: 0,
            amount: 0,
            expiration: 0,
            managerId: partner.managerInfo.id + '',
            commissionCash: 0,
            commissionCard: 0,
        },
        marketPro,
        dlcPro,
        donate,
        subscriptionType: 'general',
        mapLocation: partner.address.iframe,
        phone: partner.contact.phone,
        email: partner.contact.email,
        managerId: partner.managerInfo.id + '',
        country: partner.address.country,
        city: partner.address.city,
        region: partner.address.region,
        state: partner.address.state,
        address: partner.address.address,
        status: PartnerStatusType.IN_PROGRESS,
    }
}

export const exportPartnerPost = (partner: any) => {
    const marketPro = partner.solutionsContractDto.find(
        (solution: any) => solution.solution === 'pro_market'
    )
    const dlcPro = partner.solutionsContractDto.find(
        (solution: any) => solution.solution === 'pro_dlc'
    )
    const donate = partner.solutionsContractDto.find(
        (solution: any) => solution.solution === 'pro_donate'
    )
    const newPartner: PartnerDataType = {
        partnerType: partner.features,
        companyName: partner.entityName,
        commercialRegisterNumber: +partner.commercialNumber,
        responsible:
            partner.contactDto.name.firstName +
            ' ' +
            partner.contactDto.name.lastName,
        phone: partner.contactDto.phone,
        email: partner.contactDto.email,
        companyType: partner.activities,
        mapLocation: partner.entityAddressDto.iframe,
        country: partner.entityAddressDto.country,
        state: partner.entityAddressDto.state,
        city: partner.entityAddressDto.city,
        region: partner.entityAddressDto.region,
        address: partner.entityAddressDto.address,
        bank: partner.entityBankInformationDto.bankName,
        rib: partner.entityBankInformationDto.rib,
        beneficiary: partner.entityBankInformationDto.beneficiaryName,
        accountType: partner.entityType,
        managerId: partner.manager.id + '',
        subscriptionType: !partner.oneSubscription ? 'personalized' : 'general',
        subscriptionPayedBySubEntities: partner.subscriptionPayedBySubEntities
            ? 'mainEntity'
            : 'subEntities',
        marketPro: {
            selected: !!marketPro,
            duration: marketPro?.contractSubscriptionDto.duration || 0,
            amount: marketPro?.contractSubscriptionDto.annualPayment || 0,
            expiration:
                marketPro?.contractSubscriptionDto.numberOfDueDates || 0,
            managerId: partner.manager.id + '',
            commissionCash: marketPro?.contractCommissionDto.withCash || 0,
            commissionCard: marketPro?.contractCommissionDto.withCard || 0,
            name: 'pro_market',
        },
        dlcPro: {
            selected: !!dlcPro,
            duration: dlcPro?.contractSubscriptionDto.duration || 0,
            amount: dlcPro?.contractSubscriptionDto.annualPayment || 0,
            expiration: dlcPro?.contractSubscriptionDto.numberOfDueDates || 0,
            name: 'pro_dlc',
            commissionCash: 0,
            // commissionCard: dlcPro?.contractCommissionDto.withCard || 0,
        },
        donate: {
            selected: !!donate,
            duration: donate?.contractSubscriptionDto.duration || 0,
            amount: donate?.contractSubscriptionDto.annualPayment || 0,
            expiration: donate?.contractSubscriptionDto.numberOfDueDates || 0,
            name: 'pro_donate',
            commissionCash: 0,
            // commissionCard: donate?.contractCommissionDto.withCard || 0,
        },
        solutions: {
            solutionsId: partner.solutions.map((solution: any) =>
                ParnterSolutionExport(solution)
            ),
            duration:
                partner.solutionsContractDto[0]?.contractSubscriptionDto
                    .duration || 0,
            expiration:
                partner.solutionsContractDto[0]?.contractSubscriptionDto
                    .numberOfDueDates || 0,
            amount:
                partner.solutionsContractDto[0]?.contractSubscriptionDto
                    .annualPayment || 0,
            managerId: partner.manager.id + '',
            commissionCard:
                partner.solutionsContractDto[0]?.contractCommissionDto
                    ?.withCard || 0,
            commissionCash:
                partner.solutionsContractDto[0]?.contractCommissionDto
                    ?.withCash || 0,
        },
        maxNumberOfAccounts: partner.maxNumberOfAccounts,
        minimumReduction: partner.minimumReduction,
        contractId: '',
        status: ContractStatusPartner[partner.status],
        logo: null,
        cover: null,
        paymentMethod: 'transfer',
        numberOfStores: partner.maxNumberOfSubEntities,
        fileType: [],
    }
    return newPartner
}

export interface CityRegion {
    country: string
    city: string
    regions: string[]
}

const ContactDtoSchema = z.object({
    name: z.object({
        fullName: z.string().min(3),
        lastName: z.string().min(3),
    }),
    email: z.string().email(),
    phone: z.string().min(3),
})
const EntityAddressDtoSchema = z.object({
    country: z.string().min(3),
    city: z.string().min(3),
    regions: z.array(z.string().min(3)),
    address: z.string().min(3),
    iframe: z.string().min(3),
})
const EntityBankInformationDtoSchema = z.object({
    beneficiaryName: z.string().min(3),
    bankName: z.string().min(3),
    rib: z.string().min(3),
})
const SolutionsContractDtoSchema = z.object({
    solution: z.string().min(3),
    contractSubscriptionDto: z.object({
        duration: z.number(),
        annualPayment: z.number(),
        numberOfDueDates: z.number(),
    }),
    contractCommissionDto: z.object({
        withCard: z.number(),
        withCash: z.number(),
        deliveryAmount: z.number().optional(),
        deliveryCommission: z.number().optional(),
    }),
})
const CityRegionSchema = z.object({
    country: z.string().min(3),
    city: z.string().min(3),
    regions: z.array(z.string().min(3)),
})
const DeliveryPartnerContractSchema = z.object({
    solution: z.string().min(3),
    amount: z.number(),
    commission: z.number(),
})

export const PartnerPOSTSchema = z.object({
    entityType: z.string().min(3),
    entityName: z.string().min(3),
    commercialNumber: z.string().min(3),
    features: z.array(z.string().min(3)),
    solutions: z.array(z.string().min(3)),
    contactDto: ContactDtoSchema,
    entityAddressDto: EntityAddressDtoSchema,
    entityBankInformationDto: EntityBankInformationDtoSchema,
    managerId: z.number(),
    activities: z.array(z.string().min(3)),
    maxNumberOfSubEntities: z.number(),
    maxNumberOfAccounts: z.number(),
    minimumReduction: z.number(),
    commissionPayedBySubEntities: z.boolean(),
    oneSubscription: z.boolean(),
    solutionsContractDto: z.array(SolutionsContractDtoSchema),
    coveredZonesDtos: z.array(CityRegionSchema),
    deliveryPartnerContract: z.array(DeliveryPartnerContractSchema),
    subscriptionPayedBySubEntities: z.boolean(),
    status: z.string().min(3),
    logo: z.union([z.instanceof(File), z.null()]).optional(),
    cover: z.union([z.instanceof(File), z.null()]).optional(),
})

export interface PartnerPOST {
    entityType: string
    entityName: string
    commercialNumber: string
    features: string[]
    solutions: string[]
    contactDto: ContactDto
    entityAddressDto: EntityAddressDto
    entityBankInformationDto: EntityBankInformationDto
    managerId: string
    activities: string[]
    maxNumberOfSubEntities: number
    maxNumberOfAccounts: number
    minimumReduction: number
    commissionPayedBySubEntities: boolean
    oneSubscription: boolean
    solutionsContractDto: SolutionsContractDto[]
    coveredZonesDtos: CityRegion[]
    deliveryPartnerContract: deliveryPartnerContract[]
    subscriptionPayedBySubEntities: boolean
    status: string
    logo?: File | null
    cover?: File | null
}

export interface deliveryPartnerContract {
    solution: string
    amount: number
    commission: number
}

export const emptyPartnerPOST: PartnerPOST = {
    entityType: '',
    entityName: '',
    commercialNumber: '',
    features: [],
    solutions: [],
    contactDto: {
        name: {
            firstName: '',
            lastName: '',
        },
        email: '',
        phone: '',
    },
    entityAddressDto: {
        country: '',
        city: '',
        region: '',
        address: '',
        iframe: '',
    },
    entityBankInformationDto: {
        beneficiaryName: '',
        bankName: '',
        rib: '',
    },
    managerId: '',
    activities: [],
    maxNumberOfSubEntities: 0,
    maxNumberOfAccounts: 0,
    minimumReduction: 0,
    commissionPayedBySubEntities: false,
    oneSubscription: false,
    solutionsContractDto: [],
    coveredZonesDtos: [],
    deliveryPartnerContract: [],
    status: PartnerStatusType.IN_PROGRESS,
    subscriptionPayedBySubEntities: false,
}

export interface ContactDto {
    name: Name
    email: string
    phone: string
}

export interface Name {
    firstName: string
    lastName: string
}

export interface EntityAddressDto {
    country: string
    city: string
    region: string
    address: string
    iframe: string
}

export interface EntityBankInformationDto {
    beneficiaryName: string
    bankName: string
    rib: string
}

export interface SolutionsContractDto {
    solution: string
    contractSubscriptionDto: ContractSubscriptionDto
    contractCommissionDto: ContractCommissionDto
}

export interface ContractCommissionDto {
    withCard: number
    withCash: number
    deliveryAmount?: number
    deliveryCommission?: number
}

export interface ContractSubscriptionDto {
    duration: number
    annualPayment: number
    numberOfDueDates: number
}
