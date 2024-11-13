import { PaymentDeliveriesType, PaymentStatusType } from '@/types/PaymentType'
import { createColumnHelper } from '@tanstack/react-table'
import { ConfirmPayment } from '../../ConfirmPayment'

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
        header: 'Nbr de commande',
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
    columnHelperPaymentDeliveries.accessor('amountToReceive', {
        cell: (info) => {
            return (
                <span>{info.getValue().amount + info.getValue().currency}</span>
            )
        },
        header: 'A recevoir',
        footer: (info) => info.column.id,
    }),
    columnHelperPaymentDeliveries.accessor('status', {
        cell: (info) => (
            <ConfirmPayment
                id={info.getValue()}
                label={'Confirmer'}
                disabled={false}
            />
        ),
        header: 'Validation',
        footer: (info) => info.column.id,
    }),
]

export const defaultDataPaymentDeliveriesTable: PaymentDeliveriesType[] = [
    {
        month: 'Janvier',
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
            amount: 1000,
            currency: 'MAD',
        },
        status: 'pending',
    },
    {
        month: 'Février',
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
            amount: 1000,
            currency: 'MAD',
        },
        status: 'pending',
    },
    {
        month: 'Mars',
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
            amount: 1000,
            currency: 'MAD',
        },
        status: 'pending',
    },
]
