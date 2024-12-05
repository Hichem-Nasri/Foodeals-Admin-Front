import { capitalize } from '@/types/utils'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { createColumnHelper } from '@tanstack/react-table'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import { DetailsEvenetProspect } from '../../NewEvent/DetailsEvenet'
import { EventType } from '@/types/CrmType'
import { AvatarAndName } from '@/components/AvatarAndName'

const columnProspectHelper = createColumnHelper<EventType>()

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
                capitalize(info.getValue().name?.firstName) +
                ' ' +
                capitalize(info.getValue().name?.lastName)
            return (
                <AvatarAndName
                    name={fullName}
                    avatar={info.getValue().avatarPath}
                />
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
