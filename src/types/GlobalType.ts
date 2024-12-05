import { ContactDto } from './partenairUtils'
import { PartnerSolutionType, PartnerStatusType } from './partnersType'

export enum PartnerEntitiesType {
    PARTNER_SB = 'PARTNER_SB',
    NORMAL_PARTNER = 'NORMAL_PARTNER',
    SUB_ENTITY = 'SUB_ENTITY',
    DELIVERY_PARTNER = 'DELIVERY_PARTNER',
}

export type ArchiveType = {
    action: 'ARCHIVE' | 'DE_ARCHIVE'
    reason: string
    details: string
}

export type ProfileType = {
    id: string
    name: {
        firstName: string
        lastName: string
    }
    avatarPath?: string
}
export interface PartnersType {
    id: string
    entityName: string
    type: string
    city: string
    solutions: string[]
    createdAt: string
    partnerInfo: PartnerInfoDto
    contractStatus: string
    contact: ContactType
}

export interface PartnerInfoDto {
    id: string
    name: string
    avatarPath: string
}

export type PriceType = {
    amount: number
    currency: string
}

export enum NotificationType {
    SUCCESS,
    ERROR,
    INFO,
}

export type ContactType = {
    name: ProfileType['name']
    email: string
    phone: string
}

export type CustomFilterType = {
    date: string[]
    companyName: string[]
    category: string[]
    status?: string[]
    creatorInfo?: ProfileType[]
    managerInfo?: ProfileType[]
    solutions?: string[]
    city: string[]
    country: string[]
}

export type AddressType = {
    country: Omit<PartnerInfoDto, 'avatarPath'>
    state: Omit<PartnerInfoDto, 'avatarPath'>
    city: Omit<PartnerInfoDto, 'avatarPath'>
    region: Omit<PartnerInfoDto, 'avatarPath'>
    address: string
    iframe: string
}

export type TotalValueProps = {
    totalElements: number
    totalPages: number
    currentPage: number
    pageSize: number
}

export const TotalValues = {
    totalElements: 0,
    totalPages: 0,
    currentPage: 0,
    pageSize: 10,
}

export interface DetailsArchiveType {
    action: 'ARCHIVE' | 'DE_ARCHIVE'
    reason: string
    details: string
    deletedAt: string
}

export const ContractStatusPartner: { [key: string]: PartnerStatusType } = {
    ['VALIDATED']: PartnerStatusType.VALID,
    ['IN_PROGRESS']: PartnerStatusType.IN_PROGRESS,
    ['REJECTED']: PartnerStatusType.CANCELED,
}

export type userInfoDto = PartnerInfoDto & Pick<ContactDto, 'phone' | 'email'>
