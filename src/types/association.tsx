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
    data: AssociationPostType
) => AssociationInformationSchemaType = (data) => {
    return {
        logo: data.logo,
        cover: data.cover,
        companyName: data.companyName,
        companyType: data.activities,
        responsible:
            data.responsible.name.firstName +
            ' ' +
            data.responsible.name.lastName,
        phone: data.responsible.phone,
        email: data.responsible.email,
        PVNumber: data.pv,
        managerId: data.managerID.toString(),
        country: data.associationAddress.country,
        city: data.associationAddress.city,
        region: data.associationAddress.region,
        address: data.associationAddress.address,
        associationType: data.entityType,
        mapLocation: data.associationAddress.iframe,
        numberOfSieges: data.numberOfPoints,
        solutions: data.solutions as PartnerSolutionType[],
        documents: [],
    }
}

export interface SiegesType {
    id: string
    createAt: Date
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
