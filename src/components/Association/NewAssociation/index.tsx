'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { countryCodes } from '@/lib/utils'
import { TopBar } from '@/components/Partners/NewPartner/TopBar'
import {
    associationInformationSchema,
    AssociationInformationSchemaType,
    defaultAssociationInformationData,
    defaultEngagementData,
    engagementSchema,
} from '@/types/associationSchema'
import { FormAssociation } from './FormAssociation'
import { FormEngagement } from './FormEngagement'

interface NewAssociationProps {
    partnerDetails?: AssociationInformationSchemaType
}

export const NewAssociation: React.FC<NewAssociationProps> = ({
    partnerDetails,
}) => {
    const [countryCode, setCountryCode] = useState(countryCodes[0].value)
    const associationInformation = useForm<
        z.infer<typeof associationInformationSchema>
    >({
        resolver: zodResolver(associationInformationSchema),
        mode: 'onBlur',
        defaultValues: {
            ...(partnerDetails
                ? partnerDetails
                : defaultAssociationInformationData),
        },
    })

    const partnerEngagement = useForm<z.infer<typeof engagementSchema>>({
        resolver: zodResolver(engagementSchema),
        mode: 'onBlur',
        defaultValues: {
            ...(partnerDetails ? partnerDetails : defaultEngagementData),
        },
    })

    const onSubmitPartnerInfo = (
        data: z.infer<typeof associationInformationSchema>
    ) => {}

    const onSubmitEngagement = (data: z.infer<typeof engagementSchema>) => {}

    const onSubmit = () => {
        onSubmitPartnerInfo(associationInformation.getValues())
        onSubmitEngagement(partnerEngagement.getValues())
    }

    const onSaveData = () => {
        console.log('Save data')
        console.log(
            associationInformation.getValues(),
            partnerEngagement.getValues()
        )
    }

    return (
        <div className="flex flex-col gap-[0.625rem] w-full lg:px-3 lg:mb-0 mb-20 overflow-auto">
            <TopBar
                primaryButtonDisabled={
                    !associationInformation.formState.isDirty &&
                    !associationInformation.formState.isValid &&
                    !partnerEngagement.formState.isDirty &&
                    !partnerEngagement.formState.isValid
                }
                secondaryButtonDisabled={
                    associationInformation.formState.isValid
                }
                onSaveData={onSaveData}
                onSubmit={onSubmit}
                id={''}
            />
            <div className="flex flex-col gap-[1.875rem] h-full w-full">
                <FormAssociation
                    onSubmit={onSubmitPartnerInfo}
                    form={associationInformation}
                    countryCode={countryCode}
                    setCountryCode={setCountryCode}
                    disabled={!!partnerDetails}
                />
                <FormEngagement
                    form={partnerEngagement}
                    onSubmit={onSubmitEngagement}
                    disabled={!partnerDetails}
                />
            </div>
        </div>
    )
}
