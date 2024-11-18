'use client'
import api from '@/api/Auth'
import { EventPopUps } from '@/components/crm/NewEvent/EventPopUps'
import { NewEvenent } from '@/components/crm/NewEvent/newEvent'
import ArchiveConfimation from '@/components/crm/Prospect/ArchiveConfimation'
import { FormCrmInfoDisplay } from '@/components/crm/Prospect/FormProspectInfoDispaly'
import { TopBar } from '@/components/crm/Prospect/NewProspect/TopBar'
import { CustomButton } from '@/components/custom/CustomButton'
import { Layout } from '@/components/Layout/Layout'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { useNotification } from '@/context/NotifContext'
import { archiveProspect } from '@/lib/api/crm/prospect/archiveProspects'
import { API_PROSPECTS } from '@/lib/api_url'
import { AppRoutes } from '@/lib/routes'
import {
    CrmInformationSchema,
    getCrmCreateData,
    getInfoData,
} from '@/types/CrmScheme'
import { CrmType } from '@/types/CrmType'
import { NotificationType } from '@/types/GlobalType'
import { PartnerStatusType } from '@/types/partnersType'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { get } from 'http'
import { Archive, Info, X } from 'lucide-react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const ProspectElement = ({ data }: { data: CrmType }) => {
    const [prospect, setProspect] = React.useState(() => data)
    const params = useSearchParams()
    const [countryCode, setCountryCode] = React.useState('')
    const [open, setOpen] = React.useState(false)
    const [readOnly, setReadOnly] = React.useState(true)
    const Notif = useNotification()
    const router = useRouter()
    const { id } = useParams()
    console.log(id)
    const { mutate } = useMutation({
        mutationKey: ['prospect'],
        mutationFn: (data: any) => {
            return api.put(`${API_PROSPECTS}/${id}`, data)
        },
        onSuccess: () => {
            Notif.notify(
                NotificationType.SUCCESS,
                'Prospect updated successfully'
            )
        },
        onError: () => {
            Notif.notify(NotificationType.ERROR, 'Failed to update prospect')
        },
    })
    const CrmInformation = useForm<z.infer<typeof CrmInformationSchema>>({
        resolver: zodResolver(CrmInformationSchema),
        mode: 'onBlur',
        defaultValues: { ...getInfoData(prospect) },
    })
    const onSubmitCrmInfo = (data: z.infer<typeof CrmInformationSchema>) => {
        const newData = {
            ...getCrmCreateData(data),
        }
        mutate(newData)
    }

    const onSubmitEvent = (data: any) => {
        console.log(data)
    }
    const queryClient = useQueryClient()

    const handleArchiver = async (id?: string) => {
        const res = await archiveProspect(prospect.id)
        if (res.status === 200) {
            Notif.notify(
                NotificationType.SUCCESS,
                'Prospect archived successfully'
            )
        } else {
            Notif.notify(NotificationType.ERROR, 'Failed to archive prospect')
        }
        queryClient.invalidateQueries({ queryKey: ['prospect'] })
    }

    useEffect(() => {
        if (params.get('mode') === 'edit') {
            setReadOnly(false)
        }
    }, [params])
    return (
        <div className="flex flex-col gap-[0.625rem] w-full lg:px-3 lg:mb-0 mb-20 overflow-auto">
            {!open ? (
                <>
                    <TopBar
                        status={prospect.status as PartnerStatusType}
                        primaryButtonDisabled={
                            readOnly &&
                            prospect.status == PartnerStatusType.IN_PROGRESS
                        }
                        secondaryButtonDisabled={readOnly}
                        onSaveData={() => {
                            CrmInformation.handleSubmit(onSubmitCrmInfo)()
                        }}
                        onSubmit={() => {
                            router.push(
                                AppRoutes.newConvertir.replace(
                                    ':id',
                                    id as string
                                )
                            )
                        }}
                        open={open}
                    />
                    <FormCrmInfoDisplay
                        onSubmit={onSubmitCrmInfo}
                        form={CrmInformation}
                        countryCode={countryCode}
                        setCountryCode={setCountryCode}
                        disabled={
                            readOnly ||
                            [
                                PartnerStatusType.CANCELED,
                                PartnerStatusType.VALID,
                            ].includes(prospect.status as PartnerStatusType)
                        }
                    />
                    <NewEvenent
                        disabled={
                            readOnly ||
                            [
                                PartnerStatusType.CANCELED,
                                PartnerStatusType.VALID,
                            ].includes(prospect.status as PartnerStatusType)
                        }
                        Event={prospect.event}
                        setOpen={setOpen}
                        convertir={readOnly}
                        status={prospect.status as PartnerStatusType}
                        prospect={prospect}
                    />
                    {prospect.event && prospect.event.length > 0 && (
                        <ArchiveConfimation
                            handleArchiver={handleArchiver}
                            readOnly={
                                readOnly ||
                                prospect.status == PartnerStatusType.CANCELED
                            }
                        />
                    )}
                </>
            ) : (
                <EventPopUps
                    setOpen={setOpen}
                    open={open}
                    convertir={readOnly}
                    prospect={prospect}
                />
            )}
        </div>
    )
}
const useProspect = (id: string) => {
    const { data, isSuccess, error } = useQuery({
        queryKey: ['prospect'],
        queryFn: () => getProspect(id),
    })

    return { prospect: data, isSuccess, error }
}

const ProspectPage = () => {
    const { id } = useParams()
    const { prospect, isSuccess, error } = useProspect(id as string)

    return (
        <Layout formTitle="Prospect">
            {!isSuccess ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error?.message}</div>
            ) : (
                <ProspectElement data={prospect} />
            )}
        </Layout>
    )
}

export default ProspectPage

const getProspect = async (id: string) => {
    if (id) {
        try {
            const res = await api
                .get(`${API_PROSPECTS}/${id}`)
                .then((res) => res.data)
                .catch((err) => {
                    throw new Error(err)
                })
            console.log('res', res)
            return { ...res, event: res.event ? res.event : [] }
        } catch (e) {
            console.error(e)
        }
    }
    return []
}
