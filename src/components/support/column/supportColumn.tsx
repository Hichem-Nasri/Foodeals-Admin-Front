import { AvatarAndName } from '@/components/AvatarAndName'
import { CustomButton } from '@/components/custom/CustomButton'
import { EmailBadge } from '@/components/Partners/EmailBadge'
import { PhoneBadge } from '@/components/Partners/PhoneBadge'
import { Button } from '@/components/ui/button'
import { AppRoutes } from '@/lib/routes'
import { SupportType } from '@/types/support'
import { createColumnHelper } from '@tanstack/react-table'
import { Eye, FileMinus, Router } from 'lucide-react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

const columnHelperSupport = createColumnHelper<SupportType>()

export const columnsSupport = (router: AppRouterInstance) => [
    columnHelperSupport.accessor('createdAt', {
        cell: (info) => <div>{info.getValue()}</div>,
        header: 'Date',
        footer: (info) => info.column.id,
    }),
    columnHelperSupport.accessor('received', {
        cell: (info) => {
            const fullName = `${info.getValue().name.firstName} ${
                info.getValue().name.lastName
            }`
            return (
                <AvatarAndName
                    name={fullName}
                    avatar={info.getValue().avatarPath}
                />
            )
        },
        header: 'Reçu',
        footer: (info) => info.column.id,
    }),
    columnHelperSupport.accessor('role', {
        cell: (info) => <div>{info.getValue()}</div>,
        header: 'Role',
        footer: (info) => info.column.id,
    }),
    columnHelperSupport.accessor('parnter', {
        cell: (info) => {
            const fullName = `${info.getValue().name}`
            return (
                <AvatarAndName
                    name={fullName}
                    avatar={info.getValue().avatarPath}
                />
            )
        },
        header: 'Partenaire',
        footer: (info) => info.column.id,
    }),
    columnHelperSupport.accessor('received.phone', {
        cell: (info) => <PhoneBadge phone={info.getValue()} />,
        header: 'Téléphone',
        footer: (info) => info.column.id,
    }),
    columnHelperSupport.accessor('received.email', {
        cell: (info) => <EmailBadge email={info.getValue()} />,
        header: 'Email',
        footer: (info) => info.column.id,
    }),
    columnHelperSupport.accessor('attachment', {
        cell: (info) => {
            if (info.getValue() === null) return <div>Pas de piece</div>
            return (
                <div>
                    {info.getValue()?.map((file, index) => {
                        return (
                            <div
                                key={index}
                                className="flex justify-normal items-center space-x-1.5 bg-lynch-100 text-lynch-500 px-2 py-1 text-xs rounded-full"
                            >
                                <FileMinus size={18} />
                                <span>{'PIECE JOINTE'}</span>
                            </div>
                        )
                    })}
                </div>
            )
        },
    }),
    columnHelperSupport.accessor('object', {
        cell: (info) => <div>{info.getValue()}</div>,
        header: 'Objet',
        footer: (info) => info.column.id,
    }),
    columnHelperSupport.accessor('id', {
        cell: (info) => {
            return (
                <Button
                    onClick={() =>
                        router.push(
                            AppRoutes.supportDetails.replace(
                                ':id',
                                info.getValue()
                            )
                        )
                    }
                    className="text-white bg-lynch-300 rounded-full size-8"
                >
                    <Eye />
                </Button>
            )
        },
        header: 'Activité',
        footer: (info) => info.column.id,
    }),
]

export const defaultColumnSupport: SupportType[] = [
    {
        id: '1',
        createdAt: '2021-10-12',
        received: {
            name: {
                firstName: 'John',
                lastName: 'Doe',
            },
            phone: '123456789',
            email: 'test@gmail.com',
            avatarPath: 'https://randomuser.me/api/portraits',
        },
        role: 'Manager',
        parnter: {
            id: '1',
            name: 'Partner',
            avatarPath: 'https://randomuser.me/api/portraits',
        },
        attachment: null,
        object: 'Object',
    },
    {
        id: '2',
        createdAt: '2021-10-12',
        received: {
            name: {
                firstName: 'John',
                lastName: 'Doe',
            },
            phone: '123456789',
            email: 'test2@gmail.com',
            avatarPath: 'https://randomuser.me/api/portraits',
        },
        role: 'Manager',
        parnter: {
            id: '1',
            name: 'Partner',
            avatarPath: 'https://randomuser.me/api/portraits',
        },
        attachment: [new File([''], 'file.txt')],
        object: 'Object',
    },
]
