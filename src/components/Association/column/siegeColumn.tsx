import { ActionsMenu, ActionType } from '@/components/custom/ActionsMenu'
import { EmailBadge } from '@/components/Partners/EmailBadge'
import { PartnerSolution } from '@/components/Partners/PartnerSolution'
import { PhoneBadge } from '@/components/Partners/PhoneBadge'
import archiveSubPartner from '@/lib/api/partner/archiveSubEntites'
import { AppRoutes } from '@/lib/routes'
import { SiegesType } from '@/types/association'
import { ArchiveType } from '@/types/GlobalType'
import { PartnerSolutionType } from '@/types/partnersType'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { createColumnHelper } from '@tanstack/react-table'
import { Eye, Pen, Archive, Store, Users, ArchiveX, Info } from 'lucide-react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

const columnSiegesTableHelper = createColumnHelper<SiegesType>()

export const columnsSiegesTable = (
    router: AppRouterInstance,
    archive: boolean,
    refetch: () => void
) => [
    columnSiegesTableHelper.accessor('createdAt', {
        cell: (info) => info.getValue(),
        header: 'Date de création',
        footer: (info) => info.column.id,
    }),
    columnSiegesTableHelper.accessor('partnerInfoDto', {
        cell: (info) => info.getValue().name,
        header: 'Sous compte',
        footer: (info) => info.column.id,
    }),
    columnSiegesTableHelper.accessor('responsibleInfoDto', {
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
        header: 'Responsable',
        footer: (info) => info.column.id,
    }),
    columnSiegesTableHelper.accessor('users', {
        cell: (info) => (info.getValue() === 0 ? 'N/A' : info.getValue()),
        header: 'Collaborateurs',
        footer: (info) => info.column.id,
    }),
    columnSiegesTableHelper.accessor('donations', {
        cell: (info) => (info.getValue() === 0 ? 'N/A' : info.getValue()),
        header: 'Donation',
        footer: (info) => info.column.id,
    }),
    columnSiegesTableHelper.accessor('recovered', {
        cell: (info) => (info.getValue() === 0 ? 'N/A' : info.getValue()),
        header: 'Récupération',
        footer: (info) => info.column.id,
    }),
    columnSiegesTableHelper.accessor('responsibleInfoDto.email', {
        cell: (info) => <EmailBadge email={info.getValue()} />,
        header: 'Email',
        footer: (info) => info.column.id,
    }),
    columnSiegesTableHelper.accessor('responsibleInfoDto.phone', {
        cell: (info) => <PhoneBadge phone={info.getValue()} />,
        header: 'Téléphone',
        footer: (info) => info.column.id,
    }),
    columnSiegesTableHelper.accessor('city', {
        cell: (info) => info.getValue(),
        header: 'Ville',
        footer: (info) => info.column.id,
    }),
    columnSiegesTableHelper.accessor('solutions', {
        cell: (info) => (
            <div className="flex items-center gap-1">
                {info.getValue().map((solution) => (
                    <PartnerSolution solution={solution} key={solution} />
                ))}
            </div>
        ),
        header: 'Solution',
        footer: (info) => info.column.id,
    }),
    columnSiegesTableHelper.accessor('id', {
        cell: (info) => {
            let listActions: ActionType[] = []
            if (archive) {
                listActions = [
                    {
                        actions: () => {},
                        label: 'Info',
                        icon: Info,
                    },
                    {
                        actions: async (
                            id: string,
                            data: any,
                            handleDone?: (
                                type: boolean,
                                message: string,
                                query: any[]
                            ) => void
                        ) => {
                            const archiveData: ArchiveType = {
                                action: 'DE_ARCHIVE',
                                reason: data?.archiveType,
                                details: data?.archiveReason,
                            }
                            const res = await archiveSubPartner(id, archiveData)
                                .then((res) => {
                                    handleDone &&
                                        handleDone(
                                            true,
                                            'désarchivage effectué',
                                            ['partners', 0, 10]
                                        )
                                    refetch()
                                })
                                .catch((err) => {
                                    handleDone &&
                                        handleDone(
                                            false,
                                            'Failed to archive',
                                            []
                                        )
                                    console.log(err)
                                })
                        },
                        label: 'Désarchiver',
                        icon: ArchiveX,
                    },
                ]
            } else
                listActions = [
                    {
                        actions: () =>
                            router.push(
                                AppRoutes.newAssociation.replace(
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
                                AppRoutes.newAssociation.replace(
                                    ':id',
                                    info.getValue()!
                                ) + '?mode=edit'
                            ),
                        icon: Pen,
                        label: 'Modifier',
                    },
                    {
                        actions: async (
                            id: string,
                            data: any,
                            handleDone?: (
                                type: boolean,
                                message: string,
                                query: any[]
                            ) => void
                        ) => {
                            const archiveData: ArchiveType = {
                                action: 'ARCHIVE',
                                reason: data?.archiveType,
                                details: data?.archiveReason,
                            }
                            const res = await archiveSubPartner(id, archiveData)
                                .then((res) => {
                                    handleDone &&
                                        handleDone(
                                            true,
                                            "L'archive a été effectuée",
                                            ['partners', '0', '10']
                                        )
                                    refetch()
                                })
                                .catch((err) => {
                                    handleDone &&
                                        handleDone(
                                            false,
                                            'Failed to archive',
                                            []
                                        )
                                    console.log(err)
                                })
                        },
                        icon: Archive,
                        label: 'Archiver',
                    },
                    {
                        actions: () => {
                            router.push(
                                AppRoutes.newAssociation.replace(
                                    ':id',
                                    info.row.original.partnerInfoDto.id
                                ) + '?mode=store'
                            )
                        },
                        icon: Store,
                        label: 'Association',
                    },
                    {
                        actions: () =>
                            router.push(
                                AppRoutes.collaborator.replace(
                                    ':id',
                                    info.getValue()!
                                ) + '?type=FOOD_BANK_SB,FOOD_BANK_ASSOCIATION'
                            ),
                        icon: Users,
                        label: 'Collaborateurs',
                    },
                ]
            return (
                <ActionsMenu
                    id={info.getValue()}
                    menuList={listActions}
                    prospect={archive ? 'organisation' : false}
                />
            )
        },
        header: 'Activité',
    }),
]

export const siegesData: SiegesType[] = [
    {
        id: '1',
        createdAt: new Date().toDateString(),
        partnerInfoDto: {
            id: '1',
            name: 'Association 1',
            avatarPath: 'https://randomuser.me/api/portraits',
        },
        responsibleInfoDto: {
            name: 'John Doe',
            email: 'test@test.com',
            phone: '123456789',
            avatarPath: 'https://randomuser.me/api/portraits',
        },
        users: 2,
        donations: 1,
        recovered: 1,
        city: 'Paris',
        solutions: [PartnerSolutionType.DONATE_PRO],
    },
    {
        id: '2',
        createdAt: new Date().toDateString(),
        partnerInfoDto: {
            id: '2',
            name: 'Association 2',
            avatarPath: 'https://randomuser.me/api/portraits',
        },
        responsibleInfoDto: {
            name: 'Jane Doe',
            email: 'aymane@test.com',
            phone: '123456789',
            avatarPath: 'https://randomuser.me/api/portraits',
        },
        users: 4,
        donations: 23,
        recovered: 100,
        city: 'Casablanca',
        solutions: [PartnerSolutionType.DLC_PRO],
    },
]
