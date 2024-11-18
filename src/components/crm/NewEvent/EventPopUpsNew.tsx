'use client'
import React, { useEffect } from 'react'
import { PartnerStatusType } from '@/types/partnersType'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CrmObjectSchema } from '@/types/CrmScheme'
import AddNewEvent from './AddNewEvent'
import { CrmObjectType, EventType } from '@/types/CrmType'
import { useMediaQuery } from 'react-responsive'
import { useMutation } from '@tanstack/react-query'
import { NotificationType } from '@/types/GlobalType'
import { createEvents } from '@/lib/api/crm/prospect/createEvents'
import { useNotification } from '@/context/NotifContext'
import { TopBar } from '../Prospect/NewProspect/TopBar'

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
    const Notify = useNotification()
    const isMobile = useMediaQuery({ query: '(max-width:1024px)' })
    const form = useForm<z.infer<typeof CrmObjectSchema>>({
        resolver: zodResolver(CrmObjectSchema),
        mode: 'onBlur',
        defaultValues: getInitialValues(events),
    })
    const { handleSubmit } = form

    const mutation = useMutation({
        mutationFn: async (data: CrmObjectType) => {
            console.log('id', id)
            const res = await createEvents(data, id!)

            if (res.status === 500) throw new Error('Failed to create event')
            return res.data
        },
        onSuccess: (data) => {
            Notify.notify(
                NotificationType.SUCCESS,
                'Event created successfully'
            )
            setEvents((prev) => [...prev, data])
            setOpen((prev) => !prev)
        },
        onError: (error) => {
            Notify.notify(NotificationType.ERROR, 'Failed to create event')
            console.log(error)
        },
    })

    const onSubmit = (e: CrmObjectType) => {
        try {
            console.log('e', e)
            mutation.mutate(e)
            console.log('mutation')
        } catch (error) {
            // Notify.notify(NotificationType.ERROR, 'Failed to create event')
            console.log(error)
        }
    }
    useEffect(() => {
        if (open) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }, [open])

    return (
        <div className="flex flex-col gap-[0.625rem] w-full lg:px-3 lg:mb-0 mb-20 overflow-auto h-screen overflow-y-scroll scroll-smooth">
            {!isMobile && (
                <TopBar
                    status={PartnerStatusType.IN_PROGRESS}
                    primaryButtonDisabled={!convertir}
                    secondaryButtonDisabled={convertir}
                    onSaveData={onSaveData}
                    onSubmit={handleSubmit(onSubmit)}
                    open={open}
                />
            )}
            <AddNewEvent
                form={form}
                isMobile={isMobile}
                setOpen={setOpen}
                convertir={convertir}
                onSubmit={onSubmit}
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
