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
    const [isLoading, setIsLoading] = useState(false)
    const searchParams = useSearchParams()
    const [associationId, setAssociationId] = useState(id)
    const [readOnly, setReadOnly] = useState(
        id !== '' || partnerDetails?.status === PartnerStatusType.VALID
    )
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
                    throw new Error(
                        "Erreur lors de la création de l'association"
                    )
                return res
            } catch (error) {
                console.error(
                    "Erreur lors de la création de l'association",
                    error
                )
                throw error
            }
        },
        onSuccess: (data) => {
            setIsLoading(false)
            console.log('data:', data)
            setAssociationId(data.data)
            partnerDetails.status = PartnerStatusType.IN_PROGRESS
            notify.notify(
                NotificationType.SUCCESS,
                'Association créée avec succès'
            )
        },
        onError: (error) => {
            setIsLoading(false)
            notify.notify(
                NotificationType.ERROR,
                "Erreur lors de la création de l'association"
            )
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

    const solutions = partnerEngagement.watch('solutions')
    console.log(solutions)

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
                country: data.country.name,
                city: data.city.name,
                state: data.state.name,
                region: data.region.name,
                address: data.address,
                iframe: data.mapLocation || '',
            },
            managerID: +data.managerId,
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
            notify.notify(
                NotificationType.ERROR,
                'Veuillez télécharger le contrat'
            )
            return
        }

        const res = await validateContract(associationId, documents)

        if (res.status === 200) {
            setContractValid(true)
            notify.notify(NotificationType.SUCCESS, 'Contrat a été validé')
        } else {
            notify.notify(
                NotificationType.ERROR,
                'Échec de la validation du contrat'
            )
        }
    }

    const onSaveData = async (modify?: boolean) => {
        console.log('save data')
        if (modify === true) {
            setContractValid(false)
            partnerDetails.status = PartnerStatusType.IN_PROGRESS
            return
        }

        const isAssociationFormValid = await associationInformation.trigger()
        const isEngagementFormValid = await partnerEngagement.trigger()

        console.log('id: ', isAssociationFormValid, isEngagementFormValid)

        if (isAssociationFormValid && isEngagementFormValid) {
            setIsLoading(true)
            await associationInformation.handleSubmit(onSubmitPartnerInfo)()
            await partnerEngagement.handleSubmit(onSubmitEngagement)()
            mutate()
        } else {
            notify.notify(
                NotificationType.INFO,
                'Veuillez remplir tous les champs obligatoires'
            )
        }
    }
    console.log('----------', associationId)
    console.log('++++', !!!associationId && readOnly)
    return (
        <div className="flex flex-col gap-[0.625rem] w-full lg:px-3 lg:mb-0 mb-20 overflow-auto px-3 pb-3 lg:pb-0">
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
                primaryButtonDisabled={associationId === '' || readOnly}
                secondaryButtonDisabled={readOnly}
                onSaveData={onSaveData}
                onSubmit={onSubmit}
                id={associationId}
                isPending={isPending || isLoading}
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
            {associationId && (
                <ArchivePartner partnerId={associationId} disabled={readOnly} />
            )}
        </div>
    )
}
