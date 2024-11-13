import { createColumnHelper } from '@tanstack/react-table'
import { PartnerSolutionType, PartnerStatusType } from './partnersType'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { PhoneBadge } from '@/components/Partners/PhoneBadge'
import { EmailBadge } from '@/components/Partners/EmailBadge'
import { PartnerSolution } from '@/components/Partners/PartnerSolution'
import { ActionsMenu } from '@/components/custom/ActionsMenu'
import { AppRoutes } from '@/lib/routes'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { Archive, Eye, FileBadge, Pen, Users } from 'lucide-react'
import { BadgeDisponibility } from '@/components/Deliveries/Collaborators/BadgeDisponibility'
import { PaymentStatusType } from './PaymentType'
import { PaymentValidation } from '@/components/payment/PaymentValidation'
import { ConfirmPayment } from '@/components/payment/ConfirmPayment'
import { PaymentStatus } from '@/components/payment/PaymentStatus'
import { ContactType, PartnerInfoDto, userInfoDto } from './GlobalType'
import { capitalize } from './utils'
import { ContactDto } from './partenairUtils'

export interface DeliveryType {
    id: string
    createdAt: string
    partnerInfoDto: PartnerInfoDto
    responsibleInfoDto: ContactType & { avatarPath: string }
    numberOfDeliveries: number
    entityType: string
    numberOfDeliveryPeople: number
    distribution: string
    solutions: PartnerSolutionType[]
    status: PartnerStatusType
}

export interface DeliveryCollaboratorsType {
    id: string
    createdAt: string
    role: string
    status: boolean
    city: string
    region: string
    commands: number
    userInfoDto: userInfoDto
    solutions: PartnerSolutionType[]
}

export const deliveryCollaboratorsData: DeliveryCollaboratorsType[] = [
    {
        id: '1',
        city: 'Fès',
        commands: 10,
        createdAt: '2021-09-10',
        region: 'Fès-Meknès',
        role: 'Livreur',
        status: true,
        userInfoDto: {
            avatarPath: 'https://api.dicebear.com/7.x/bottts/png?seed=Ikea',
            email: 'jjj@jj.com',
            name: 'John Doe',
            phone: '0606060606',
            id: '1',
        },
        solutions: [PartnerSolutionType.DLC_PRO],
    },
]

export interface DeliveryPaymentsType {
    id: string
    month: string
    numberOfCommands: number
    commissionTotal: number
    commissionCost: number
    commissionFoodeals: number
    toPay: number
    status: PaymentStatusType
}

const columnDeliveryPaymentsTableHelper =
    createColumnHelper<DeliveryPaymentsType>()

export const columnsDeliveryPaymentsTable = [
    columnDeliveryPaymentsTableHelper.accessor('month', {
        cell: (info) => info.getValue(),
        header: 'Mois',
        footer: (info) => info.column.id,
    }),
    columnDeliveryPaymentsTableHelper.accessor('numberOfCommands', {
        cell: (info) => info.getValue(),
        header: 'Nombre de commandes',
        footer: (info) => info.column.id,
    }),
    columnDeliveryPaymentsTableHelper.accessor('commissionTotal', {
        cell: (info) => info.getValue(),
        header: 'Total commission',
        footer: (info) => info.column.id,
    }),
    columnDeliveryPaymentsTableHelper.accessor('commissionCost', {
        cell: (info) => info.getValue(),
        header: 'Coût commission',
        footer: (info) => info.column.id,
    }),
    columnDeliveryPaymentsTableHelper.accessor('commissionFoodeals', {
        cell: (info) => info.getValue(),
        header: 'Commission Foodeals',
        footer: (info) => info.column.id,
    }),
    columnDeliveryPaymentsTableHelper.accessor('toPay', {
        cell: (info) => (
            <span
                className={
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
    columnDeliveryPaymentsTableHelper.accessor('status', {
        cell: (info) => <PaymentStatus status={info.getValue()} />,
        header: 'Statut',
        footer: (info) => info.column.id,
    }),
    columnDeliveryPaymentsTableHelper.accessor('id', {
        cell: (info) => {
            const toPay = info.row.getValue('toPay') as number
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
                    amount={toPay}
                />
            )
        },
        header: 'Validation',
        footer: (info) => info.column.id,
    }),
]

export const defaultDeliveryPaymentsData: DeliveryPaymentsType[] = [
    {
        id: '1',
        commissionCost: 100,
        commissionFoodeals: 100,
        commissionTotal: 100,
        month: 'Janvier',
        numberOfCommands: 10,
        status: PaymentStatusType.IN_PROGRESS,
        toPay: 100,
    },
    {
        id: '2',
        commissionCost: 100,
        commissionFoodeals: 100,
        commissionTotal: 100,
        month: 'Février',
        numberOfCommands: 10,
        status: PaymentStatusType.PAID,
        toPay: 100,
    },
]
