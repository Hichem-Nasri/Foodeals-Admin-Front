import { ActionsMenu, ActionType } from '@/components/custom/ActionsMenu'
import { EmailBadge } from '@/components/Partners/EmailBadge'
import { PartnerSolution } from '@/components/Partners/PartnerSolution'
import { PhoneBadge } from '@/components/Partners/PhoneBadge'
import archiveSubPartner from '@/lib/api/partner/archiveSubEntites'
import archiveUser from '@/lib/api/partner/archiveUser'
import { AppRoutes } from '@/lib/routes'
import { CollaboratorAssociationsType, SiegesType } from '@/types/association'
import { CollaboratorsUser } from '@/types/collaboratorsUtils'
import { ArchiveType } from '@/types/GlobalType'
import { PartnerSolutionType } from '@/types/partnersType'
import { capitalize } from '@/types/utils'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { createColumnHelper } from '@tanstack/react-table'
import { Eye, Pen, Archive, Store, Users, ArchiveX, Info } from 'lucide-react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

const columnCollaboratorTableHelper = createColumnHelper<CollaboratorsUser>()

export const columnsCollaboratorTable = (
    router: AppRouterInstance,
    archive: boolean,
    refetch: () => void
) => [
    columnCollaboratorTableHelper.accessor('createdAt', {
        cell: (info) => info.getValue(),
        header: 'Date',
        footer: (info) => info.column.id,
    }),
    columnCollaboratorTableHelper.accessor('name', {
        cell: (info) => {
            const avatarPath = info.row.original.avatarPath
            const fullName =
                capitalize(info.getValue().firstName) +
                ' ' +
                capitalize(info.getValue().lastName)
            return (
                <div className="flex items-center justify-center gap-1 text-wrap">
                    <Avatar className="size-[2.875rem] shrink-0 justify-center items-center flex bg-lynch-200 rounded-full">
                        <AvatarImage src={avatarPath!} />
                        <AvatarFallback>
                            {fullName[0].toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    {fullName}
                </div>
            )
        },
        header: 'Nom',
        footer: (info) => info.column.id,
    }),
    columnCollaboratorTableHelper.accessor('role', {
        cell: (info) => (
            <div className="flex items-center gap-1">{info.getValue()}</div>
        ),
        header: 'Rôle',
        footer: (info) => info.column.id,
    }),
    columnCollaboratorTableHelper.accessor('city', {
        cell: (info) => info.getValue(),
        header: 'Ville',
        footer: (info) => info.column.id,
    }),
    columnCollaboratorTableHelper.accessor('region', {
        cell: (info) => info.getValue(),
        header: 'Région',
        footer: (info) => info.column.id,
    }),
    columnCollaboratorTableHelper.accessor('email', {
        cell: (info) => <EmailBadge email={info.getValue()} />,
        header: 'Email',
        footer: (info) => info.column.id,
    }),
    columnCollaboratorTableHelper.accessor('phone', {
        cell: (info) => <PhoneBadge phone={info.getValue()} />,
        header: 'Téléphone',
        footer: (info) => info.column.id,
    }),
    columnCollaboratorTableHelper.accessor('id', {
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
                            const res = await archiveUser(id, archiveData)
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
                                AppRoutes.deliveryCollaboratorDetails.replace(
                                    ':id',
                                    info.getValue()!
                                )
                            ),
                        icon: Eye,
                        label: 'Voir',
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
                            const res = await archiveUser(id, archiveData)
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
                ]
            return (
                <ActionsMenu
                    id={info.getValue()!}
                    menuList={listActions}
                    prospect={archive ? 'users' : false}
                />
            )
        },
        header: 'Actions',
        footer: (info) => info.column.id,
    }),
]

export const CollaboratorAssociationsData: CollaboratorAssociationsType[] = [
    {
        id: '1',
        city: 'City',
        region: 'Region',
        userInfoDto: {
            createdAt: '2021-12-12',
            role: 'Role Name',
            avatarPath: 'https://randomuser.me/api/portraits',
            email: 'test@gmail.com',
            phone: '1234567890',
            name: {
                firstName: 'John',
                lastName: 'Doe',
            },
        },
    },
    {
        id: '2',
        city: 'City',
        region: 'Region',
        userInfoDto: {
            createdAt: '2021-12-12',
            role: 'Role Name',
            avatarPath: 'https://randomuser.me/api/portraits',
            email: 'helo@fasafs.co',
            phone: '1234567890',
            name: {
                firstName: 'John',
                lastName: 'Doe',
            },
        },
    },
]
