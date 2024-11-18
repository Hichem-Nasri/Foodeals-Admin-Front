'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
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
import {
    AssociationPostType,
    defaultAssociationPostData,
} from '@/types/association'
import { useMutation } from '@tanstack/react-query'
import api from '@/api/Auth'
import { API_ASSOCIATIONS } from '@/lib/api_url'
import { useNotification } from '@/context/NotifContext'
import { NotificationType } from '@/types/GlobalType'
import { createAssociation } from '@/lib/api/association/createAssociations'
import { useSearchParams } from 'next/navigation'
import { ArchivePartner } from '@/components/Partners/NewPartner/ArchivePartner'
import validateContract from '@/lib/api/partner/validateContract'
import { PartnerStatusType } from '@/types/partnersType'

interface NewAssociationProps {
    id: string
    partnerDetails: AssociationInformationSchemaType
}

export const NewAssociation: React.FC<NewAssociationProps> = ({
    partnerDetails,
    id,
}) => {
    const [payload, setPayload] = useState<AssociationPostType>(
        defaultAssociationPostData
    )
    const searchParams = useSearchParams()
    const [associationId, setAssociationId] = useState(id)
    const [readOnly, setReadOnly] = useState(
        id !== '' || partnerDetails?.status === PartnerStatusType.VALID
    )
    const [save, setSave] = useState(false)
    const [countryCode, setCountryCode] = useState(countryCodes[0].value)
    const [documents, setDocuments] = useState<File[]>([])
    const [contractValid, setContractValid] = useState(
        partnerDetails?.status === PartnerStatusType.VALID
    )
    const notify = useNotification()

    // Check if the mode is edit
    useEffect(() => {
        const mode = searchParams.get('mode') // Access the mode from searchParams
        if (mode === 'edit') {
            setReadOnly(false)
        }
    }, [searchParams])

    // create/update association
    const { mutate, isPending } = useMutation({
        mutationKey: ['associations'],
        mutationFn: async () => {
            try {
                const res = await createAssociation(associationId, payload)
                if (res.status === 500)
                    throw new Error('Error creating association')
                return res
            } catch (error) {
                console.error('Error creating association:', error)
                return { status: 500, data: null }
            }
        },
        onSuccess: (data) => {
            setSave(false)
            console.log('data:', data)
            setAssociationId(data.data)
            notify.notify(
                NotificationType.SUCCESS,
                'Association created successfully'
            )
        },
        onError: (error) => {
            notify.notify(NotificationType.ERROR, 'Error creating association')
            console.error('Error creating association:', error)
        },
    })
    // Form for association information
    const associationInformation = useForm<
        z.infer<typeof associationInformationSchema>
    >({
        resolver: zodResolver(associationInformationSchema),
        mode: 'onBlur',
        defaultValues: {
            ...partnerDetails,
            logo: partnerDetails?.logo || '',
            cover: partnerDetails?.cover || '',
        },
    })
    // Form for partner engagement
    const partnerEngagement = useForm<z.infer<typeof engagementSchema>>({
        resolver: zodResolver(engagementSchema),
        mode: 'onBlur',
        defaultValues: partnerDetails,
    })

    const onSubmitPartnerInfo = (
        data: z.infer<typeof associationInformationSchema>
    ) => {
        // set the payload with the data from the form
        setPayload((prev) => ({
            ...prev,
            companyName: data.companyName,
            activities: data.companyType,
            responsible: {
                name: {
                    firstName: data.responsible.split(' ')[0],
                    lastName: data.responsible.split(' ').slice(1).join(' '),
                },
                email: data.email,
                phone: data.phone,
            },
            associationAddress: {
                country: data.country,
                city: data.city,
                region: data.region,
                address: data.address,
                iframe: data.mapLocation,
            },
            entityType: data.associationType,
            logo: data.logo!,
            cover: data.cover!,
            pv: data.PVNumber,
        }))
    }

    const onSubmitEngagement = (data: z.infer<typeof engagementSchema>) => {
        // set the payload with the data from the form
        setPayload((prev) => ({
            ...prev,
            numberOfPoints: data.numberOfSieges,
            solutions: data.solutions,
        }))
    }

    const onSubmit = async () => {
        if (!documents || documents.length === 0) {
            notify.notify(NotificationType.ERROR, 'Please upload the contract')
            return
        }

        const res = await validateContract(associationId, documents)

        if (res.status === 200) {
            setContractValid(true)
            notify.notify(NotificationType.SUCCESS, 'Contract VALID')
        } else {
            notify.notify(NotificationType.ERROR, 'Failed to validate contract')
        }
    }

    const onSaveData = (modify?: boolean) => {
        console.log('save data')
        if (modify === true) {
            setContractValid(false)
            return
        }
        if (
            associationInformation.formState.isValid &&
            partnerEngagement.formState.isValid
        ) {
            associationInformation.handleSubmit(onSubmitPartnerInfo)()
            partnerEngagement.handleSubmit(onSubmitEngagement)()

            setSave(true)
        } else {
            console.log(
                'invalid',
                associationInformation.formState.errors,
                partnerEngagement.formState.errors
            )
            associationInformation.trigger()
            partnerEngagement.trigger()
        }
    }
    useEffect(() => {
        if (save) {
            console.log('mutate')
            mutate()
        }
    }, [save])
    console.log('id: ', associationId)
    return (
        <div className="flex flex-col gap-[0.625rem] w-full lg:px-3 lg:mb-0 mb-20 overflow-auto">
            <TopBar
                status={
                    contractValid
                        ? PartnerStatusType.VALID
                        : partnerDetails
                        ? (partnerDetails.status as PartnerStatusType)
                        : associationId != ''
                        ? PartnerStatusType.IN_PROGRESS
                        : PartnerStatusType.DRAFT
                }
                hideStatus={contractValid}
                primaryButtonDisabled={
                    !associationId &&
                    ((!associationInformation.formState.isDirty &&
                        !associationInformation.formState.isValid &&
                        !partnerEngagement.formState.isDirty &&
                        !partnerEngagement.formState.isValid) ||
                        readOnly)
                }
                secondaryButtonDisabled={readOnly}
                onSaveData={onSaveData}
                onSubmit={onSubmit}
                id={associationId}
                isPending={isPending}
            />
            <div className="flex flex-col lg:gap-0 gap-[1.875rem] h-full w-full">
                <FormAssociation
                    onSubmit={onSubmitPartnerInfo}
                    form={associationInformation}
                    countryCode={countryCode}
                    setCountryCode={setCountryCode}
                    disabled={readOnly}
                />
                <FormEngagement
                    form={partnerEngagement}
                    onSubmit={onSubmitEngagement}
                    disabled={readOnly}
                    documents={documents}
                    setDocument={setDocuments}
                    id={associationId}
                    contractValid={contractValid}
                />
            </div>
            {associationId && <ArchivePartner partnerId={associationId} />}
        </div>
    )
}
