import { ActionType } from '@/components/custom/ActionsMenu'
import archivePatner from '@/lib/api/partner/archiverPartner'
import { getContract } from '@/lib/api/partner/getContract'
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
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

export const GetListActions: (
    id: string,
    status: string,
    archive: boolean,
    fn: () => void,
    isMobile?: boolean
) => ActionType[] = (id, status, archive, fn, isMobile = false) => {
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
    const listsort = [
        'voir',
        'modifier',
        'collaborateurs',
        'liste des paiement',
        'archiver',
    ]
    const list = [
        {
            actions: () =>
                router.push(AppRoutes.newDelivery.replace(':id', id!)),
            icon: Eye,
            label: 'Voir',
        },
        {
            actions: (id: string) =>
                router.push(
                    AppRoutes.newDelivery.replace(':id', id) + '?mode=edit'
                ),
            icon: Pen,
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
            actions: (id: string) =>
                router.push(AppRoutes.deliveryCollaborator.replace(':id', id!)),
            icon: Users,
            label: 'Collaborateurs',
        },
        {
            actions: (id: string) =>
                router.push(AppRoutes.deliveryPayment + '?deliveryId=' + id),
            icon: Users,
            label: 'Liste des paiement',
        },
        {
            actions: async (id: string) => {
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
    if (isMobile) {
        return list.sort((a, b) => {
            return (
                listsort.indexOf(a.label.toLowerCase()) -
                listsort.indexOf(b.label.toLowerCase())
            )
        })
    }
    return list
}
