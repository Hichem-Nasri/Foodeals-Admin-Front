'use client'
import { FormCrmInfo } from '@/components/crm/NewProspect/FromProspectInfo'
import { NewEvenent } from '@/components/crm/NewEvent/newEvent'
import { TopBar } from '@/components/crm/NewProspect/TopBar'
import { CustomButton } from '@/components/custom/CustomButton'
import { countryCodes } from '@/lib/utils'
import {
    CrmInformationSchema,
    defaultCrmInformationData,
} from '@/types/CrmScheme'
import { CrmInformationSchemaType } from '@/types/CrmType'
import { PartnerStatusType } from '@/types/partners'
import { zodResolver } from '@hookform/resolvers/zod'
import { Archive, Router } from 'lucide-react'
import React, { FC, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { EventContext } from '@/context/EventContext'
import { EventPopUps } from '@/components/crm/NewEvent/EventPopUps'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/api/Auth'
import { useRouter } from 'next/navigation'

interface CreateProps {
    prospect: any
}

export const Create: FC<CreateProps> = ({ prospect }) => {
    const [countryCode, setCountryCode] = useState(countryCodes[0].value)
    const queryClient = useQueryClient()
    const route = useRouter()
    const mutate = useMutation({
        mutationFn: async (data: any) => {
            const res = await api
                .post('http://localhost:8080/api/v1/crm/prospects/create', data)
                .then((res) => res.data)
                .catch((err) => console.log(err))
            console.log('done: ', res)
            return res
        },
        onSuccess: (data) => {
            setConvertir(true)
            setInfo(data)
            route.replace('create', data.id)
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
        onError: (error) => {
            console.log(error)
        },
    })
    const CrmInformation = useForm<z.infer<typeof CrmInformationSchema>>({
        resolver: zodResolver(CrmInformationSchema),
        mode: 'onBlur',
        defaultValues: {
            ...defaultCrmInformationData,
        },
    })

    const { handleSubmit } = CrmInformation
    const onSubmit = () => {
        onSubmitCrmInfo(CrmInformation.getValues())

        console.log('Submit')
    }
    const [Info, setInfo] = useState<any>(null)
    const onSaveData = (e: CrmInformationSchemaType) => {
        const [firstName, lastName] = e.responsable.split(' ')
        const createProspect = {
            companyName: e.companyName,
            activities: e.category,
            responsible: {
                name: {
                    firstName,
                    lastName,
                },
                email: e.email,
                phone: e.email,
            },
            powered_by: 1, // TODO: get from List
            manager_id: 2, // TODO: get from List
            address: {
                city: e.city,
                address: e.address,
                region: e.region,
            },
        }
        const data = JSON.stringify(createProspect)

        console.log(data)
        mutate.mutate(createProspect)
        setInfo(e)
        console.log('Save data')
    }
    const onSubmitCrmInfo = (data: z.infer<typeof CrmInformationSchema>) => {}
    const [convertir, setConvertir] = useState(false)
    const [open, setOpen] = useState(false)

    return (
        <div className="flex flex-col gap-[0.625rem] w-full lg:px-3 lg:mb-0 mb-20 overflow-auto">
            {!convertir ? (
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
                        Evenet={Info ? Info.events : []}
                        setOpen={setOpen}
                        convertir={convertir}
                    />
                    {Info && Info.events.length > 0 && (
                        <div className="bg-white lg:p-5 px-4 py-6 rounded-[14px] flex justify-end items-center">
                            <CustomButton
                                disabled={convertir}
                                label="Archiver"
                                onClick={() => console.log('Save')}
                                className="bg-coral-50 text-coral-500 border border-coral-500 hover:bg-coral-500 hover:text-coral-50
                        transition-all delay-75 duration-100 w-[136px] py-0 px-4 text-center h-14"
                                IconRight={Archive}
                            />
                        </div>
                    )}
                </>
            ) : (
                <EventPopUps
                    setOpen={setOpen}
                    open={open}
                    convertir={convertir}
                    prospect={prospect}
                />
            )}
        </div>
    )
}
