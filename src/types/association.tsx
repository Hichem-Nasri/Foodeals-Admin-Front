import { PartnerSolutionType } from './partnersType'
import { AddressType, ContactType, PartnerInfoDto } from './GlobalType'
import { AssociationInformationSchemaType } from './associationSchema'

export type EntitiesType = 'FOOD_BANK' | 'ASSOCIATION'

export interface AssociationType {
    id: string
    createdAt: string
    partner: PartnerInfoDto
    responsible: ContactType & { avatarPath: string }
    users: number
    donations: number
    recovered: number
    subEntities: number
    associations: number
    status: string
    city: string
    solutions: string[]
    type: string
}

export interface AssociationPostType {
    logo: File | string
    cover: File | string
    companyName: string
    activities: string[]
    responsible: ContactType
    managerID: number
    associationAddress: AddressType
    entityType: string // ASSOCIATION, FOOD_BANK
    numberOfPoints: number
    solutions: string[]
    pv: string
}

export const defaultAssociationPostData: AssociationPostType = {
    logo: '',
    cover: '',
    companyName: '',
    activities: [],
    responsible: {
        name: {
            firstName: '',
            lastName: '',
        },
        email: '',
        phone: '',
    },
    managerID: 1,
    associationAddress: {
        address: '',
        country: '',
        city: '',
        region: '',
        iframe: '',
    },
    entityType: 'ASSOCIATION',
    numberOfPoints: 0,
    solutions: [],
    pv: '',
}

export const exportAssociationPost: (
    data: any
) => AssociationInformationSchemaType = (data) => {
    return {
        logo: data.avatarPath,
        cover: data.coverPath,
        companyName: data.name,
        companyType: data.activities,
        responsible:
            data.contactDto.name.firstName +
            ' ' +
            data.contactDto.name.lastName,
        phone: data.contactDto.phone,
        email: data.contactDto.email,
        PVNumber: data.pv,
        managerId: data.manager.id.toString(),
        country: data.address.country,
        city: data.address.city,
        region: data.address.region,
        address: data.address.address,
        associationType: data.type,
        mapLocation: data.address.iframe,
        numberOfSieges: data.numberOfPoints,
        solutions: data.solutions as PartnerSolutionType[],
        status: data.status,
        documents: [],
    }
}

export interface CollaboratorAssociationsType {
    id: string
    createdAt: string
    roleName: string
    city: string
    region: string
    userInfoDto: ContactType & { avatarPath: string }
}

export interface SiegesType {
    id: string
    createdAt: string
    partnerInfoDto: PartnerInfoDto
    responsibleInfoDto: Omit<ContactType, 'name'> & {
        name: string
        avatarPath: string
    }
    users: number
    donations: number
    recovered: number
    city: string
    solutions: PartnerSolutionType[]
}
