import api from '@/api/Auth'
import { API_DELIVERY_PARTNERS, API_PARTNERS } from '@/lib/api_url'
import { DeliveryType, exportDeliveryData } from '@/types/deliveries'
import { DeliveryPartnerType } from '@/types/DeliverySchema'
import {
    exportAllPartnerGET,
    PartnerGET,
    PartnerPOST,
} from '@/types/partenairUtils'
import { PartnerType } from '@/types/partners'

export async function fetchDeliveryPartners(
    currentPage: number,
    pageSize: number
): Promise<{ status: number; data: DeliveryType[] }> {
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
            data: exportDeliveryData(response.data.content as DeliveryType[]),
        }
    } catch (error) {
        console.error('Error fetching partners:', error)
        return { status: 500, data: [] }
    }
}

export const getDelivery = async (id: string) => {
    if (!id || id === 'new') return null
    try {
        const res = await api
            .get(`${API_PARTNERS}/form-data/${id}`)
            .catch((error) => {
                throw new Error(error)
            })
        if (res.status === 200) {
            const data: PartnerPOST = res.data
            const deliveryData: DeliveryPartnerType = {
                responsibleId:
                    data.contactDto?.name.firstName +
                    ' ' +
                    data.contactDto?.name.lastName,
                email: data.contactDto?.email,
                phone: data.contactDto?.phone,
                address: data.entityAddressDto.address,
                siege: data.entityAddressDto.city,
                region: data.entityAddressDto.region,
                country: data.entityAddressDto.country,
                zone:
                    data.coveredZonesDtos.flatMap((zone) => {
                        return zone.regions.map((region: string) => {
                            return zone.city + '-' + region
                        })
                    }) || [],
                logo: null,
                cover: null,
                companyName: data.entityName,
                companyType: data.activities || [],
                solutions: data.solutions,
                documents: [],
                deliveryCost: 0,
                commission: 0,
            }
            console.log('hello:', deliveryData)
            return deliveryData
        }
    } catch (e) {
        console.log(e)
        return null
    }
}
