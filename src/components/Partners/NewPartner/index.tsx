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

interface NewPartnerProps {
    partner?: PartnerDataType
    id: string
}

export const NewPartner: React.FC<NewPartnerProps> = ({ partner, id }) => {
    const [countryCode, setCountryCode] = useState(countryCodes[0].value)
    const [partnerDetails, setPartnerDetails] = useState<PartnerDataType>(
        partner!
    )
    const [partnerId, setPartnerId] = useState(
        id == 'new' || id.includes('?convertir') ? '' : id
    )
    const [saved, setSaved] = useState(false)
    const [partnerData, setPartnerData] =
        useState<PartnerPOST>(emptyPartnerPOST)
    const [contractUpload, setContractUpload] = useState<File[] | null>(null)
    const notif = useNotification()
    const [readOnly, setReadOnly] = useState<boolean>(partnerId !== '')
    const searchParams = useSearchParams()
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
        mutationFn: async (data: { id: string; data: PartnerPOST }) => {
            const response = await createPartner(partnerId, data.data, {
                logo: partnerDetails.logo,
                cover: partnerDetails.cover,
            })
            if (![200, 201].includes(response.status)) {
                notif.notify(NotificationType.ERROR, 'Failed to save partner')
                throw new Error('Failed to save partner')
            }
            return response.data
        },
        onSuccess: (data) => {
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
        if (modify === true) {
            setPartnerDetails((prev) => ({
                ...prev,
                status: PartnerStatusType.IN_PROGRESS,
            }))
            return
        }
        // check if the user already have an id and the contract is not uploaded
        if (partnerId !== '' && !contractUpload) {
            notif.notify(NotificationType.ERROR, 'Please upload the contract')
            return
        }

        if (
            partnerInformation.formState.isValid &&
            partnerSubscription.formState.isValid &&
            partnerFeatures.formState.isValid
        ) {
            handlePartnerInfoSubmit(partnerInformation.getValues())
            handleSubscriptionSubmit(partnerSubscription.getValues())
            handleFeaturesSubmit(partnerFeatures.getValues())
            console.log('saved')
            setSaved(true)
        } else {
            partnerInformation.trigger()
            partnerSubscription.trigger()
            partnerFeatures.trigger()
        }
    }
    const handleSubmit = async () => {
        if (!contractUpload) {
            notif.notify(NotificationType.ERROR, 'Please upload the contract')
            return
        }

        const res = await validateContract(partnerId, contractUpload)

        if (res.status === 200) {
            notif.notify(NotificationType.SUCCESS, 'Contract VALID')
            setPartnerDetails((prev) => ({
                ...prev,
                status: PartnerStatusType.VALID,
            }))
        } else {
            notif.notify(NotificationType.ERROR, 'Failed to validate contract')
        }
    }

    useEffect(() => {
        const mode = searchParams.get('mode') // Access the mode from searchParams
        if (mode === 'edit' && readOnly) {
            setReadOnly(false)
        }
        if (saved) {
            console.log('Saving Data ...')
            setSaved(false)
            mutate({ id: partnerId, data: partnerData })
        }
    }, [partnerData, saved, searchParams])

    return (
        <div className="flex flex-col gap-[0.625rem] w-full lg:px-3 lg:mb-0 mb-20 overflow-auto">
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
