import { PaymentDeliveriesType, PaymentStatusType } from '@/types/PaymentType'
import { createColumnHelper } from '@tanstack/react-table'
import { ConfirmPayment } from '../../ConfirmPayment'
import { AppRoutes } from '@/lib/routes'
import Link from 'next/link'
import { Eye } from 'lucide-react'
import { PaymentStatusEnum } from '@/types/paymentUtils'
import { PaymentValidation } from '../../PaymentValidation'
import { PriceType } from '@/types/GlobalType'

const columnHelperPaymentDeliveries =
    createColumnHelper<PaymentDeliveriesType>()

export const columnsPaymentDeliveriesTable = () => [
    columnHelperPaymentDeliveries.accessor('month', {
        cell: (info) => info.getValue(),
        header: 'Mois',
        footer: (info) => info.column.id,
    }),
    columnHelperPaymentDeliveries.accessor('deliveryCost', {
        cell: (info) => {
            return (
                <span>{info.getValue().amount + info.getValue().currency}</span>
            )
        },
        header: 'Coût de livraison',
        footer: (info) => info.column.id,
    }),
    columnHelperPaymentDeliveries.accessor('commissionCost', {
        cell: (info) => {
            return (
                <span>{info.getValue().amount + info.getValue().currency}</span>
            )
        },
        header: 'Coût de commission',
        footer: (info) => info.column.id,
    }),
    columnHelperPaymentDeliveries.accessor('orderCount', {
        cell: (info) => {
            return <span>{info.getValue()}</span>
        },
        header: 'N de commande',
        footer: (info) => info.column.id,
    }),
    columnHelperPaymentDeliveries.accessor('foodealsCommission', {
        cell: (info) => {
            return (
                <span>{info.getValue().amount + info.getValue().currency}</span>
            )
        },
        header: 'Commission Foodeals',
        footer: (info) => info.column.id,
    }),
    columnHelperPaymentDeliveries.accessor('amountToPay', {
        cell: (info) => {
            const status = info.row.getValue('status') as PaymentStatusEnum
            const amount = info.getValue().amount
            return (
                <span
                    className={`${
                        status == PaymentStatusEnum.IN_VALID &&
                        amount > 0 &&
                        'text-coral-500'
                    }`}
                >
                    {info.getValue().amount + info.getValue().currency}
                </span>
            )
        },
        header: 'A payé',
        footer: (info) => info.column.id,
    }),
    columnHelperPaymentDeliveries.accessor('amountToReceive', {
        cell: (info) => {
            const status = info.row.getValue('status') as PaymentStatusEnum
            const amount = info.getValue().amount
            return (
                <span
                    className={`
                    ${
                        status != PaymentStatusEnum.VALID_BY_BOTH &&
                        amount > 0 &&
                        'text-coral-500'
                    }
                    `}
                >
                    {info.getValue().amount + info.getValue().currency}
                </span>
            )
        },
        header: 'A recevoir',
        footer: (info) => info.column.id,
    }),
    columnHelperPaymentDeliveries.accessor('status', {
        cell: (info) => {
            const id = info.row.getValue('id') as string
            const toPay = info.row.getValue('amountToPay') as PriceType
            const toRec = info.row.getValue('amountToReceive') as PriceType
            const status = info.getValue() as PaymentStatusEnum
            if (toPay.amount) {
                return (
                    <PaymentValidation
                        className="min-w-full"
                        id={id}
                        label={'Payé'}
                        disabled={
                            PaymentStatusEnum.IN_VALID !=
                            (status as PaymentStatusEnum)
                        }
                        amount={toPay.amount}
                    />
                )
            } else {
                return (
                    <ConfirmPayment
                        className="min-w-full"
                        id={id}
                        label={'Confirmer'}
                        disabled={[
                            PaymentStatusEnum.IN_VALID,
                            PaymentStatusEnum.VALID_BY_BOTH,
                        ].includes(status as PaymentStatusEnum)}
                    />
                )
            }
        },
        header: 'Validation',
        footer: (info) => info.column.id,
    }),
    columnHelperPaymentDeliveries.accessor('id', {
        cell: (info) => {
            const month = info.row.getValue('month') as string
            return (
                <Link
                    href={AppRoutes.paymentDeliveriesDetails.replace(
                        ':id',
                        info.getValue() + '?month=' + month
                    )}
                >
                    <button className=" size-12 rounded-full bg-lynch-300 hover:bg-lynch-200 text-white grid place-content-center">
                        <Eye size={20} />
                    </button>
                </Link>
            )
        },
        header: 'Activité',
        footer: (info) => info.column.id,
    }),
]

export const defaultDataPaymentDeliveriesTable: PaymentDeliveriesType[] = [
    {
        id: '1',
        month: '11/2024',
        deliveryCost: {
            amount: 1000,
            currency: 'MAD',
        },
        commissionCost: {
            amount: 1000,
            currency: 'MAD',
        },
        orderCount: 10,
        foodealsCommission: {
            amount: 1000,
            currency: 'MAD',
        },
        amountToPay: {
            amount: 0,
            currency: 'MAD',
        },
        amountToReceive: {
            amount: 1000,
            currency: 'MAD',
        },
        status: PaymentStatusEnum.VALID_BY_PARTNER,
    },
    {
        id: '2',
        month: '12/2024',
        deliveryCost: {
            amount: 1000,
            currency: 'MAD',
        },
        commissionCost: {
            amount: 1000,
            currency: 'MAD',
        },
        orderCount: 10,
        foodealsCommission: {
            amount: 1000,
            currency: 'MAD',
        },
        amountToPay: {
            amount: 1000,
            currency: 'MAD',
        },
        amountToReceive: {
            amount: 0,
            currency: 'MAD',
        },
        status: PaymentStatusEnum.IN_VALID,
    },
    {
        id: '3',
        month: '06/2024',
        deliveryCost: {
            amount: 1000,
            currency: 'MAD',
        },
        commissionCost: {
            amount: 1000,
            currency: 'MAD',
        },
        orderCount: 10,
        foodealsCommission: {
            amount: 1000,
            currency: 'MAD',
        },
        amountToPay: {
            amount: 1000,
            currency: 'MAD',
        },
        amountToReceive: {
            amount: 0,
            currency: 'MAD',
        },
        status: PaymentStatusEnum.VALID_BY_FOODEALS,
    },
]
