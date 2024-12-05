import {
    ContractStatus,
    PartnerSolutionType,
    PartnerStatusType,
} from './partnersType'
import {
    AddressType,
    ContactType,
    ContractStatusPartner,
    PartnerInfoDto,
} from './GlobalType'
import {
    AssociationInformationSchemaType,
    defaultAssociationInformationData,
    defaultEngagementData,
} from './associationSchema'
import { CrmType } from './CrmType'

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

export const exportAssociationConvertir: (
    partner: CrmType
) => AssociationInformationSchemaType = (partner) => {
    return {
        ...defaultAssociationInformationData,
        ...defaultEngagementData,
        companyName: partner.companyName,
        companyType: [partner.category],
        associationType: partner.type || '',
        responsible: `${partner.creatorInfo.name?.firstName} ${partner.creatorInfo.name?.lastName}`,
        solutions: partner.solutions,
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

export interface AssociationPostType {
    logo: File | string
    cover: File | string
    companyName: string
    activities: string[]
    responsible: ContactType
    managerID: number
    associationAddress: {
        address: string
        country: string
        state: string
        city: string
        region: string
        iframe: string
    }
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
        city: '',
        country: '',
        region: '',
        state: '',
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
    console.log('convert: ', data)
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
        state: data.address.state,
        city: data.address.city,
        region: data.address.region,
        address: data.address.address,
        associationType: data.type,
        mapLocation: data.address.iframe,
        numberOfSieges: data.numberOfPoints,
        solutions: data.solutions as PartnerSolutionType[],
        status: ContractStatusPartner[data.status],
        documents: [],
    }
}

export interface CollaboratorAssociationsType {
    id: string
    city: string
    region: string
    userInfoDto: ContactType & {
        avatarPath: string
        role: string
        createdAt: string
    }
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
