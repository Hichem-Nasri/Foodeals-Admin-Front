import { Row } from '@tanstack/react-table'
import { MultiSelectOptionsType } from '@/components/MultiSelect'
import { PartnerStatusType } from './CrmType'
import { PartnerSolutionType } from './partners'
import { OptionStatus } from './utils'
import { ProfileType, CrmType, CustomFilterType } from './Global-Type'

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

export const setMultiSelectPerson = (value: ProfileType[]) => {
    return Array.from(
        new Set(
            value.map(
                (items) => items.name.firstName + ' ' + items.name.lastName
            )
        )
    ).map((items) => ({
        key: items,
        label: items,
        avatarPath: value.find(
            (item) => item.name.firstName + ' ' + item.name.lastName === items
        )?.avatarPath,
    }))
}

export const setMultiSelect = (value: string[]) => {
    return Array.from(new Set(value)).map((items) => ({
        key: items,
        label: items,
    }))
}

export const getDataFilter = (data: CrmType[]) => {
    const filterTable: CustomFilterType = {
        date: Array.from(new Set(data.map((items) => items.createdAt))),
        companyName: Array.from(
            new Set(data.map((items) => items.companyName))
        ),
        category: Array.from(new Set(data.map((items) => items.category))),
        creatorInfo: Array.from(
            new Set(
                data.map((item) =>
                    JSON.stringify({
                        name: {
                            firstName: item.creatorInfo.name.firstName,
                            lastName: item.creatorInfo.name.lastName,
                        },
                        avatarPath: item.creatorInfo.avatarPath,
                    })
                )
            )
        ).map((person) => JSON.parse(person)),
        managerInfo: Array.from(
            new Set(
                data.map((item) =>
                    JSON.stringify({
                        name: {
                            firstName: item.managerInfo.name.firstName,
                            lastName: item.managerInfo.name.lastName,
                        },
                        avatarPath: item.managerInfo.avatarPath,
                    })
                )
            )
        ).map((person) => JSON.parse(person)),
        status: Array.from(new Set(data.map((items) => items.status))),
        city: Array.from(new Set(data.map((items) => items.address.city))),
        country: Array.from(
            new Set(data.map((items) => items.address.country))
        ),
    }
    return filterTable
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
