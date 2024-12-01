import { AvatarAndName } from '@/components/AvatarAndName'
import { CustomButton } from '@/components/custom/CustomButton'
import { AppRoutes } from '@/lib/routes'
import {
    PaymentCommission,
    PartnerType,
    PaymentStatusEnum,
} from '@/types/paymentUtils'
import { createColumnHelper } from '@tanstack/react-table'
import { Eye } from 'lucide-react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { ConfirmPayment } from '../../ConfirmPayment'
import { PaymentValidation } from '../../PaymentValidation'
import { PriceType } from '@/types/GlobalType'

const columnHelperCommission = createColumnHelper<PaymentCommission>()

export const columnsCommissionTable = (
    router: AppRouterInstance,
    path: 'parnter' | 'subStore' = 'parnter'
) => [
    columnHelperCommission.accessor('ref', {
        cell: (info) => {
            const id = info.row.original.id
            return (
                <div className="flex items-center gap-1">
                    {id.slice(0, 4) + id.slice(-4)}
                </div>
            )
        },
        header: 'Réf',
        footer: (info) => info.column.id,
    }),
    columnHelperCommission.accessor('partnerType', {
        cell: (info) => {
            return (
                <div>
                    {info.getValue() == PartnerType.SUB_ENTITY
                        ? 'sous compte'
                        : 'Principal'}
                </div>
            )
        },
        header: 'Type',
        footer: (info) => info.column.id,
    }),
    columnHelperCommission.accessor('partnerInfoDto', {
        cell: (info) => {
            return (
                <AvatarAndName
                    className="flex items-center gap-1 text-nowrap"
                    name={info.getValue().name}
                    avatar={info.getValue().avatarPath}
                />
            )
        },
        header: 'Magasin',
        footer: (info) => info.column.id,
    }),
    columnHelperCommission.accessor('totalAmount', {
        cell: (info) => {
            const amount = info.getValue().amount
            return <span>{amount}</span>
        },
        header: 'Vente totale',
        footer: (info) => info.column.id,
    }),
    columnHelperCommission.accessor('foodealsCommission', {
        cell: (info) => {
            const amount = info.getValue().amount
            return <span>{amount}</span>
        },
        header: 'Commission',
        footer: (info) => info.column.id,
    }),
    columnHelperCommission.accessor('toPay', {
        cell: (info) => {
            const status = info.row.getValue(
                'paymentStatus'
            ) as PaymentStatusEnum
            const amount = info.getValue().amount
            return (
                <span
                    className={`${
                        status == PaymentStatusEnum.IN_VALID &&
                        amount > 0 &&
                        'text-coral-500'
                    }`}
                >
                    {amount > 0 ? amount : 'N/A'}
                </span>
            )
        },
        header: 'A payer',
        footer: (info) => info.column.id,
    }),
    columnHelperCommission.accessor('toReceive', {
        cell: (info) => {
            const status = info.row.getValue(
                'paymentStatus'
            ) as PaymentStatusEnum
            const amount = info.getValue().amount

            return (
                <span
                    className={`${
                        status != PaymentStatusEnum.VALID_BY_BOTH &&
                        amount > 0 &&
                        'text-coral-500'
                    }`}
                >
                    {amount > 0 ? amount : 'N/A'}
                </span>
            )
        },
        header: 'A recevoir',
        footer: (info) => info.column.id,
    }),
    columnHelperCommission.accessor('paymentStatus', {
        cell: (info) => {
            const payable = info.row.original.payable
            const type = info.row.original.partnerType
            const id = info.row.original.id
            const toPay = info.row.original.toPay
            console.log(toPay)

            const status = info.row.getValue(
                'paymentStatus'
            ) as PaymentStatusEnum
            const paid = info.row.original.toPay.amount

            if (!paid) {
                return (
                    <ConfirmPayment
                        className="min-w-full"
                        id={id}
                        label={'Confirmer'}
                        disabled={
                            [
                                PaymentStatusEnum.IN_VALID,
                                PaymentStatusEnum.VALID_BY_BOTH,
                            ].includes(status as PaymentStatusEnum) || !payable
                        }
                    />
                )
            } else {
                return (
                    <PaymentValidation
                        className="min-w-full"
                        id={id}
                        label={'Payé'}
                        disabled={
                            PaymentStatusEnum.IN_VALID !=
                                (status as PaymentStatusEnum) || !payable
                        }
                        amount={toPay.amount}
                    />
                )
            }
        },
        header: 'Validation',
        footer: (info) => info.column.id,
    }),
    columnHelperCommission.accessor('organizationId', {
        cell: (info) => {
            const type = info.row.original.partnerType
            return (
                <div
                    title="Voir"
                    onClick={() => {
                        if (
                            path != 'subStore' &&
                            type == PartnerType.PARTNER_SB
                        )
                            router.push(
                                AppRoutes.PBCommissionDetails.replace(
                                    ':id',
                                    info.getValue()
                                )
                            )
                        else {
                            if (type == PartnerType.PARTNER_SB) return
                            router.push(
                                AppRoutes.SubStoreCommission.replace(
                                    ':id',
                                    info.getValue() + '?type=' + type
                                )
                            )
                        }
                    }}
                    className="flex items-center justify-center"
                >
                    <div
                        className=" flex items-center justify-center 
                    p-2 rounded-full   bg-lynch-300 w-10 h-10 cursor-pointer text-white"
                    >
                        <Eye size={20} />
                    </div>
                </div>
            )
        },
        header: 'Activité',
        footer: (info) => info.column.id,
    }),
]

// TODO: remove demo data
export const defaultDataCommissionTable: PaymentCommission[] = [
    {
        id: '4',
        ref: '4',
        partnerType: PartnerType.SUB_ENTITY,
        partnerInfoDto: {
            id: '12312',
            name: 'Partner 4',
            avatarPath: 'https://api.dicebear.com/7.x/bottts/png?seed=Partner4',
        },
        totalAmount: {
            amount: 4000,
            currency: 'USD',
        },
        foodealsCommission: {
            amount: 400,
            currency: 'USD',
        },
        toPay: {
            amount: 0,
            currency: 'USD',
        },
        toReceive: {
            amount: 3600,
            currency: 'USD',
        },
        payable: true,
        paymentStatus: PaymentStatusEnum.VALID_BY_PARTNER,
        commissionPayedBySubEntities: false,
        date: '2021-09-01',
        entityId: '4',
        organizationId: '4',
    },
    {
        id: '5',
        ref: '5',
        entityId: '5',
        organizationId: '5',
        date: '2021-09-01',
        partnerType: PartnerType.PARTNER_SB,
        partnerInfoDto: {
            id: '12312',
            name: 'Partner 5',
            avatarPath: 'https://api.dicebear.com/7.x/bottts/png?seed=Partner5',
        },
        totalAmount: {
            amount: 5000,
            currency: 'USD',
        },
        foodealsCommission: {
            amount: 500,
            currency: 'USD',
        },
        toPay: {
            amount: 4500,
            currency: 'USD',
        },
        toReceive: {
            amount: 0,
            currency: 'USD',
        },
        payable: true,
        paymentStatus: PaymentStatusEnum.IN_VALID,
        commissionPayedBySubEntities: false,
    },
    {
        id: '6',
        ref: '6',
        partnerType: PartnerType.SUB_ENTITY,
        partnerInfoDto: {
            id: '12312',
            name: 'Partner 6',
            avatarPath: 'https://api.dicebear.com/7.x/bottts/png?seed=Partner6',
        },
        totalAmount: {
            amount: 6000,
            currency: 'USD',
        },
        foodealsCommission: {
            amount: 400,
            currency: 'MAD',
        },
        toPay: {
            amount: 500,
            currency: 'MAD',
        },
        toReceive: {
            amount: 0,
            currency: 'MAD',
        },
        payable: true,
        paymentStatus: PaymentStatusEnum.VALID_BY_BOTH,
        commissionPayedBySubEntities: true,
        date: '2021-09-01',
        entityId: '6',
        organizationId: '6',
    },
]
