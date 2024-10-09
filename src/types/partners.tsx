import { ActionsMenu } from '@/components/custom/ActionsMenu'
import { EmailBadge } from '@/components/Partners/EmailBadge'
import { PartnerSolution } from '@/components/Partners/PartnerSolution'
import { PartnerStatus } from '@/components/Partners/PartnerStatus'
import { PhoneBadge } from '@/components/Partners/PhoneBadge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { AppRoutes } from '@/lib/routes'
import { createColumnHelper } from '@tanstack/react-table'
import { Eye, Pencil, Users } from 'lucide-react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

export enum PartnerStatusType {
    VALIDATED = 'VALIDATED',
    PENDING = 'PENDING',
    ANNULLED = 'ANNULLED',
    DRAFT = 'DRAFT',
}

export enum PartnerSolutionType {
    MARKET_PRO = 'MARKET_PRO',
    DLC_PRO = 'DLC_PRO',
    DONATE_PRO = 'DONATE',
    NONE = 'PAS DE SOLUTION',
}

export enum PartnerCompanyType {
    UNDER_ACCOUNT = 'UNDER_ACCOUNT',
    PRINCIPAL = 'PRINCIPAL',
}

export interface PartnerType {
    id?: string
    createdAt: Date
    logo: string
    companyName: string
    collaborators: number
    underAccount: number
    manager: {
        name: string
        avatar: string
    }
    status: PartnerStatusType
    email: string
    phone: string
    city: string
    solution: PartnerSolutionType[]
    companyType: PartnerCompanyType
    offer: number
    order: number
}

export const partnersData: PartnerType[] = [
    {
        id: '1',
        createdAt: new Date('2024-05-02'),
        logo: 'https://api.dicebear.com/7.x/bottts/png?seed=MarjaneGourmet',
        companyName: 'Marjane Gourmet',
        collaborators: 102,
        underAccount: 0,
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
        companyType: PartnerCompanyType.UNDER_ACCOUNT,
        offer: 25,
        order: 233,
    },
    {
        id: '2',
        createdAt: new Date('2022-05-15'),
        logo: 'https://api.dicebear.com/7.x/bottts/png?seed=MarjaneHolding',
        companyName: 'Marjane Holding',
        collaborators: 50,
        underAccount: 15,
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
        companyType: PartnerCompanyType.PRINCIPAL,
        offer: 25,
        order: 233,
    },
    {
        id: '3',
        createdAt: new Date('2022-05-15'),
        logo: 'https://api.dicebear.com/7.x/bottts/png?seed=MarjaneMarket',
        companyName: 'Marjane Market',
        collaborators: 26,
        underAccount: 0,
        manager: {
            name: 'Jamila SARGHINI',
            avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=JamilaSARGHINI',
        },
        status: PartnerStatusType.PENDING,
        email: 'j.sarghini@marjanemarket.ma',
        phone: '+212 0663 65 36 98',
        city: 'Casablanca',
        solution: [PartnerSolutionType.MARKET_PRO, PartnerSolutionType.DLC_PRO],
        companyType: PartnerCompanyType.UNDER_ACCOUNT,
        offer: 25,
        order: 233,
    },
    {
        id: '4',
        createdAt: new Date('2022-05-15'),
        logo: 'https://api.dicebear.com/7.x/bottts/png?seed=BIM',
        companyName: 'BIM',
        collaborators: 220,
        underAccount: 50,
        manager: {
            name: 'Wade Warren',
            avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=WadeWarren',
        },
        status: PartnerStatusType.ANNULLED,
        email: 'j.sarghini@marjanemarket.ma',
        phone: '+212 0663 65 36 98',
        city: 'Fes',
        solution: [PartnerSolutionType.MARKET_PRO],
        companyType: PartnerCompanyType.PRINCIPAL,
        offer: 25,
        order: 233,
    },
    {
        id: '5',
        createdAt: new Date('2022-05-15'),
        logo: 'https://api.dicebear.com/7.x/bottts/png?seed=Chari',
        companyName: 'Chari',
        collaborators: 66,
        underAccount: 10,
        manager: {
            name: 'Esther Howard',
            avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=EstherHoward',
        },
        status: PartnerStatusType.VALIDATED,
        email: 'j.sarghini@marjanemarket.ma',
        phone: '+212 0663 65 36 98',
        city: 'Casablanca',
        solution: [PartnerSolutionType.DLC_PRO],
        companyType: PartnerCompanyType.PRINCIPAL,
        offer: 25,
        order: 233,
    },
    {
        id: '6',
        createdAt: new Date('2022-05-15'),
        logo: 'https://api.dicebear.com/7.x/bottts/png?seed=Paul',
        companyName: 'Paul',
        collaborators: 56,
        underAccount: 6,
        manager: {
            name: 'Arlene McCoy',
            avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=ArleneMcCoy',
        },
        status: PartnerStatusType.PENDING,
        email: 'j.sarghini@marjanemarket.ma',
        phone: '+212 0663 65 36 98',
        city: 'Agadir',
        solution: [PartnerSolutionType.DLC_PRO],
        companyType: PartnerCompanyType.PRINCIPAL,
        offer: 25,
        order: 233,
    },
    {
        id: '7',
        createdAt: new Date('2022-05-15'),
        logo: 'https://api.dicebear.com/7.x/bottts/png?seed=LabelVie',
        companyName: 'Label vie',
        collaborators: 23,
        underAccount: 23,
        manager: {
            name: 'Bessie Cooper',
            avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=BessieCooper',
        },
        status: PartnerStatusType.VALIDATED,
        email: 'j.sarghini@marjanemarket.ma',
        phone: '+212 0663 65 36 98',
        city: 'Casablanca',
        solution: [PartnerSolutionType.MARKET_PRO, PartnerSolutionType.DLC_PRO],
        companyType: PartnerCompanyType.PRINCIPAL,
        offer: 25,
        order: 233,
    },
    {
        id: '8',
        createdAt: new Date('2022-05-15'),
        logo: 'https://api.dicebear.com/7.x/bottts/png?seed=Ikea',
        companyName: 'Ikea',
        collaborators: 50,
        underAccount: 5,
        manager: {
            name: 'Robert Fox',
            avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=RobertFox',
        },
        status: PartnerStatusType.ANNULLED,
        email: 'j.sarghini@marjanemarket.ma',
        phone: '+212 0663 65 36 98',
        city: 'Casablanca',
        solution: [PartnerSolutionType.MARKET_PRO, PartnerSolutionType.DLC_PRO],
        companyType: PartnerCompanyType.PRINCIPAL,
        offer: 25,
        order: 233,
    },
]

const columnHelper = createColumnHelper<PartnerType>()

export const columnsPartnersTable = (router: AppRouterInstance) => [
    columnHelper.accessor('createdAt', {
        cell: (info) => info.getValue<Date>().toLocaleDateString(),
        header: 'Date de création',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('logo', {
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
    columnHelper.accessor('companyName', {
        cell: (info) => info.getValue(),
        header: 'Raison sociale',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('offer', {
        cell: (info) => info.getValue(),
        header: 'Raison sociale',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('collaborators', {
        cell: (info) => (info.getValue() === 0 ? 'N/A' : info.getValue()),
        header: 'Collaborateurs',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('underAccount', {
        cell: (info) => (info.getValue() === 0 ? 'N/A' : info.getValue()),
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
    }),
    columnHelper.accessor('companyType', {
        cell: (info) =>
            info.getValue() === PartnerCompanyType.PRINCIPAL
                ? 'Principal'
                : 'Sous compte',
        header: 'Type de société',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('id', {
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
                        actions: (id) =>
                            router.push(
                                AppRoutes.collaborator.replace(':id', id)
                            ),
                        icon: Users,
                        label: 'Collaborateurs',
                    },
                ]}
            />
        ),
        header: 'Activité',
    }),
]
