import { createColumnHelper } from '@tanstack/react-table'
import { PartnerSolutionType } from './partners'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { PhoneBadge } from '@/components/Partners/PhoneBadge'
import { EmailBadge } from '@/components/Partners/EmailBadge'
import { PartnerSolution } from '@/components/Partners/PartnerSolution'
import { ActionsMenu } from '@/components/custom/ActionsMenu'
import { AppRoutes } from '@/lib/routes'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { Eye, Users } from 'lucide-react'
import { BadgeDisponibility } from '@/components/Deliveries/Collaborators/BadgeDisponibility'
import { PaymentStatusType } from './PaymentType'
import { PaymentValidation } from '@/components/payment/PaymentValidation'
import { ConfirmPayment } from '@/components/payment/ConfirmPayment'
import { PaymentStatus } from '@/components/payment/PaymentStatus'

export interface DeliveryType {
    id: string
    createdAt: Date
    partner: {
        name: string
        avatar: string
    }
    responsible: {
        name: string
        avatar: string
    }
    numberOfDeliveries: number
    commands: number
    city: string
    phone: string
    email: string
    solution: PartnerSolutionType[]
}

const columnDeliveriesTableHelper = createColumnHelper<DeliveryType>()

export const columnsDeliveriesTable = (router: AppRouterInstance) => [
    columnDeliveriesTableHelper.accessor('createdAt', {
        cell: (info) => info.getValue().toLocaleDateString(),
        header: 'Date de création',
        footer: (info) => info.column.id,
    }),
    columnDeliveriesTableHelper.accessor('partner', {
        cell: (info) => (
            <div className="flex items-center gap-1">
                <Avatar>
                    <AvatarImage src={info.getValue().avatar} />
                    <AvatarFallback>
                        {info.getValue().name[0].toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                {info.getValue().name}
            </div>
        ),
        header: 'Partenaire',
        footer: (info) => info.column.id,
    }),
    columnDeliveriesTableHelper.accessor('responsible', {
        cell: (info) => (
            <div className="flex items-center gap-1">
                <Avatar>
                    <AvatarImage src={info.getValue().avatar} />
                    <AvatarFallback>
                        {info.getValue().name[0].toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                {info.getValue().name}
            </div>
        ),
        header: 'Responsable',
        footer: (info) => info.column.id,
    }),
    columnDeliveriesTableHelper.accessor('numberOfDeliveries', {
        cell: (info) => info.getValue(),
        header: 'Nombre de livraisons',
        footer: (info) => info.column.id,
    }),
    columnDeliveriesTableHelper.accessor('commands', {
        cell: (info) => info.getValue(),
        header: 'Nombre de commandes',
        footer: (info) => info.column.id,
    }),
    columnDeliveriesTableHelper.accessor('city', {
        cell: (info) => info.getValue(),
        header: 'Ville',
        footer: (info) => info.column.id,
    }),
    columnDeliveriesTableHelper.accessor('phone', {
        cell: (info) => <PhoneBadge phone={info.getValue()} />,
        header: 'Téléphone',
        footer: (info) => info.column.id,
    }),
    columnDeliveriesTableHelper.accessor('email', {
        cell: (info) => <EmailBadge email={info.getValue()} />,
        header: 'Email',
        footer: (info) => info.column.id,
    }),
    columnDeliveriesTableHelper.accessor('solution', {
        cell: (info) => (
            <div className="flex items-center gap-1">
                {info.getValue().map((solution) => (
                    <PartnerSolution solution={solution} key={solution} />
                ))}
            </div>
        ),
        header: 'Solutions',
        footer: (info) => info.column.id,
    }),
    columnDeliveriesTableHelper.accessor('id', {
        cell: (info) => (
            <ActionsMenu
                id={info.getValue()}
                menuList={[
                    {
                        actions: () =>
                            router.push(
                                AppRoutes.newDelivery.replace(
                                    ':id',
                                    info.getValue()!
                                )
                            ),
                        icon: Eye,
                        label: 'Voir',
                    },
                    {
                        actions: (id) =>
                            router.push(
                                AppRoutes.deliveryCollaborator.replace(
                                    ':id',
                                    info.getValue()!
                                )
                            ),
                        icon: Users,
                        label: 'Collaborateurs',
                    },
                    {
                        actions: (id) =>
                            router.push(
                                AppRoutes.deliveryPayment.replace(':id', id)
                            ),
                        icon: Users,
                        label: 'Liste des paiement',
                    },
                ]}
            />
        ),
        header: 'Activité',
        footer: (info) => info.column.id,
    }),
]

export const deliveriesData: DeliveryType[] = [
    {
        id: '1',
        city: 'Paris',
        commands: 5,
        createdAt: new Date(),
        email: 'email@test.com',
        numberOfDeliveries: 10,
        partner: {
            avatar: 'https://via.placeholder.com/150',
            name: 'Test Partner',
        },
        phone: '0123456789',
        responsible: {
            avatar: 'https://via.placeholder.com/150',
            name: 'Test User',
        },
        solution: [PartnerSolutionType.DLC_PRO, PartnerSolutionType.DONATE_PRO],
    },
    {
        id: '2',
        city: 'Paris',
        commands: 5,
        createdAt: new Date(),
        email: 'email@test.com',
        numberOfDeliveries: 10,
        partner: {
            avatar: 'https://via.placeholder.com/150',
            name: 'Test Partner',
        },
        phone: '0123456789',
        responsible: {
            avatar: 'https://via.placeholder.com/150',
            name: 'Test User',
        },
        solution: [
            PartnerSolutionType.DLC_PRO,
            PartnerSolutionType.DONATE_PRO,
            PartnerSolutionType.MARKET_PRO,
        ],
    },
]

export interface DeliveryCollaboratorsType {
    id: string
    date: Date
    collaborator: {
        name: string
        avatar: string
    }
    role: string
    disponibility: boolean
    city: string
    zone: string
    commands: number
    phone: string
    email: string
    solutions: PartnerSolutionType[]
}

const columnDeliveryCollaboratorsTableHelper =
    createColumnHelper<DeliveryCollaboratorsType>()

export const columnsDeliveryCollaboratorsTable = (
    router: AppRouterInstance
) => [
    columnDeliveryCollaboratorsTableHelper.accessor('date', {
        cell: (info) => info.getValue().toLocaleDateString(),
        header: 'Date',
        footer: (info) => info.column.id,
    }),
    columnDeliveryCollaboratorsTableHelper.accessor('collaborator', {
        cell: (info) => (
            <div className="flex items-center gap-1">
                <Avatar>
                    <AvatarImage src={info.getValue().avatar} />
                    <AvatarFallback>
                        {info.getValue().name[0].toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                {info.getValue().name}
            </div>
        ),
        header: 'Collaborateur',
        footer: (info) => info.column.id,
    }),
    columnDeliveryCollaboratorsTableHelper.accessor('role', {
        cell: (info) => info.getValue(),
        header: 'Role',
        footer: (info) => info.column.id,
    }),
    columnDeliveryCollaboratorsTableHelper.accessor('disponibility', {
        cell: (info) => <BadgeDisponibility isDisponible={info.getValue()} />,
        header: 'Disponibilité',
        footer: (info) => info.column.id,
    }),
    columnDeliveryCollaboratorsTableHelper.accessor('city', {
        cell: (info) => info.getValue(),
        header: 'Ville',
        footer: (info) => info.column.id,
    }),
    columnDeliveryCollaboratorsTableHelper.accessor('zone', {
        cell: (info) => info.getValue(),
        header: 'Zone',
        footer: (info) => info.column.id,
    }),
    columnDeliveryCollaboratorsTableHelper.accessor('commands', {
        cell: (info) => info.getValue(),
        header: 'Nombre de commandes',
        footer: (info) => info.column.id,
    }),
    columnDeliveryCollaboratorsTableHelper.accessor('phone', {
        cell: (info) => <PhoneBadge phone={info.getValue()} />,
        header: 'Téléphone',
        footer: (info) => info.column.id,
    }),
    columnDeliveryCollaboratorsTableHelper.accessor('email', {
        cell: (info) => <EmailBadge email={info.getValue()} />,
        header: 'Email',
        footer: (info) => info.column.id,
    }),
    columnDeliveryCollaboratorsTableHelper.accessor('solutions', {
        cell: (info) => (
            <div className="flex items-center gap-1">
                {info.getValue().map((solution) => (
                    <PartnerSolution solution={solution} key={solution} />
                ))}
            </div>
        ),
        header: 'Solutions',
        footer: (info) => info.column.id,
    }),
    columnDeliveryCollaboratorsTableHelper.accessor('id', {
        cell: (info) => (
            <ActionsMenu
                id={info.getValue()}
                menuList={[
                    {
                        actions: () =>
                            router.push(
                                AppRoutes.deliveryCollaboratorDetails.replace(
                                    ':id',
                                    info.getValue()!
                                )
                            ),
                        icon: Eye,
                        label: 'Voir',
                    },
                ]}
            />
        ),
        header: 'Activité',
        footer: (info) => info.column.id,
    }),
]

export const deliveryCollaboratorsData: DeliveryCollaboratorsType[] = [
    {
        id: '1',
        city: 'Paris',
        commands: 5,
        collaborator: {
            avatar: 'https://via.placeholder.com/150',
            name: 'Test Collaborator',
        },
        date: new Date(),
        disponibility: true,
        email: 'email@test.com',
        phone: '0123456789',
        role: 'Livreur',
        solutions: [
            PartnerSolutionType.DLC_PRO,
            PartnerSolutionType.DONATE_PRO,
        ],
        zone: 'Zone',
    },
    {
        id: '2',
        city: 'Paris',
        commands: 5,
        collaborator: {
            avatar: 'https://via.placeholder.com/150',
            name: 'Test Collaborator',
        },
        date: new Date(),
        disponibility: false,
        email: 'email@test.com',
        phone: '0123456789',
        role: 'Manager',
        solutions: [
            PartnerSolutionType.DLC_PRO,
            PartnerSolutionType.DONATE_PRO,
        ],
        zone: 'Zone',
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
        cell: (info) => (
            <PaymentValidation
                id={info.getValue()}
                label="Confirmer"
                disabled={
                    !(info.row.getValue('status') === PaymentStatusType.PENDING)
                }
            />
        ),
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
        status: PaymentStatusType.PENDING,
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
