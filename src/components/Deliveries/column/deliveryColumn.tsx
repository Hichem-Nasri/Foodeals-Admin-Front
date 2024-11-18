import { AvatarAndName } from '@/components/AvatarAndName'
import { ActionsMenu, ActionType } from '@/components/custom/ActionsMenu'
import { EmailBadge } from '@/components/Partners/EmailBadge'
import { PartnerSolution } from '@/components/Partners/PartnerSolution'
import { PhoneBadge } from '@/components/Partners/PhoneBadge'
import DetailsArchive from '@/components/utils/DetailsArchive'
import { getContract } from '@/lib/api/partner/getContract'
import { AppRoutes } from '@/lib/routes'
import { DeliveryType } from '@/types/deliveries'
import { PartnerSolutionType, PartnerStatusType } from '@/types/partnersType'
import { capitalize } from '@/types/utils'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { createColumnHelper } from '@tanstack/react-table'
import { Eye, Pen, Archive, Users, FileBadge } from 'lucide-react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

const columnDeliveriesTableHelper = createColumnHelper<DeliveryType>()

export const columnsDeliveriesTable = (
    router: AppRouterInstance,
    archive: boolean
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
    columnDeliveriesTableHelper.accessor('status', {
        cell: (info) => null,
        header: '',
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
            if (archive) return <DetailsArchive id={info.getValue()} />
            const status = info.row.getValue('status') as string
            const ListActions: ActionType[] = [
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
                    actions: (id: string) =>
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
                    actions: (id: string) =>
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
                    actions: (id: string) =>
                        router.push(
                            AppRoutes.deliveryPayment + '?deliveryId=' + id
                        ),
                    icon: Users,
                    label: 'Liste des paiement',
                },
                {
                    actions: async (id) => {
                        try {
                            const contractData = await getContract(id)
                            const url = window.URL.createObjectURL(
                                contractData as Blob
                            )
                            window.open(url, '_blank') // Opens the contract in a new tab
                        } catch (error) {
                            console.error('Error opening contract:', error)
                        }
                    },
                    icon: FileBadge,
                    label: 'Contrat',
                    shouldNotDisplay: status !== 'VALIDATED',
                },
            ]
            return <ActionsMenu id={info.getValue()} menuList={ListActions} />
        },
        header: 'Activité',
        footer: (info) => info.column.id,
    }),
]
