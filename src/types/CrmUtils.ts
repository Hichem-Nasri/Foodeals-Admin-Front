import { CrmType } from './CrmType'
import { ProfileType, CustomFilterType } from './GlobalType'
import { PartnerStatusType } from './partners'

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
