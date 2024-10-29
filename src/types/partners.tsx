import api from '@/api/Auth'
import { ActionsMenu, ActionType } from '@/components/custom/ActionsMenu'
import { EmailBadge } from '@/components/Partners/EmailBadge'
import { PartnerContractStatus } from '@/components/Partners/PartnerContractStatus'
import { PartnerSolution } from '@/components/Partners/PartnerSolution'
import { PartnerStatus } from '@/components/Partners/PartnerStatus'
import { PhoneBadge } from '@/components/Partners/PhoneBadge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { AppRoutes } from '@/lib/routes'
import { createColumnHelper } from '@tanstack/react-table'
import { Archive, Eye, FileBadge, Pencil, Store, Users } from 'lucide-react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { ContactType, PartnerEntitiesType, PartnerInfoDto } from './GlobalType'

export enum PartnerStatusType {
    VALID = 'VALID',
    IN_PROGRESS = 'IN_PROGRESS',
    CANCELED = 'CANCELED',
    DRAFT = 'DRAFT',
}

export enum ContractStatus {
    IN_PROGRESS = 'IN_PROGRESS',
    VALIDATED = 'VALIDATED',
    REJECTED = 'REJECTED',
}

export const PartnerStatusOptions = {
    ['IN_PROGRESS']: PartnerStatusType.IN_PROGRESS,
    ['VALID']: PartnerStatusType.VALID,
    ['CANCELED']: PartnerStatusType.CANCELED,
    ['DRAFT']: PartnerStatusType.DRAFT,
}

export enum PartnerSolutionType {
    MARKET_PRO = 'pro_market',
    DLC_PRO = 'pro_dlc',
    DONATE_PRO = 'pro_donate',
    NONE = 'PAS DE SOLUTION',
}

export enum PartnerCompanyType {
    NORMAL = 'Normal',
    PRINCIPAL = 'Principal',
}

export const PartnerCompanyTypeOptions = {
    ['NORMAL_PARTNER']: PartnerCompanyType.NORMAL,
    ['PARTNER_WITH_SB']: PartnerCompanyType.PRINCIPAL,
}

export const SolutionsTypeOptions = {
    ['pro_donate']: PartnerSolutionType.DONATE_PRO,
    ['pro_market']: PartnerSolutionType.MARKET_PRO,
    ['pro_dlc']: PartnerSolutionType.DLC_PRO,
}

export const exportSolutionType = (solutions: string[]) => {
    const newSolution: PartnerSolutionType[] = []
    solutions.forEach((elem) => {
        newSolution.push(
            SolutionsTypeOptions[elem as keyof typeof SolutionsTypeOptions]
        )
    })
    return newSolution
}

export interface PartnerType {
    id?: string
    offers: number
    orders: number
    users: number
    subEntities: number
    type: PartnerEntitiesType
    city: string
    solutions: PartnerSolutionType[]
    createdAt: string
    partnerInfoDto: PartnerInfoDto
    contractStatus: ContractStatus
    logo: string
    contactDto: ContactType
}
export type SubAccountPartners = Omit<
    PartnerType,
    'contractStatus' | 'subEntities'
> & {
    ref: string
}

// export const SubAccountData: SubAccountPartners[] = [
//     {
//         id: '1',
//         createdAt: '2024-05-02',
//         logo: 'https://api.dicebear.com/7.x/bottts/png?seed=MarjaneGourmet',
//         companyName: 'Marjane Gourmet',
//         users: 102,
//         email: 'example@gmail.com',
//         phone: '+212 0663 65 36 98',
//         city: 'Casablanca',
//         solutions: [
//             PartnerSolutionType.MARKET_PRO,
//             PartnerSolutionType.DONATE_PRO,
//         ],
//         ref: 'REF-001',
//         offers: 25,
//         orders: 233,
//         type: PartnerEntitiesType.SUB_ENTITY,
//     },
// ]

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

const columnHelper = createColumnHelper<PartnerType>()

export const columnsPartnersTable = (router: AppRouterInstance) => [
    columnHelper.accessor('createdAt', {
        cell: (info) => info.getValue(),
        header: 'Date de création',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('logo', {
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
    columnHelper.accessor('partnerInfoDto.name', {
        cell: (info) => info.getValue(),
        header: 'Raison sociale',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('offers', {
        cell: (info) => info.getValue(),
        header: 'Raison sociale',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('users', {
        cell: (info) => info.getValue(),
        header: 'Collaborateurs',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('subEntities', {
        cell: (info) => info.getValue(),
        header: 'Sous compte',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('contractStatus', {
        cell: (info) => <PartnerContractStatus status={info.getValue()} />,
        header: 'Statut',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('contactDto.email', {
        cell: (info) => <EmailBadge email={info.getValue()} />,
        header: 'Email',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('contactDto.phone', {
        cell: (info) => <PhoneBadge phone={info.getValue()} />,
        header: 'Téléphone',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('city', {
        cell: (info) => info.getValue(),
        header: 'Ville',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('type', {
        cell: (info) =>
            info.getValue() === PartnerEntitiesType.PARTNER_SB
                ? 'Principal'
                : 'Normal',
        header: 'Type de compte',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('solutions', {
        cell: (info) => (
            <div className="flex items-center gap-1">
                {info.getValue().map((solutions) => (
                    <PartnerSolution solution={solutions} key={solutions} />
                ))}
            </div>
        ),
        header: 'Solution',
        footer: (info) => info.column.id,
        filterFn: (rows, id, filterValue) => {
            const solutions = rows.original.solutions.sort() //example: ['MARKET_PRO', 'DLC_PRO', 'DONATE_PRO']
            const mySolution = filterValue.sort() // example:  ['MARKET_PRO', 'DLC_PRO']
            return mySolution.every((solutions: PartnerSolutionType) =>
                solutions.includes(solutions)
            )
        },
    }),
    columnHelper.accessor('id', {
        cell: (info) => {
            const found =
                info.row.original.type === PartnerEntitiesType.SUB_ENTITY

            // Define common actions
            const commonActions: ActionType[] = [
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
                                info.getValue()! + '?mode=edit'
                            )
                        ),
                    icon: Pencil,
                    label: 'Modifier',
                },
                {
                    actions: (id) =>
                        router.push(AppRoutes.collaborator.replace(':id', id)),
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
                {
                    actions: () => {
                        // const res = api.delete(`http://localhost:8080/api/v1/...`)
                        console.log('archive')
                    },
                    icon: Archive,
                    label: 'Archiver',
                },
            ]

            // Define principal actions
            const principalActions: ActionType[] = found
                ? [
                      {
                          actions: () =>
                              router.push(
                                  AppRoutes.subAccountPartner.replace(
                                      ':id',
                                      info.getValue()!
                                  )
                              ),
                          icon: Store,
                          label: 'Sous Comptes',
                      },
                  ]
                : []

            const menuList: ActionType[] = [
                ...commonActions.slice(0, 2),
                ...principalActions,
                ...commonActions.slice(2),
            ]

            return <ActionsMenu id={info.getValue()} menuList={menuList} />
        },
        header: 'Activité',
    }),
]
