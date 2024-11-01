import { ContactType, PartnerEntitiesType, PartnerInfoDto } from './GlobalType'

export enum PartnerStatusType {
    VALID = 'VALID',
    IN_PROGRESS = 'IN_PROGRESS',
    CANCELED = 'CANCELED',
    DRAFT = 'DRAFT',
}

export enum ContractStatus {
    IN_PROGRESS = 'IN_PROGRESS',
    VALIDATED = 'VALIDATED',
    REJECTED = 'REJECTED',
}

export const PartnerStatusOptions = {
    ['IN_PROGRESS']: PartnerStatusType.IN_PROGRESS,
    ['VALID']: PartnerStatusType.VALID,
    ['CANCELED']: PartnerStatusType.CANCELED,
    ['DRAFT']: PartnerStatusType.DRAFT,
}

export enum PartnerSolutionType {
    MARKET_PRO = 'pro_market',
    DLC_PRO = 'pro_dlc',
    DONATE_PRO = 'pro_donate',
    NONE = 'PAS DE SOLUTION',
}

export enum PartnerCompanyType {
    NORMAL = 'Normal',
    PRINCIPAL = 'Principal',
}

export const PartnerCompanyTypeOptions = {
    ['NORMAL_PARTNER']: PartnerCompanyType.NORMAL,
    ['PARTNER_WITH_SB']: PartnerCompanyType.PRINCIPAL,
}

export const SolutionsTypeOptions = {
    ['pro_donate']: PartnerSolutionType.DONATE_PRO,
    ['pro_market']: PartnerSolutionType.MARKET_PRO,
    ['pro_dlc']: PartnerSolutionType.DLC_PRO,
}

export const exportSolutionType = (solutions: string[]) => {
    const newSolution: PartnerSolutionType[] = []
    solutions.forEach((elem) => {
        newSolution.push(
            SolutionsTypeOptions[elem as keyof typeof SolutionsTypeOptions]
        )
    })
    return newSolution
}

export interface PartnerType {
    id?: string
    offers: number
    orders: number
    users: number
    subEntities: number
    type: PartnerEntitiesType
    city: string
    solutions: PartnerSolutionType[]
    createdAt: string
    partnerInfoDto: PartnerInfoDto
    contractStatus: ContractStatus
    logo: string
    contactDto: ContactType
}
export type SubAccountPartners = Omit<
    PartnerType,
    'contractStatus' | 'subEntities'
> & {
    ref: string
}
