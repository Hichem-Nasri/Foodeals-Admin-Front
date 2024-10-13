'use client'
import React, { useEffect, useState } from 'react'
import { TopBar } from '../NewProspect/TopBar'
import { PartnerStatusType } from '@/types/partners'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CrmObjectSchema } from '@/types/CrmScheme'
import AddNewEvent from './AddNewEvent'
import { CrmObjectType, EvenetType } from '@/types/CrmType'
import { useMediaQuery } from 'react-responsive'
import { useParams } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/api/Auth'

export const EventPopUps = ({
    setOpen,
    open,
    convertir,
    prospect,
}: {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    convertir: boolean
    prospect: any
    open: boolean
}) => {
    const queryClient = useQueryClient()
    const { id } = useParams()
    const [evenement, setEvenement] = useState<EvenetType[]>(prospect.events)
    const onSaveData = () => {
        console.log('Save data')
    }
    const { data, isSuccess } = useQuery({
        queryKey: ['events'],
        queryFn: async () => {
            return api
                .get(`http://localhost:8080/api/v1/crm/prospects/${id}/events`)
                .then((res) => res.data)
                .catch((error) => console.error(error))
        },
    })

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
        if (isSuccess) {
            queryClient.invalidateQueries({ queryKey: ['events', 'prospects'] })
            setEvenement((prev) => [...prev, ...data.content])
        }
        if (open) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }, [open, isSuccess])

    const mutation = useMutation({
        mutationFn: async (e: CrmObjectType) => {
            const evenet: EvenetType = {
                object: e.object,
                message: e.message,
                date: new Date().toISOString(),
                lead: 102, //Todo: Change this value to the lead id
            }
            setEvenement([...evenement, evenet])
            const res = await api
                .post(
                    `http://localhost:8080/api/v1/crm/prospects/${id}/events/create`,
                    evenet
                )
                .then((res) => console.log(res))
                .catch((error) => console.error(error))
        },
        onSuccess: () => {
            console.log('Success!!!')
            setOpen((prev) => !prev)
            queryClient.invalidateQueries({ queryKey: ['event'] })
        },
    })

    const onSubmit = (e: CrmObjectType) => {
        try {
            mutation.mutate(e)
            setOpen((prev) => !prev)
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
                event={evenement}
                setEvenement={setEvenement}
                mutation={mutation}
            />
        </div>
    )
}
