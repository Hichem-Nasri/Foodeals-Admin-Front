import { ActionsMenu } from '@/components/custom/ActionsMenu'
import { EmailBadge } from '@/components/Partners/EmailBadge'
import { PartnerSolution } from '@/components/Partners/PartnerSolution'
import { PartnerStatus } from '@/components/Partners/PartnerStatus'
import { PhoneBadge } from '@/components/Partners/PhoneBadge'
import { PaymentStatus } from '@/components/payment/PaymentStatus'
import DetailsArchive from '@/components/utils/DetailsArchive'
import { useNotification } from '@/context/NotifContext'
import archivePatner from '@/lib/api/partner/archiverPartner'
import { getContract } from '@/lib/api/partner/getContract'
import { AppRoutes } from '@/lib/routes'
import { AssociationType } from '@/types/association'
import {
    ArchiveType,
    NotificationType,
    PartnerInfoDto,
} from '@/types/GlobalType'
import {
    ContractStatus,
    PartnerSolutionType,
    PartnerStatusType,
} from '@/types/partnersType'
import { PaymentStatusType } from '@/types/PaymentType'
import { capitalize } from '@/types/utils'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { useQueryClient } from '@tanstack/react-query'
import { createColumnHelper } from '@tanstack/react-table'
import {
    Eye,
    Pen,
    Users,
    Store,
    FileBadge,
    Archive,
    Info,
    ArchiveX,
} from 'lucide-react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { act } from 'react'
import { GetListAssociation } from './getAssociationList'

const columnHelper = createColumnHelper<AssociationType>()

export const columnsAssociationsTable = (
    router: AppRouterInstance,
    archive: boolean,
    refetch: any
) => [
    columnHelper.accessor('createdAt', {
        cell: (info) => info.getValue(),
        header: 'Date de création',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('partner', {
        cell: (info) => {
            const { avatarPath, name } = info.getValue()
            return (
                <Avatar className="size-[2.875rem] shrink-0 justify-center items-center flex bg-lynch-100 rounded-full">
                    <AvatarImage src={avatarPath} className="rounded-full" />
                    <AvatarFallback>
                        {name && name[0].toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            )
        },
        header: 'Logo',
        footer: (info) => info.column.id,
        size: 10,
    }),
    columnHelper.accessor('partner', {
        cell: (info) => info.getValue().name,
        header: 'Raison sociale',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('responsible', {
        cell: (info) => {
            const fullName =
                capitalize(info.getValue().name.firstName) +
                ' ' +
                capitalize(info.getValue().name.lastName)
            return (
                <div className="flex items-center space-x-2">
                    <Avatar className="size-[2.875rem] shrink-0 justify-center items-center flex bg-lynch-100 rounded-full">
                        <AvatarImage
                            src={info.getValue().avatarPath}
                            className="rounded-full"
                        />
                        <AvatarFallback>
                            {fullName[0].toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <span>{fullName}</span>
                </div>
            )
        },
        header: 'Responsable',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('users', {
        cell: (info) => (info.getValue() === 0 ? 'N/A' : info.getValue()),
        header: 'Collaborateurs',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('donations', {
        cell: (info) => (info.getValue() === 0 ? 'N/A' : info.getValue()),
        header: 'Donation',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('recovered', {
        cell: (info) => (info.getValue() === 0 ? 'N/A' : info.getValue()),
        header: 'Récupération',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('subEntities', {
        cell: (info) => (info.getValue() === 0 ? 'N/A' : info.getValue()),
        header: 'Sièges',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('associations', {
        cell: (info) => (info.getValue() === 0 ? 'N/A' : info.getValue()),
        header: 'Association',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('city', {
        cell: (info) => info.getValue(),
        header: 'Ville',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('type', {
        cell: (info) =>
            info.getValue() == 'ASSOCIATION'
                ? 'Association'
                : 'Banque Alimentaire',
        header: 'Type de compte',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('responsible.email', {
        cell: (info) => <EmailBadge email={info.getValue()} />,
        header: 'Email',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('responsible.phone', {
        cell: (info) => <PhoneBadge phone={info.getValue()} />,
        header: 'Téléphone',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('solutions', {
        cell: (info) => (
            <div className="flex items-center gap-1">
                {info.getValue().map((solution) => (
                    <PartnerSolution
                        solution={solution as PartnerSolutionType}
                        key={solution}
                    />
                ))}
            </div>
        ),
        header: 'Solution',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('status', {
        cell: (info) => {
            let status
            switch (info.getValue() as ContractStatus) {
                case ContractStatus.IN_PROGRESS:
                    status = PartnerStatusType.IN_PROGRESS
                    break
                case ContractStatus.VALIDATED:
                    status = PartnerStatusType.VALID
                    break
                case ContractStatus.REJECTED:
                    status = PartnerStatusType.CANCELED
                    break
            }

            return <PartnerStatus status={status as PartnerStatusType} />
        },
        header: 'Statut',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('id', {
        cell: (info) => {
            const id = (info.row.getValue('partner') as PartnerInfoDto)
                .id as string
            const listActions = GetListAssociation(
                archive,
                refetch,
                {
                    status: info.row.original.status,
                    subEntities: info.row.original.subEntities,
                    collaborator: info.row.original.users,
                },
                id
            )
            return (
                <ActionsMenu
                    id={id}
                    menuList={listActions}
                    prospect={archive ? 'organisation' : false}
                />
            )
        },
        header: 'Activité',
    }),
]

export const associationsData: AssociationType[] = [
    {
        id: '1',
        createdAt: new Date().toISOString().split('T')[0],
        partner: {
            id: '1',
            name: 'Company 1',
            avatarPath: 'https://via.placeholder.com/150',
        },
        responsible: {
            name: {
                firstName: 'John',
                lastName: 'Doe',
            },
            avatarPath: 'https://via.placeholder.com/150',
            email: 'tst@gmail.com',
            phone: '0123456789',
        },
        users: 5,
        donations: 100,
        recovered: 50,
        subEntities: 5,
        associations: 5,
        status: PartnerStatusType.VALID,
        city: 'Paris',
        solutions: [
            PartnerSolutionType.DONATE_PRO,
            PartnerSolutionType.DLC_PRO,
        ],
        type: 'Association',
    },
    {
        id: '2',
        createdAt: new Date().toISOString().split('T')[0],
        partner: {
            id: '2',
            name: 'Company 2',
            avatarPath: 'https://via.placeholder.com/150',
        },
        responsible: {
            name: {
                firstName: 'John',
                lastName: 'Doe',
            },
            avatarPath: 'https://via.placeholder.com/150',
            email: 'young@test.com',
            phone: '0123456789',
        },
        users: 5,
        donations: 100,
        recovered: 50,
        subEntities: 5,
        associations: 5,
        status: PartnerStatusType.VALID,
        city: 'Paris',
        solutions: [
            PartnerSolutionType.MARKET_PRO,
            PartnerSolutionType.DLC_PRO,
        ],
        type: 'Association',
    },
]
