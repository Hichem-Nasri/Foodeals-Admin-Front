'use client'
import { TopBar } from './TopBar'
import { FormPartnerInfo } from './FormPartnerInfo'
import { FormSubscription } from './FormSubscription'
import { FormFeatures } from './FormFeatures'
import { ArchivePartner } from './ArchivePartner'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { countryCodes } from '@/lib/utils'
import { useMutation } from '@tanstack/react-query'
import { useNotification } from '@/context/NotifContext'
import { NotificationType } from '@/types/GlobalType'
import validateContract from '@/lib/api/partner/validateContract'
import {
    PartnerDataType,
    PartnerFeaturesSchema,
    PartnerInformationSchema,
    PartnerSubscriptionSchema,
} from '@/types/PartnerSchema'
import { emptyPartnerPOST, PartnerPOST } from '@/types/partenairUtils'
import { PartnerStatusType } from '@/types/partnersType'
import { useSearchParams } from 'next/navigation'
import { createPartner } from '@/lib/api/partner/createpartner'
import { SaveInfoData, SaveSubscriptionData } from './helperSubmit'
import { validProspect } from '@/lib/api/crm/prospect/validProspect'

interface NewPartnerProps {
    partner?: PartnerDataType
    id: string
    mode?: string
}

export const NewPartner: React.FC<NewPartnerProps> = ({
    partner,
    id,
    mode,
}) => {
    const [countryCode, setCountryCode] = useState(countryCodes[0].value)
    const [partnerDetails, setPartnerDetails] = useState<PartnerDataType>(
        partner!
    )
    const [partnerId, setPartnerId] = useState(
        id == 'new' || id.includes('?convertir') ? '' : id
    )

    const [partnerData, setPartnerData] =
        useState<PartnerPOST>(emptyPartnerPOST)
    const [contractUpload, setContractUpload] = useState<File[] | null>(null)
    const notif = useNotification()
    const [readOnly, setReadOnly] = useState<boolean>(
        partnerId !== '' && mode !== 'edit'
    )
    // Form setups

    const partnerInformation = useForm<
        z.infer<typeof PartnerInformationSchema>
    >({
        resolver: zodResolver(PartnerInformationSchema),
        mode: 'onBlur',
        defaultValues: {
            ...partnerDetails,
            logo: partnerDetails?.logo || undefined,
            cover: partnerDetails?.cover || undefined,
        },
    })

    const partnerSubscription = useForm<
        z.infer<typeof PartnerSubscriptionSchema>
    >({
        resolver: zodResolver(PartnerSubscriptionSchema),
        mode: 'onBlur',
        defaultValues: partnerDetails,
    })

    const partnerFeatures = useForm<z.infer<typeof PartnerFeaturesSchema>>({
        resolver: zodResolver(PartnerFeaturesSchema),
        mode: 'onBlur',
        defaultValues: partnerDetails,
    })
    // Mutation for saving partner data
    const { mutate, isPending } = useMutation({
        mutationKey: ['partner'],
        mutationFn: async () => {
            const response = await createPartner(partnerId, partnerData, {
                logo: partnerDetails.logo!,
                cover: partnerDetails.cover!,
            })
            if (![200, 201].includes(response.status)) {
                notif.notify(NotificationType.ERROR, 'Failed to save partner')
                throw new Error('Failed to save partner')
            }
            return response.data
        },
        onSuccess: (data) => {
            setPartnerDetails((prev) => ({
                ...prev,
                status: data.contractStatus,
            }))
            setPartnerId(data.id)
            notif.notify(
                NotificationType.SUCCESS,
                'Partner created successfully'
            )
        },
        onError: (err) => {
            console.error(err)
            notif.notify(NotificationType.ERROR, 'Failed to save partner')
        },
    })

    // Handlers for form submissions
    const handlePartnerInfoSubmit = (
        data: z.infer<typeof PartnerInformationSchema>
    ) => {
        console.log('data', data)
        SaveInfoData(data, setPartnerData, setPartnerDetails)
    }

    const handleSubscriptionSubmit = (
        data: z.infer<typeof PartnerSubscriptionSchema>
    ) => {
        console.log('data', data)
        SaveSubscriptionData(data, setPartnerData)
    }

    const handleFeaturesSubmit = (
        data: z.infer<typeof PartnerFeaturesSchema>
    ) => {
        setPartnerData((prev) => {
            return {
                ...prev,
                minimumReduction: +data.minimumReduction,
                maxNumberOfAccounts: +data.maxNumberOfAccounts,
                maxNumberOfSubEntities: +data.numberOfStores,
            }
        })
    }

    // Handler for saving data
    const handleSaveData = async (modify?: boolean) => {
        console.log('modify', modify)
        if (modify === true) {
            setPartnerDetails((prev) => ({
                ...prev,
                status: PartnerStatusType.IN_PROGRESS,
            }))
            return
        }
        // check if the user already have an id and the contract is not uploaded
        const validationInformation = await partnerInformation.trigger()
        const validationSubscription = await partnerSubscription.trigger()
        const validationFeatures = await partnerFeatures.trigger()

        if (
            validationInformation &&
            validationSubscription &&
            validationFeatures
        ) {
            await handlePartnerInfoSubmit(partnerInformation.getValues())
            await handleSubscriptionSubmit(partnerSubscription.getValues())
            await handleFeaturesSubmit(partnerFeatures.getValues())
            mutate()
        } else {
            notif.notify(NotificationType.INFO, 'Please fill all the fields')
            console.log(
                'error',
                partnerInformation.formState.errors,
                partnerSubscription.formState.errors,
                partnerFeatures.formState.errors
            )
        }
    }
    const handleSubmit = async () => {
        if (!contractUpload) {
            notif.notify(NotificationType.ERROR, 'Please upload the contract')
            return
        }

        const res = await validateContract(partnerId, contractUpload)
        console.log('res', res)
        if (res.status === 200) {
            if (id.includes('?convertir')) {
                const valid = await validProspect(id)
                if (valid.status == 200) {
                    notif.notify(
                        NotificationType.SUCCESS,
                        'Prospect converted successfully'
                    ) //TODO: check if redirect is needed
                } else {
                    notif.notify(
                        NotificationType.ERROR,
                        'Failed to convert prospect'
                    )
                }
            } else notif.notify(NotificationType.SUCCESS, 'Contract VALID')
            setPartnerDetails((prev) => ({
                ...prev,
                status: PartnerStatusType.VALID,
            }))
        } else {
            notif.notify(NotificationType.ERROR, 'Failed to validate contract')
        }
    }

    return (
        <div className="flex flex-col gap-[0.625rem] w-full lg:px-3 lg:mb-0 mb-20 overflow-auto px-2">
            <TopBar
                isPending={isPending}
                status={partnerDetails?.status || PartnerStatusType.DRAFT}
                primaryButtonDisabled={partnerId === '' || readOnly}
                secondaryButtonDisabled={readOnly}
                onSaveData={handleSaveData}
                onSubmit={handleSubmit}
                id={partnerId}
            />
            <div className="flex flex-col gap-[1.875rem] h-full w-full">
                <FormPartnerInfo
                    onSubmit={handlePartnerInfoSubmit}
                    form={partnerInformation}
                    countryCode={countryCode}
                    setCountryCode={setCountryCode}
                    disabled={
                        partnerDetails?.status === PartnerStatusType.VALID ||
                        readOnly
                    }
                />
                <FormSubscription
                    onSubmit={handleSubscriptionSubmit}
                    form={partnerSubscription}
                    disabled={
                        partnerDetails?.status === PartnerStatusType.VALID ||
                        readOnly
                    }
                    status={partnerDetails.status}
                    isContractGenerated={partnerDetails?.status !== 'VALID'}
                    onContractUpload={setContractUpload}
                />
                <FormFeatures
                    form={partnerFeatures}
                    onSubmit={handleFeaturesSubmit}
                    disabled={
                        partnerDetails?.status === PartnerStatusType.VALID ||
                        readOnly
                    }
                    id={partnerId}
                />
                {[
                    PartnerStatusType.VALID,
                    PartnerStatusType.IN_PROGRESS,
                ].includes(partnerDetails?.status) && (
                    <ArchivePartner partnerId={partnerId} />
                )}
            </div>
        </div>
    )
}
