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
import { getContract } from '@/lib/api/partner/getContract'
import { PartnerStatus } from '../PartnerStatus'
import { AvatarAndName } from '@/components/AvatarAndName'

const columnHelperSubAccount = createColumnHelper<SubAccountPartners>()

export const columnsSubAccountTable = (router: AppRouterInstance) => [
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
    columnHelperSubAccount.accessor('contractStatus', {
        cell: (info) => null,
        header: '',
        footer: (info) => info.column.id,
    }),
    columnHelperSubAccount.accessor('id', {
        cell: (info) => {
            const status = info.row.getValue('contractStatus')
            const collaborateurs = info.row.getValue('users')
            const partnerInfo = info.row.original.partnerInfoDto
            return (
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
                                        partnerInfo.id!
                                    )
                                ),
                            icon: Store,
                            label: 'Principal',
                        },
                        {
                            actions: () =>
                                router.push(
                                    AppRoutes.CollaboratorSubEntities.replace(
                                        ':id',
                                        info.getValue()!
                                    )
                                ),
                            icon: Users,
                            label: 'Collaborateurs',
                            shouldNotDisplay: collaborateurs === 0,
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
                                    console.error(
                                        'Error opening contract:',
                                        error
                                    )
                                }
                            },
                            icon: FileBadge,
                            label: 'Contrat',
                            shouldNotDisplay: status !== 'VALIDATED',
                        },
                    ]}
                />
            )
        },
        header: 'Activité',
    }),
]
