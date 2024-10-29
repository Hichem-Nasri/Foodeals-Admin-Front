import {
    PaymentDetailsOperationsType,
    PaymentStatusType,
} from '@/types/PaymentType'
import { createColumnHelper } from '@tanstack/react-table'
import { PaymentStatus } from '../../PaymentStatus'

const columnPaymentDetailsHelper =
    createColumnHelper<PaymentDetailsOperationsType>()

export const columnsPaymentsDetailsTable = [
    columnPaymentDetailsHelper.accessor('withCard', {
        cell: (info) => info.getValue(),
        header: 'Vente par carte',
        footer: (info) => info.column.id,
    }),
    columnPaymentDetailsHelper.accessor('withCash', {
        cell: (info) => info.getValue(),
        header: 'Vente par espèce',
        footer: (info) => info.column.id,
    }),
    columnPaymentDetailsHelper.accessor('commissionCard', {
        cell: (info) => info.getValue(),
        header: 'Commission par carte',
        footer: (info) => info.column.id,
    }),
    columnPaymentDetailsHelper.accessor('commissionCash', {
        cell: (info) => info.getValue(),
        header: 'Commission par espèce',
        footer: (info) => info.column.id,
    }),
    columnPaymentDetailsHelper.accessor('commissionTotal', {
        cell: (info) => info.getValue(),
        header: 'Total Commission',
        footer: (info) => info.column.id,
    }),
    columnPaymentDetailsHelper.accessor('status', {
        cell: (info) => <PaymentStatus status={info.getValue()} />,
        header: 'Statut',
        footer: (info) => info.column.id,
    }),
]

export const defaultDataPaymentsDetailsTable: PaymentDetailsOperationsType[] = [
    {
        commissionCard: 4454,
        commissionCash: 566,
        commissionTotal: 6846,
        withCard: 46846,
        withCash: 64888,
        status: PaymentStatusType.PAID,
    },
]
