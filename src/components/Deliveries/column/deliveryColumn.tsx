import { ActionsMenu } from '@/components/custom/ActionsMenu'
import { EmailBadge } from '@/components/Partners/EmailBadge'
import { PartnerSolution } from '@/components/Partners/PartnerSolution'
import { PhoneBadge } from '@/components/Partners/PhoneBadge'
import { AppRoutes } from '@/lib/routes'
import { DeliveryType } from '@/types/deliveries'
import { PartnerSolutionType } from '@/types/partnersType'
import { capitalize } from '@/types/utils'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { createColumnHelper } from '@tanstack/react-table'
import { Eye, Pen, Archive, Users, FileBadge } from 'lucide-react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

const columnDeliveriesTableHelper = createColumnHelper<DeliveryType>()

export const columnsDeliveriesTable = (router: AppRouterInstance) => [
    columnDeliveriesTableHelper.accessor('createdAt', {
        cell: (info) => info.getValue(),
        header: 'Date',
        footer: (info) => info.column.id,
    }),
    columnDeliveriesTableHelper.accessor('partnerInfoDto', {
        cell: (info) => (
            <div className="flex items-center gap-1">
                <Avatar>
                    <AvatarImage src={info.getValue().avatarPath} />
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
    columnDeliveriesTableHelper.accessor('responsibleInfoDto', {
        cell: (info) => {
            const fullName =
                capitalize(info.getValue().name.firstName) +
                ' ' +
                capitalize(info.getValue().name.lastName)
            return (
                <div className="flex items-center gap-1">
                    <Avatar>
                        <AvatarImage src={info.getValue().avatarPath} />
                        <AvatarFallback>
                            {fullName && fullName[0].toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    {fullName}
                </div>
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
        header: 'Commandes',
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
                                AppRoutes.newDelivery.replace(':id', id) +
                                    '?mode=edit'
                            ),
                        icon: Pen,
                        label: 'Modifier',
                    },
                    {
                        actions: () => {
                            // Archive
                        },
                        icon: Archive,
                        label: 'Archiver',
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
                    {
                        actions: (id) => {
                            // Contract
                        },
                        icon: FileBadge,
                        label: 'Contrat',
                    },
                ]}
            />
        ),
        header: 'Activité',
        footer: (info) => info.column.id,
    }),
]
