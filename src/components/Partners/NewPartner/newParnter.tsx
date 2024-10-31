'use client'
import { TopBar } from './TopBar'
import { FormPartnerInfo } from './FormPartnerInfo'
import { FormSubscription } from './FormSubscription'
import { FormFeatures } from './FormFeatures'
import { ArchivePartner } from './ArchivePartner'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { countryCodes } from '@/lib/utils'
import { useMutation } from '@tanstack/react-query'
import api from '@/api/Auth'
import { useNotification } from '@/context/NotifContext'
import { NotificationType } from '@/types/GlobalType'
import validateContract from '@/lib/api/partner/validateContract'
import {
    defaultPartnerFeaturesData,
    defaultPartnerInformationData,
    defaultPartnerSubscriptionData,
    PartnerDataType,
    PartnerFeaturesSchema,
    PartnerInformationSchema,
    PartnerSubscriptionSchema,
} from '@/types/PartnerSchema'
import {
    emptyPartnerPOST,
    PartnerPOST,
    SolutionsContractDto,
    checkAllForms,
} from '@/types/partenairUtils'
import {
    PartnerCompanyType,
    PartnerSolutionType,
    PartnerStatusType,
} from '@/types/partners'
import { useSearchParams } from 'next/navigation'
import { set } from 'date-fns'
import { createPartner } from '@/lib/api/partner/createpartner'

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
        id == '%3Aid' || id.includes('?convertir') ? '' : id
    )
    const [saved, setSaved] = useState(false)
    const [partnerData, setPartnerData] =
        useState<PartnerPOST>(emptyPartnerPOST)
    const [contractUpload, setContractUpload] = useState<File[] | null>(null)
    const notif = useNotification()
    const [readOnly, setReadOnly] = useState<boolean>(partnerId !== '')
    const searchParams = useSearchParams()

    useEffect(() => {
        const mode = searchParams.get('mode') // Access the mode from searchParams
        if (mode === 'edit') {
            setReadOnly(false)
        }
    }, [searchParams])
    // Form setups

    const partnerInformation = useForm<
        z.infer<typeof PartnerInformationSchema>
    >({
        resolver: zodResolver(PartnerInformationSchema),
        mode: 'onBlur',
        defaultValues: {
            ...partnerDetails,
            logo: partnerDetails?.logo!,
            cover: partnerDetails?.cover!,
        },
    })

    const partnerSubscription = useForm<
        z.infer<typeof PartnerSubscriptionSchema>
    >({
        resolver: zodResolver(PartnerSubscriptionSchema),
        mode: 'onBlur',
        defaultValues: partnerDetails || defaultPartnerSubscriptionData,
    })

    const partnerFeatures = useForm<z.infer<typeof PartnerFeaturesSchema>>({
        resolver: zodResolver(PartnerFeaturesSchema),
        mode: 'onBlur',
        defaultValues: partnerDetails || defaultPartnerFeaturesData,
    })
    // Mutation for saving partner data
    const mutation = useMutation({
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
            notif.notify(
                NotificationType.SUCCESS,
                "Partner's data has been saved successfully"
            )
            return response.data
        },
        onSuccess: (data) => {
            if (id.includes('?convertir')) {
                const uid = id.split('?')[0]
                const res = api
                    .post(
                        `http://localhost:8080/api/v1/crm/prospects/status/${uid}`,
                        {
                            status: 'VALID',
                        }
                    )
                    .then((res) => res.data)
                    .catch((e) => {
                        console.log(e)
                    })
            }
            setPartnerId(data.id)
        },
        onError: (err) => {
            console.error(err)
        },
    })

    // Handlers for form submissions
    const handlePartnerInfoSubmit = (
        data: z.infer<typeof PartnerInformationSchema>
    ) => {
        if (data.logo) {
            setPartnerDetails((prev) => ({
                ...prev,
                logo: data.logo as File,
            }))
        }
        if (data.cover) {
            setPartnerDetails((prev) => ({
                ...prev,
                cover: data.cover as File,
            }))
        }
        console.log(data.companyType)
        setPartnerData((prev) => ({
            ...prev,
            features: data.partnerType,
            entityName: data.companyName,
            commercialNumber: data.commercialRegisterNumber.toString(),
            contactDto: {
                name: {
                    firstName: data.responsible.split(' ')[0],
                    lastName: data.responsible.split(' ').slice(1).join(' '),
                },
                email: data.email,
                phone: data.phone,
            },
            entityAddressDto: {
                country: data.country,
                city: data.city,
                region: data.region,
                address: data.address,
                iframe: data.mapLocation,
            },
            managerId: +data.managerId,
            activities: data.companyType,
        }))
    }

    const handleSubscriptionSubmit = (
        data: z.infer<typeof PartnerSubscriptionSchema>
    ) => {
        const commonData = {
            entityType: data.accountType,
            entityBankInformationDto: {
                beneficiaryName: data.beneficiary,
                bankName: data.bank,
                rib: data.rib,
            },
        }

        const setSolutionsData = (solutions: any[], isGeneral: boolean) => {
            const selectedSolutions = solutions
                .map((s) => s?.name)
                .filter((s) => s !== null && s !== undefined)

            const solutionsContractDto: SolutionsContractDto[] = solutions.map(
                (s): SolutionsContractDto => ({
                    solution: s?.name!,
                    contractSubscriptionDto: {
                        duration: +s?.duration!,
                        annualPayment: +s?.amount!,
                        numberOfDueDates: +s?.expiration!,
                    },
                    contractCommissionDto: {
                        withCard: s?.commissionCard || 0,
                        withCash: s?.commissionCash || 0,
                    },
                })
            )

            setPartnerData((prev) => ({
                ...prev,
                ...commonData,
                oneSubscription: isGeneral,
                solutions: selectedSolutions,
                solutionsContractDto,

                commissionPayedBySubEntities: isGeneral
                    ? data.marketPro?.selected
                        ? data.marketPro?.managerId ===
                          PartnerCompanyType.NORMAL
                        : false
                    : selectedSolutions.includes('pro_market')
                    ? data.solutions?.managerId === PartnerCompanyType.NORMAL
                    : false,
            }))
        }

        if (data.subscriptionType === 'general') {
            const solutions = [data.dlcPro, data.marketPro, data.donate].filter(
                (s) => s && s.selected
            )
            setSolutionsData(solutions, false)
        } else {
            const newSolution = data.solutions?.solutionsId
                .map((s) => {
                    switch (s) {
                        case PartnerSolutionType.MARKET_PRO:
                            return 'pro_market'
                        case PartnerSolutionType.DLC_PRO:
                            return 'pro_dlc'
                        case PartnerSolutionType.DONATE_PRO:
                            return 'pro_donate'
                        default:
                            return null
                    }
                })
                .filter((s) => s !== null && s !== undefined)

            console.log('new solution: ', newSolution)
            setSolutionsData(newSolution!, true)
        }
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
        console.log('hello')
        const partnerInfoResult = await partnerInformation.trigger()
        const partnerSubscriptionResult = await partnerSubscription.trigger()
        const partnerFeaturesResult = await partnerFeatures.trigger()

        console.log('partnerId: ', partnerId)
        if (partnerId !== '' && !contractUpload) {
            notif.notify(NotificationType.ERROR, 'Please upload the contract')
            return
        }

        if (
            partnerInfoResult &&
            partnerSubscriptionResult &&
            partnerFeaturesResult
        ) {
            handlePartnerInfoSubmit(partnerInformation.getValues())
            handleSubscriptionSubmit(partnerSubscription.getValues())
            handleFeaturesSubmit(partnerFeatures.getValues())
            console.log('saved')
            setSaved(true)
        }
    }

    // Handler for submitting the contract
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
        if (saved && checkAllForms(partnerData)) {
            setSaved(false)
            mutation.mutate({ id: partnerId, data: partnerData })
        }
    }, [partnerData, saved])

    return (
        <div className="flex flex-col gap-[0.625rem] w-full lg:px-3 lg:mb-0 mb-20 overflow-auto">
            <TopBar
                isPending={mutation.isPending}
                status={partnerDetails.status || PartnerStatusType.DRAFT}
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
                        partnerDetails.status === PartnerStatusType.VALID ||
                        readOnly
                    }
                />
                <FormSubscription
                    onSubmit={handleSubscriptionSubmit}
                    form={partnerSubscription}
                    disabled={
                        partnerDetails.status === PartnerStatusType.VALID ||
                        readOnly
                    }
                    status={partnerDetails.status}
                    isContractGenerated={partnerDetails.status !== 'VALID'}
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
                {partnerDetails.status === PartnerStatusType.VALID && (
                    <ArchivePartner partnerId={partnerId} />
                )}
            </div>
        </div>
    )
}
