import { PartnerPOST, SolutionsContractDto } from '@/types/partenairUtils'
import { PartnerCompanyType, PartnerSolutionType } from '@/types/partners'
import {
    PartnerDataType,
    PartnerInformationSchema,
    PartnerSubscriptionSchema,
} from '@/types/PartnerSchema'
import { z } from 'zod'

export const SaveInfoData = (
    data: z.infer<typeof PartnerInformationSchema>,
    setPartnerData: React.Dispatch<React.SetStateAction<PartnerPOST>>,
    setPartnerDetails: React.Dispatch<React.SetStateAction<PartnerDataType>>
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
    setPartnerData((prev) => ({
        ...prev,
        logo: data.logo,
        cover: data.cover,
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

export const SaveSubscriptionData = (
    data: z.infer<typeof PartnerSubscriptionSchema>,
    setPartnerData: React.Dispatch<React.SetStateAction<PartnerPOST>>
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
                    ? data.accountType === PartnerCompanyType.NORMAL
                    : false
                : selectedSolutions.includes('pro_market')
                ? data.accountType === PartnerCompanyType.NORMAL
                : false,
        }))
    }

    if (data.subscriptionType === 'general') {
        const solutions = [data.dlcPro, data.marketPro, data.donate].filter(
            (s) => s && s.selected
        )
        setSolutionsData(solutions, false)
    } else {
        const newSolution = data.solutions?.solutionsId.map((s) => {
            return {
                name: s,
                duration: data.solutions?.duration,
                amount: data.solutions?.amount,
                expiration: data.solutions?.expiration,
                managerId: data.solutions?.managerId,
                commissionCash: data.solutions?.commissionCash || 0,
                commissionCard: data.solutions?.commissionCard || 0,
            }
        })

        console.log('new solutionnn: ', newSolution)
        setSolutionsData(newSolution!, true)
    }
}
