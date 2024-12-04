import api from '@/lib/Auth'
import {
    DeliveryPartnerType,
    emptyDeliveryPartner,
} from '@/types/DeliverySchema'
import { ContractStatusPartner } from '@/types/GlobalType'
import { PartnerStatusType } from '@/types/partnersType'
import { API_URL } from '..'

export async function fetchDeliveryPartners(
    currentPage: number,
    pageSize: number
): Promise<{ status: number; data: any }> {
    try {
        const response = await api
            .get(
                `${API_URL}/api/v1/organizations/delivery-partners?page=${currentPage}&size=${pageSize}`
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

export const getDelivery = async (id: string) => {
    if (!id || id === 'new') return null
    try {
        const res = await api
            .get(`${API_URL}/api/v1/organizations/partners/form-data/${id}`)
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
