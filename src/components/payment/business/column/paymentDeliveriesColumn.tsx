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
            return <span>{info.getValue() + 'DH'}</span>
        },
        header: 'Coût de livraison',
        footer: (info) => info.column.id,
    }),
    columnHelperPaymentDeliveries.accessor('commissionCost', {
        cell: (info) => {
            return <span>{info.getValue() + 'DH'}</span>
        },
        header: 'Coût de commission',
        footer: (info) => info.column.id,
    }),
    columnHelperPaymentDeliveries.accessor('NbrOrder', {
        cell: (info) => {
            return <span>{info.getValue() + 'DH'}</span>
        },
        header: 'Nbr de commande',
        footer: (info) => info.column.id,
    }),
    columnHelperPaymentDeliveries.accessor('commissionfoodleas', {
        cell: (info) => {
            return <span>{info.getValue() + 'DH'}</span>
        },
        header: 'Commission Foodeals',
        footer: (info) => info.column.id,
    }),
    columnHelperPaymentDeliveries.accessor('toReceive', {
        cell: (info) => {
            return <span>{info.getValue() + 'DH'}</span>
        },
        header: 'A recevoir',
        footer: (info) => info.column.id,
    }),
    columnHelperPaymentDeliveries.accessor('validation', {
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
        id: '1',
        month: 'Janvier',
        deliveryCost: 1000,
        commissionCost: 1000,
        NbrOrder: 1000,
        commissionfoodleas: 1000,
        toReceive: 1000,
        validation: PaymentStatusType.IN_PROGRESS,
    },
    {
        id: '2',
        month: 'Février',
        deliveryCost: 1000,
        commissionCost: 1000,
        NbrOrder: 1000,
        commissionfoodleas: 1000,
        toReceive: 1000,
        validation: PaymentStatusType.IN_PROGRESS,
    },
    {
        id: '3',
        month: 'Mars',
        deliveryCost: 1000,
        commissionCost: 1000,
        NbrOrder: 1000,
        commissionfoodleas: 1000,
        toReceive: 1000,
        validation: PaymentStatusType.CANCELED,
    },
]
