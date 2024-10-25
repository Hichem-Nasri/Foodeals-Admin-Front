import { PartnerInfoDto } from './Global-Type'

export enum PartnerType {
    PARTNER_SB = 'PARTNER_SB',
    NORMAL_PARTNER = 'NORMAL_PARTNER',
    SUB_ENTITY = 'SUB_ENTITY',
}
export enum PaymentStatusEnum {
    IN_VALID = 'IN_VALID',
    VALIDATED_BY_PARTNER = 'VALIDATED_BY_PARTNER',
    VALIDATED_BY_FOODEALS = 'VALIDATED_BY_FOODEALS',
    VALIDATED_BY_BOTH = 'VALIDATED_BY_BOTH',
}

export type PaymentCommision = {
    id: string
    ref: string
    entityId: string
    oraganizationId: string
    date: string
    partnerInfoDto: PartnerInfoDto
    partnerType: PartnerType
    totalAmount: number
    foodealsCommission: number
    toPay: number
    toReceive: number
    paymentStatus: PaymentStatusEnum
    payable: boolean
    commissionPayedBySubEntities: boolean
}
