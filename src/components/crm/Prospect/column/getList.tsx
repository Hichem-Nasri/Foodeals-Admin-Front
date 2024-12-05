import { ActionType } from '@/components/custom/ActionsMenu'
import { archiveProspect } from '@/lib/api/crm/prospect/archiveProspects'
import { AppRoutes } from '@/lib/routes'
import { ArchiveType } from '@/types/GlobalType'
import { ArchivePartnerSchema } from '@/types/PartnerSchema'
import { info } from 'console'
import {
    Eye,
    Pencil,
    Rocket,
    Archive,
    ArchiveRestore,
    Info,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

export const GetListProspcts: (
    id: string,
    refetch: () => void,
    LeadKo: boolean,
    status: string,
    type: string
) => ActionType[] = (id, refetch, LeadKo, status, type) => {
    const router = useRouter()
    if (LeadKo) {
        return [
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
                    await archiveProspect(id, archive, 'IN_PROGRESS')
                        .then((res) => {
                            handlDone &&
                                handlDone(true, 'Prospect désarchivé', [
                                    'prospects',
                                ])
                        })
                        .catch((err) => {
                            handlDone &&
                                handlDone(false, 'Echec de la désarchivage', [])
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
                router.push(AppRoutes.prospects + '/' + id + `?type=${type}`),
            icon: Eye,
            label: 'Voir',
        },
        {
            actions: () =>
                router.push(
                    AppRoutes.prospects +
                        '/' +
                        id +
                        '?mode=edit' +
                        `&type=${type}`
                ),
            icon: Pencil,
            label: 'Modifier',
        },
        {
            actions: () => {
                if (type == 'PARTNER')
                    router.push(AppRoutes.newConvertir.replace(':id', id))
                else router.push(AppRoutes.newAssoConvertir.replace(':id', id))
            },
            icon: Rocket,
            label: 'Convertir',
            shouldNotDisplay: status != 'IN_PROGRESS' || LeadKo,
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
                const res = await archiveProspect(id, archive)
                    .then((res) => {
                        handleDone &&
                            handleDone(true, 'Prospect archivé', ['prospects'])
                        refetch()
                    })
                    .catch(
                        (err) =>
                            handleDone &&
                            handleDone(false, "Echec de l'archivage", [])
                    )
            },
            icon: Archive,
            label: 'Lead Ko',
            shouldNotDisplay: status == 'CANCELED',
        },
    ]
}
