import { ActionsMenu } from '@/components/custom/ActionsMenu'
import { EmailBadge } from '@/components/Partners/EmailBadge'
import { PhoneBadge } from '@/components/Partners/PhoneBadge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { AppRoutes } from '@/lib/routes'
import { createColumnHelper } from '@tanstack/react-table'
import {
    Archive,
    BellDot,
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
import { PartnerSolution } from '@/components/Partners/PartnerSolution'
import React from 'react'

import { DetailsEvenetProspect } from '@/components/crm/NewEvent/DetailsEvenet'
import axios from 'axios'
import api from '@/api/Auth'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { PartnerSolutionType } from './partners'
import { IconStatus, StringStatus, StyleStatus } from './utils'
import { CrmType, EventType } from './Global-Type'

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

export const capitalize = (str: string): string => {
    if (!str) return ''
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export interface CrmDemandeType {
    id: string
    date: Date
    companyName: string
    activity: string[]
    respansable: string
    role: string
    country: string
    city: string
    address: string
    telephone: string
    email: string
}

const columnDemandeHelper = createColumnHelper<CrmDemandeType>()

export const columnsDemandeTable = (router: AppRouterInstance) => [
    columnDemandeHelper.accessor('date', {
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
    columnDemandeHelper.accessor('companyName', {
        cell: (info) => info.getValue(),
        header: 'Raison sociale',
        footer: (info) => info.column.id,
    }),
    columnDemandeHelper.accessor('activity', {
        cell: (info) => (
            <div className="flex items-center gap-1">
                {info.getValue().map((activity) => (
                    <span
                        key={activity}
                        className="text-ellipsis whitespace-nowrap"
                    >
                        {activity}
                    </span>
                ))}
            </div>
        ),
        header: 'Activité',
        footer: (info) => info.column.id,
        filterFn: (row, columnId, filterValue) => {
            return filterValue.includes(row.original.activity)
        },
    }),
    columnDemandeHelper.accessor('respansable', {
        cell: (info) => {
            const fullName = `${capitalize(info.getValue())}`
            return <span className="">{fullName}</span>
        },
        header: 'Responsable',
        footer: (info) => info.column.id,
    }),
    columnDemandeHelper.accessor('role', {
        cell: (info) => info.getValue(),
        header: 'Role',
        footer: (info) => info.column.id,
    }),
    columnDemandeHelper.accessor('country', {
        cell: (info) => (
            <div className="w-full px-2 flex-1 text-nowrap">
                {info.getValue()}
            </div>
        ),
        header: 'Pays',
        footer: (info) => info.column.id,
    }),
    columnDemandeHelper.accessor('city', {
        cell: (info) => info.getValue(),
        header: 'Ville',
        footer: (info) => info.column.id,
        filterFn: (row, columnId, filterValue) => {
            return filterValue.includes(row.original.city)
        },
    }),
    columnDemandeHelper.accessor('address', {
        cell: 'Address',
        header: 'Adresse',
        footer: (info) => info.column.id,
    }),
    columnDemandeHelper.accessor('telephone', {
        cell: (info) => {
            return <PhoneBadge phone={info.getValue()} />
        },
        header: 'Téléphone',
        footer: (info) => info.column.id,
    }),
    columnDemandeHelper.accessor('email', {
        cell: (info) => {
            return <EmailBadge email={info.getValue()} />
        },
        header: 'Email',
        footer: (info) => info.column.id,
    }),
    columnDemandeHelper.accessor('id', {
        cell: (info) => (
            <ActionsMenu
                id={info.getValue()}
                menuList={[
                    {
                        actions: () => {},
                        icon: Eye,
                        label: 'Voir',
                    },
                    {
                        actions: () => {},
                        icon: BellDot,
                        label: 'Notifier',
                    },
                    {
                        actions: () => console.log('Convertir'),
                        icon: Rocket,
                        label: 'Convertir',
                    },
                ]}
            />
        ),
        header: 'Activité',
    }),
]

export interface ProspectType {
    key: string
    lead: {
        name: {
            firstName: string
            lastName: string
        }
        avatarPath: string
    }
    object: string
    message: string
    date: Date
}
const columnProspectHelper = createColumnHelper<EventType>()
const columnHelper = createColumnHelper<CrmType>()
let count = 1
export const columnsProspectTable = (router: AppRouterInstance) => [
    columnProspectHelper.accessor('createdAt', {
        cell: (info) => {
            // parse the date to be date and hour like this 20/09/2024 à 10h50
            const date = new Date(info.getValue())
            const hour = date.toLocaleTimeString().slice(0, 5)

            return (
                <div className="text-ellipsis whitespace-nowrap max-w-36">
                    {date.toLocaleDateString()} à {hour}
                </div>
            )
        },
        header: 'Date et heure',
        maxSize: 20,
        footer: (info) => info.column.id,
    }),
    columnProspectHelper.accessor('lead', {
        cell: (info) => {
            const fullName =
                capitalize(info.getValue().name.firstName) +
                ' ' +
                capitalize(info.getValue().name.lastName)
            return (
                <div className="flex items-center justify-start gap-2 w-full">
                    <Avatar>
                        <AvatarImage src={info.getValue().avatarPath} />
                        <AvatarFallback>{fullName.at(0)}</AvatarFallback>
                    </Avatar>
                    <div className="w-full text-nowrap px-4">{fullName}</div>
                </div>
            )
        },
        header: 'Créer par',

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
    columnProspectHelper.accessor('message', {
        cell: (info) => {
            return (
                <DetailsEvenetProspect
                    className="hover:text-lynch-950 hover:border-lynch-300"
                    detailsData={info.row.original}
                >
                    <button className="bg-transparent rounded-[8px] border-2 text-lynch-300 border-lynch-200 transition-all delay-100 duration-150 px-3 py-2 hover:scale-95 hover:text-black hover:bg-lynch-300">
                        Plus de détails
                    </button>
                </DetailsEvenetProspect>
            )
        },
        header: 'Actions',
        footer: (info) => info.column.id,
    }),
]

export const columnsCrmTable = (router: AppRouterInstance, setData: any) => [
    columnHelper.accessor('createdAt', {
        cell: (info) => {
            const date = info.getValue()
            const formattedDate = new Intl.DateTimeFormat('fr-FR', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
            }).format(new Date(date))

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
            const date = new Date(row.original.createdAt)
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
        filterFn: (row, columnId, filterValue) => {
            return filterValue.includes(row.original.companyName)
        },
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
    columnHelper.accessor('contact', {
        cell: (info) => {
            const fullName =
                capitalize(info.getValue().name.firstName) +
                ' ' +
                capitalize(info.getValue().name.lastName)
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
    columnHelper.accessor('address.country', {
        cell: (info) => (
            <div className="w-full px-2 flex-1 text-nowrap">
                {info.getValue()}
            </div>
        ),
        header: 'Pays',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('address.region', {
        cell: (info) => (
            <div className="w-full px-2 flex-1 text-nowrap">
                {info.getValue()}
            </div>
        ),
        minSize: 100,
        header: 'Région',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('contact.email', {
        cell: (info) => {
            return <EmailBadge email={info.getValue()} />
        },
        header: 'Email',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('contact.phone', {
        cell: (info) => {
            return <PhoneBadge phone={info.getValue()} />
        },
        header: 'Téléphone',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('address.city', {
        cell: (info) => info.getValue(),
        header: 'Ville',
        footer: (info) => info.column.id,
        filterFn: (row, columnId, filterValue) => {
            return filterValue.includes(row.original.address.city)
        },
    }),
    columnHelper.accessor('address.address', {
        cell: (info) => info.getValue(),
        header: 'Adresse',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('creatorInfo', {
        cell: (info) => {
            const fullName = `${capitalize(
                info.getValue().name.firstName
            )} ${capitalize(info.getValue().name.lastName)}`
            return (
                <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage src={info.getValue().avatarPath} />
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
            const fullName = `${capitalize(
                info.getValue().name.firstName
            )} ${capitalize(info.getValue().name.lastName)}`
            return (
                <div className="flex items-center gap-2 min-w-44">
                    <Avatar>
                        <AvatarImage src={info.getValue().avatarPath} />
                        <AvatarFallback>{fullName}</AvatarFallback>
                    </Avatar>
                    <span>{fullName}</span>
                </div>
            )
        },
        header: 'Effectuée à',
    }),
    columnHelper.accessor('event', {
        cell: (info) => (
            <span className="w-full max-w-44 text-ellipsis whitespace-nowrap">
                {info.getValue() && info.getValue().at(0)?.object}
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
                    <span>{StringStatus[info.getValue().toString()]}</span>
                </div>
            )
        },
        header: 'Status',
        footer: (info) => info.column.id,
        filterFn: (row, columnId, filterValue) => {
            return filterValue.includes(row.original.status)
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
                        actions: async () => {
                            const deleteProspect = async () => {
                                const response = await api
                                    .delete(
                                        `http://localhost:8080/api/v1/crm/prospects/${info.getValue()}`
                                    )
                                    .then((res) => res.data)
                                    .catch((err) => err)

                                setData((prev: []) => {
                                    const filterData = prev.filter(
                                        (elem: any) =>
                                            elem.id != info.getValue()
                                    )
                                    return filterData
                                })
                                return response
                            }
                            deleteProspect()
                        },
                        icon: Archive,
                        label: 'Lead Ko',
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
        lead: {
            name: {
                firstName: 'John',
                lastName: 'Doe',
            },
            avatarPath: 'https://api.dicebear.com/9.x/avataaars/svg?seed=John',
        },
        object: 'Meeting scheduled for next week.',
        message: 'This is the message of the first prospect',
        date: new Date('2022-01-01'),
    },
    {
        key: '2',
        lead: {
            name: {
                firstName: 'Jane',
                lastName: 'Smith',
            },
            avatarPath: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Jane',
        },
        object: 'Follow-up meeting scheduled for next week.',
        message: 'This is the message of the second prospect',
        date: new Date('2022-02-01'),
    },
    {
        key: '3',
        lead: {
            name: {
                firstName: 'Michael',
                lastName: 'Johnson',
            },
            avatarPath:
                'https://api.dicebear.com/9.x/avataaars/svg?seed=Michael',
        },
        object: 'Discussion about new partnership opportunities.',
        message:
            'This is the message of the third prospect. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        date: new Date('2022-03-01'),
    },
    {
        key: '4',
        lead: {
            name: {
                firstName: 'Emily',
                lastName: 'Brown',
            },
            avatarPath: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Emily',
        },
        object: 'Product demo and presentation.',
        message: 'This is the message of the fourth prospect',
        date: new Date('2022-04-01'),
    },
    {
        key: '5',
        lead: {
            name: {
                firstName: 'David',
                lastName: 'Wilson',
            },
            avatarPath: 'https://api.dicebear.com/9.x/avataaars/svg?seed=David',
        },
        object: 'Negotiation and contract discussion.',
        message: 'This is the message of the fifth prospect',
        date: new Date('2022-05-01'),
    },
]
