import { Row } from '@tanstack/react-table'
import { PartnerStatusType, CrmType } from './CrmType'
import { PartnerSolutionType } from './partners'
import { MultiSelectOptionsType } from '@/components/MultiSelect'
import { OptionStatus } from './utils'
import { Phone } from 'lucide-react'

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
        country: 'Morocco', //element.address.country,
        status: PartnerStatusType.PENDING,
        solutions: element.solutions,
        events: element.events,
        eventObject: element.eventObject,
    }
}

export const DataToCrmObj = (data: any) => {
    if (!data) return

    const dataCrm: CrmType[] = []
    data.map((element: any) => {
        const obj: CrmType = extractData(element)
        dataCrm.push(obj)
    })
    return dataCrm
}

export const setupFilterTable = (row: Row<CrmType>[]) => {
    const filterTable: {
        date: string[]
        companyName: string[]
        category: string[]
        responsable: {
            firstName: string
            lastName: string
        }[]
        city: string[]
        phone: string
        email: string
        country: string[]
        region: string[]
        // address: string
        solutions: PartnerSolutionType[][]
        creatorInfo: {
            name: {
                firstName: string
                lastName: string
            }
            avatar: string
        }[]
        managerInfo: {
            name: {
                firstName: string
                lastName: string
            }
            avatar: string
        }[]
        status: PartnerStatusType[]
    } = {
        date: [],
        phone: '',
        email: '',
        city: Array.from(new Set(row.map((r) => r.original.city))),
        companyName: Array.from(row.map((r) => r.original.companyName)),
        category: Array.from(new Set(row.map((r) => r.original.category))),
        country: Array.from(new Set(row.map((r) => r.original.country))),
        region: Array.from(new Set(row.map((r) => r.original.region))),
        responsable: Array.from(
            new Set(
                row.map((r) => ({
                    firstName: r.original.responsable.firstName,
                    lastName: r.original.responsable.lastName,
                }))
            )
        ),
        creatorInfo: Array.from(
            new Set(row.map((r) => r.original.creatorInfo))
        ),
        managerInfo: Array.from(
            new Set(row.map((r) => r.original.managerInfo))
        ),
        status: Array.from(new Set(row.map((r) => r.original.status))),
        solutions: Array.from(new Set(row.map((r) => r.original.solutions))),
    }
    return filterTable
}

type OptionType = {
    key: string
    label: string
    avatar: string
}

export const DataToOptions = (
    data: any,
    key: string
): MultiSelectOptionsType[] => {
    if (key === 'creatorInfo' || key === 'managerInfo') {
        return [
            ...data.map((d: any) => ({
                key: d.name.firstName + ' ' + d.name.lastName,
                label: d.name.firstName + ' ' + d.name.lastName,
                avatar: d.avatar,
            })),
        ]
    } else if (key === 'responsable') {
        return [
            ...data.map((d: any) => ({
                key: d.firstName + ' ' + d.lastName,
                label: d.firstName + ' ' + d.lastName,
                avatar: '',
            })),
        ]
    } else if (key == 'status') {
        return [...data.map((d: any) => OptionStatus[d])]
    } else if (key == 'solutions') {
        return [
            ...data.map((d: any) => ({
                key: d.map((s: any) => s),
                label: d.map((s: any) => s),
                avatar: '',
            })),
        ]
    }
    return [
        ...data.map((d: any) => ({ key: d + '', label: d + '', avatar: '' })),
    ]
}

export class FilterClass {
    constructor(data: any) {
        this.dataOption.category = DataToOptions(data.category, 'category')
        this.dataOption.city = DataToOptions(data.city, 'city')
        this.dataOption.creatorInfo = DataToOptions(
            data.creatorInfo,
            'creatorInfo'
        )
        this.dataOption.managerInfo = DataToOptions(
            data.managerInfo,
            'managerInfo'
        )
        this.dataOption.status = DataToOptions(data.status, 'status')
        this.dataOption.companyName = DataToOptions(
            data.companyName,
            'companyName'
        )
        this.dataOption.country = DataToOptions(data.country, 'country')
        this.dataOption.region = DataToOptions(data.region, 'region')
    }
    dataOption: {
        companyName: MultiSelectOptionsType[]
        category: MultiSelectOptionsType[]
        city: MultiSelectOptionsType[]
        creatorInfo: MultiSelectOptionsType[]
        managerInfo: MultiSelectOptionsType[]
        country: MultiSelectOptionsType[]
        region: MultiSelectOptionsType[]
        status: MultiSelectOptionsType[]
    } = {
        companyName: [],
        category: [],
        city: [],
        creatorInfo: [],
        managerInfo: [],
        status: [],
        country: [],
        region: [],
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
