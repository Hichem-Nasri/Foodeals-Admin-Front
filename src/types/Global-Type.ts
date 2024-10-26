import { PartnerSolutionType, PartnerStatusType } from './partners'

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
    name: string
    avatarPath: string
}

export enum NotificationType {
    SUCCESS,
    ERROR,
    INFO,
}

export type FilteredData<T> = {
    [K in keyof T]: T[K] extends (infer U)[]
        ? U[]
        : T[K] extends string
        ? string[]
        : T[K]
}

export type CrmType = {
    id: string
    createdAt: string
    companyName: string
    category: string
    contact: ContactType
    address: AddressType
    creatorInfo: ProfileType
    managerInfo: ProfileType
    status: PartnerStatusType
    solutions: PartnerSolutionType[]
    event: EventType[]
    typeAssocciation?: string
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
export type EventType = {
    id: string
    createdAt: string
    lead: ProfileType
    dateAndTime: string
    object: string
    message: string
}
