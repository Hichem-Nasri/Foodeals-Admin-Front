import { ActionsMenu } from '@/components/custom/ActionsMenu'
import { EmailBadge } from '@/components/Partners/EmailBadge'
import { PartnerSolution } from '@/components/Partners/PartnerSolution'
import { PhoneBadge } from '@/components/Partners/PhoneBadge'
import { PaymentStatus } from '@/components/payment/PaymentStatus'
import { getContract } from '@/lib/api/partner/getContract'
import { AppRoutes } from '@/lib/routes'
import { AssociationType } from '@/types/association'
import { PartnerInfoDto } from '@/types/GlobalType'
import { PartnerSolutionType, PartnerStatusType } from '@/types/partnersType'
import { PaymentStatusType } from '@/types/PaymentType'
import { capitalize } from '@/types/utils'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { createColumnHelper } from '@tanstack/react-table'
import { Eye, Pen, Users, Store, FileBadge, Archive } from 'lucide-react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

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
    columnHelper.accessor('partner', {
        cell: (info) => info.getValue().name,
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
        cell: (info) =>
            info.getValue() == 'ASSOCIATION'
                ? 'Association'
                : 'Banque Alimentaire',
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
            const id = (info.row.getValue('partner') as PartnerInfoDto)
                .id as string
            const listActions = [
                {
                    actions: () =>
                        router.push(
                            AppRoutes.newAssociation.replace(':id', id!)
                        ),
                    icon: Eye,
                    label: 'Voir',
                },
                {
                    actions: () => {
                        router.push(
                            AppRoutes.newAssociation.replace(':id', id!) +
                                '?mode=edit'
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
                        router.push(AppRoutes.collaborator.replace(':id', id!)),
                    icon: Users,
                    label: 'Collaborateurs',
                })
            }
            if (siage > 0) {
                listActions.push({
                    actions: () =>
                        router.push(AppRoutes.sieges.replace(':id', id!)),
                    icon: Store,
                    label: 'Sièges',
                })
            }
            if (status === PaymentStatusType.PAID) {
                listActions.push({
                    actions: async () => {
                        try {
                            const contractData = await getContract(id)
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
            return <ActionsMenu id={id} menuList={listActions} />
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
