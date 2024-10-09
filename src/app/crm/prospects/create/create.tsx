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
import {
    CrmInformationSchemaType,
    CrmStatusType,
    EvenetType,
} from '@/types/CrmType'
import { PartnerStatusType } from '@/types/partners'
import { zodResolver } from '@hookform/resolvers/zod'
import { Archive } from 'lucide-react'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { EventContext } from '@/context/EventContext'
import { EventPopUps } from '@/components/crm/NewEvent/EventPopUps'
import axios from 'axios'

export const Create = () => {
    const [countryCode, setCountryCode] = useState(countryCodes[0].value)
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
            companyName: e.companyName,
            activities: e.category,
            responsible: {
                name: {
                    firstName: e.responsable.split(' ')[0],
                    lastName: e.responsable.slice(
                        e.responsable.indexOf(' ') + 1
                    ),
                },
                email: e.email,
                phone: e.phone,
            },
            powered_by: 1,
            manager_id: 2,
            address: {
                city: e.city,
                address: e.address,
                region: e.region,
            },
        }
        const fetch = async () => {
            const res = await axios
                .post(
                    'http://localhost:8080/api/v1/crm/prospects/create',
                    createProspect
                )
                .then((res) => res.data)
                .catch((err) => console.log(err))
            console.log('done: ', res)
        }
        fetch()
        setInfo(e)
        setConvertir(true)
        console.log('Save data')
    }
    const onSubmitCrmInfo = (data: z.infer<typeof CrmInformationSchema>) => {}
    const [convertir, setConvertir] = useState(false)
    const [status, setStatus] = useState<CrmStatusType>(CrmStatusType.DRAFT)
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
                    Info={Info}
                />
            )}
        </div>
    )
}
