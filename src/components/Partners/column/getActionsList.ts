import { ActionType } from '@/components/custom/ActionsMenu'
import { API_URL } from '@/lib/api'
import archivePatner from '@/lib/api/partner/archiverPartner'
import { getContract } from '@/lib/api/partner/getContract'
import api from '@/lib/Auth'
import { AppRoutes } from '@/lib/routes'
import { ArchiveType } from '@/types/GlobalType'
import { ArchivePartnerSchema } from '@/types/PartnerSchema'
import { info } from 'console'
import {
    Eye,
    Pen,
    Archive,
    Users,
    FileBadge,
    ArchiveRestore,
    Info,
    Store,
    Pencil,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

export const GetListActions: (
    id: string,
    data: { status: string; subEntities: number; users: number },
    archive: boolean,
    fn: () => void
) => ActionType[] = (id, data, archive, fn) => {
    const router = useRouter()
    if (archive) {
        return [
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
                    const res = await archivePatner(id, archiveData)
                        .then((res) => {
                            handleDone &&
                                handleDone(true, 'désarchivage effectué', [
                                    'partners',
                                    0,
                                    10,
                                ])
                            fn()
                        })
                        .catch((err) => {
                            handleDone &&
                                handleDone(false, 'Failed to archive', [])
                            console.log(err)
                        })
                },
                label: 'Désarchiver',
                icon: ArchiveRestore,
            },
        ]
    }
    return [
        {
            actions: () =>
                router.push(AppRoutes.newPartner.replace(':id', id!)),
            icon: Eye,
            label: 'Voir',
        },
        {
            actions: () =>
                router.push(
                    AppRoutes.newPartner.replace(':id', id! + '?mode=edit')
                ),
            icon: Pencil,
            label: 'Modifier',
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
                const archiveData: ArchiveType = {
                    action: 'ARCHIVE',
                    reason: data?.archiveType || 'OTHER',
                    details: data?.archiveReason || '',
                }
                const res = await archivePatner(id, archiveData)
                    .then((res) => {
                        handleDone &&
                            handleDone(true, "L'archive a été effectuée", [
                                'partners',
                            ])
                    })
                    .catch((error) => {
                        handleDone &&
                            handleDone(false, "L'archive a échoué", [])
                    })
            },
            icon: Archive,
            label: 'Archiver',
        },
        {
            label: 'Sous Compte',
            actions: async () => {
                router.push(AppRoutes.subAccountPartner.replace(':id', id))
            },
            // shouldNotDisplay: data.subEntities === 0,
            icon: Store,
        },
        {
            actions: (id) =>
                router.push(AppRoutes.collaborator.replace(':id', id)),
            icon: Users,
            label: 'Collaborateurs',
            // shouldNotDisplay: data.users === 0,
        },
        {
            actions: async () => {
                try {
                    const contractData = await getContract(id!)
                    const url = window.URL.createObjectURL(contractData as Blob)
                    window.open(url, '_blank') // Opens the contract in a new tab
                } catch (error) {
                    console.error('Error opening contract:', error)
                }
            },
            icon: FileBadge,
            label: 'Contrat',
            shouldNotDisplay: data.status !== 'VALIDATED',
        },
    ]
}

export const GetListActionsSubAccount: (
    id: string,
    data: { status: string; partnerId: string; users: number },
    archive: boolean,
    refetch: () => void
) => ActionType[] = (id, data, archive, refetch) => {
    const router = useRouter()
    if (archive) {
        return [
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
                    const res = await api
                        .delete(
                            `${API_URL.replace(
                                'api',
                                'v1'
                            )}/sub-entities/${id!}`,
                            {
                                data: {
                                    ...archiveData,
                                },
                            }
                        )
                        .then((res) => {
                            handleDone &&
                                handleDone(true, 'désarchivage effectué', [
                                    'partners',
                                    0,
                                    10,
                                ])
                            refetch()
                        })
                        .catch((err) => {
                            handleDone &&
                                handleDone(false, 'Failed to archive', [])
                            console.log(err)
                        })
                },
                label: 'Désarchiver',
                icon: ArchiveRestore,
            },
        ]
    }
    return [
        {
            actions: () =>
                router.push(AppRoutes.newPartner.replace(':id', id!)),
            icon: Eye,
            label: 'Voir',
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
                const archiveData: ArchiveType = {
                    action: 'ARCHIVE',
                    reason: data?.archiveType || 'OTHER',
                    details: data?.archiveReason || '',
                }
                const res = await api
                    .delete(
                        `${API_URL.replace('api', 'v1')}/sub-entities/${id}`,
                        {
                            data: {
                                ...archiveData,
                            },
                        }
                    )
                    .then((res) => {
                        {
                            handleDone &&
                                handleDone(true, "L'archive a été effectuée", [
                                    'partners',
                                ])
                            refetch()
                        }
                    })
                    .catch((error) => {
                        handleDone &&
                            handleDone(false, "L'archive a échoué", [])
                    })
            },
            icon: Archive,
            label: 'Archiver',
        },
        {
            actions: () =>
                router.push(
                    AppRoutes.newPartner.replace(':id', data.partnerId!)
                ),
            icon: Store,
            label: 'Principal',
        },
        {
            actions: () =>
                router.push(
                    AppRoutes.CollaboratorSubEntities.replace(
                        ':id',
                        id! + '?type=PARTNER_SB&partnerType=sub'
                    )
                ),
            icon: Users,
            label: 'Collaborateurs',
            shouldNotDisplay: data.users === 0,
        },
        {
            actions: async (id) => {
                try {
                    const contractData = await getContract(id)
                    const url = window.URL.createObjectURL(contractData as Blob)
                    window.open(url, '_blank') // Opens the contract in a new tab
                } catch (error) {
                    console.error('Error opening contract:', error)
                }
            },
            icon: FileBadge,
            label: 'Contrat',
            shouldNotDisplay: status !== 'VALIDATED',
        },
    ]
}
