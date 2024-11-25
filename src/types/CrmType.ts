import { AddressType, ContactType, ProfileType } from './GlobalType'
import { PartnerSolutionType } from './partnersType'

export type CrmType = {
    id: string
    createdAt: string
    companyName: string
    category: string
    contact: ContactType
    address: AddressType
    creatorInfo: ProfileType
    managerInfo: ProfileType
    status: string
    solutions: PartnerSolutionType[]
    event: EventType[]
    type?: string
}

export type EventType = {
    id: string
    createdAt: string
    lead: ProfileType
    dateAndTime: string
    object: string
    message: string
}

export interface CrmObjectType {
    object: string
    message: string
}

export interface TableNotificationType {
    id: string
    date: string
    notifeFrom: ProfileType
    object: string
    message: string
    image: string
}

export interface CrmDemandeType {
    id: string
    date: string
    companyName: string
    activity: string[]
    respansable: string
    role: string
    country: string
    city: string
    address: string
    phone: string
    email: string
}

export interface CrmInformationSchemaType {
    companyName: string
    category: string[]
    responsable: string
    managerInfo: string | number
    type: string
    creatorInfo?: {
        id: string | number
        name: {
            firstName: string
            lastName: string
        }
        avatarPath?: string | null
    }
    phone: string
    email: string
    country: string
    city: string
    region: string
    address: string
    solutions: string[]
}

export interface FilterData {
    date: string[]
    companyName: string[]
    category: string[]
    status: string[]
    email: string
    phone: string
    region: string[]
    country: string[]
    city: string[]
    creatorInfo: string
    managerInfo: string
}

export const emptyFilterData: FilterData = {
    date: [],
    companyName: [],
    category: [],
    status: [],
    region: [],
    country: [],
    email: '',
    phone: '',
    city: [],
    creatorInfo: '',
    managerInfo: '',
}
