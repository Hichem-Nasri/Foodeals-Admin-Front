import { ActionsMenu } from '@/components/custom/ActionsMenu'
import { EmailBadge } from '@/components/Partners/EmailBadge'
import { PartnerSolution } from '@/components/Partners/PartnerSolution'
import { PhoneBadge } from '@/components/Partners/PhoneBadge'
import { AppRoutes } from '@/lib/routes'
import { DeliveryCollaboratorsType } from '@/types/deliveries'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { createColumnHelper } from '@tanstack/react-table'
import { Eye, Archive } from 'lucide-react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { BadgeDisponibility } from '../Collaborators/BadgeDisponibility'
import { userInfoDto } from '@/types/GlobalType'
import { capitalize } from '@/types/utils'
import { AvatarAndName } from '@/components/AvatarAndName'

const columnDeliveryCollaboratorsTableHelper =
    createColumnHelper<DeliveryCollaboratorsType>()

export const columnsDeliveryCollaboratorsTable = (
    router: AppRouterInstance
) => [
    columnDeliveryCollaboratorsTableHelper.accessor('userInfoDto.createdAt', {
        cell: (info) => info.getValue(),
        header: 'Date',
        footer: (info) => info.column.id,
    }),
    columnDeliveryCollaboratorsTableHelper.accessor('userInfoDto', {
        cell: (info) => {
            const fullName =
                capitalize(info.getValue().name.firstName) +
                ' ' +
                capitalize(info.getValue().name.lastName)

            return (
                <AvatarAndName
                    avatar={info.getValue().avatarPath}
                    name={fullName}
                />
            )
        },
        header: 'Collaborateur',
        footer: (info) => info.column.id,
    }),
    columnDeliveryCollaboratorsTableHelper.accessor('userInfoDto.role', {
        cell: (info) => info.getValue(),
        header: 'Role',
        footer: (info) => info.column.id,
    }),
    columnDeliveryCollaboratorsTableHelper.accessor('status', {
        cell: (info) => <BadgeDisponibility isDisponible={info.getValue()} />,
        header: 'Disponibilité',
        footer: (info) => info.column.id,
    }),
    columnDeliveryCollaboratorsTableHelper.accessor('city', {
        cell: (info) => info.getValue(),
        header: 'Ville',
        footer: (info) => info.column.id,
    }),
    columnDeliveryCollaboratorsTableHelper.accessor('region', {
        cell: (info) => info.getValue(),
        header: 'Zone',
        footer: (info) => info.column.id,
    }),
    columnDeliveryCollaboratorsTableHelper.accessor('commands', {
        cell: (info) => {
            const role = info.row.getValue('role')
            return role == 'Manager' ? '--' : info.getValue() || 0
        },
        header: 'Commandes',
        footer: (info) => info.column.id,
    }),
    columnDeliveryCollaboratorsTableHelper.accessor('userInfoDto.phone', {
        cell: (info) => <PhoneBadge phone={info.getValue()} />,
        header: 'Téléphone',
        footer: (info) => info.column.id,
    }),
    columnDeliveryCollaboratorsTableHelper.accessor('userInfoDto.email', {
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
        cell: (info) => {
            const user = info.row.getValue('userInfoDto') as userInfoDto
            return (
                <ActionsMenu
                    id={info.getValue()}
                    menuList={[
                        {
                            actions: () =>
                                router.push(
                                    AppRoutes.deliveryCollaboratorDetails.replace(
                                        ':id',
                                        user.id!
                                    )
                                ),
                            icon: Eye,
                            label: 'Voir',
                        },
                        {
                            actions: () => {},
                            icon: Archive,
                            label: 'Archiver',
                        },
                    ]}
                />
            )
        },
        header: 'Activité',
        footer: (info) => info.column.id,
    }),
]
