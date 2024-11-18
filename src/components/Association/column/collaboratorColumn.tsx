import { ActionsMenu } from '@/components/custom/ActionsMenu'
import { EmailBadge } from '@/components/Partners/EmailBadge'
import { PartnerSolution } from '@/components/Partners/PartnerSolution'
import { PhoneBadge } from '@/components/Partners/PhoneBadge'
import { AppRoutes } from '@/lib/routes'
import { CollaboratorAssociationsType, SiegesType } from '@/types/association'
import { PartnerSolutionType } from '@/types/partnersType'
import { capitalize } from '@/types/utils'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { createColumnHelper } from '@tanstack/react-table'
import { Eye, Pen, Archive, Store, Users } from 'lucide-react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

const columnCollaboratorTableHelper =
    createColumnHelper<CollaboratorAssociationsType>()

export const columnsCollaboratorTable = (router: AppRouterInstance) => [
    columnCollaboratorTableHelper.accessor('userInfoDto.createdAt', {
        cell: (info) => info.getValue(),
        header: 'Date',
        footer: (info) => info.column.id,
    }),
    columnCollaboratorTableHelper.accessor('userInfoDto', {
        cell: (info) => {
            const { avatarPath, ...rest } = info.getValue()
            const fullName =
                capitalize(rest.name.firstName) +
                ' ' +
                capitalize(rest.name.lastName)
            return (
                <div className="flex items-center justify-center gap-1 text-wrap">
                    <Avatar className="size-[2.875rem] shrink-0 justify-center items-center flex bg-lynch-200 rounded-full">
                        <AvatarImage src={avatarPath} />
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
    columnCollaboratorTableHelper.accessor('userInfoDto.role', {
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
    columnCollaboratorTableHelper.accessor('userInfoDto.email', {
        cell: (info) => <EmailBadge email={info.getValue()} />,
        header: 'Email',
        footer: (info) => info.column.id,
    }),
    columnCollaboratorTableHelper.accessor('userInfoDto.phone', {
        cell: (info) => <PhoneBadge phone={info.getValue()} />,
        header: 'Téléphone',
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
