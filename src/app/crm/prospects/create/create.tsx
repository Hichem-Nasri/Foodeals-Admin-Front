'use client'
import { FormCrmInfo } from '@/components/crm/NewProspect/FromProspectInfo'
import { NewEvenent } from '@/components/crm/NewEvent/newEvent'
import { TopBar } from '@/components/crm/NewProspect/TopBar'
import { CustomButton } from '@/components/custom/CustomButton'
import { countryCodes } from '@/lib/utils'
import {
    CrmInformationSchema,
    defaultCrmInformationData,
    getInfoData,
} from '@/types/CrmScheme'
import { CrmInformationSchemaType, CrmObjectType } from '@/types/CrmType'
import { PartnerSolutionType, PartnerStatusType } from '@/types/partners'
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
import { EventType, NotificationType } from '@/types/Global-Type'
import { useNotification } from '@/context/NotifContext'
import { AppRoutes } from '@/lib/routes'

interface CreateProps {}

export const Create: FC<CreateProps> = () => {
    const [countryCode, setCountryCode] = useState(countryCodes[0].value)
    const queryClient = useQueryClient()
    const router = useRouter()
    const [Info, setInfo] = useState<any>(null)
    const [events, setEvents] = useState<EventType[]>([])
    const Notif = useNotification()
    const mutate = useMutation({
        mutationFn: async (data: any) => {
            const res = await api
                .post('http://localhost:8080/api/v1/crm/prospects/create', data)
                .catch((err) => console.log(err))
            if (!res || ![201, 200].includes(res.status))
                throw new Error('Failed to create prospect')
            console.log('done: ', res)
            return res.data
        },
        onSuccess: (data) => {
            setConvertir(true)
            setInfo(data)
            console.log('create: ', data)
            queryClient.invalidateQueries({ queryKey: ['prospects'] })
        },
        onError: (error) => {
            Notif.notify(NotificationType.ERROR, 'Failed to create prospect')
            console.log(error) // Todo: add system notification for error
        },
    })
    const CrmInformation = useForm<z.infer<typeof CrmInformationSchema>>({
        resolver: zodResolver(CrmInformationSchema),
        mode: 'onBlur',
        defaultValues: { ...getInfoData(Info) },
    })
    const { handleSubmit } = CrmInformation
    const onSubmit = () => {
        setOpen((prev) => !prev)
        router.push(AppRoutes.newConvertir.replace(':id', Info.id))
    }
    const onSaveData = (e: CrmInformationSchemaType) => {
        const [firstName, lastName] = e.responsable.split(' ')
        console.log('e', e)
        const createProspect = {
            companyName: e.companyName,
            activities: e.category,
            responsible: {
                name: {
                    firstName: firstName,
                    lastName: lastName,
                },
                email: e.email,
                phone: e.email,
            },
            manager_id: e.managerInfo,
            address: {
                country: e.country,
                city: e.city,
                address: e.address,
                region: e.region,
            },
            event: null,
            solutions: e.solutions.map((sol) => {
                switch (sol) {
                    case PartnerSolutionType.DLC_PRO:
                        return 'pro_dlc'
                    case PartnerSolutionType.DONATE_PRO:
                        return 'pro_donate'
                    case PartnerSolutionType.MARKET_PRO:
                        return 'pro_market'
                    default:
                        return 'none'
                }
            }),
        }
        mutate.mutate(createProspect)
        console.log('Save data')
    }
    const onSubmitCrmInfo = (data: z.infer<typeof CrmInformationSchema>) => {}
    const [convertir, setConvertir] = useState(false)
    const [open, setOpen] = useState(false)

    return (
        <div className="flex flex-col gap-[0.625rem] w-full lg:px-3 lg:mb-0 mb-20 overflow-auto">
            {!open ? (
                <>
                    {' '}
                    <TopBar
                        status={PartnerStatusType.DRAFT}
                        primaryButtonDisabled={!convertir}
                        secondaryButtonDisabled={convertir}
                        onSaveData={handleSubmit((e) => onSaveData(e))}
                        onSubmit={onSubmit}
                    />
                    <FormCrmInfo
                        onSubmit={onSubmitCrmInfo}
                        form={CrmInformation}
                        countryCode={countryCode}
                        setCountryCode={setCountryCode}
                        disabled={convertir}
                    />
                    <NewEvenent
                        Event={events}
                        setOpen={setOpen}
                        convertir={convertir}
                    />
                    {Info && Info.events && Info.events.length > 0 && (
                        <div className="bg-white lg:p-5 px-4 py-6 rounded-[14px] flex justify-end items-center">
                            <CustomButton
                                disabled={convertir}
                                label="Lead Ko"
                                onClick={() => console.log('Save')}
                                className="bg-coral-50 text-coral-500 border border-coral-500 hover:bg-coral-500 hover:text-coral-50
                        transition-all delay-75 duration-100 w-[136px] py-0 px-4 text-center h-14"
                                IconRight={Archive}
                            />
                        </div>
                    )}
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
        </div>
    )
}
