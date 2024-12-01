'use client'
import { ActionType } from '@/components/custom/ActionsMenu'
import archivePatner from '@/lib/api/partner/archiverPartner'
import { getContract } from '@/lib/api/partner/getContract'
import { AppRoutes } from '@/lib/routes'
import { ArchiveType } from '@/types/GlobalType'
import { PartnerStatusType } from '@/types/partnersType'
import {
    Info,
    ArchiveX,
    Eye,
    Pen,
    Users,
    Store,
    FileBadge,
    Archive,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

export const GetListAssociation: (
    archive: boolean,
    refetch: () => void,
    data: { status: string; subEntities: number; collaborator: number },
    id: string
) => ActionType[] = (archive, refetch, data, id) => {
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
                            refetch()
                        })
                        .catch((err) => {
                            handleDone &&
                                handleDone(false, 'Failed to archive', [])
                            console.log(err)
                        })
                },
                label: 'Désarchiver',
                icon: ArchiveX,
            },
        ]
    }
    return [
        {
            actions: () =>
                router.push(AppRoutes.newAssociation.replace(':id', id!)),
            icon: Eye,
            label: 'Voir',
        },
        {
            actions: () => {
                router.push(
                    AppRoutes.newAssociation.replace(':id', id!) + '?mode=edit'
                )
            },
            icon: Pen,
            label: 'Modifier',
        },
        {
            actions: () =>
                router.push(
                    AppRoutes.collaboratorAssociation.replace(':id', id!)
                ),
            icon: Users,
            label: 'Collaborateurs',
            // shouldNotDisplay: collaborator === 0,
        },
        {
            actions: () => router.push(AppRoutes.sieges.replace(':id', id!)),
            icon: Store,
            label: 'Sièges',
            // shouldNotDisplay: subEntities === 0,
        },
        {
            actions: async () => {
                try {
                    const contractData = await getContract(id).catch(
                        (error) => {
                            throw new Error('Error getting contract')
                        }
                    )
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
                const res = await archivePatner(id, archiveData)
                    .then((ref) => {
                        handleDone &&
                            handleDone(true, "L'archive a été effectuée", [
                                'partners',
                                '0',
                                '10',
                            ])
                        refetch()
                    })
                    .catch((err) => {
                        handleDone && handleDone(false, 'Failed to archive', [])
                        console.log(err)
                    })
                console.log(res)
            },
            icon: Archive,
            label: 'Archiver',
        },
    ]
}
