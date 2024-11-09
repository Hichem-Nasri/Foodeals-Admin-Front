import { ActionsMenu } from '@/components/custom/ActionsMenu'
import { EmailBadge } from '@/components/Partners/EmailBadge'
import { PartnerSolution } from '@/components/Partners/PartnerSolution'
import { PhoneBadge } from '@/components/Partners/PhoneBadge'
import { AppRoutes } from '@/lib/routes'
import { SiegesType } from '@/types/association'
import { PartnerSolutionType } from '@/types/partnersType'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { createColumnHelper } from '@tanstack/react-table'
import { Eye, Pen, Archive, Store, Users } from 'lucide-react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

const columnSiegesTableHelper = createColumnHelper<SiegesType>()

export const columnsSiegesTable = (router: AppRouterInstance) => [
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
            const listActions = [
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
                    actions: () => console.log('archive'),
                    icon: Archive,
                    label: 'Archiver',
                },
                {
                    actions: () => console.log('association'),
                    icon: Store,
                    label: 'Association',
                },
            ]
            const users = info.row.getValue('users') as number
            if (users > 0) {
                listActions.push({
                    actions: () =>
                        router.push(
                            AppRoutes.collaborator.replace(
                                ':id',
                                info.getValue()!
                            ) + '?mode=users'
                        ),
                    icon: Users,
                    label: 'Collaborateurs',
                })
            }
            return <ActionsMenu id={info.getValue()} menuList={listActions} />
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
