import { ActionsMenu } from '@/components/custom/ActionsMenu'
import { EmailBadge } from '@/components/Partners/EmailBadge'
import { PhoneBadge } from '@/components/Partners/PhoneBadge'
import { AppRoutes } from '@/lib/routes'
import { CrmDemandeType } from '@/types/CrmType'
import { capitalize } from '@/types/utils'
import { createColumnHelper } from '@tanstack/react-table'
import { Eye, BellDot, Rocket } from 'lucide-react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

const columnDemandeHelper = createColumnHelper<CrmDemandeType>()
export const columnsDemandeTable = (router: AppRouterInstance) => [
    columnDemandeHelper.accessor('date', {
        cell: (info) => {
            const date = new Date(info.getValue())
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
            const date = new Date(row.original.date)
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
                        className="text-ellipsis whitespace-pre-wrap"
                    >
                        {activity}
                    </span>
                ))}
            </div>
        ),
        header: 'Secteurs d’activités',
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
        header: 'Rôle',
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
    columnDemandeHelper.accessor('phone', {
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
                        actions: () => {
                            router.push(
                                AppRoutes.CrmDemandesDetails.replace(
                                    ':id',
                                    info.getValue()!
                                )
                            )
                        },
                        icon: Eye,
                        label: 'Voir',
                    },
                    {
                        actions: () => {
                            router.push(AppRoutes.newCrmDemandes)
                        },
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
