import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { createColumnHelper } from '@tanstack/react-table'
import { PartnerSolutionType, PartnerStatusType } from './partnersType'
import { PartnerStatus } from '@/components/Partners/PartnerStatus'
import { EmailBadge } from '@/components/Partners/EmailBadge'
import { PhoneBadge } from '@/components/Partners/PhoneBadge'
import { PartnerSolution } from '@/components/Partners/PartnerSolution'
import { z } from 'zod'
import { ActionsMenu, ActionType } from '@/components/custom/ActionsMenu'
import { ContactDto } from './partenairUtils'
import { capitalize } from './utils'
import { AvatarAndName } from '@/components/AvatarAndName'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import archiveUser from '@/lib/api/partner/archiveUser'
import { AppRoutes } from '@/lib/routes'
import { Info, ArchiveX, Eye, Archive } from 'lucide-react'
import { ArchiveType, PartnerInfoDto } from './GlobalType'
import { CollaboratorsUser } from './collaboratorsUtils'
import { WorkingHourSchema } from './DeliverySchema'

export interface PartnerCollaborators {
    createdAt: string
    id: string
    role: string
    name: ContactDto['name']
    avatarPath: null
    email: string
    phone: string
}
export interface ScheduleDayType {
    morning: string
    afternoon: string
}
export interface ScheduleWeekType {
    monday: ScheduleDayType
    tuesday: ScheduleDayType
    wednesday: ScheduleDayType
    thursday: ScheduleDayType
    friday: ScheduleDayType
    saturday: ScheduleDayType
    sunday: ScheduleDayType
}

export const OrganizationSchema = z.object({
    id: z.string(),
    name: z.string(),
    avatarPath: z.union([z.instanceof(File), z.string()]),
})
export type Organization = z.infer<typeof OrganizationSchema>

export const OrganizationInfoSchema = z.object({
    organization: OrganizationSchema,
    subentity: OrganizationSchema,
    rayon: z.string(),
    manager: z.string(),
    city: z.string(),
    region: z.string(),
    solutions: z.array(z.string()),
    phone: z.string(),
    email: z.string(),
})

export const CollaboratorDetailsSchema = z.object({
    id: z.string(),
    name: z.object({
        firstName: z.string(),
        lastName: z.string(),
    }),
    avatarPath: z.union([z.instanceof(File), z.string()]),
    email: z.string(),
    phone: z.string(),
    role: z.string(),
    organization: z.string(),
    status: z.string(),
    gender: z.string(),
    nationalId: z.string(),
    nationality: z.string(),
    organizationInfo: OrganizationInfoSchema,
    workingHours: z.array(z.any()),
})

export interface CollaboratorDetailsType {
    id: string
    name: ContactDto['name']
    avatarPath: string
    email: string
    phone: string
    role: string
    organization: string
    status: string | null
    gender: string | null
    nationalId: string | null
    nationality: string | null
    organizationInfo: OrganizationInfo
    workingHours: z.infer<typeof WorkingHourSchema>[]
}

export interface OrganizationInfo {
    organization: PartnerInfoDto
    subentity: PartnerInfoDto
    rayon: string | null
    manager: string | null
    city: string
    region: string
    solutions: string[]
    phone: string
    email: string
}

export interface CollaboratorDataType {
    id: string
    avatar: string
    civility: string
    firstName: string
    lastName: string
    origin: string
    idNumber: string
    role: string
    phone: string
    mail: string
    Assignment: {
        partner: {
            id: string
            name: string
            logo: string
        }
        subAccount: {
            id: string
            name: string
            logo: string
        }
        department: string
        manager: {
            id: string
            name: string
            avatar: string
        }
        city: string
        region: string
        solution: PartnerSolutionType[]
        phone: string
        mail: string
    }
    schedule: ScheduleWeekType
}

export const PartnerCollaboratorsFilerSchema = z.object({
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    roleName: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    city: z.string().optional(),
    collaborators: z.string().optional(),
    solution: z.array(z.string()).optional(),
})

export const defaultFilter: z.infer<typeof PartnerCollaboratorsFilerSchema> = {
    startDate: undefined,
    endDate: undefined,
    roleName: '',
    email: '',
    phone: '',
    city: '',
    collaborators: '',
    solution: [],
}

const columnHelper = createColumnHelper<CollaboratorsUser>()

interface ColumnsPartnerCollaboratorsTableProps {
    router: AppRouterInstance
    archive: boolean
    refetch: () => void
    partnerId: string
}

export const columnsPartnerCollaboratorsTable = ({
    router,
    archive,
    refetch,
    partnerId,
}: ColumnsPartnerCollaboratorsTableProps) => [
    columnHelper.accessor('createdAt', {
        cell: (info) => info.getValue(),
        header: 'Date de création',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('role', {
        cell: (info) => {
            return <span>{info.getValue()}</span>
        },
        header: 'Rôle',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('name', {
        cell: (info) => {
            const avatarPath = info.row.original.avatarPath
            const fullName =
                capitalize(info.getValue().firstName) +
                ' ' +
                capitalize(info.getValue().lastName)
            return <AvatarAndName name={fullName} avatar={avatarPath!} />
        },
        header: 'Nom',
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
    columnHelper.accessor('id', {
        cell: (info) => {
            let listActions: ActionType[] = []
            if (archive) {
                listActions = [
                    {
                        actions: () => {},
                        label: 'Info',
                        icon: Info,
                    },
                    {
                        actions: async (
                            id: string,
                            data: any,
                            handleDone?: (
                                type: boolean,
                                message: string,
                                query: any[]
                            ) => void
                        ) => {
                            const archiveData: ArchiveType = {
                                action: 'DE_ARCHIVE',
                                reason: data?.archiveType,
                                details: data?.archiveReason,
                            }
                            const res = await archiveUser(id, archiveData)
                                .then((res) => {
                                    handleDone &&
                                        handleDone(
                                            true,
                                            'désarchivage effectué',
                                            ['partners', 0, 10]
                                        )
                                    refetch()
                                })
                                .catch((err) => {
                                    handleDone &&
                                        handleDone(
                                            false,
                                            'Failed to archive',
                                            []
                                        )
                                    console.log(err)
                                })
                        },
                        label: 'Désarchiver',
                        icon: ArchiveX,
                    },
                ]
            } else
                listActions = [
                    {
                        actions: () =>
                            router.push(
                                AppRoutes.collaboratorDetails
                                    .replace(':PartnerId', partnerId!)
                                    .replace(':CollaboratorId', info.getValue())
                            ),
                        icon: Eye,
                        label: 'Voir',
                    },
                    {
                        actions: async (
                            id: string,
                            data: any,
                            handleDone?: (
                                type: boolean,
                                message: string,
                                query: any[]
                            ) => void
                        ) => {
                            const archiveData: ArchiveType = {
                                action: 'ARCHIVE',
                                reason: data?.archiveType,
                                details: data?.archiveReason,
                            }
                            const res = await archiveUser(id, archiveData)
                                .then((res) => {
                                    handleDone &&
                                        handleDone(
                                            true,
                                            "L'archive a été effectuée",
                                            ['partners', '0', '10']
                                        )
                                    refetch()
                                })
                                .catch((err) => {
                                    handleDone &&
                                        handleDone(
                                            false,
                                            'Failed to archive',
                                            []
                                        )
                                    console.log(err)
                                })
                        },
                        icon: Archive,
                        label: 'Archiver',
                    },
                ]
            return (
                <ActionsMenu
                    id={info.getValue()!}
                    menuList={listActions}
                    prospect={archive ? 'users' : false}
                />
            )
        },
        header: 'Activité',
        footer: (info) => info.column.id,
    }),
]
