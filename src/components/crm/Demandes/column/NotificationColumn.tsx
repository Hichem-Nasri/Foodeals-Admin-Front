import { AvatarAndName } from '@/components/AvatarAndName'
import { TableNotificationType } from '@/types/CrmType'
import { capitalize } from '@/types/utils'
import { createColumnHelper } from '@tanstack/react-table'
import { DetailsEvenetNotification } from '../details/DetailsNotification'

const columnCrmNotifHelper = createColumnHelper<TableNotificationType>()

export const columnsNotificationTable = () => [
    columnCrmNotifHelper.accessor('date', {
        cell: (info) => {
            const date = new Date(info.getValue())
            const formattedDate =
                date.toLocaleDateString() + ' a ' + date.toLocaleTimeString()

            return (
                <span className="w-full max-w-44 text-ellipsis whitespace-nowrap">
                    {formattedDate}
                </span>
            )
        },
        header: 'Date de création',
        footer: (info) => info.column.id,
    }),
    columnCrmNotifHelper.accessor('notifeFrom', {
        cell: (info) => {
            const fullName = `${capitalize(
                info.getValue().name.firstName
            )} ${capitalize(info.getValue().name.lastName)}`
            return (
                <AvatarAndName
                    name={fullName}
                    avatar={info.getValue().avatarPath || ''}
                />
            )
        },
        header: 'Notifier par',
        footer: (info) => info.column.id,
    }),
    columnCrmNotifHelper.accessor('object', {
        cell: (info) => info.getValue(),
        header: 'Object',
        footer: (info) => info.column.id,
    }),
    columnCrmNotifHelper.accessor('message', {
        cell: (info) => {
            return (
                <DetailsEvenetNotification
                    className="hover:text-lynch-950 hover:border-lynch-300"
                    detailsData={info.row.original}
                >
                    <button className="bg-transparent rounded-[8px] border-2 text-lynch-300 border-lynch-200 transition-all delay-100 duration-150 px-3 py-2 hover:scale-95 hover:text-black hover:bg-lynch-300">
                        Plus de détails
                    </button>
                </DetailsEvenetNotification>
            )
        },
        header: 'Actions',
        footer: (info) => info.column.id,
    }),
]
