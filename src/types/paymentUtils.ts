import { PartnerInfoDto, PriceType } from './GlobalType'

export enum PartnerType {
    PARTNER_SB = 'PARTNER_SB',
    NORMAL_PARTNER = 'NORMAL_PARTNER',
    SUB_ENTITY = 'SUB_ENTITY',
}
export enum PaymentStatusEnum {
    IN_VALID = 'IN_VALID',
    VALID_BY_PARTNER = 'VALID_BY_PARTNER',
    VALID_BY_FOODEALS = 'VALID_BY_FOODEALS',
    VALID_BY_BOTH = 'VALID_BY_BOTH',
}

export type PaymentCommission = {
    id: string
    ref: string
    entityId: string
    organizationId: string
    date: string
    partnerInfoDto: PartnerInfoDto
    partnerType: PartnerType
    totalAmount: PriceType
    foodealsCommission: PriceType
    toPay: PriceType
    toReceive: PriceType
    paymentStatus: PaymentStatusEnum
    payable: boolean
    commissionPayedBySubEntities: boolean
}
