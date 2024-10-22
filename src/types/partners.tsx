import api from '@/api/Auth'
import { ActionsMenu, ActionType } from '@/components/custom/ActionsMenu'
import { EmailBadge } from '@/components/Partners/EmailBadge'
import { PartnerSolution } from '@/components/Partners/PartnerSolution'
import { PartnerStatus } from '@/components/Partners/PartnerStatus'
import { PhoneBadge } from '@/components/Partners/PhoneBadge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { AppRoutes } from '@/lib/routes'
import { createColumnHelper } from '@tanstack/react-table'
import { Archive, Eye, FileBadge, Pencil, Store, Users } from 'lucide-react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

export enum PartnerStatusType {
    VALIDATED = 'VALIDATED',
    PENDING = 'PENDING',
    ANNULLED = 'ANNULLED',
    DRAFT = 'DRAFT',
}

export const PartnerStatusOptions = {
    ['IN_PROGRESS']: PartnerStatusType.PENDING,
    ['VALIDATED']: PartnerStatusType.VALIDATED,
    ['ANNULLED']: PartnerStatusType.ANNULLED,
    ['DRAFT']: PartnerStatusType.DRAFT,
}

export enum PartnerSolutionType {
    MARKET_PRO = 'MARKET_PRO',
    DLC_PRO = 'DLC_PRO',
    DONATE_PRO = 'DONATE',
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
    createdAt: Date
    logo: string
    companyName: string
    collaborators: number
    subAccount: number
    manager: {
        name: string
        avatar: string
    }
    status: PartnerStatusType
    email: string
    phone: string
    city: string
    companyType: PartnerCompanyType
    solution: PartnerSolutionType[]
    offer: number
    order: number
}
export type SubAccountPartners = Omit<
    PartnerType,
    'manager' | 'status' | 'subAccount'
> & {
    ref: string
}

export const SubAccountData: SubAccountPartners[] = [
    {
        id: '1',
        createdAt: new Date('2024-05-02'),
        logo: 'https://api.dicebear.com/7.x/bottts/png?seed=MarjaneGourmet',
        companyName: 'Marjane Gourmet',
        collaborators: 102,
        email: 'example@gmail.com',
        phone: '+212 0663 65 36 98',
        city: 'Casablanca',
        solution: [
            PartnerSolutionType.MARKET_PRO,
            PartnerSolutionType.DONATE_PRO,
        ],
        ref: 'REF-001',
        offer: 25,
        order: 233,
        companyType: PartnerCompanyType.PRINCIPAL,
    },
]

export const partnersData: PartnerType[] = [
    {
        id: '1',
        createdAt: new Date('2024-05-02'),
        logo: 'https://api.dicebear.com/7.x/bottts/png?seed=MarjaneGourmet',
        companyName: 'Marjane Gourmet',
        collaborators: 102,
        subAccount: 0,
        manager: {
            name: 'Amine SABIR',
            avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=AmineSABIR',
        },
        status: PartnerStatusType.VALIDATED,
        email: 'a.sabir@marjanegourmet.ma',
        phone: '+212 0663 65 36 98',
        city: 'Casablanca',
        solution: [
            PartnerSolutionType.MARKET_PRO,
            PartnerSolutionType.DONATE_PRO,
        ],
        offer: 25,
        order: 233,
        companyType: PartnerCompanyType.NORMAL,
    },
    {
        id: '2',
        createdAt: new Date('2022-05-15'),
        logo: 'https://api.dicebear.com/7.x/bottts/png?seed=MarjaneHolding',
        companyName: 'Marjane Holding',
        collaborators: 50,
        subAccount: 15,
        manager: {
            name: 'Michael Jone',
            avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=MichaelJone',
        },
        status: PartnerStatusType.PENDING,
        email: 'm.jone@marjane.ma',
        phone: '+212 0663 65 36 98',
        city: 'Rabat',
        solution: [
            PartnerSolutionType.MARKET_PRO,
            PartnerSolutionType.DLC_PRO,
            PartnerSolutionType.DONATE_PRO,
        ],
        offer: 25,
        order: 233,
        companyType: PartnerCompanyType.PRINCIPAL,
    },
    {
        id: '3',
        createdAt: new Date('2022-05-15'),
        logo: 'https://api.dicebear.com/7.x/bottts/png?seed=MarjaneMarket',
        companyName: 'Marjane Market',
        collaborators: 26,
        subAccount: 0,
        manager: {
            name: 'Jamila SARGHINI',
            avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=JamilaSARGHINI',
        },
        status: PartnerStatusType.PENDING,
        email: 'j.sarghini@marjanemarket.ma',
        phone: '+212 0663 65 36 98',
        city: 'Casablanca',
        solution: [PartnerSolutionType.MARKET_PRO, PartnerSolutionType.DLC_PRO],
        offer: 25,
        order: 233,
        companyType: PartnerCompanyType.PRINCIPAL,
    },
    {
        id: '4',
        createdAt: new Date('2022-05-15'),
        logo: 'https://api.dicebear.com/7.x/bottts/png?seed=BIM',
        companyName: 'BIM',
        collaborators: 220,
        subAccount: 50,
        manager: {
            name: 'Wade Warren',
            avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=WadeWarren',
        },
        status: PartnerStatusType.ANNULLED,
        email: 'j.sarghini@marjanemarket.ma',
        phone: '+212 0663 65 36 98',
        city: 'Fes',
        solution: [PartnerSolutionType.MARKET_PRO],
        offer: 25,
        order: 233,
        companyType: PartnerCompanyType.NORMAL,
    },
    {
        id: '5',
        createdAt: new Date('2022-05-15'),
        logo: 'https://api.dicebear.com/7.x/bottts/png?seed=Chari',
        companyName: 'Chari',
        collaborators: 66,
        subAccount: 10,
        manager: {
            name: 'Esther Howard',
            avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=EstherHoward',
        },
        status: PartnerStatusType.VALIDATED,
        email: 'j.sarghini@marjanemarket.ma',
        phone: '+212 0663 65 36 98',
        city: 'Casablanca',
        solution: [PartnerSolutionType.DLC_PRO],
        offer: 25,
        order: 233,
        companyType: PartnerCompanyType.PRINCIPAL,
    },
    {
        id: '6',
        createdAt: new Date('2024-05-15'),
        logo: 'https://api.dicebear.com/7.x/bottts/png?seed=Paul',
        companyName: 'Paul',
        collaborators: 56,
        subAccount: 6,
        manager: {
            name: 'Arlene McCoy',
            avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=ArleneMcCoy',
        },
        status: PartnerStatusType.PENDING,
        email: 'j.sarghini@marjanemarket.ma',
        phone: '+212 0663 65 36 98',
        city: 'Agadir',
        solution: [PartnerSolutionType.DLC_PRO],
        offer: 25,
        order: 233,
        companyType: PartnerCompanyType.PRINCIPAL,
    },
    {
        id: '7',
        createdAt: new Date('2023-05-15'),
        logo: 'https://api.dicebear.com/7.x/bottts/png?seed=LabelVie',
        companyName: 'Label vie',
        collaborators: 23,
        subAccount: 23,
        manager: {
            name: 'Bessie Cooper',
            avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=BessieCooper',
        },
        status: PartnerStatusType.VALIDATED,
        email: 'j.sarghini@marjanemarket.ma',
        phone: '+212 0663 65 36 98',
        city: 'Casablanca',
        solution: [PartnerSolutionType.MARKET_PRO, PartnerSolutionType.DLC_PRO],
        offer: 25,
        order: 233,
        companyType: PartnerCompanyType.NORMAL,
    },
    {
        id: '8',
        createdAt: new Date('2022-05-15'),
        logo: 'https://api.dicebear.com/7.x/bottts/png?seed=Ikea',
        companyName: 'Ikea',
        collaborators: 50,
        subAccount: 5,
        manager: {
            name: 'Robert Fox',
            avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=RobertFox',
        },
        status: PartnerStatusType.ANNULLED,
        email: 'j.sarghini@marjanemarket.ma',
        phone: '+212 0663 65 36 98',
        city: 'Casablanca',
        solution: [PartnerSolutionType.MARKET_PRO, PartnerSolutionType.DLC_PRO],
        offer: 25,
        order: 233,
        companyType: PartnerCompanyType.PRINCIPAL,
    },
]

const columnHelperSubAccount = createColumnHelper<SubAccountPartners>()

export const columnsSubAccountTable = (router: AppRouterInstance) => [
    columnHelperSubAccount.accessor('createdAt', {
        cell: (info) => info.getValue<Date>().toLocaleDateString(),
        header: 'Date de création',
        footer: (info) => info.column.id,
        filterFn: (row, columnId, filterValue) => {
            const parse = (date: string) => {
                const dateArray = date.split('/')
                return `${dateArray[1]}/${dateArray[0]}/${dateArray[2]}`
            }
            const startDate = new Date(parse(filterValue[0]))
            const endDate = new Date(parse(filterValue[1]))
            const date = row.original.createdAt
            if (date >= startDate && date <= endDate) {
                return true
            }
            return false
        },
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
    columnHelperSubAccount.accessor('companyName', {
        cell: (info) => info.getValue(),
        header: 'Raison sociale',
        footer: (info) => info.column.id,
        filterFn: (rows, id, filterValue) => {
            return filterValue.includes(rows.original.companyName)
        },
    }),
    columnHelperSubAccount.accessor('offer', {
        cell: (info) => (info.getValue() === 0 ? 'N/A' : info.getValue()),
        header: 'Offres',
        footer: (info) => info.column.id,
    }),
    columnHelperSubAccount.accessor('order', {
        cell: (info) => (info.getValue() === 0 ? 'N/A' : info.getValue()),
        header: 'Commandes',
        footer: (info) => info.column.id,
    }),
    columnHelperSubAccount.accessor('collaborators', {
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
    columnHelperSubAccount.accessor('email', {
        cell: (info) => <EmailBadge email={info.getValue()} />,
        header: 'Email',
        footer: (info) => info.column.id,
    }),
    columnHelperSubAccount.accessor('phone', {
        cell: (info) => <PhoneBadge phone={info.getValue()} />,
        header: 'Téléphone',
        footer: (info) => info.column.id,
    }),
    columnHelperSubAccount.accessor('solution', {
        cell: (info) => (
            <div className="flex items-center gap-1">
                {info.getValue().map((solution) => (
                    <PartnerSolution solution={solution} key={solution} />
                ))}
            </div>
        ),
        header: 'Solution',
        footer: (info) => info.column.id,
        filterFn: (rows, id, filterValue) => {
            const solutions = rows.original.solution.sort() //example: ['MARKET_PRO', 'DLC_PRO', 'DONATE_PRO']
            const mySolution = filterValue.sort() // example:  ['MARKET_PRO', 'DLC_PRO']
            return mySolution.every((solution: PartnerSolutionType) =>
                solutions.includes(solution)
            )
        },
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
        cell: (info) => info.getValue<Date>().toLocaleDateString(),
        header: 'Date de création',
        footer: (info) => info.column.id,
        filterFn: (row, columnId, filterValue) => {
            const parse = (date: string) => {
                const dateArray = date.split('/')
                return `${dateArray[1]}/${dateArray[0]}/${dateArray[2]}`
            }
            const startDate = new Date(parse(filterValue[0]))
            const endDate = new Date(parse(filterValue[1]))
            const date = row.original.createdAt
            if (date >= startDate && date <= endDate) {
                return true
            }
            return false
        },
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
    columnHelper.accessor('companyName', {
        cell: (info) => info.getValue(),
        header: 'Raison sociale',
        footer: (info) => info.column.id,
        filterFn: (rows, id, filterValue) => {
            return filterValue.includes(rows.original.companyName)
        },
    }),
    columnHelper.accessor('offer', {
        cell: (info) => info.getValue(),
        header: 'Raison sociale',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('collaborators', {
        cell: (info) => info.getValue(),
        header: 'Collaborateurs',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('subAccount', {
        cell: (info) => info.getValue(),
        header: 'Sous compte',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('manager', {
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
        filterFn: (rows, id, filterValue) => {
            return filterValue.includes(rows.original.manager.name)
        },
    }),
    columnHelper.accessor('status', {
        cell: (info) => <PartnerStatus status={info.getValue()} />,
        header: 'Statut',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('email', {
        cell: (info) => <EmailBadge email={info.getValue()} />,
        header: 'Email',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('phone', {
        cell: (info) => <PhoneBadge phone={info.getValue()} />,
        header: 'Téléphone',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('city', {
        cell: (info) => info.getValue(),
        header: 'Ville',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('companyType', {
        cell: (info) => info.getValue(),
        header: 'Type de compte',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('solution', {
        cell: (info) => (
            <div className="flex items-center gap-1">
                {info.getValue().map((solution) => (
                    <PartnerSolution solution={solution} key={solution} />
                ))}
            </div>
        ),
        header: 'Solution',
        footer: (info) => info.column.id,
        filterFn: (rows, id, filterValue) => {
            const solutions = rows.original.solution.sort() //example: ['MARKET_PRO', 'DLC_PRO', 'DONATE_PRO']
            const mySolution = filterValue.sort() // example:  ['MARKET_PRO', 'DLC_PRO']
            return mySolution.every((solution: PartnerSolutionType) =>
                solutions.includes(solution)
            )
        },
    }),
    columnHelper.accessor('id', {
        cell: (info) => {
            const found =
                info.row.original.companyType === PartnerCompanyType.PRINCIPAL

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
                                info.getValue()!
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
