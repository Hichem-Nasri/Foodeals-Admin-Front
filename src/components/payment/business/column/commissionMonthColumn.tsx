import { AvatarAndName } from '@/components/AvatarAndName'
import { partnerCommissionMonthType } from '@/types/PaymentType'
import { PaymentStatusEnum } from '@/types/paymentUtils'
import { createColumnHelper } from '@tanstack/react-table'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

const columnHelperCommissionMonth =
    createColumnHelper<partnerCommissionMonthType>()

export const columnsCommissionMonthTable = (router: AppRouterInstance) => [
    columnHelperCommissionMonth.accessor('ref', {
        cell: (info) => info.getValue(),
        header: 'Réf',
        footer: (info) => info.column.id,
    }),
    columnHelperCommissionMonth.accessor('product', {
        cell: (info) => {
            return (
                <AvatarAndName
                    className="flex items-center gap-1 text-nowrap"
                    name={info.getValue().name}
                    avatar={info.getValue().avatarPath}
                />
            )
        },
        header: 'Produit',
        footer: (info) => info.column.id,
    }),
    columnHelperCommissionMonth.accessor('amount', {
        cell: (info) => {
            return (
                <span>
                    {info.getValue() > 0 ? `${info.getValue()} MAD` : 'N/A'}
                </span>
            )
        },
        header: 'Prix',
        footer: (info) => info.column.id,
    }),
    columnHelperCommissionMonth.accessor('quantity', {
        cell: (info) => info.getValue(),
        header: 'Qté',
        footer: (info) => info.column.id,
    }),
    columnHelperCommissionMonth.accessor('cardAmount', {
        cell: (info) => {
            return (
                <span>
                    {info.getValue() > 0 ? `${info.getValue()} MAD` : 'N/A'}
                </span>
            )
        },
        header: 'V. par carte',
        footer: (info) => info.column.id,
    }),
    columnHelperCommissionMonth.accessor('cashAmount', {
        cell: (info) => {
            return (
                <span>
                    {info.getValue() > 0 ? `${info.getValue()} MAD` : 'N/A'}
                </span>
            )
        },
        header: 'V. par espèce',
        footer: (info) => info.column.id,
    }),
    columnHelperCommissionMonth.accessor('commissionCard', {
        cell: (info) => {
            return (
                <span>
                    {info.getValue() > 0 ? `${info.getValue()} MAD` : 'N/A'}
                </span>
            )
        },
        header: 'C. par carte',
        footer: (info) => info.column.id,
    }),
    columnHelperCommissionMonth.accessor('cashCommission', {
        cell: (info) => {
            return (
                <span>
                    {info.getValue() > 0 ? `${info.getValue()} MAD` : 'N/A'}
                </span>
            )
        },
        header: 'C. par espèce',
        footer: (info) => info.column.id,
    }),
]

// TODO: remove this demo data

export const defaultDataCommissionMonthTable: partnerCommissionMonthType[] = [
    {
        id: '1',
        ref: '1',
        product: {
            // id: '3123',
            name: 'Nom du produit',
            avatarPath: 'https://api.dicebear.com/7.x/bottts/png?seed=Ikea',
        },
        amount: 1000,
        quantity: 1,
        cashAmount: 1000,
        cardAmount: 1000,
        cashCommission: 1000,
        commissionCard: 1000,
        payable: true,
        paymentStatus: PaymentStatusEnum.VALID_BY_BOTH,
    },
    {
        id: '2',
        ref: '2',
        product: {
            // id: '3123',
            name: 'Nom du produit',
            avatarPath: 'https://api.dicebear.com/7.x/bottts/png?seed=Ikea',
        },
        amount: 1000,
        quantity: 1,
        cashAmount: 1000,
        cardAmount: 1000,
        cashCommission: 1000,
        commissionCard: 1000,
        payable: true,
        paymentStatus: PaymentStatusEnum.VALID_BY_FOODEALS,
    },
    {
        id: '3',
        ref: '3',
        product: {
            // id: '3123',
            name: 'Nom du produit',
            avatarPath: 'https://api.dicebear.com/7.x/bottts/png?seed=Ikea',
        },
        amount: 1000,
        quantity: 1,
        cashAmount: 1000,
        cardAmount: 1000,
        cashCommission: 1000,
        commissionCard: 1000,
        payable: true,
        paymentStatus: PaymentStatusEnum.VALID_BY_FOODEALS,
    },
]
