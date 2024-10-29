import { PartnerSolutionType } from './partners'

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
    country: string
    city: string
    address: string
    region: string
    iframe: string
}
