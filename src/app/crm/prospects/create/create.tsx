'use client'
import { NewEvenent } from '@/components/crm/NewEvent/newEvent'
import { CustomButton } from '@/components/custom/CustomButton'
import { countryCodes } from '@/lib/utils'
import {
    CrmInformationSchema,
    defaultCrmInformationData,
    getCrmCreateData,
    getInfoData,
} from '@/types/CrmScheme'
import {
    CrmInformationSchemaType,
    CrmObjectType,
    EventType,
} from '@/types/CrmType'
import { PartnerSolutionType, PartnerStatusType } from '@/types/partnersType'
import { zodResolver } from '@hookform/resolvers/zod'
import { Archive, Router } from 'lucide-react'
import React, { FC, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { EventPopUps } from '@/components/crm/NewEvent/EventPopUps'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/api/Auth'
import { useRouter } from 'next/navigation'
import { EventPopUpsNew } from '@/components/crm/NewEvent/EventPopUpsNew'
import { ArchiveType, NotificationType } from '@/types/GlobalType'
import { useNotification } from '@/context/NotifContext'
import { AppRoutes } from '@/lib/routes'
import { archiveProspect } from '@/lib/api/crm/prospect/archiveProspects'
import { TopBar } from '@/components/crm/Prospect/NewProspect/TopBar'
import { FormCrmInfo } from '@/components/crm/Prospect/NewProspect/FromProspectInfo'
import { createProspect } from '@/lib/api/crm/prospect/createProspect'
import { Archiver } from '@/components/utils/Archiver'
import { ArchivePartnerSchema } from '@/types/PartnerSchema'

interface CreateProps {
    type: 'PARTNER' | 'ASSOCIATION,FOOD_BANK'
}

export const Create: FC<CreateProps> = ({ type }) => {
    const [countryCode, setCountryCode] = useState(countryCodes[0].value)
    const queryClient = useQueryClient()
    const router = useRouter()
    const [Info, setInfo] = useState<any>(null)
    const [events, setEvents] = useState<EventType[]>([])
    const [convertir, setConvertir] = useState(false)
    const [leadKo, setLeadko] = useState(false)
    const [open, setOpen] = useState(false)
    const Notif = useNotification()
    console.log(type)
    const mutate = useMutation({
        mutationFn: async (data: any) => {
            console.log('data: ', JSON.stringify(data))
            const res = await api
                .post('http://localhost:8080/api/v1/crm/prospects/create', {
                    ...data,
                    type: type == 'PARTNER' || !type ? 'PARTNER' : data.type,
                })
                .catch((err) => console.log(err))
            if (!res || ![201, 200].includes(res.status))
                throw new Error('Failed to create prospect')
            console.log('done: ', res)
            return res.data
        },
        onSuccess: (data) => {
            setConvertir(true)
            setInfo(data)
            Notif.notify(
                NotificationType.SUCCESS,
                'Prospect created successfully'
            )
            queryClient.invalidateQueries({ queryKey: ['prospects'] })
        },
        onError: (error) => {
            Notif.notify(NotificationType.ERROR, 'Failed to create prospect')
            console.log(error)
        },
    })

    const CrmInformation = useForm<z.infer<typeof CrmInformationSchema>>({
        resolver: zodResolver(CrmInformationSchema),
        mode: 'onBlur',
        defaultValues: { ...getInfoData(Info) },
    })

    const onSubmit = () => {
        router.push(AppRoutes.newConvertir.replace(':id', Info.id))
    }
    const onSaveData = (e: CrmInformationSchemaType) => {
        console.log('e', e)
        const createProspect = getCrmCreateData(e)
        mutate.mutate(createProspect)
    }
    const { handleSubmit } = CrmInformation
    const onSubmitCrmInfo = (data: z.infer<typeof CrmInformationSchema>) => {}
    console.log(CrmInformation.formState.errors)

    const handleArchiver = async (
        data: z.infer<typeof ArchivePartnerSchema>
    ) => {
        const type =
            Info.status == PartnerStatusType.CANCELED ? 'DE_ARCHIVE' : 'ARCHIVE'
        const archiveData: ArchiveType = {
            action: type,
            reason: data?.archiveType || 'OTHER',
            details: data?.archiveReason || '',
        }
        const res = await archiveProspect(
            Info?.id,
            archiveData,
            Info.status == PartnerStatusType.CANCELED
                ? 'IN_PROGRESS'
                : 'CANCELED'
        )
        if (res.status === 200) {
            Notif.notify(
                NotificationType.SUCCESS,
                'Prospect' +
                    (type == 'ARCHIVE' ? 'archived' : 'desarchive') +
                    'successfully'
            )
            Info.status = type == 'ARCHIVE' ? 'CANCELED' : 'IN_PROGRESS'
        } else {
            Notif.notify(NotificationType.ERROR, 'Failed to archive prospect')
        }
        setLeadko(false)
        queryClient.invalidateQueries({ queryKey: ['prospect'] })
    }

    return (
        <div className="flex flex-col gap-[0.625rem] w-full lg:px-3 lg:mb-0 mb-20 overflow-auto">
            {!open ? (
                <>
                    <TopBar
                        status={
                            (Info && Info.status) || PartnerStatusType.DRAFT
                        }
                        primaryButtonDisabled={!convertir}
                        secondaryButtonDisabled={convertir}
                        onSaveData={handleSubmit((e) => {
                            console.log('e', e)
                            onSaveData(e)
                        })}
                        onSubmit={onSubmit}
                        isLoading={mutate.isPending}
                    />
                    <FormCrmInfo
                        onSubmit={onSubmitCrmInfo}
                        form={CrmInformation}
                        countryCode={countryCode}
                        setCountryCode={setCountryCode}
                        disabled={convertir}
                        type={type != 'PARTNER' ? 'ASSOCIATION' : 'PARTNER'}
                    />
                    <NewEvenent
                        Event={events}
                        setOpen={setOpen}
                        convertir={convertir}
                        status={
                            (Info && Info.status) || PartnerStatusType.DRAFT
                        }
                        prospect={Info}
                    />
                    <div className="w-full p-4 rounded-[18px] bg-white flex justify-end items-center">
                        <CustomButton
                            label={
                                Info?.status == PartnerStatusType.CANCELED
                                    ? 'LeadOK'
                                    : 'LeadKo'
                            }
                            onClick={() => setLeadko(true)}
                            size={'sm'}
                            disabled={[PartnerStatusType.VALID].includes(
                                Info?.status as PartnerStatusType
                            )}
                            variant={'secondary'}
                            className={`w-fit${
                                Info?.status == PartnerStatusType.CANCELED
                                    ? 'bg-mountain-100 border-primary text-primary'
                                    : 'bg-coral-50 border-coral-500 text-coral-500 hover:bg-coral-100 hover:text-coral-500'
                            }`}
                        />
                    </div>
                </>
            ) : (
                <EventPopUpsNew
                    id={Info?.id}
                    setOpen={setOpen}
                    open={open}
                    convertir={convertir}
                    setEvents={setEvents}
                    events={events}
                />
            )}
            <Archiver
                partnerId={Info?.id}
                open={leadKo}
                setOpen={setLeadko}
                handleArchiver={handleArchiver}
                title={
                    Info?.status == PartnerStatusType.CANCELED
                        ? 'Désarchiver le Prospect'
                        : 'Archiver le Prospect'
                }
            />
        </div>
    )
}
