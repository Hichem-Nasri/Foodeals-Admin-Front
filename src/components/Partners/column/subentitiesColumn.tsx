import { ActionsMenu } from '@/components/custom/ActionsMenu'
import { AppRoutes } from '@/lib/routes'
import { SubAccountPartners } from '@/types/partnersType'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { createColumnHelper } from '@tanstack/react-table'
import {
    Eye,
    Store,
    Users,
    FileBadge,
    Archive,
    ArchiveRestore,
    Info,
} from 'lucide-react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { EmailBadge } from '../EmailBadge'
import { PartnerSolution } from '../PartnerSolution'
import { PhoneBadge } from '../PhoneBadge'
import { getContract } from '@/lib/api/partner/getContract'
import { PartnerStatus } from '../PartnerStatus'
import { AvatarAndName } from '@/components/AvatarAndName'
import api from '@/lib/Auth'
import { API_URL } from '@/lib/api'
import { ArchiveType } from '@/types/GlobalType'
import { ArchivePartnerSchema } from '@/types/PartnerSchema'
import { z } from 'zod'
import archivePatner from '@/lib/api/partner/archiverPartner'
import { GetListActionsSubAccount } from './getActionsList'

const columnHelperSubAccount = createColumnHelper<SubAccountPartners>()

export const columnsSubAccountTable = (
    router: AppRouterInstance,
    archive: boolean,
    refetch: () => void,
    partnerId: string
) => [
    columnHelperSubAccount.accessor('createdAt', {
        cell: (info) => info.getValue(),
        header: 'Date de création',
        footer: (info) => info.column.id,
    }),
    columnHelperSubAccount.accessor('partnerInfoDto.avatarPath', {
        cell: (info) => <AvatarAndName name="" avatar={info.getValue()} />,
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
    columnHelperSubAccount.accessor('contractStatus', {
        cell: (info) => null,
        header: '',
        footer: (info) => info.column.id,
    }),
    columnHelperSubAccount.accessor('id', {
        cell: (info) => {
            const status = info.row.original.contractStatus
            const collaborateurs = info.row.original.users
            const partnerInfo = info.row.original.partnerInfoDto
            const list = GetListActionsSubAccount(
                info.getValue()!,
                {
                    status,
                    partnerId: partnerId,
                    users: collaborateurs,
                },
                archive,
                refetch
            )
            return (
                <ActionsMenu
                    id={info.getValue()}
                    menuList={list}
                    prospect={archive ? 'sub-entites' : false}
                />
            )
        },
        header: 'Activité',
    }),
]
