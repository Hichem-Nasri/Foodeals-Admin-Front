'use client'
import { ActionType } from '@/components/custom/ActionsMenu'
import archiveSubPartner from '@/lib/api/partner/archiveSubEntites'
import { AppRoutes } from '@/lib/routes'
import { ArchiveType } from '@/types/GlobalType'
import { Info, ArchiveX, Eye, Pen, Users, Store, Archive } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const GetListSiege: (
    archive: boolean,
    refetch: () => void,
    partnerId: string,
    id: string
) => ActionType[] = (archive, refetch, partnerId, id) => {
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
                    const res = await archiveSubPartner(id, archiveData)
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
                router.push(AppRoutes.newAssociation.replace(':id', id)),
            icon: Eye,
            label: 'Voir',
        },
        {
            actions: () =>
                router.push(
                    AppRoutes.newAssociation.replace(':id', id) + '?mode=edit'
                ),
            icon: Pen,
            label: 'Modifier',
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
                const res = await archiveSubPartner(id, archiveData)
                    .then((res) => {
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
            },
            icon: Archive,
            label: 'Archiver',
        },
        {
            actions: () => {
                router.push(
                    AppRoutes.newAssociation.replace(':id', partnerId) +
                        '?mode=store'
                )
            },
            icon: Store,
            label: 'Association',
        },
        {
            actions: () =>
                router.push(
                    AppRoutes.collaborator.replace(':id', id) +
                        '?type=FOOD_BANK_SB,FOOD_BANK_ASSOCIATION'
                ),
            icon: Users,
            label: 'Collaborateurs',
        },
    ]
}
