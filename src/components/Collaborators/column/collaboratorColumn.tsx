import { ActionsMenu } from '@/components/custom/ActionsMenu'
import { EmailBadge } from '@/components/Partners/EmailBadge'
import { PartnerSolution } from '@/components/Partners/PartnerSolution'
import { PhoneBadge } from '@/components/Partners/PhoneBadge'
import { AppRoutes } from '@/lib/routes'
import { CollaboratorAssociationsType, SiegesType } from '@/types/association'
import { ContactType, PartnerInfoDto } from '@/types/GlobalType'
import { PartnerSolutionType } from '@/types/partnersType'
import { capitalize } from '@/types/utils'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { createColumnHelper } from '@tanstack/react-table'
import { Eye, Pen, Archive, Store, Users } from 'lucide-react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

export interface CollaboratorsType {
    createdAt: string
    id: string
    name: ContactType['name']
    role: string
    avatarPath: null
    email: string
    phone: string
}

const columnCollaboratorTableHelper = createColumnHelper<CollaboratorsType>()

export const columnsCollaboratorsTable = (
    router: AppRouterInstance,
    partnerId: string
) => [
    columnCollaboratorTableHelper.accessor('createdAt', {
        cell: (info) => info.getValue(),
        header: 'Date',
        footer: (info) => info.column.id,
    }),
    columnCollaboratorTableHelper.accessor('name', {
        cell: (info) => {
            const { firstName, lastName } = info.getValue()
            const avatar = info.row.original.avatarPath
            return (
                <div className="flex items-center gap-1">
                    <Avatar className="size-[2.875rem] shrink-0 justify-center items-center flex bg-lynch-200 rounded-full">
                        <AvatarImage src={avatar!} />
                        <AvatarFallback>
                            {firstName[0].toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    {firstName} {lastName}
                </div>
            )
        },
        header: 'Nom',
        footer: (info) => info.column.id,
    }),
    columnCollaboratorTableHelper.accessor('avatarPath', {
        cell: (info) => null,
        header: '',
        footer: (info) => info.column.id,
    }),
    columnCollaboratorTableHelper.accessor('role', {
        cell: (info) => (
            <div className="flex items-center gap-1">{info.getValue()}</div>
        ),
        header: 'Rôle',
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
        cell: (info) => (
            <ActionsMenu
                id={info.getValue()!}
                menuList={[
                    {
                        label: 'Voir',
                        icon: Eye,
                        actions: (id: string) =>
                            router.push(
                                AppRoutes.collaboratorDetails
                                    .replace(':partnerId', partnerId)
                                    .replace(
                                        ':collaboratorId',
                                        info.getValue()!
                                    )
                            ),
                    },
                    {
                        label: 'Archive',
                        icon: Archive,
                        actions: (id: string) => console.log('Archive'),
                    },
                ]}
            />
        ),
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
