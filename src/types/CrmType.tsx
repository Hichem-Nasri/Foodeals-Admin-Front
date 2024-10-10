import { ActionsMenu } from '@/components/custom/ActionsMenu'
import { EmailBadge } from '@/components/Partners/EmailBadge'
import { PhoneBadge } from '@/components/Partners/PhoneBadge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { AppRoutes } from '@/lib/routes'
import { createColumnHelper } from '@tanstack/react-table'
import {
    Archive,
    CheckCheck,
    Eye,
    FileMinus,
    Icon,
    LoaderCircle,
    Pencil,
    Rocket,
    X,
} from 'lucide-react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { PartnerSolutionType } from './partners'
import { PartnerSolution } from '@/components/Partners/PartnerSolution'
import React from 'react'

import { DetailsEvenetProspect } from '@/components/crm/NewEvent/DetailsEvenet'
import { CustomButton } from '@/components/custom/CustomButton'
import { IconStatus, StyleStatus } from './utils'
import axios from 'axios'

export interface EvenetType {
    date: string
    object: string
    message: string
    lead: number
}

export interface EvenetData {
    id: string
    createdAt: string
    lead: {
        name: {
            firstName: string
            lastName: string
        }
        avatarPath: string
    }
    dateAndTime: string
    object: string
    message: string
}

export enum PartnerStatusType {
    VALID = 'VALIDER',
    PENDING = 'EN COURS',
    DRAFT = 'BROUILLON',
    CANCELED = 'ANNULER',
}

const StatusCrm = {
    ['VALIDER']: 'VALID',
    ['EN COURS']: 'PENDING',
    ['BROUILLON']: 'DRAFT',
    ['ANNULER']: 'CANCELED',
}

export const defaultValuesConfirmCrm = {
    id: '1',
    store: {
        id: '1',
        avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=Ikea',
        name: 'Nom du magasin',
    },
    dateOfReception: new Date(),
    amount: 25000,
    transmitter: 'Amine Ben',
    document: {
        fileName: 'Justificatif de la commission.word',
        fileUrl: '',
    },
}

export interface CrmInformationSchemaType {
    companyName: string
    category: string[]
    responsable: string
    managerInfo: string // id
    creatorInfo: string // id
    phone: string
    email: string
    country: string
    city: string
    region: string
    address: string
}

export interface CrmObjectType {
    object: string
    message: string
}

export interface CrmType {
    id: string
    date: Date
    companyName: string
    category: string
    responsable: {
        firstName: string
        lastName: string
    }
    email: string
    phone: string
    city: string
    address: string
    country: string
    region: string
    solutions: PartnerSolutionType[]
    creatorInfo: {
        name: {
            firstName: string
            lastName: string
        }
        avatar: string
    }
    managerInfo: {
        name: {
            firstName: string
            lastName: string
        }
        avatar: string
    }
    status: PartnerStatusType
    eventObject: string
    // events?: EvenetType[]
}

export interface ProspectType {
    key: string
    creatorInfo: {
        name: {
            firstName: string
            lastName: string
        }
        avatar: string
    }
    object: string
    details: {
        message: string
    }
    date: Date
}
const columnProspectHelper = createColumnHelper<ProspectType>()
const columnHelper = createColumnHelper<CrmType>()

export const columnsProspectTable = (router: AppRouterInstance) => [
    columnProspectHelper.accessor('key', {
        cell: (info) => (
            <span className="max-w-16">
                {info.getValue().toString().padStart(3, '0')}
            </span>
        ),
        header: 'ID',
        size: 4,
        footer: (info) => info.column.id,
    }),
    columnProspectHelper.accessor('creatorInfo', {
        cell: (info) => {
            const fullName = `${info
                .getValue()
                .name.firstName.charAt(0)
                .toUpperCase()}${info
                .getValue()
                .name.firstName.slice(1)
                .toLowerCase()} ${info
                .getValue()
                .name.lastName.charAt(0)
                .toUpperCase()}${info
                .getValue()
                .name.lastName.slice(1)
                .toLowerCase()}`
            return (
                <div className="flex items-center justify-start gap-2 w-full">
                    <Avatar>
                        <AvatarImage src={info.getValue().avatar} />
                        <AvatarFallback>{fullName}</AvatarFallback>
                    </Avatar>
                    <div className="w-full text-nowrap px-4">{fullName}</div>
                </div>
            )
        },
        header: 'Créer par',
        footer: (info) => info.column.id,
    }),
    columnProspectHelper.accessor('date', {
        cell: (info) => {
            // parse the date to be date and hour like this 20/09/2024 à 10h50
            const date = info.getValue().toLocaleDateString()
            const hour = info.getValue().toLocaleTimeString().slice(0, 5)
            return (
                <span className="text-ellipsis whitespace-nowrap">
                    {date} à {hour}
                </span>
            )
        },
        header: 'Date et heure',
        footer: (info) => info.column.id,
    }),
    columnProspectHelper.accessor('object', {
        cell: (info) => {
            return (
                <div className=" text-ellipsis whitespace-nowrap w-full flex-1">
                    {info.getValue()}
                </div>
            )
        },
        header: 'Object',
        footer: (info) => info.column.id,
    }),
    columnProspectHelper.accessor('details', {
        cell: (info) => {
            return (
                <DetailsEvenetProspect detailsData={info.row.original}>
                    <CustomButton
                        label="Plus de détails"
                        className="bg-transparent rounded-[6px] border-2 text-lynch-300 border-lynch-200 transition-all delay-100 duration-150 px-5 py-3 hover:scale-90 hover:bg-lynch-500 hover:text-lynch-300"
                    />
                </DetailsEvenetProspect>
            )
        },
        header: 'Actions',
        footer: (info) => info.column.id,
    }),
]

export const columnsCrmTable = (router: AppRouterInstance) => [
    columnHelper.accessor('date', {
        cell: (info) => {
            const date = info.getValue()
            const formattedDate = new Intl.DateTimeFormat('fr-FR', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
            }).format(date)

            return (
                <span className="w-full max-w-44 text-ellipsis whitespace-nowrap">
                    {formattedDate}
                </span>
            )
        },
        header: 'Date de création',
        footer: (info) => info.column.id,
        filterFn: (row, columnId, filterValue) => {
            const parse = (date: string) => {
                const dateArray = date.split('/')
                return `${dateArray[1]}/${dateArray[0]}/${dateArray[2]}`
            }
            const startDate = new Date(parse(filterValue[0]))
            const endDate = new Date(parse(filterValue[1]))
            const date = row.original.date
            if (date >= startDate && date <= endDate) {
                return true
            }
            return false
        },
    }),
    columnHelper.accessor('companyName', {
        cell: (info) => info.getValue(),
        header: 'Raison sociale',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('category', {
        cell: (info) => (
            <div className="flex items-center gap-1">{info.getValue()}</div>
        ),
        header: 'Catégorie',
        footer: (info) => info.column.id,
        filterFn: (row, columnId, filterValue) => {
            return filterValue.includes(row.original.category)
        },
    }),
    columnHelper.accessor('responsable', {
        cell: (info) => {
            const fullName = `${info
                .getValue()
                .firstName.charAt(0)
                .toUpperCase()}${info
                .getValue()
                .firstName.slice(1)
                .toLowerCase()} ${info
                .getValue()
                .lastName.charAt(0)
                .toUpperCase()}${info
                .getValue()
                .lastName.slice(1)
                .toLowerCase()}`
            return <span className="">{fullName}</span>
        },
        header: 'Responsable',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('solutions', {
        cell: (info) => (
            <div className="flex items-center gap-1 min-w-44">
                {info.getValue().length > 0 ? (
                    info
                        .getValue()
                        .map((solutions) => (
                            <PartnerSolution
                                solution={solutions}
                                key={solutions}
                            />
                        ))
                ) : (
                    <PartnerSolution
                        solution={PartnerSolutionType.NONE}
                        key={PartnerSolutionType.NONE}
                    />
                )}
            </div>
        ),
        header: 'Solution',
        footer: (info) => info.column.id,
        filterFn: (row, columnId, filterValue) => {
            return filterValue.includes(row.original.solutions)
        },
    }),
    columnHelper.accessor('country', {
        cell: (info) => (
            <div className="w-full px-2 flex-1 text-nowrap">
                {info.getValue()}
            </div>
        ),
        header: 'Pays',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('region', {
        cell: (info) => (
            <div className="w-full px-2 flex-1 text-nowrap">
                {info.getValue()}
            </div>
        ),
        minSize: 100,
        header: 'Région',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('email', {
        cell: (info) => {
            return <EmailBadge email={info.getValue()} />
        },
        header: 'Email',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('phone', {
        cell: (info) => {
            return <PhoneBadge phone={info.getValue()} />
        },
        header: 'Téléphone',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('city', {
        cell: (info) => info.getValue(),
        header: 'Ville',
        footer: (info) => info.column.id,
        filterFn: (row, columnId, filterValue) => {
            return filterValue.includes(row.original.city)
        },
    }),
    columnHelper.accessor('address', {
        cell: 'Address',
        header: 'Adresse',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('creatorInfo', {
        cell: (info) => {
            const fullName = `${info
                .getValue()
                .name.firstName.charAt(0)
                .toUpperCase()}${info
                .getValue()
                .name.firstName.slice(1)
                .toLowerCase()} ${info
                .getValue()
                .name.lastName.charAt(0)
                .toUpperCase()}${info
                .getValue()
                .name.lastName.slice(1)
                .toLowerCase()}`
            return (
                <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage src={info.getValue().avatar} />
                        <AvatarFallback>{fullName}</AvatarFallback>
                    </Avatar>
                    <span>{fullName}</span>
                </div>
            )
        },
        header: 'Alimenter par',
        filterFn: (row, columnId, filterValue) => {
            return filterValue.includes(
                row.original.creatorInfo.name.firstName +
                    ' ' +
                    row.original.creatorInfo.name.lastName
            )
        },
    }),
    columnHelper.accessor('managerInfo', {
        cell: (info) => {
            const fullName = `${info
                .getValue()
                .name.firstName.charAt(0)
                .toUpperCase()}${info
                .getValue()
                .name.firstName.slice(1)
                .toLowerCase()} ${info
                .getValue()
                .name.lastName.charAt(0)
                .toUpperCase()}${info
                .getValue()
                .name.lastName.slice(1)
                .toLowerCase()}`
            return (
                <div className="flex items-center gap-2 min-w-44">
                    <Avatar>
                        <AvatarImage src={info.getValue().avatar} />
                        <AvatarFallback>{fullName}</AvatarFallback>
                    </Avatar>
                    <span>{fullName}</span>
                </div>
            )
        },
        header: 'Effectuée à',
    }),
    columnHelper.accessor('eventObject', {
        cell: (info) => (
            <span className="w-full max-w-44 text-ellipsis whitespace-nowrap	">
                {info.getValue()}
            </span>
        ),
        header: 'Event',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('status', {
        cell: (info) => {
            const key = info.getValue()
            let Icon: any = IconStatus[key]
            let colors = StyleStatus[key]
            return (
                <div
                    className={`${colors} text-xs px-3 py-1.5 font-semibold rounded-full flex justify-center min-w-24 items-center space-x-2 text-nowrap`}
                >
                    <Icon />
                    <span>{info.getValue()}</span>
                </div>
            )
        },
        header: 'Status',
        footer: (info) => info.column.id,
        filterFn: (row, columnId, filterValue) => {
            return filterValue.includes(StatusCrm[row.original.status])
        },
    }),
    columnHelper.accessor('id', {
        cell: (info) => (
            <ActionsMenu
                id={info.getValue()}
                menuList={[
                    {
                        actions: () =>
                            router.push(
                                AppRoutes.prospects.replace(
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
                                AppRoutes.prospects.replace(
                                    ':id',
                                    info.getValue()!
                                )
                            ),
                        icon: Pencil,
                        label: 'Modifier',
                    },
                    {
                        actions: () => console.log('Convertir'),
                        icon: Rocket,
                        label: 'Convertir',
                    },
                    {
                        actions: () => {
                            const deleteProspect = async () => {
                                const response = await axios.delete(
                                    `http://localhost:8080/api/v1/crm/prospects/${info.getValue()}`
                                )
                            }
                        },
                        icon: Archive,
                        label: 'Archive',
                    },
                ]}
            />
        ),
        header: 'Activité',
    }),
]

export const defaultDataProspectTable: ProspectType[] = [
    {
        key: '1',
        creatorInfo: {
            name: {
                firstName: 'John',
                lastName: 'Doe',
            },
            avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=John',
        },
        object: 'Meeting scheduled for next week.',
        details: {
            message: 'This is the message of the first prospect',
        },
        date: new Date('2022-01-01'),
    },
    {
        key: '2',
        creatorInfo: {
            name: {
                firstName: 'Jane',
                lastName: 'Smith',
            },
            avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Jane',
        },
        object: 'Follow-up meeting scheduled for next week.',
        details: {
            message: 'This is the message of the second prospect',
        },
        date: new Date('2022-02-01'),
    },
    {
        key: '3',
        creatorInfo: {
            name: {
                firstName: 'Michael',
                lastName: 'Johnson',
            },
            avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Michael',
        },
        object: 'Discussion about new partnership opportunities.',
        details: {
            message:
                'This is the message of the third prospect. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        date: new Date('2022-03-01'),
    },
    {
        key: '4',
        creatorInfo: {
            name: {
                firstName: 'Emily',
                lastName: 'Brown',
            },
            avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Emily',
        },
        object: 'Product demo and presentation.',
        details: {
            message: 'This is the message of the fourth prospect',
        },
        date: new Date('2022-04-01'),
    },
    {
        key: '5',
        creatorInfo: {
            name: {
                firstName: 'David',
                lastName: 'Wilson',
            },
            avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=David',
        },
        object: 'Negotiation and contract discussion.',
        details: {
            message: 'This is the message of the fifth prospect',
        },
        date: new Date('2022-05-01'),
    },
]

export const defaultDataCrmTable: CrmType[] = [
    {
        id: '1',
        date: new Date('08/08/2024'),
        companyName: 'Marjane',
        creatorInfo: {
            name: {
                firstName: 'Ali',
                lastName: 'Ben',
            },
            avatar: 'https://api.dicebear.com/9.x/pixel-art/svg',
        },
        managerInfo: {
            name: {
                firstName: 'Mario',
                lastName: 'Jobs',
            },
            avatar: 'https://api.dicebear.com/9.x/pixel-art/svg?seed=Jane',
        },
        category: 'Supperette',
        responsable: {
            firstName: 'Jordan',
            lastName: 'Mario',
        },
        email: 'b.alix@example.com',
        phone: '+212 6xxxxxxxx',
        city: 'Casablanca',
        address: 'Avenue Hassan II',
        country: 'Morocco',
        region: 'Maarif',
        eventObject: 'Réunion prévue pour suivi la semaine prochaine.',
        status: PartnerStatusType.VALID,
        solutions: [
            PartnerSolutionType.MARKET_PRO,
            PartnerSolutionType.DLC_PRO,
        ],
    },
    {
        id: '2',
        date: new Date('01/10/2024'),
        companyName: 'Ikea',
        creatorInfo: {
            name: {
                firstName: 'Sara',
                lastName: 'Alex',
            },
            avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Alex',
        },
        managerInfo: {
            name: {
                firstName: 'Stive',
                lastName: 'Gen',
            },
            avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=Ikea',
        },
        category: 'Supperette',
        responsable: {
            firstName: 'Kratos',
            lastName: 'Baird',
        },
        email: 'b.alix@example.com',
        phone: '+212 6xxxxxxxx',
        eventObject: 'Réunion prévue pour suivi la semaine prochaine.',
        status: PartnerStatusType.PENDING,
        address: 'Avenue Hassan II',
        city: 'Casablanca',
        country: 'Morocco',
        region: 'Maarif',
        solutions: [],
    },
    {
        id: '3',
        date: new Date('12/05/2023'),
        companyName: 'Carrefour',
        creatorInfo: {
            name: {
                firstName: 'John',
                lastName: 'Doe',
            },
            avatar: 'https://api.dicebear.com/9.x/pixel-art/svg?seed=Carrefour',
        },
        managerInfo: {
            name: {
                firstName: 'Michael',
                lastName: 'Smith',
            },
            avatar: 'https://api.dicebear.com/9.x/pixel-art/svg?seed=Smith',
        },
        category: 'Supermarket',
        responsable: {
            firstName: 'Emma',
            lastName: 'Johnson',
        },
        email: 'j.doe@example.com',
        phone: '+212 6xxxxxxxx',
        eventObject: 'Meeting scheduled for next week.',
        status: PartnerStatusType.CANCELED,
        address: 'Rue de Paris',
        city: 'Paris',
        country: 'France',
        region: 'Île-de-France',
        solutions: [
            PartnerSolutionType.MARKET_PRO,
            PartnerSolutionType.DLC_PRO,
            PartnerSolutionType.DONATE_PRO,
        ],
    },
    {
        id: '4',
        date: new Date('05/03/2023'),
        companyName: 'Walmart',
        creatorInfo: {
            name: {
                firstName: 'Emily',
                lastName: 'Brown',
            },
            avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Walmart',
        },
        managerInfo: {
            name: {
                firstName: 'Daniel',
                lastName: 'Taylor',
            },
            avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=Taylor',
        },
        category: 'Supermarket',
        responsable: {
            firstName: 'Olivia',
            lastName: 'Miller',
        },
        email: 'e.brown@example.com',
        phone: '+212 6xxxxxxxx',
        eventObject: 'Meeting scheduled for next week.',
        status: PartnerStatusType.DRAFT,
        address: 'Main Street',
        city: 'New York',
        country: 'USA',
        region: 'New York',
        solutions: [],
    },
    {
        id: '5',
        date: new Date('09/12/2023'),
        companyName: 'Target',
        creatorInfo: {
            name: {
                firstName: 'David',
                lastName: 'Johnson',
            },
            avatar: 'https://api.dicebear.com/9.x/pixel-art/svg?seed=Target',
        },
        managerInfo: {
            name: {
                firstName: 'Robert',
                lastName: 'Anderson',
            },
            avatar: 'https://api.dicebear.com/9.x/pixel-art/svg?seed=Anderson',
        },
        category: 'Supermarket',
        responsable: {
            firstName: 'Sophia',
            lastName: 'Wilson',
        },
        email: 'd.johnson@example.com',
        phone: '+212 6xxxxxxxx',
        eventObject: 'Meeting scheduled for next week.',
        status: PartnerStatusType.PENDING,
        address: '5th Avenue',
        city: 'New York',
        country: 'USA',
        region: 'New York',
        solutions: [
            PartnerSolutionType.MARKET_PRO,
            PartnerSolutionType.DONATE_PRO,
        ],
    },
    {
        id: '6',
        date: new Date('03/07/2023'),
        companyName: 'Tesco',
        creatorInfo: {
            name: {
                firstName: 'Sophie',
                lastName: 'Brown',
            },
            avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Tesco',
        },
        managerInfo: {
            name: {
                firstName: 'James',
                lastName: 'Smith',
            },
            avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=Smith',
        },
        category: 'Supermarket',
        responsable: {
            firstName: 'Oliver',
            lastName: 'Johnson',
        },
        email: 's.brown@example.com',
        phone: '+212 6xxxxxxxx',
        eventObject: 'Meeting scheduled for next week.',
        status: PartnerStatusType.VALID,
        address: 'Oxford Street',
        city: 'London',
        country: 'UK',
        region: 'England',
        solutions: [],
    },
    {
        id: '7',
        date: new Date('11/11/2023'),
        companyName: 'Lidl',
        creatorInfo: {
            name: {
                firstName: 'Emma',
                lastName: 'Wilson',
            },
            avatar: 'https://api.dicebear.com/9.x/pixel-art/svg?seed=Lidl',
        },
        managerInfo: {
            name: {
                firstName: 'William',
                lastName: 'Brown',
            },
            avatar: 'https://api.dicebear.com/9.x/pixel-art/svg?seed=Brown',
        },
        category: 'Supermarket',
        responsable: {
            firstName: 'Olivia',
            lastName: 'Miller',
        },
        email: 'e.wilson@example.com',
        phone: '+212 6xxxxxxxx',
        eventObject: 'Meeting scheduled for next week.',
        status: PartnerStatusType.PENDING,
        address: 'Baker Street',
        city: 'London',
        country: 'UK',
        region: 'England',
        solutions: [PartnerSolutionType.MARKET_PRO],
    },
]
