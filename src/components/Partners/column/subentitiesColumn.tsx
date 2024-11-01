import { ActionsMenu } from '@/components/custom/ActionsMenu'
import { AppRoutes } from '@/lib/routes'
import { SubAccountPartners } from '@/types/partnersType'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { createColumnHelper } from '@tanstack/react-table'
import { Eye, Store, Users, FileBadge } from 'lucide-react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { EmailBadge } from '../EmailBadge'
import { PartnerSolution } from '../PartnerSolution'
import { PhoneBadge } from '../PhoneBadge'

const columnHelperSubAccount = createColumnHelper<SubAccountPartners>()

export const columnsSubAccountTable = (router: AppRouterInstance) => [
    columnHelperSubAccount.accessor('createdAt', {
        cell: (info) => info.getValue(),
        header: 'Date de création',
        footer: (info) => info.column.id,
    }),
    columnHelperSubAccount.accessor('logo', {
        cell: (info) => (
            <Avatar>
                <AvatarImage src={info.getValue()} />
                <AvatarFallback>
                    {info.getValue()[0].toUpperCase()}
                </AvatarFallback>
            </Avatar>
        ),
        header: 'Logo',
        footer: (info) => info.column.id,
    }),
    columnHelperSubAccount.accessor('partnerInfoDto', {
        cell: (info) => info.getValue().name,
        header: 'Raison sociale',
        footer: (info) => info.column.id,
    }),
    columnHelperSubAccount.accessor('offers', {
        cell: (info) => (info.getValue() === 0 ? 'N/A' : info.getValue()),
        header: 'Offres',
        footer: (info) => info.column.id,
    }),
    columnHelperSubAccount.accessor('orders', {
        cell: (info) => (info.getValue() === 0 ? 'N/A' : info.getValue()),
        header: 'Commandes',
        footer: (info) => info.column.id,
    }),
    columnHelperSubAccount.accessor('users', {
        cell: (info) => (info.getValue() === 0 ? 'N/A' : info.getValue()),
        header: 'Collaborateurs',
        footer: (info) => info.column.id,
    }),
    columnHelperSubAccount.accessor('ref', {
        cell: (info) => info.getValue(),
        header: 'Référence',
        footer: (info) => info.column.id,
    }),
    columnHelperSubAccount.accessor('city', {
        cell: (info) => info.getValue(),
        header: 'Ville',
        footer: (info) => info.column.id,
    }),
    columnHelperSubAccount.accessor('contactDto.email', {
        cell: (info) => <EmailBadge email={info.getValue()} />,
        header: 'Email',
        footer: (info) => info.column.id,
    }),
    columnHelperSubAccount.accessor('contactDto.phone', {
        cell: (info) => <PhoneBadge phone={info.getValue()} />,
        header: 'Téléphone',
        footer: (info) => info.column.id,
    }),
    columnHelperSubAccount.accessor('solutions', {
        cell: (info) => (
            <div className="flex items-center gap-1">
                {info.getValue().map((solutions) => (
                    <PartnerSolution solution={solutions} key={solutions} />
                ))}
            </div>
        ),
        header: 'Solution',
        footer: (info) => info.column.id,
    }),
    columnHelperSubAccount.accessor('id', {
        cell: (info) => (
            <ActionsMenu
                id={info.getValue()}
                menuList={[
                    {
                        actions: () =>
                            router.push(
                                AppRoutes.newPartner.replace(
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
                                AppRoutes.newPartner.replace(
                                    ':id',
                                    info.getValue()!
                                )
                            ),
                        icon: Store,
                        label: 'Principal',
                    },
                    {
                        actions: () =>
                            router.push(
                                AppRoutes.newPartner.replace(
                                    ':id',
                                    info.getValue()!
                                )
                            ),
                        icon: Users,
                        label: 'Collaborateurs',
                    },
                    {
                        actions: () =>
                            router.push(
                                AppRoutes.newPartner.replace(
                                    ':id',
                                    info.getValue()!
                                )
                            ),
                        icon: FileBadge,
                        label: 'Contrat',
                    },
                ]}
            />
        ),
        header: 'Activité',
    }),
]
