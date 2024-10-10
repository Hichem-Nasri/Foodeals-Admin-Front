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
import { Archive } from 'lucide-react'
import React, { FC, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { EventContext } from '@/context/EventContext'
import { EventPopUps } from '@/components/crm/NewEvent/EventPopUps'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface CreateProps {
    prospect: any
}

export const Create: FC<CreateProps> = ({ prospect }) => {
    const [countryCode, setCountryCode] = useState(countryCodes[0].value)
    const queryClient = useQueryClient()
    const mutate = useMutation({
        mutationFn: async (data: any) => {
            const res = await axios
                .post('http://localhost:8080/api/v1/crm/prospects/create', data)
                .then((res) => res.data)
                .catch((err) => console.log(err))
            console.log('done: ', res)
            return res
        },
        onSuccess: () => {
            setConvertir(true)

            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['todos'] })
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
    const [Info, setInfo] = useState<CrmInformationSchemaType>(
        defaultCrmInformationData
    )
    const onSaveData = (e: CrmInformationSchemaType) => {
        const createProspect = {
            companyName: 'Example Company',
            activities: ['Activity 1', 'Activity 2'],
            responsible: {
                name: {
                    firstName: 'John',
                    lastName: 'Doe',
                },
                email: 'john.doe1234@example.com',
                phone: '1234567890',
            },
            powered_by: 1,
            manager_id: 2,
            address: {
                city: 'Casablanca',
                address: '123 Main St',
                region: 'maarif',
            },
        }
        console.log(createProspect)
        mutate.mutate(createProspect)
        setInfo(e)
        console.log('Save data')
    }
    const onSubmitCrmInfo = (data: z.infer<typeof CrmInformationSchema>) => {}
    const [convertir, setConvertir] = useState(false)
    const [status, setStatus] = useState<PartnerStatusType>(
        PartnerStatusType.DRAFT
    )
    const { evenement, setEvenement } = useContext(EventContext)
    const [open, setOpen] = useState(false)
    useEffect(() => {
        console.log(open)
    }, [open])

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
                        Evenet={evenement}
                        setOpen={setOpen}
                        convertir={convertir}
                    />
                    {evenement.length > 0 && (
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
