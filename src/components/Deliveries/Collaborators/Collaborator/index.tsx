'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { countryCodes } from '@/lib/utils'
import {
    CollaboratorDeliveryScheduleSchema,
    CollaboratorDeliveryType,
    CollaboratorDeliveryTypeSchema,
    defaultCollaboratorDeliveryData,
} from '@/types/DeliverySchema'
import { FormCollaboratorInfo } from './FormCollaboratorInfo'
import { FormWorkSchedule } from './FormWorkSchedule'
import { CustomButton } from '@/components/custom/CustomButton'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getCollaboratorDelivery } from '@/lib/api/delivery/getCollaboratorDelivery'
import { useQuery } from '@tanstack/react-query'

interface CollaboratorProps {
    collaborator: CollaboratorDeliveryType
    id: string
}

export const Collaborator: React.FC<CollaboratorProps> = ({
    collaborator,
    id,
}) => {
    const [countryCode, setCountryCode] = useState(countryCodes[0].value)
    const [readOnly, setReadOnly] = useState(id !== '')
    const router = useRouter()

    const deliveryCollaborator = useForm<
        z.infer<typeof CollaboratorDeliveryTypeSchema>
    >({
        resolver: zodResolver(CollaboratorDeliveryTypeSchema),
        mode: 'onBlur',
        defaultValues: collaborator,
    })

    const onSubmitPartnerInfo = (
        data: z.infer<typeof CollaboratorDeliveryTypeSchema>
    ) => {}

    const onSubmitEngagement = (
        data: z.infer<typeof CollaboratorDeliveryScheduleSchema>
    ) => {}

    const onSubmit = () => {
        onSubmitPartnerInfo(deliveryCollaborator.getValues())
        // onSubmitEngagement(DeliveryPartnerSolution.getValues())
    }

    const onSaveData = () => {
        console.log('Save data')
        console.log(
            deliveryCollaborator.getValues()
            // DeliveryPartnerSolution.getValues()
        )
    }
    console.log('collaborator', collaborator)
    return (
        <div className="flex flex-col gap-[0.625rem] w-full lg:px-3 lg:mb-0 mb-20 overflow-auto">
            {/* <TopBar
        primaryButtonDisabled={
          !deliveryCollaborator.formState.isDirty &&
          !deliveryCollaborator.formState.isValid &&
          !DeliveryPartnerSolution.formState.isDirty &&
          !DeliveryPartnerSolution.formState.isValid
        }
        secondaryButtonDisabled={deliveryCollaborator.formState.isValid}
        onSaveData={onSaveData}
        onSubmit={onSubmit}
      /> */}
            <div className="flex lg:relative fixed bottom-0 left-0 z-30 justify-end w-full rounded-[18px] lg:bg-white p-2">
                <CustomButton
                    label="Retour"
                    onClick={() => router.back()}
                    IconLeft={ArrowLeft}
                    className="justify-self bg-transparent text-lynch-400 h-12 hover:bg-lynch-400 hover:text-white border border-lynch-200"
                />
            </div>
            <div className="flex flex-col gap-[1.875rem] h-full w-full">
                <FormCollaboratorInfo
                    onSubmit={onSubmitPartnerInfo}
                    form={deliveryCollaborator}
                    countryCode={countryCode}
                    setCountryCode={setCountryCode}
                    disabled={readOnly}
                />
                <FormWorkSchedule
                    form={deliveryCollaborator}
                    disabled={readOnly}
                />
            </div>
        </div>
    )
}
