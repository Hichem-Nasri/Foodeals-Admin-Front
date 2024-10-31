'use client'
import api from '@/api/Auth'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import TopBar from './TopBar'
import { PartnerStatusType } from '@/types/partners'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { SupportSchema } from '@/types/support'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormDemandeSupport } from './formDemandeSupport'

interface DemandeSupportProps {
    id: string
}

const DemandeSupport: FC<DemandeSupportProps> = ({ id }) => {
    // const { data, isLoading } = useDemandeSupport(id)

    // if (isLoading) return <Loading />
    const form = useForm<z.infer<typeof SupportSchema>>({
        resolver: zodResolver(SupportSchema),
        mode: 'onBlur',
        defaultValues: {},
    })
    const { handleSubmit, control } = form
    const onSaveData = async (data: z.infer<typeof SupportSchema>) => {
        console.log(data)
    }
    const onSubmit = async (data: z.infer<typeof SupportSchema>) => {
        console.log(data)
    }
    return (
        <div className="flex flex-col gap-[0.625rem] w-full lg:px-3 lg:mb-0 mb-20 overflow-auto">
            <TopBar
                status={PartnerStatusType.DRAFT}
                onSaveData={handleSubmit(onSaveData)}
                onSubmit={handleSubmit(onSubmit)}
                disableFirst={form.formState.isValid && form.formState.isDirty}
                disableSeond={!form.formState.isSubmitted}
            />
            <FormDemandeSupport
                form={form}
                onSubmit={onSubmit}
                disabled={false}
            />
        </div>
    )
}

export default DemandeSupport

const useDemandeSupport = (id: string) => {
    if (!id) return { data: null, isLoading: false }
    const { data, isLoading } = useQuery({
        queryKey: ['support', id],
        queryFn: async () => {
            // const response = await api.get(API_SUPPORT + '/' + id)
            // return response.data
        },
    })
}
