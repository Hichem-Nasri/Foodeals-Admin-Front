'use client'
import api from '@/api/Auth'
import { EventPopUps } from '@/components/crm/NewEvent/EventPopUps'
import { NewEvenent } from '@/components/crm/NewEvent/newEvent'
import { FormCrmInfo } from '@/components/crm/NewProspect/FromProspectInfo'
import { TopBar } from '@/components/crm/NewProspect/TopBar'
import { FormCrmInfoDisplay } from '@/components/crm/Prospect/FormProspectInfoDispaly'
import { CustomButton } from '@/components/custom/CustomButton'
import { Layout } from '@/components/Layout/Layout'
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
import { PartnerStatusType } from '@/types/partners'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { get } from 'http'
import { Archive, Info } from 'lucide-react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const ProspectElement = ({ data }: { data: CrmType }) => {
    const [prospect, setProspect] = React.useState(data)
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
            powered_by: data.creatorInfo,
        }
        mutate(newData)
    }

    const onSubmitEvent = (data: any) => {
        console.log(data)
    }

    const handleArchiver = async () => {
        const res = await archiveProspect(prospect.id)
        if (res.status === 200) {
            Notif.notifications.push({
                type: NotificationType.SUCCESS,
                message: 'Prospect archived successfully',
            })
        } else {
            Notif.notifications.push({
                type: NotificationType.ERROR,
                message: 'Failed to archive prospect',
            })
        }
        setProspect((prev) => {
            return { ...prev, status: PartnerStatusType.CANCELED }
        })
    }

    useEffect(() => {
        if (params.get('mode') === 'edit') {
            setReadOnly(false)
        }
    }, [params, params.get('mode')])
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
                        disabled={readOnly}
                    />
                    <NewEvenent
                        disabled={readOnly}
                        Event={prospect.event}
                        setOpen={setOpen}
                        convertir={readOnly}
                    />
                    {prospect.event && prospect.event.length > 0 && (
                        <div className="bg-white lg:p-5 px-4 py-6 rounded-[14px] flex justify-end items-center">
                            <CustomButton
                                disabled={readOnly}
                                variant="outline"
                                label="Archiver"
                                onClick={() => {
                                    console.log('Archiver')
                                    handleArchiver()
                                }}
                                className="bg-coral-50 text-coral-500 border border-coral-500 hover:bg-coral-500 hover:text-coral-50
                        transition-all delay-75 duration-100 w-[136px] py-0 px-4 font-normal text-center h-14"
                                IconRight={Archive}
                            />
                        </div>
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
        <Layout>
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

enum SubscriptionStatus {
    NOT_STARTED = 'NOT_STARTED',
    IN_PROGRESS = 'IN_PROGRESS',
    VALID = 'VALID',
    CANCELED = 'CANCELED',
}

export default ProspectPage

const getProspect = async (id: string) => {
    const getStatus = (status: string) => {
        switch (status) {
            case SubscriptionStatus.NOT_STARTED:
                return PartnerStatusType.DRAFT
            case SubscriptionStatus.IN_PROGRESS:
                return PartnerStatusType.IN_PROGRESS
            case SubscriptionStatus.VALID:
                return PartnerStatusType.VALID
            case SubscriptionStatus.CANCELED:
                return PartnerStatusType.CANCELED
            default:
                return PartnerStatusType.DRAFT
        }
    }
    if (id) {
        try {
            const res = await api
                .get(`${API_PROSPECTS}/${id}`)
                .then((res) => res.data)
                .catch((err) => {
                    throw new Error(err)
                })
            const data = { ...res, status: getStatus(res.status) }
            return data
        } catch (e) {
            console.error(e)
        }
    }
    return {}
}
