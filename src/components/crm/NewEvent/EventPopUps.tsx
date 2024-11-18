'use client'
import React, { useEffect, useState } from 'react'
import { PartnerStatusType } from '@/types/partnersType'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CrmObjectSchema, defaultCrmObjectData } from '@/types/CrmScheme'
import AddNewEvent from './AddNewEvent'
import { CrmObjectType } from '@/types/CrmType'
import { useMediaQuery } from 'react-responsive'
import { useParams } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/api/Auth'
import { createEvents } from '@/lib/api/crm/prospect/createEvents'
import { NotificationType } from '@/types/GlobalType'
import { useNotification } from '@/context/NotifContext'
import { TopBar } from '../Prospect/NewProspect/TopBar'

export const EventPopUps = ({
    setOpen,
    open,
    convertir,
    prospect,
    disable,
}: {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    convertir: boolean
    prospect: any
    open: boolean
    disable?: boolean
}) => {
    const { id } = useParams()
    const Notify = useNotification()

    const onSaveData = () => {
        console.log('Save data')
    }

    const form = useForm<z.infer<typeof CrmObjectSchema>>({
        resolver: zodResolver(CrmObjectSchema),
        mode: 'onBlur',
        defaultValues: getInitialValues(prospect.event),
    })
    useEffect(() => {
        if (open) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }, [open])
    const mutation = useMutation({
        mutationFn: async (data: CrmObjectType) => {
            console.log('data', data, id)
            const res = await createEvents(data, id as string)
            if (res.status === 500) throw new Error('Failed to create event')
            return res.data
        },
        onSuccess: (data) => {
            Notify.notify(
                NotificationType.SUCCESS,
                'Event created successfully'
            )
            prospect.event.push(data)
            setOpen((prev) => !prev)
        },
        onError: () => {
            Notify.notify(NotificationType.ERROR, 'Failed to create event')
        },
    })

    const onSubmit = (e: CrmObjectType) => {
        try {
            console.log('hello world')
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
                    status={prospect.status as PartnerStatusType}
                    primaryButtonDisabled={convertir}
                    secondaryButtonDisabled={!convertir}
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
