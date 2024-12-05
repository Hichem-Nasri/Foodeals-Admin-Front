'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { countryCodes } from '@/lib/utils'
import { TopBar } from '@/components/Partners/NewPartner/TopBar'
import { FormDeliveryPartner } from './FormDeliveryPartner'
import {
    DeliveryPartnerSchema,
    DeliveryPartnerType,
    emptyDeliveryPartner,
} from '@/types/DeliverySchema'
import { FormSolution } from './FormSolution'
import { PartnerSolutionType, PartnerStatusType } from '@/types/partnersType'
import { useMutation } from '@tanstack/react-query'
import { useNotification } from '@/context/NotifContext'
import { NotificationType } from '@/types/GlobalType'
import { useSearchParams } from 'next/navigation'
import validateContract from '@/lib/api/partner/validateContract'
import { createPartner } from '@/lib/api/partner/createpartner'
import { ArchivePartner } from '@/components/Partners/NewPartner/ArchivePartner'
import { emptyPartnerPOST, PartnerPOST } from '@/types/partenairUtils'
import { transformCityRegionArray } from '@/types/DeliveriesUtils'

interface NewDeliveryProps {
    partnerDetails: DeliveryPartnerType
    id: string
}

export const NewDelivery: React.FC<NewDeliveryProps> = ({
    partnerDetails,
    id,
}) => {
    const [deliveryId, setDeliveryId] = useState(id === 'new' ? '' : id)
    const [deliveryPartnerData, setDeliveryPartnerData] =
        useState<DeliveryPartnerType>(partnerDetails || emptyDeliveryPartner)
    const [data, setData] = useState<PartnerPOST>(emptyPartnerPOST) // Define data type appropriately
    const [countryCode, setCountryCode] = useState(countryCodes[0].value)
    const [readOnly, setReadOnly] = useState<boolean>(deliveryId !== '')
    const searchParams = useSearchParams()
    const notif = useNotification()
    const [status, setStatus] = useState<PartnerStatusType>(
        deliveryId === ''
            ? PartnerStatusType.DRAFT
            : (partnerDetails.status as PartnerStatusType)
    )

    useEffect(() => {
        const mode = searchParams.get('mode')
        if (mode === 'edit') {
            setReadOnly(false)
        }
    }, [searchParams])

    const DeliveryPartner = useForm<z.infer<typeof DeliveryPartnerSchema>>({
        resolver: zodResolver(DeliveryPartnerSchema),
        mode: 'onBlur',
        defaultValues: {
            ...deliveryPartnerData,
            logo: undefined,
            cover: undefined,
        },
    })

    const mutation = useMutation({
        mutationKey: ['delivery-partner'],
        mutationFn: async () => {
            const response = await createPartner(deliveryId, data, {
                logo: deliveryPartnerData.logo! as File,
                cover: deliveryPartnerData.cover! as File,
            })
            if (![200, 201].includes(response.status)) {
                throw new Error('Failed to save partner')
            }
            notif.notify(
                NotificationType.SUCCESS,
                `Le partenaire de livraison a été enregistré avec succès`
            )
            return response.data
        },
        onSuccess: (data) => {
            setDeliveryId(data.id)
        },
        onError: (err) => {
            notif.notify(
                NotificationType.ERROR,
                "Échec de l'enregistrement du partenaire"
            )
            console.log(err)
        },
    })

    const onSubmitPartnerInfo = (
        data: z.infer<typeof DeliveryPartnerSchema>
    ) => {
        if (data.logo && data.cover) {
            setDeliveryPartnerData((prev: DeliveryPartnerType) => ({
                ...prev,
                logo: data.logo!,
                cover: data.cover!,
            }))
        }
        let solutions = []
        if (data.solutions.donatePro?.selected) {
            solutions.push(PartnerSolutionType.DONATE_PRO)
        }
        if (data?.solutions?.marketPro?.selected) {
            solutions.push(PartnerSolutionType.MARKET_PRO)
        }
        const myZone = transformCityRegionArray(data.zone, data.country.name)

        if (data.documents && data.documents.length > 0) {
            setDeliveryPartnerData((prev) => ({
                ...prev,
                documents:
                    data.documents?.filter(
                        (doc): doc is File => doc !== undefined
                    ) ?? [],
            }))
        }
        let mySolution = []
        console.log('data: ', data)
        if (solutions.includes(PartnerSolutionType.DONATE_PRO)) {
            mySolution.push({
                solution: PartnerSolutionType.DONATE_PRO,
                amount: data.solutions.donatePro?.deliveryCost ?? 0,
                commission: data.solutions.donatePro?.commission ?? 0,
            })
        }
        if (solutions.includes(PartnerSolutionType.MARKET_PRO)) {
            mySolution.push({
                solution: PartnerSolutionType.MARKET_PRO,
                amount: data.solutions.marketPro?.deliveryCost ?? 0,
                commission: data.solutions.marketPro?.commission ?? 0,
            })
        }

        setData((prev) => ({
            ...prev,
            entityType: 'DELIVERY_PARTNER',
            entityName: data.companyName,
            solutions: solutions,
            contactDto: {
                name: {
                    firstName: data.responsibleId.split(' ')[0],
                    lastName: data.responsibleId.split(' ').slice(1).join(' '),
                },
                email: data.email,
                phone: data.phone,
            },
            entityAddressDto: {
                country: data.country.name,
                city: data.siege.name,
                region: data.region.name,
                state: data.state.name,
                address: data.address,
                iframe: '',
            },
            coveredZonesDtos: myZone,
            activities: data.companyType,
            commissionPayedBySubEntities: true,
            deliveryPartnerContract: mySolution,
        }))
    }

    const onSubmitEngagement = (
        data: z.infer<typeof DeliveryPartnerSchema>
    ) => {}

    const onSubmit = async () => {
        const documents = DeliveryPartner.getValues('documents')?.filter(
            (doc) => doc !== undefined
        )
        if (!documents || documents.length === 0) {
            notif.notify(
                NotificationType.ERROR,
                "Veuillez d'abord télécharger le contrat"
            )
            return
        }
        const res = await validateContract(deliveryId, documents)
        if (res.status === 200) {
            notif.notify(NotificationType.SUCCESS, 'Contract a été validé')
            setStatus(PartnerStatusType.VALID)
        } else {
            notif.notify(
                NotificationType.ERROR,
                'Échec de la validation du contrat'
            )
        }
    }

    const onSaveData = async (modify?: boolean) => {
        console.log('save data')
        if (modify === true) {
            setStatus(PartnerStatusType.IN_PROGRESS)
            return
        }
        console.log('hello world!')
        const ValidPartner = await DeliveryPartner.trigger()
        if (ValidPartner) {
            console.log('done: ', data)
            await DeliveryPartner.handleSubmit(onSubmitPartnerInfo)()
            mutation.mutate()
        } else {
            console.log('invalid', DeliveryPartner.formState.errors)
            notif.notify(
                NotificationType.INFO,
                'Veuillez remplir tous les champs obligatoires'
            )
        }
    }

    return (
        <div className="flex flex-col gap-[0.625rem] w-full px-4 pr-2 lg:px-3 lg:mb-0 mb-20 overflow-auto">
            <TopBar
                id={deliveryId}
                primaryButtonDisabled={deliveryId === '' || readOnly}
                secondaryButtonDisabled={readOnly}
                onSaveData={onSaveData}
                onSubmit={onSubmit}
                status={status}
                hideStatus={true}
                isPending={mutation.isPending}
            />
            <div className="flex flex-col gap-[0.625rem] lg:gap-0 h-full w-full ">
                <FormDeliveryPartner
                    onSubmit={onSubmitPartnerInfo}
                    form={DeliveryPartner}
                    countryCode={countryCode}
                    setCountryCode={setCountryCode}
                    disabled={readOnly}
                />
                <FormSolution
                    form={DeliveryPartner}
                    onSubmit={onSubmitEngagement}
                    disabled={readOnly}
                    id={deliveryId}
                    status={partnerDetails.status || PartnerStatusType.DRAFT}
                />
            </div>
            {[PartnerStatusType.VALID, PartnerStatusType.IN_PROGRESS].includes(
                status
            ) && <ArchivePartner partnerId={deliveryId} />}
        </div>
    )
}
