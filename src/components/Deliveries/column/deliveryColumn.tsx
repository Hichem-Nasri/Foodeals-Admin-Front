import { AvatarAndName } from '@/components/AvatarAndName'
import { ActionsMenu, ActionType } from '@/components/custom/ActionsMenu'
import { EmailBadge } from '@/components/Partners/EmailBadge'
import { PartnerSolution } from '@/components/Partners/PartnerSolution'
import { PhoneBadge } from '@/components/Partners/PhoneBadge'
import DetailsArchive from '@/components/utils/DetailsArchive'
import { useNotification } from '@/context/NotifContext'
import archivePatner from '@/lib/api/partner/archiverPartner'
import { getContract } from '@/lib/api/partner/getContract'
import { AppRoutes } from '@/lib/routes'
import { DeliveryType } from '@/types/deliveries'
import { ArchiveType, NotificationType } from '@/types/GlobalType'
import { ArchivePartnerSchema } from '@/types/PartnerSchema'
import { PartnerSolutionType, PartnerStatusType } from '@/types/partnersType'
import { capitalize } from '@/types/utils'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { useQueryClient } from '@tanstack/react-query'
import { createColumnHelper } from '@tanstack/react-table'
import {
    Eye,
    Pen,
    Archive,
    Users,
    FileBadge,
    ArchiveRestore,
    Info,
} from 'lucide-react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { z } from 'zod'
import { GetListActions } from './getListActions'

const columnDeliveriesTableHelper = createColumnHelper<DeliveryType>()

export const columnsDeliveriesTable = (
    router: AppRouterInstance,
    archive: boolean,
    refetch: () => void
) => [
    columnDeliveriesTableHelper.accessor('createdAt', {
        cell: (info) => info.getValue(),
        header: 'Date',
        footer: (info) => info.column.id,
    }),
    columnDeliveriesTableHelper.accessor('partnerInfoDto', {
        cell: (info) => (
            <AvatarAndName
                name={info.getValue().name}
                avatar={info.getValue().avatarPath}
            />
        ),
        header: 'Partenaire',
        footer: (info) => info.column.id,
    }),
    columnDeliveriesTableHelper.accessor('responsibleInfoDto', {
        cell: (info) => {
            const fullName =
                capitalize(info.getValue().name.firstName) +
                ' ' +
                capitalize(info.getValue().name.lastName)
            return (
                <AvatarAndName
                    name={fullName}
                    avatar={info.getValue().avatarPath}
                />
            )
        },
        header: 'Résponsable',
        footer: (info) => info.column.id,
    }),
    columnDeliveriesTableHelper.accessor('numberOfDeliveries', {
        cell: (info) => info.getValue(),
        header: 'Nb livraisons',
        footer: (info) => info.column.id,
    }),
    columnDeliveriesTableHelper.accessor('numberOfDeliveryPeople', {
        cell: (info) => info.getValue(),
        header: 'Nb livreurs',
        footer: (info) => info.column.id,
    }),
    columnDeliveriesTableHelper.accessor('distribution', {
        cell: (info) => {
            console.log('info', info.getValue())
            return info.getValue() == 'MULTI_CITY' ? 'Multi-ville' : 'Partout'
        },
        header: 'Ville',
        footer: (info) => info.column.id,
    }),
    columnDeliveriesTableHelper.accessor('responsibleInfoDto.phone', {
        cell: (info) => <PhoneBadge phone={info.getValue()} />,
        header: 'Téléphone',
        footer: (info) => info.column.id,
    }),
    columnDeliveriesTableHelper.accessor('responsibleInfoDto.email', {
        cell: (info) => <EmailBadge email={info.getValue()} />,
        header: 'Email',
        footer: (info) => info.column.id,
    }),
    columnDeliveriesTableHelper.accessor('solutions', {
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
        header: 'Solutions',
        footer: (info) => info.column.id,
    }),
    columnDeliveriesTableHelper.accessor('id', {
        cell: (info) => {
            const status = info.row.original.status
            const list = GetListActions(
                info.getValue(),
                status,
                archive,
                refetch
            )
            return (
                <ActionsMenu
                    id={info.getValue()}
                    menuList={list}
                    prospect={archive ? 'organisation' : false}
                />
            )
        },
        header: 'Activité',
        footer: (info) => info.column.id,
    }),
]
