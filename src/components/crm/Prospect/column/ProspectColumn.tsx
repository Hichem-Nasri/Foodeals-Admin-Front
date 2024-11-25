import { AvatarAndName } from '@/components/AvatarAndName'
import { ActionsMenu, ActionType } from '@/components/custom/ActionsMenu'
import { EmailBadge } from '@/components/Partners/EmailBadge'
import { PartnerSolution } from '@/components/Partners/PartnerSolution'
import { PhoneBadge } from '@/components/Partners/PhoneBadge'
import { useNotification } from '@/context/NotifContext'
import { archiveProspect } from '@/lib/api/crm/prospect/archiveProspects'
import { AppRoutes } from '@/lib/routes'
import { CrmType } from '@/types/CrmType'
import { ArchiveType, NotificationType } from '@/types/GlobalType'
import { ArchivePartnerSchema } from '@/types/PartnerSchema'
import { PartnerSolutionType, PartnerStatusType } from '@/types/partnersType'
import {
    capitalize,
    IconStatus,
    StyleStatus,
    StringStatus,
} from '@/types/utils'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { useQueryClient } from '@tanstack/react-query'
import { createColumnHelper } from '@tanstack/react-table'
import {
    Eye,
    Archive,
    Pencil,
    Rocket,
    Info,
    ArchiveRestore,
} from 'lucide-react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { z } from 'zod'

const columnHelper = createColumnHelper<CrmType>()

export const columnsCrmTable = (
    router: AppRouterInstance,
    setData: any,
    leadKo: boolean
) => [
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
                                solution={solutions as PartnerSolutionType}
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
                <AvatarAndName
                    name={fullName}
                    avatar={info.getValue().avatarPath}
                />
            )
        },
        header: 'Alimenter par',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('managerInfo', {
        cell: (info) => {
            const fullName = `${capitalize(
                info.getValue().name.firstName
            )} ${capitalize(info.getValue().name.lastName)}`
            return (
                <AvatarAndName
                    name={fullName}
                    avatar={info.getValue().avatarPath}
                    className="flex items-center item gap-4 min-w-44"
                />
            )
        },
        header: 'Effectuée à',
        footer: (info) => info.column.id,
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
            const key = info.getValue() || 'IN_PROGRESS'
            let Icon: any = IconStatus[key]
            let colors = StyleStatus[key]
            return (
                <div
                    className={`${colors} text-xs px-3 py-1.5 font-semibold rounded-full flex justify-center min-w-24 items-center space-x-2 text-nowrap`}
                >
                    <Icon />
                    <span>{StringStatus[key]}</span>
                </div>
            )
        },
        header: 'Status',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('id', {
        cell: (info) => {
            let menu: ActionType[] = []
            const status = info.row.original.status
            if (leadKo) {
                menu = [
                    {
                        actions: () => {},
                        label: 'Info',
                        icon: Info,
                    },
                    {
                        actions: async (id: string, data, handlDone) => {
                            const archive: ArchiveType = {
                                action: 'DE_ARCHIVE',
                                reason: data?.archiveType || 'OTHER',
                                details: data?.archiveReason || '',
                            }
                            await archiveProspect(
                                info.getValue(),
                                archive,
                                'IN_PROGRESS'
                            )
                                .then((res) => {
                                    handlDone &&
                                        handlDone(true, 'Prospect désarchivé', [
                                            'prospects',
                                        ])
                                })
                                .catch((err) => {
                                    handlDone &&
                                        handlDone(
                                            false,
                                            'Echec de la désarchivage',
                                            []
                                        )
                                })
                        },

                        label: 'Désarchiver',
                        icon: ArchiveRestore,
                    },
                ]
            } else
                menu = [
                    {
                        actions: () =>
                            router.push(
                                AppRoutes.prospects + '/' + info.getValue()
                            ),
                        icon: Eye,
                        label: 'Voir',
                    },
                    {
                        actions: () =>
                            router.push(
                                AppRoutes.prospects +
                                    '/' +
                                    info.getValue() +
                                    '?mode=edit'
                            ),
                        icon: Pencil,
                        label: 'Modifier',
                    },
                    {
                        actions: () =>
                            router.push(
                                AppRoutes.newConvertir.replace(
                                    ':id',
                                    info.getValue()
                                )
                            ),
                        icon: Rocket,
                        label: 'Convertir',
                        shouldNotDisplay: status != 'IN_PROGRESS' || leadKo,
                    },
                    {
                        actions: async (
                            id: string,
                            data?: z.infer<typeof ArchivePartnerSchema>,
                            handleDone?: (
                                type: boolean,
                                message: string,
                                query: any[]
                            ) => void
                        ) => {
                            const archive: ArchiveType = {
                                action: 'ARCHIVE',
                                reason: data?.archiveType || 'OTHER',
                                details: data?.archiveReason || '',
                            }
                            console.log('archive', archive)
                            const res = await archiveProspect(
                                info.getValue(),
                                archive
                            )
                                .then(
                                    (res) =>
                                        handleDone &&
                                        handleDone(true, 'Prospect archivé', [
                                            'prospects',
                                        ])
                                )
                                .catch(
                                    (err) =>
                                        handleDone &&
                                        handleDone(
                                            false,
                                            "Echec de l'archivage",
                                            []
                                        )
                                )
                        },
                        icon: Archive,
                        label: 'Lead Ko',
                        shouldNotDisplay: status == 'CANCELED',
                    },
                ]
            return (
                <ActionsMenu
                    id={info.getValue()}
                    menuList={menu}
                    prospect={leadKo ? 'prospect' : false}
                />
            )
        },
        header: 'Activité',
    }),
]

export const columnCrmAssociations = (
    router: AppRouterInstance,
    setData: any,
    leadKo: boolean
) => [
    ...columnsCrmTable(router, setData, leadKo).slice(0, 4),
    columnHelper.accessor('type', {
        cell: (info) => {
            const value = info.getValue()
            // Check if the value is null or empty
            if (!value) return null // or return <span></span> for an empty cell
            return <span>{value}</span> // Display the value if it exists
        },
        header: 'Type de compte',
        footer: (info) => info.column.id,
    }),
    ...columnsCrmTable(router, setData, leadKo).slice(4, 16),
]
