import { PartnerSolutionType, PartnerStatusType } from './partners'

export type ProfileType = {
    name: {
        firstName: string
        lastName: string
    }
    avatarPath?: string
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
    eventObject: string
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
}
export type EventType = {
    id: string
    createdAt: string
    lead: ProfileType
    dateAndTime: string
    object: string
    message: string
}
