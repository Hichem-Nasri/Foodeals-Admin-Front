'use client'

import { TopBar } from './TopBar'
import { FormPartnerInfo } from './FormPartnerInfo'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
    defaultPartnerFeaturesData,
    defaultPartnerInformationData,
    defaultPartnerSubscriptionData,
    PartnerDataType,
    PartnerFeaturesSchema,
    PartnerInformationSchema,
    PartnerSubscriptionSchema,
} from '@/types/PartnerSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef, useState } from 'react'
import { countryCodes } from '@/lib/utils'
import { FormSubscription } from './FormSubscription'
import { FormFeatures } from './FormFeatures'
import {
    PartnerCompanyType,
    PartnerSolutionType,
    PartnerStatusType,
} from '@/types/partners'
import { ArchivePartner } from './ArchivePartner'
import {
    checkAllForms,
    emptyPartnerPOST,
    exportPartnerPost,
    PartnerPOST,
    SolutionsContractDto,
} from '@/types/partenairUtils'
import { set } from 'date-fns'
import { useMutation, useQuery } from '@tanstack/react-query'
import api from '@/api/Auth'
import { useNotification } from '@/context/NotifContext'
import { NotificationType } from '@/types/Global-Type'
import validateContract from '@/lib/api/partner/validateContract'

interface NewPartnerProps {
    partner?: PartnerDataType
    id: string
}

export const NewPartner: React.FC<NewPartnerProps> = ({ partner, id }) => {
    const [countryCode, setCountryCode] = useState(countryCodes[0].value)
    const [partnerDetails, setPartnerDetails] = useState<PartnerDataType>(
        partner!
    )
    const [partnerId, setPartnerId] = useState(id == '%3Aid' ? '' : id)
    const [saved, setsaved] = useState(false)
    const [PartnerData, setPartnerData] =
        useState<PartnerPOST>(emptyPartnerPOST)
    console.log('id: ', partnerId)
    const { mutate } = useMutation({
        mutationKey: ['partner'],
        mutationFn: async ({ id, data }: { id: string; data: PartnerPOST }) => {
            // const formData = new FormData()
            if (partnerId === '') {
                console.log('data post: ', data)
                const res = await api
                    .post(
                        'http://localhost:8080/api/v1/organizations/partners/create',
                        data
                    )
                    .catch((err) => console.log(err))
                if (!res || ![201, 200].includes(res.status))
                    throw new Error('Failed to create partner')
                console.log('done: ', res)
                return res.data
            } else {
                // update
                console.log('data put: ', data)
                const res = await api
                    .put(
                        `http://localhost:8080/api/v1/organizations/partners/edit/${partnerId}`,
                        data
                    )
                    .catch((err) => console.log(err))
                if (!res || ![201, 200].includes(res.status))
                    throw new Error('Failed to update partner')
                console.log('done: ', res)
                return res.data
            }
        },
        onSuccess: (data) => {
            setPartnerId(data.id)
        },
        onError: (err) => {
            console.log(err)
        },
    })
    const partnerInformation = useForm<
        z.infer<typeof PartnerInformationSchema>
    >({
        resolver: zodResolver(PartnerInformationSchema),
        mode: 'onBlur',
        defaultValues: {
            ...(partnerDetails
                ? partnerDetails
                : defaultPartnerInformationData),
        },
    })

    const partnerSubscription = useForm<
        z.infer<typeof PartnerSubscriptionSchema>
    >({
        resolver: zodResolver(PartnerSubscriptionSchema),
        mode: 'onBlur',
        defaultValues: {
            ...(partnerDetails
                ? partnerDetails
                : defaultPartnerSubscriptionData),
        },
    })

    const partnerFeatures = useForm<z.infer<typeof PartnerFeaturesSchema>>({
        resolver: zodResolver(PartnerFeaturesSchema),
        mode: 'onBlur',
        defaultValues: {
            ...(partnerDetails ? partnerDetails : defaultPartnerFeaturesData),
        },
    })

    const onSubmitPartnerInfo = (
        data: z.infer<typeof PartnerInformationSchema>
    ) => {
        setPartnerData((prev) => {
            return {
                ...prev,
                features: data.partnerType,
                entityName: data.companyName,
                commercialNumber: data.commercialRegisterNumber.toString(),
                contactDto: {
                    name: {
                        firstName: data.responsible.split(' ')[0],
                        lastName: data.responsible
                            .split(' ')
                            .slice(1)
                            .join(' '),
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
            }
        })
    }

    const onSubmitSubscription = (
        data: z.infer<typeof PartnerSubscriptionSchema>
    ) => {
        if (data.subscriptionType === 'general') {
            const solutions = [data.dlcPro, data.marketPro, data.donate].filter(
                (s) => s && s.selected
            )
            const selectedSolutions = solutions
                .map((s) => s?.name)
                .filter((s) => s !== null && s !== undefined)
            const selectedSolutionsData: SolutionsContractDto[] = solutions.map(
                (s): SolutionsContractDto => {
                    return {
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
                    }
                }
            )
            setPartnerData((prev) => {
                return {
                    ...prev,
                    entityType: data.accountType,
                    oneSubscription: false,
                    commissionPayedBySubEntities: data.marketPro?.selected
                        ? data.marketPro?.managerId ===
                          PartnerCompanyType.NORMAL
                        : false,
                    entityBankInformationDto: {
                        beneficiaryName: data.beneficiary,
                        bankName: data.bank,
                        rib: data.rib,
                    },
                    solutions: selectedSolutions,
                    solutionsContractDto: selectedSolutionsData,
                }
            })
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
                    }
                })
                .filter((s) => s !== null && s !== undefined)
            console.log('new solution: ', newSolution)
            setPartnerData((prev) => {
                return {
                    ...prev,
                    entityType: data.accountType,
                    entityBankInformationDto: {
                        beneficiaryName: data.beneficiary,
                        bankName: data.bank,
                        rib: data.rib,
                    },
                    oneSubscription: true,
                    solutions: newSolution!,
                    commissionPayedBySubEntities: newSolution!.includes(
                        'pro_market'
                    )
                        ? data.solutions?.managerId ===
                          PartnerCompanyType.NORMAL
                        : false,
                    solutionsContractDto: newSolution!.map(
                        (s): SolutionsContractDto => {
                            return {
                                solution: s,
                                contractSubscriptionDto: {
                                    duration: +data.solutions!.duration,
                                    annualPayment: +data.solutions!.amount,
                                    numberOfDueDates:
                                        +data.solutions!.expiration,
                                },
                                contractCommissionDto: {
                                    withCard: +data.solutions!.commissionCard!,
                                    withCash: +data.solutions!.commissionCash!,
                                },
                            }
                        }
                    ),
                }
            })
        }
    }

    const onSubmitFeatures = (data: z.infer<typeof PartnerFeaturesSchema>) => {
        setPartnerData((prev) => {
            return {
                ...prev,
                maxNumberOfSubEntities: +data.numberOfStores,
            }
        })
    }
    const [ContractUpload, setContractUpload] = useState<File[] | null>(null)
    const notif = useNotification()
    const onSubmit = async () => {
        console.log('partner id: ', partnerId)
        if (!ContractUpload) {
            notif.notify(NotificationType.ERROR, 'Please upload the contract')
            return
        }
        const res = await validateContract(partnerId, ContractUpload)
        if (res.status === 200) {
            notif.notify(NotificationType.SUCCESS, 'Contract validated')
            setPartnerDetails((prev) => {
                return {
                    ...prev,
                    status: PartnerStatusType.VALIDATED,
                }
            })
        } else {
            notif.notify(NotificationType.ERROR, 'Failed to validate contract')
        }
    }

    const onSaveData = async (modify?: boolean) => {
        if (modify === true) {
            setPartnerDetails((prev) => {
                return {
                    ...prev,
                    status: PartnerStatusType.PENDING,
                }
            })
            return
        }
        const partnerInfoResult = await partnerInformation.trigger()
        const partnerSubscriptionResult = await partnerSubscription.trigger()
        const partnerFeaturesResult = await partnerFeatures.trigger()
        // show error if any
        console.log('partner info: ', partnerInformation.formState.errors)
        console.log(
            'partner subscription: ',
            partnerSubscription.formState.errors
        )
        console.log('partner features: ', partnerFeatures.formState.errors)
        if (partnerId != '' && !ContractUpload) {
            notif.notify(NotificationType.ERROR, 'Please upload the contract')
            return
        }
        if (
            partnerInfoResult &&
            partnerSubscriptionResult &&
            partnerFeaturesResult
        ) {
            onSubmitPartnerInfo(partnerInformation.getValues())
            onSubmitSubscription(partnerSubscription.getValues())
            onSubmitFeatures(partnerFeatures.getValues())
            setsaved(true)
            console.log(partnerSubscription.getValues())
            console.log('partner data: ', PartnerData)
            mutate({ id: partnerId, data: PartnerData })
        }
    }

    useEffect(() => {
        if (checkAllForms(PartnerData))
            mutate({ id: partnerId, data: PartnerData })
    }, [PartnerData, saved])
    console.log('partner data: ', partnerDetails)
    return (
        <div className="flex flex-col gap-[0.625rem] w-full lg:px-3 lg:mb-0 mb-20 overflow-auto">
            <TopBar
                status={
                    partnerDetails
                        ? (partnerDetails.status as PartnerStatusType)
                        : PartnerStatusType.DRAFT
                }
                primaryButtonDisabled={partnerId == ''}
                secondaryButtonDisabled={false}
                onSaveData={onSaveData}
                onSubmit={onSubmit}
                id={partnerId}
            />
            <div className="flex flex-col gap-[1.875rem] h-full w-full">
                <FormPartnerInfo
                    onSubmit={onSubmitPartnerInfo}
                    form={partnerInformation}
                    countryCode={countryCode}
                    setCountryCode={setCountryCode}
                    disabled={
                        partnerDetails
                            ? partnerDetails.status ===
                              PartnerStatusType.VALIDATED
                            : false
                    }
                />
                <FormSubscription
                    onSubmit={onSubmitSubscription}
                    form={partnerSubscription}
                    disabled={
                        partnerDetails
                            ? partnerDetails.status ===
                              PartnerStatusType.VALIDATED
                            : false
                    }
                    status={
                        partnerDetails
                            ? partnerDetails.status
                            : PartnerStatusType.DRAFT
                    }
                    isContractGenerated={partnerDetails?.status !== 'VALIDATED'}
                    onContractUpload={setContractUpload}
                />
                <FormFeatures
                    form={partnerFeatures}
                    omSubmit={onSubmitFeatures}
                    disabled={
                        partnerDetails
                            ? partnerDetails.status ===
                              PartnerStatusType.VALIDATED
                            : false
                    }
                />
                {partnerDetails &&
                    partnerDetails.status === PartnerStatusType.VALIDATED && (
                        <ArchivePartner partnerId={partnerId} />
                    )}
            </div>
        </div>
    )
}
