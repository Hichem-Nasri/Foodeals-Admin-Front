import { Row } from '@tanstack/react-table'
import { CrmStatusType, CrmType } from './CrmType'
import { PartnerSolutionType } from './partners'
import { MultiSelectOptionsType } from '@/components/MultiSelect'
import { OptionStatus } from './utils'

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
        status: CrmStatusType[]
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
