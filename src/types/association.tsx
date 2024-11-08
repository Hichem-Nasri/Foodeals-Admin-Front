import { createColumnHelper } from '@tanstack/react-table'
import { PartnerSolutionType, PartnerStatusType } from './partnersType'
import { PaymentStatusType } from './PaymentType'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { EmailBadge } from '@/components/Partners/EmailBadge'
import { PhoneBadge } from '@/components/Partners/PhoneBadge'
import { PartnerSolution } from '@/components/Partners/PartnerSolution'
import { PaymentStatus } from '@/components/payment/PaymentStatus'
import { ActionsMenu } from '@/components/custom/ActionsMenu'
import { Archive, Eye, FileBadge, Pen, Store, Users } from 'lucide-react'
import { AppRoutes } from '@/lib/routes'
import { ContactType, PartnerInfoDto, ProfileType } from './GlobalType'
import { capitalize } from './utils'
import { getContract } from '@/lib/api/partner/getContract'

// export interface AssociationType {
//     id: string
//     createdAt: Date
//     logo: string
//     companyName: string
//     responsible: {
//         name: string
//         avatar: string
//     }
//     collaborators: number
//     donations: number
//     recovery: number
//     seats: number
//     association: number
//     city: string
//     accountType: string
//     email: string
//     phone: string
//     solution: PartnerSolutionType[]
//     status: PaymentStatusType
// }
export interface AssociationType {
    id: string
    createdAt: string
    partner: PartnerInfoDto
    responsible: ResponsableType
    users: number
    donations: number
    recovered: number
    subEntities: number
    associations: number
    status: string
    city: string
    solutions: string[]
    type: string
}

export interface ResponsableType {
    name: ProfileType['name']
    avatarPath: string
    email: string
    phone: string
}

const columnHelper = createColumnHelper<AssociationType>()

export const columnsAssociationsTable = (router: AppRouterInstance) => [
    columnHelper.accessor('createdAt', {
        cell: (info) => info.getValue(),
        header: 'Date de création',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('partner.avatarPath', {
        cell: (info) => (
            <Avatar>
                <AvatarImage src={info.getValue()} />
                <AvatarFallback>
                    {info.getValue() && info.getValue()[0].toUpperCase()}
                </AvatarFallback>
            </Avatar>
        ),
        header: 'Logo',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('partner.name', {
        cell: (info) => info.getValue(),
        header: 'Raison sociale',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('responsible', {
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
                            {fullName[0].toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    {fullName}
                </div>
            )
        },
        header: 'Responsable',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('subEntities', {
        cell: (info) => (info.getValue() === 0 ? 'N/A' : info.getValue()),
        header: 'Collaborateurs',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('donations', {
        cell: (info) => (info.getValue() === 0 ? 'N/A' : info.getValue()),
        header: 'Donation',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('recovered', {
        cell: (info) => (info.getValue() === 0 ? 'N/A' : info.getValue()),
        header: 'Récupération',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('users', {
        cell: (info) => (info.getValue() === 0 ? 'N/A' : info.getValue()),
        header: 'Sièges',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('associations', {
        cell: (info) => (info.getValue() === 0 ? 'N/A' : info.getValue()),
        header: 'Association',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('city', {
        cell: (info) => info.getValue(),
        header: 'Ville',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('type', {
        cell: (info) => info.getValue(),
        header: 'Type de compte',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('responsible.email', {
        cell: (info) => <EmailBadge email={info.getValue()} />,
        header: 'Email',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('responsible.phone', {
        cell: (info) => <PhoneBadge phone={info.getValue()} />,
        header: 'Téléphone',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('solutions', {
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
        header: 'Solution',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('status', {
        cell: (info) => (
            <PaymentStatus status={info.getValue() as PaymentStatusType} />
        ),
        header: 'Statut',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('id', {
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
                    actions: () => {
                        router.push(
                            AppRoutes.collaborator.replace(
                                ':id',
                                info.getValue()!
                            ) + 'mode=edit'
                        )
                    },
                    icon: Pen,
                    label: 'Modifier',
                },
            ]
            const subEntities = info.row.getValue('subEntities') as number
            const siage = info.row.getValue('users') as number
            const status = info.row.getValue('status') as PaymentStatusType
            if (subEntities > 0) {
                listActions.push({
                    actions: () =>
                        router.push(
                            AppRoutes.collaborator.replace(
                                ':id',
                                info.getValue()!
                            )
                        ),
                    icon: Users,
                    label: 'Collaborateurs',
                })
            }
            if (siage > 0) {
                listActions.push({
                    actions: () =>
                        router.push(
                            AppRoutes.sieges.replace(':id', info.getValue()!)
                        ),
                    icon: Store,
                    label: 'Sièges',
                })
            }
            if (status === PaymentStatusType.PAID) {
                listActions.push({
                    actions: async () => {
                        try {
                            const contractData = await getContract(
                                info.getValue()
                            )
                            const url = window.URL.createObjectURL(contractData)
                            window.open(url, '_blank') // Opens the contract in a new tab
                        } catch (error) {
                            console.error('Error opening contract:', error)
                        }
                    },
                    icon: FileBadge,
                    label: 'Contrat',
                })
            }
            listActions.push({
                actions: () => {
                    // const res = api.delete(`http://localhost:8080/api/v1/...`)
                    console.log('archive')
                },
                icon: Archive,
                label: 'Archiver',
            })
            return <ActionsMenu id={info.getValue()} menuList={listActions} />
        },
        header: 'Activité',
    }),
]

export const associationsData: AssociationType[] = [
    {
        id: '1',
        createdAt: new Date().toISOString().split('T')[0],
        partner: {
            id: '1',
            name: 'Company 1',
            avatarPath: 'https://via.placeholder.com/150',
        },
        responsible: {
            name: {
                firstName: 'John',
                lastName: 'Doe',
            },
            avatarPath: 'https://via.placeholder.com/150',
            email: 'tst@gmail.com',
            phone: '0123456789',
        },
        users: 5,
        donations: 100,
        recovered: 50,
        subEntities: 5,
        associations: 5,
        status: PartnerStatusType.VALID,
        city: 'Paris',
        solutions: [
            PartnerSolutionType.DONATE_PRO,
            PartnerSolutionType.DLC_PRO,
        ],
        type: 'Association',
    },
    {
        id: '2',
        createdAt: new Date().toISOString().split('T')[0],
        partner: {
            id: '2',
            name: 'Company 2',
            avatarPath: 'https://via.placeholder.com/150',
        },
        responsible: {
            name: {
                firstName: 'John',
                lastName: 'Doe',
            },
            avatarPath: 'https://via.placeholder.com/150',
            email: 'young@test.com',
            phone: '0123456789',
        },
        users: 5,
        donations: 100,
        recovered: 50,
        subEntities: 5,
        associations: 5,
        status: PartnerStatusType.VALID,
        city: 'Paris',
        solutions: [
            PartnerSolutionType.MARKET_PRO,
            PartnerSolutionType.DLC_PRO,
        ],
        type: 'Association',
    },
]

export interface SiegesType {
    id: string
    createAt: Date
    subAccount: string
    responsible: {
        name: string
        avatar: string
    }
    collaborators: number
    donation: number
    recovery: number
    email: string
    phone: string
    city: string
    solutions: PartnerSolutionType[]
}

const columnSiegesTableHelper = createColumnHelper<SiegesType>()

export const columnsSiegesTable = (router: AppRouterInstance) => [
    columnSiegesTableHelper.accessor('createAt', {
        cell: (info) => info.getValue().toLocaleDateString(),
        header: 'Date de création',
        footer: (info) => info.column.id,
    }),
    columnSiegesTableHelper.accessor('subAccount', {
        cell: (info) => info.getValue(),
        header: 'Sous compte',
        footer: (info) => info.column.id,
    }),
    columnSiegesTableHelper.accessor('responsible', {
        cell: (info) => (
            <div className="flex items-center gap-1">
                <Avatar>
                    <AvatarImage src={info.getValue().avatar} />
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
    columnSiegesTableHelper.accessor('collaborators', {
        cell: (info) => (info.getValue() === 0 ? 'N/A' : info.getValue()),
        header: 'Collaborateurs',
        footer: (info) => info.column.id,
    }),
    columnSiegesTableHelper.accessor('donation', {
        cell: (info) => (info.getValue() === 0 ? 'N/A' : info.getValue()),
        header: 'Donation',
        footer: (info) => info.column.id,
    }),
    columnSiegesTableHelper.accessor('recovery', {
        cell: (info) => (info.getValue() === 0 ? 'N/A' : info.getValue()),
        header: 'Récupération',
        footer: (info) => info.column.id,
    }),
    columnSiegesTableHelper.accessor('email', {
        cell: (info) => <EmailBadge email={info.getValue()} />,
        header: 'Email',
        footer: (info) => info.column.id,
    }),
    columnSiegesTableHelper.accessor('phone', {
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
        cell: (info) => (
            <ActionsMenu
                id={info.getValue()}
                menuList={[
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
                ]}
            />
        ),
        header: 'Activité',
    }),
]

export const siegesData: SiegesType[] = [
    {
        id: '1',
        createAt: new Date(),
        subAccount: 'Company 1',
        responsible: {
            name: 'John Doe',
            avatar: 'https://via.placeholder.com/150',
        },
        collaborators: 5,
        donation: 100,
        recovery: 50,
        email: 'Company@gmail.com',
        phone: '0123456789',
        city: 'Paris',
        solutions: [
            PartnerSolutionType.DONATE_PRO,
            PartnerSolutionType.DLC_PRO,
        ],
    },
    {
        id: '2',
        createAt: new Date(),
        subAccount: 'Company 2',
        responsible: {
            name: 'John Doe',
            avatar: 'https://via.placeholder.com/150',
        },
        collaborators: 5,
        donation: 100,
        recovery: 50,
        email: 'Company@gmail.com',
        phone: '0123456789',
        city: 'Paris',
        solutions: [
            PartnerSolutionType.MARKET_PRO,
            PartnerSolutionType.DLC_PRO,
        ],
    },
]
