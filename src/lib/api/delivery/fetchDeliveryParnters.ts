import api from '@/lib/Auth'
import { PartnerStatus } from '@/components/Partners/PartnerStatus'
import { API_DELIVERY_PARTNERS, API_PARTNERS } from '@/lib/api_url'
import { getSolutions } from '@/lib/utils'
import {
    DeliveryPartnerType,
    emptyDeliveryPartner,
} from '@/types/DeliverySchema'
import { ContractStatusPartner } from '@/types/GlobalType'
import { PartnerPOST } from '@/types/partenairUtils'
import { PartnerStatusType } from '@/types/partnersType'

export async function fetchDeliveryPartners(
    currentPage: number,
    pageSize: number
): Promise<{ status: number; data: any }> {
    try {
        const response = await api
            .get(
                `${API_DELIVERY_PARTNERS}?page=${currentPage}&size=${pageSize}`
            )
            .catch((error) => {
                throw error
            })
        return {
            status: response.status,
            data: response.data,
        }
    } catch (error) {
        console.error('Error fetching partners:', error)
        return { status: 500, data: null }
    }
}

type solutionContract = {
    solution: string
    contractCommissionDto: {
        deliveryAmount: number
        deliveryCommission: number
        withCard: any
        withCash: any
    }
}

contractCommissionDto: deliveryAmount: 1212
deliveryCommission: 1212
withCard: null
withCash: null
contractSubscriptionDto: null
solution: 'pro_market'

export const getDelivery = async (id: string) => {
    if (!id || id === 'new') return null
    try {
        const res = await api
            .get(`${API_PARTNERS}/form-data/${id}`)
            .catch((error) => {
                throw new Error(error)
            })
        if (res.status === 200) {
            const data: any = res.data
            console.log('data', data)
            const solutions: solutionContract[] = data.solutionsContractDto
            const marketPro = solutions.find(
                (val) => val.solution === 'pro_market'
            )
            const donatePro = solutions.find(
                (val) => val.solution === 'pro_donate'
            )
            const deliveryData: DeliveryPartnerType = {
                responsibleId:
                    data.contactDto?.name.firstName +
                    ' ' +
                    data.contactDto?.name.lastName,
                email: data.contactDto?.email,
                phone: data.contactDto?.phone,
                address: data.entityAddressDto.address,
                state: data.entityAddressDto.state,
                siege: data.entityAddressDto.city,
                region: data.entityAddressDto.region,
                country: data.entityAddressDto.country,
                zone:
                    data.coveredZonesDtos.flatMap((zone: any) => {
                        return zone.regions.map((region: string) => {
                            return zone.city + '-' + region
                        })
                    }) || [],
                logo: '',
                cover: '',
                companyName: data.entityName,
                companyType: data.activities || [],
                solutionsList: data.solutions,
                documents: [],
                solutions: {
                    marketPro: {
                        selected: marketPro ? true : false,
                        deliveryCost:
                            marketPro?.contractCommissionDto.deliveryAmount ||
                            0,
                        commission:
                            marketPro?.contractCommissionDto
                                .deliveryCommission || 0,
                    },
                    donatePro: {
                        selected: donatePro ? true : false,
                        deliveryCost:
                            donatePro?.contractCommissionDto.deliveryAmount ||
                            0,
                        commission:
                            donatePro?.contractCommissionDto
                                .deliveryCommission || 0,
                    },
                },
                status: ContractStatusPartner[data.status] as PartnerStatusType,
            }
            return deliveryData
        }
    } catch (e) {
        console.log(e)
        return emptyDeliveryPartner
    }
}
