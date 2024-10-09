'use client'
import React, { useContext, useEffect } from 'react'
import { TopBar } from '../NewProspect/TopBar'
import { PartnerStatusType } from '@/types/partners'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CrmObjectSchema, defaultCrmObjectData } from '@/types/CrmScheme'
import AddNewEvent from './AddNewEvent'
import { CrmObjectType, EvenetType } from '@/types/CrmType'
import { useMediaQuery } from 'react-responsive'
import { EventContext } from '@/context/EventContext'
import { useRouter } from 'next/navigation'

export const EventPopUps = ({
    setOpen,
    open,
    convertir,
    Info,
}: {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    convertir: boolean
    Info: any
    open: boolean
}) => {
    const { evenement, setEvenement } = useContext(EventContext)
    const onSaveData = () => {
        console.log('Save data')
    }
    const router = useRouter()
    const form = useForm<z.infer<typeof CrmObjectSchema>>({
        resolver: zodResolver(CrmObjectSchema),
        mode: 'onBlur',
        defaultValues: {
            ...Object.fromEntries(
                evenement.map((e, index) => [
                    index,
                    { object: e.object, message: e.message },
                ])
            ),
        },
    })
    useEffect(() => {
        if (open) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }, [open])

    const onSubmit = (e: CrmObjectType) => {
        console.log(e)
        try {
            const evenet: EvenetType = {
                object: e.object,
                message: e.message,
                date: new Date().toISOString(),
                lead: 1, //Todo: Change this value to the lead id
            }
            setEvenement([...evenement, evenet])
            setOpen((prev) => !prev)
            // await axios.post('http://localhost:8080/api/v1/crm/prospects/{id}/events/create', newEven)
        } catch (error) {
            // handle error
            console.error(error)
        }
    }
    const { handleSubmit } = form
    const isMobile = useMediaQuery({ query: '(max-width:1024px)' })

    return (
        <div className="flex flex-col gap-[0.625rem] w-full lg:px-3 lg:mb-0 mb-20 overflow-auto h-screen overflow-y-scroll scroll-smooth">
            {!isMobile && (
                <TopBar
                    status={PartnerStatusType.PENDING}
                    primaryButtonDisabled={!convertir}
                    secondaryButtonDisabled={convertir}
                    onSaveData={onSaveData}
                    onSubmit={handleSubmit(onSubmit)}
                />
            )}
            <AddNewEvent
                form={form}
                isMobile={isMobile}
                setOpen={setOpen}
                convertir={convertir}
            />
        </div>
    )
}
