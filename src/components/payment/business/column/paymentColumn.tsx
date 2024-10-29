import { ActionsMenu } from '@/components/custom/ActionsMenu'
import { AppRoutes } from '@/lib/routes'
import { PaymentType, PaymentStatusType } from '@/types/PaymentType'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { createColumnHelper } from '@tanstack/react-table'
import { Eye, Pencil } from 'lucide-react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { ConfirmPayment } from '../../ConfirmPayment'
import { PaymentStatus } from '../../PaymentStatus'
import { PaymentValidation } from '../../PaymentValidation'

const columnHelper = createColumnHelper<PaymentType>()

export const columnsPaymentsTable = (router: AppRouterInstance) => [
    columnHelper.accessor('ref', {
        cell: (info) => info.getValue(),
        header: 'Réf',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('date', {
        cell: (info) => info.getValue().toLocaleDateString(),
        header: 'Mois',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('type', {
        cell: (info) => info.getValue(),
        header: 'Type',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('store', {
        cell: (info) => (
            <div className="flex items-center gap-1">
                <Avatar>
                    <AvatarImage src={info.getValue().logo} />
                    <AvatarFallback>
                        {info.getValue().name[0].toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                {info.getValue().name}
            </div>
        ),
        header: 'Magasin',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('engagement', {
        cell: (info) => info.getValue(),
        header: 'Engagement',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('totalSales', {
        cell: (info) => info.getValue(),
        header: 'Ventes totales',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('totalCommission', {
        cell: (info) => info.getValue(),
        header: 'Commission totale',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('toPay', {
        cell: (info) => (
            <span
                className={
                    info.row.getValue('payByFoodeals') &&
                    info.row.getValue('status') !== PaymentStatusType.PAID
                        ? 'text-red-500'
                        : 'text-primary'
                }
            >
                {info.getValue()}
            </span>
        ),
        header: 'A payer',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('receiver', {
        cell: (info) => (
            <span
                className={
                    !info.row.getValue('payByFoodeals') &&
                    info.row.getValue('status') !== PaymentStatusType.PAID
                        ? 'text-red-500'
                        : 'text-primary'
                }
            >
                {info.getValue()}
            </span>
        ),
        header: 'Reçu',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('status', {
        cell: (info) => <PaymentStatus status={info.getValue()} />,
        header: 'Statut',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('ref', {
        cell: (info) => {
            if (info.row.getValue('payByFoodeals'))
                return (
                    <PaymentValidation
                        id={info.getValue()}
                        label="Confirmer"
                        disabled={
                            !(
                                info.row.getValue('status') ===
                                PaymentStatusType.IN_PROGRESS
                            )
                        }
                    />
                )
            return (
                <ConfirmPayment
                    id={info.getValue()}
                    label="Confirmer"
                    disabled={
                        !(
                            info.row.getValue('status') ===
                            PaymentStatusType.IN_PROGRESS
                        )
                    }
                />
            )
        },
        header: 'Validation',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('payByFoodeals', {
        cell: 'payByFoodeals',
        header: 'payByFoodeals',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('id', {
        cell: (info) => (
            <ActionsMenu
                id={info.getValue()}
                menuList={[
                    {
                        actions: () =>
                            router.push(
                                AppRoutes.paymentDetails.replace(
                                    ':id',
                                    info.getValue()!
                                )
                            ),
                        icon: Eye,
                        label: 'Voir',
                    },
                    {
                        actions: () =>
                            router.push(
                                AppRoutes.paymentDetails.replace(
                                    ':id',
                                    info.getValue()!
                                )
                            ),
                        icon: Pencil,
                        label: 'Modifier',
                    },
                ]}
            />
        ),
        header: 'Activité',
    }),
]
