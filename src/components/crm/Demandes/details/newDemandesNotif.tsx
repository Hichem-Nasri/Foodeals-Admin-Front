'use client'
import React from 'react'
import { TopBarDemandes } from './TobBarDemandes'
import { PartnerSolutionType } from '@/types/partners'
import NewNotificatoin from './newNotification'
import {
    defaultNotificationData,
    NotificationSchema,
    NotificationType,
} from '@/types/CrmScheme'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const NewDemandesNotif = () => {
    const form = useForm<NotificationType>({
        resolver: zodResolver(NotificationSchema),
        mode: 'onBlur',
        defaultValues: defaultNotificationData,
    })

    const myhandleSubmit = (e: NotificationType) => {}
    const { handleSubmit } = form

    return (
        <div className="flex flex-col gap-[0.625rem] w-full lg:px-3 lg:mb-0 mb-20 overflow-auto">
            <TopBarDemandes
                label="Envoyer la notification"
                solution={PartnerSolutionType.DLC_PRO}
                onSubmit={handleSubmit(myhandleSubmit)}
            />
            <NewNotificatoin form={form} handleSubmition={myhandleSubmit} />
        </div>
    )
}

export default NewDemandesNotif
