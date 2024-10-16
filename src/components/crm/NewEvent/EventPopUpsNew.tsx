'use client'
import React, { useEffect, useState } from 'react'
import { TopBar } from '../NewProspect/TopBar'
import { PartnerStatusType } from '@/types/partners'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CrmObjectSchema, defaultCrmObjectData } from '@/types/CrmScheme'
import AddNewEvent from './AddNewEvent'
import { CrmObjectType, EvenetType } from '@/types/CrmType'
import { useMediaQuery } from 'react-responsive'
import { useParams } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/api/Auth'
import { EventType } from '@/types/Global-Type'

export const EventPopUpsNew = ({
    id,
    setOpen,
    open,
    convertir,
    setEvents,
    events,
}: {
    id?: string
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    convertir: boolean
    setEvents: React.Dispatch<React.SetStateAction<EventType[]>>
    events: EventType[]
    open: boolean
}) => {
    const onSaveData = () => {
        console.log('Save data')
    }

    const form = useForm<z.infer<typeof CrmObjectSchema>>({
        resolver: zodResolver(CrmObjectSchema),
        mode: 'onBlur',
        defaultValues: getInitialValues(events),
    })
    useEffect(() => {
        if (open) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }, [open])

    const mutation = useMutation({
        mutationFn: async (e: CrmObjectType) => {
            const evenet = {
                object: e.object,
                message: e.message,
                dateAndTime: new Date().toISOString(),
                lead: 1, //Todo: Change this value to the lead id
            }
            console.log(id, evenet)
            const res = await api
                .post(
                    `http://localhost:8080/api/v1/crm/prospects/${id}/events/create`,
                    evenet
                )
                .then((res) => res.data)
                .catch((error) => console.log(error))
            return res
        },
        onSuccess: (data) => {
            setEvents((prev) => [...prev, data])
            setOpen((prev) => !prev)
        },
    })

    const onSubmit = (e: CrmObjectType) => {
        try {
            mutation.mutate(e)
        } catch (error) {
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
                mutation={mutation}
            />
        </div>
    )
}

const getInitialValues = (events: any[]) => {
    if (!events) return
    return Object.fromEntries(
        events.map((event, index) => [
            index,
            { object: event.object, message: event.message },
        ])
    )
}
