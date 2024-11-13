'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { countryCodes } from '@/lib/utils'
import { TopBar } from '@/components/Partners/NewPartner/TopBar'
import { FormDeliveryPartner } from './FormDeliveryPartner'
import {
    defaultDeliveryPartnerData,
    defaultDeliveryPartnerSolutionData,
    DeliveryPartnerSchema,
    DeliveryPartnerSchemaType,
    DeliveryPartnerSolutionSchema,
    DeliveryPartnerType,
    emptyDeliveryPartner,
} from '@/types/DeliverySchema'
import { FormSolution } from './FormSolution'
import { PartnerSolutionType, PartnerStatusType } from '@/types/partnersType'
import { useMutation } from '@tanstack/react-query'
import { useNotification } from '@/context/NotifContext'
import { NotificationType } from '@/types/GlobalType'
import api from '@/api/Auth'
import {
    CityRegion,
    emptyPartnerPOST,
    PartnerPOST,
} from '@/types/partenairUtils'
import { useSearchParams } from 'next/navigation'
import validateContract from '@/lib/api/partner/validateContract'
import { createPartner } from '@/lib/api/partner/createpartner'

interface NewDeliveryProps {
    partnerDetails: DeliveryPartnerType
    id: string
}

function transformCityRegionArray(
    arr: string[],
    country: string
): CityRegion[] {
    const cityMap: { [key: string]: string[] } = {}

    arr.forEach((item) => {
        const [city, region] = item.split('-')

        if (!cityMap[city]) {
            cityMap[city] = []
        }
        cityMap[city].push(region)
    })

    return Object.entries(cityMap).map(([city, regions]) => ({
        country,
        city,
        regions,
    }))
}

export const NewDelivery: React.FC<NewDeliveryProps> = ({
    partnerDetails,
    id,
}) => {
    const [deliveryId, setDeliveryId] = useState(id === 'new' ? '' : id)
    const [deliveryPartnerData, setDeliveryPartnerData] =
        useState<DeliveryPartnerType>(partnerDetails || emptyDeliveryPartner)
    const [data, setData] = useState<PartnerPOST>(emptyPartnerPOST)
    const [countryCode, setCountryCode] = useState(countryCodes[0].value)
    const [readOnly, setReadOnly] = useState<boolean>(deliveryId !== '')
    const searchParams = useSearchParams()
    const [saved, setSaved] = useState(false)
    const notif = useNotification()
    const [status, setStatus] = useState<PartnerStatusType>(
        deliveryId == ''
            ? PartnerStatusType.DRAFT
            : PartnerStatusType.IN_PROGRESS
    )
    console.log(deliveryId)
    useEffect(() => {
        const mode = searchParams.get('mode') // Access the mode from searchParams
        if (mode === 'edit') {
            console.log('edit mode')
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
    const DeliveryPartnerSolution = useForm<
        z.infer<typeof DeliveryPartnerSolutionSchema>
    >({
        resolver: zodResolver(DeliveryPartnerSolutionSchema),
        mode: 'onBlur',
        defaultValues: {
            ...deliveryPartnerData,
            documents: undefined,
        },
    })
    const mutation = useMutation({
        mutationKey: ['delivery-partner'],
        mutationFn: async (data: { id: string; data: PartnerPOST }) => {
            console.log('data: ', JSON.stringify(data))
            const response = await createPartner(data.id, data.data, {
                logo: deliveryPartnerData.logo! as File,
                cover: deliveryPartnerData.cover! as File,
            })
            if (![200, 201].includes(response.status)) {
                notif.notify(NotificationType.ERROR, 'Failed to save partner')
                throw new Error('Failed to save partner')
            }
            notif.notify(
                NotificationType.SUCCESS,
                `The Deliver Partner has been saved successfully`
            )
            return response.data
        },
        onSuccess: (data) => {
            setDeliveryId(data.id)
        },
        onError: (err) => {
            console.log(err)
        },
    })

    const onSubmitPartnerInfo = (
        data: z.infer<typeof DeliveryPartnerSchema>
    ) => {
        if (data.logo && data.cover) {
            setDeliveryPartnerData((prev: DeliveryPartnerType) => {
                return {
                    ...prev,
                    logo: data.logo!,
                    cover: data.cover!,
                }
            })
        }
        const mySolution = data.solutions.map((solution) => {
            if (solution === 'DONATE_PRO') return 'pro_donate'
            return 'pro_market'
        })
        const myZone = transformCityRegionArray(data.zone, data.country)

        setData((prev) => ({
            ...prev,
            entityType: 'DELIVERY_PARTNER',
            entityName: data.companyName,
            // commercialNumber: data.commercialRegisterNumber.toString(),
            solutions: mySolution,
            contactDto: {
                name: {
                    firstName: data.responsibleId.split(' ')[0],
                    lastName: data.responsibleId.split(' ').slice(1).join(' '),
                },
                email: data.email,
                phone: data.phone,
            },
            entityAddressDto: {
                country: data.country,
                city: data.siege,
                region: data.region,
                address: data.address,
                iframe: '',
            },
            coveredZonesDtos: myZone,
            activities: data.companyType,
            commissionPayedBySubEntities: true,
            // managerId: +data.managerId,
        }))
    }

    const onSubmitEngagement = (
        data: z.infer<typeof DeliveryPartnerSolutionSchema>
    ) => {
        console.log('partnerSolution: ', data)
        if (data.documents) {
            setDeliveryPartnerData((prev) => {
                return {
                    ...prev,
                    documents: data?.documents?.filter(
                        (doc): doc is File => doc !== undefined
                    )!,
                }
            })
        }
        const mySolution = data.solutions.map((solution) => {
            return {
                solution: solution,
                amount: data.deliveryCost,
                commission: data.commission,
            }
        })
        console.log('partnerSolution: ', mySolution)
        setData((prev) => ({
            ...prev,
            deliveryPartnerContract: mySolution,
        }))
    }

    const onSubmit = async () => {
        const document = DeliveryPartnerSolution.getValues('documents')?.filter(
            (docs) => docs !== undefined
        )
        if (!document) {
            notif.notify(NotificationType.ERROR, "importer d'abord le contrat")
            return
        }
        console.log(document)
        const res = await validateContract(deliveryId, document)
        if (res.status === 200) {
            notif.notify(NotificationType.SUCCESS, 'Contract VALID')
            setStatus(PartnerStatusType.VALID)
        } else {
            notif.notify(NotificationType.ERROR, 'Failed to validate contract')
        }
    }

    const onSaveData = async (modify?: boolean) => {
        if (modify === true) {
            setStatus(PartnerStatusType.IN_PROGRESS)
            return
        }
        console.log('Save data')
        console.log(
            DeliveryPartner.getValues(),
            DeliveryPartnerSolution.getValues()
        )

        if (
            DeliveryPartner.formState.isValid &&
            DeliveryPartnerSolution.formState.isValid
        ) {
            DeliveryPartner.handleSubmit(onSubmitPartnerInfo)()
            DeliveryPartnerSolution.handleSubmit(onSubmitEngagement)()
            setSaved(true)
        } else {
            DeliveryPartner.trigger()
            DeliveryPartnerSolution.trigger()
        }
    }
    useEffect(() => {
        if (saved) {
            setSaved(false)
            mutation.mutate({ id: deliveryId, data })
            console.log('save data')
        }
    }, [saved, data])
    const { solutions: solutionPartner } = DeliveryPartner.watch()
    const { solutions } = DeliveryPartnerSolution.watch()
    return (
        <div className="flex flex-col gap-[0.625rem] w-full lg:px-3 lg:mb-0 mb-20 overflow-auto">
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
            <div className="flex flex-col gap-[1.875rem] h-full w-full">
                <FormDeliveryPartner
                    onSubmit={onSubmitPartnerInfo}
                    form={DeliveryPartner}
                    countryCode={countryCode}
                    setCountryCode={setCountryCode}
                    disabled={readOnly}
                    selectedSolution={solutions}
                />
                <FormSolution
                    selectedSolution={solutionPartner}
                    form={DeliveryPartnerSolution}
                    onSubmit={onSubmitEngagement}
                    disabled={readOnly}
                />
            </div>
        </div>
    )
}
