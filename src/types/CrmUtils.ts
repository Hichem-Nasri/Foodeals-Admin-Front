import { Row } from '@tanstack/react-table'
import { MultiSelectOptionsType } from '@/components/MultiSelect'
import { PartnerStatusType } from './CrmType'
import { PartnerSolutionType } from './partners'
import { OptionStatus } from './utils'

export const extractData = (element: any) => {
    return {
        id: element.id,
        date: new Date(element.createdAt),
        companyName: element.companyName,
        category: element.category,
        responsable: {
            firstName: element.contact.name.firstName,
            lastName: element.contact.name.lastName,
        },
        city: element.address.city,
        phone: element.contact.phone,
        email: element.contact.email,
        address: element.address.address,
        region: element.address.region,
        creatorInfo: {
            name: {
                firstName: element.creatorInfo.name.firstName,
                lastName: element.creatorInfo.name.lastName,
            },
            avatar: element.creatorInfo.avatar,
        },
        managerInfo: {
            name: {
                firstName: element.managerInfo.name.firstName,
                lastName: element.managerInfo.name.lastName,
            },
            avatar: element.managerInfo.avatar,
        },
        country: element.address.country, //element.address.country,
        status: PartnerStatusType.PENDING,
        solutions: element.solutions,
        event: element.event,
        eventObject:
            element.event && element.event.length > 0
                ? element.event[0].object
                : '',
    }
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
