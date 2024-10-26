import { CrmType } from './Global-Type'
import {
    exportSolutionType,
    PartnerCompanyTypeOptions,
    PartnerSolutionType,
    PartnerStatusOptions,
    PartnerStatusType,
    PartnerType,
    SubAccountPartners,
} from './partners'
import { defaultPartnerData, PartnerDataType } from './PartnerSchema'

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

const exportPartnerGET = (Partner: PartnerGET) => {
    const newPartner: PartnerType = {
        id: Partner.id,
        offer: Partner.offers,
        order: Partner.orders,
        collaborators: Partner.users,
        subAccount: Partner.subEntities,
        companyType:
            PartnerCompanyTypeOptions[
                Partner.type as keyof typeof PartnerCompanyTypeOptions
            ],
        city: Partner.city,
        solution: exportSolutionType(Partner.solutions),
        createdAt: new Date(Partner.createdAt),
        manager: {
            name:
                Partner.contactDto.name.firstName +
                ' ' +
                Partner.contactDto.name.lastName,
            avatar: '',
        },
        status: PartnerStatusOptions[
            Partner.contractStatus as keyof typeof PartnerStatusOptions
        ],
        email: Partner.contactDto.email,
        phone: Partner.contactDto.phone,
        companyName: Partner.partnerInfoDto.name,
        logo: Partner.partnerInfoDto.avatarPath!,
    }
    return newPartner
}

export const exportAllPartnerGET = (partners: PartnerGET[]): PartnerType[] => {
    return partners.map((partner) => exportPartnerGET(partner))
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

export interface PartnerInfoDto {
    name: string
    avatarPath: string
}

const exportSubPartnerGET: (subPartner: SubPartnerGET) => SubAccountPartners = (
    subPartner
) => {
    const subAccount: SubAccountPartners = {
        id: subPartner.id,
        offer: subPartner.offers,
        order: subPartner.orders,
        collaborators: subPartner.users,
        ref: subPartner.reference,
        city: subPartner.city,
        solution: exportSolutionType(subPartner.solutions),
        createdAt: new Date(subPartner.createdAt),
        companyName: subPartner.partnerInfoDto.name,
        logo: subPartner.partnerInfoDto.avatarPath!,
        email: subPartner.contactDto.email,
        phone: subPartner.contactDto.phone,
        companyType: PartnerCompanyTypeOptions.NORMAL_PARTNER,
    }
    return subAccount
}

export const exportAllSubPartnerGET = (
    subPartners: SubPartnerGET[]
): SubAccountPartners[] => {
    return subPartners.map((subPartner) => exportSubPartnerGET(subPartner))
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
export const checkAllForms = (partnerData: PartnerPOST) => {
    const requiredFields = [
        partnerData.entityName,
        partnerData.commercialNumber,
        partnerData.contactDto.email,
        partnerData.contactDto.phone,
        partnerData.entityAddressDto.address,
        partnerData.entityAddressDto.city,
        partnerData.entityAddressDto.country,
        partnerData.entityAddressDto.region,
        partnerData.entityAddressDto.iframe,
        partnerData.managerId,
        partnerData.activities.length,
        partnerData.features.length,
        partnerData.entityType,
        partnerData.entityBankInformationDto.beneficiaryName,
        partnerData.entityBankInformationDto.bankName,
        partnerData.entityBankInformationDto.rib,
        partnerData.solutions.length,
        partnerData.solutionsContractDto.length,
        partnerData.maxNumberOfSubEntities,
    ]

    if (requiredFields.some((field) => field === '' || field === 0)) {
        const missingFields = [
            partnerData.entityName === '' ? 'entityName' : '',
            partnerData.commercialNumber === '' ? 'commercialNumber' : '',
            partnerData.contactDto.email === '' ? 'contactDto.email' : '',
            partnerData.contactDto.phone === '' ? 'contactDto.phone' : '',
            partnerData.entityAddressDto.address === ''
                ? 'entityAddressDto.address'
                : '',
            partnerData.entityAddressDto.city === ''
                ? 'entityAddressDto.city'
                : '',
            partnerData.entityAddressDto.country === ''
                ? 'entityAddressDto.country'
                : '',
            partnerData.entityAddressDto.region === ''
                ? 'entityAddressDto.region'
                : '',
            partnerData.entityAddressDto.iframe === ''
                ? 'entityAddressDto.iframe'
                : '',
            partnerData.managerId === 0 ? 'managerId' : '',
            partnerData.activities.length === 0 ? 'activities' : '',
            partnerData.features.length === 0 ? 'features' : '',
            partnerData.entityType === '' ? 'entityType' : '',
            partnerData.entityBankInformationDto.beneficiaryName === ''
                ? 'entityBankInformationDto.beneficiaryName'
                : '',
            partnerData.entityBankInformationDto.bankName === ''
                ? 'entityBankInformationDto.bankName'
                : '',
            partnerData.entityBankInformationDto.rib === ''
                ? 'entityBankInformationDto.rib'
                : '',
            partnerData.solutions.length === 0 ? 'solutions' : '',
            partnerData.solutionsContractDto.length === 0
                ? 'solutionsContractDto'
                : '',
            partnerData.maxNumberOfSubEntities === 0
                ? 'maxNumberOfSubEntities'
                : '',
        ].filter(Boolean)
        console.log('missingFields', missingFields)
        return false
    }

    return true
}

export const exportPartnerConvertir: (partner: CrmType) => PartnerDataType = (
    partner
) => {
    return {
        ...defaultPartnerData,
        companyName: partner.companyName,
        companyType: [partner.category],
        responsible:
            partner.contact.name.firstName +
            ' ' +
            partner.contact.name.lastName,
        solutions: {
            solutionsId: partner.solutions.map((solution) =>
                ParnterSolutionExport(solution)
            ),
            duration: 0,
            amount: 0,
            expiration: 0,
            managerId: '',
            commissionCash: 0,
            commissionCard: 0,
        },
        mapLocation: partner.address.iframe,
        phone: partner.contact.phone,
        email: partner.contact.email,
        managerId: partner.managerInfo.id,
        country: partner.address.country,
        city: partner.address.city,
        region: partner.address.region,
        address: partner.address.address,
        status: PartnerStatusType.PENDING,
    }
}

export const exportPartnerPost = (partner: PartnerPOST) => {
    const marketPro = partner.solutionsContractDto.find(
        (solution) => solution.solution === 'pro_market'
    )
    const dlcPro = partner.solutionsContractDto.find(
        (solution) => solution.solution === 'pro_dlc'
    )
    const donate = partner.solutionsContractDto.find(
        (solution) => solution.solution === 'pro_donate'
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
        city: partner.entityAddressDto.city,
        region: partner.entityAddressDto.region,
        address: partner.entityAddressDto.address,
        bank: partner.entityBankInformationDto.bankName,
        rib: partner.entityBankInformationDto.rib,
        beneficiary: partner.entityBankInformationDto.beneficiaryName,
        accountType: partner.entityType,
        managerId: partner.managerId + '',
        subscriptionType: partner.oneSubscription ? 'personalized' : 'general',
        marketPro: {
            selected: !!marketPro,
            duration: marketPro?.contractSubscriptionDto.duration || 0,
            amount: marketPro?.contractSubscriptionDto.annualPayment || 0,
            expiration:
                marketPro?.contractSubscriptionDto.numberOfDueDates || 0,
            managerId: partner.managerId + '',
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
            solutionsId: partner.solutions.map((solution) =>
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
            managerId: partner.managerId + '',
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
        status: partner.status
            ? (partner.status as PartnerStatusType)
            : PartnerStatusType.PENDING,
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

export interface PartnerPOST {
    entityType: string
    entityName: string
    commercialNumber: string
    features: string[]
    solutions: string[]
    contactDto: ContactDto
    entityAddressDto: EntityAddressDto
    entityBankInformationDto: EntityBankInformationDto
    managerId: number
    activities: string[]
    maxNumberOfSubEntities: number
    maxNumberOfAccounts: number
    minimumReduction: number
    commissionPayedBySubEntities: boolean
    oneSubscription: boolean
    solutionsContractDto: SolutionsContractDto[]
    coveredZonesDtos: CityRegion[]
    deliveryPartnerContract: deliveryPartnerContract[]
    status: string
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
    managerId: 0,
    activities: [],
    maxNumberOfSubEntities: 0,
    maxNumberOfAccounts: 0,
    minimumReduction: 0,
    commissionPayedBySubEntities: false,
    oneSubscription: false,
    solutionsContractDto: [],
    coveredZonesDtos: [],
    deliveryPartnerContract: [],
    status: PartnerStatusType.PENDING,
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
