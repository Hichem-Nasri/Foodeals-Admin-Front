import api from '@/api/Auth'
import { API_PROSPECTS } from '@/lib/api_url'
import { FilterCrmSchema } from '@/types/CrmScheme'
import { CrmType } from '@/types/CrmType'
import { z } from 'zod'

const buildQueryString = (
    data: z.infer<typeof FilterCrmSchema>,
    types: 'ASSOCIATION,FOOD_BANK' | 'PARTNER'
) => {
    const queryParts = []

    if (data.startDate) {
        queryParts.push(`startDate=${encodeURIComponent(data.startDate)}`)
    }
    if (data.endDate) {
        queryParts.push(`endDate=${encodeURIComponent(data.endDate)}`)
    }
    if (data.companyName && data.companyName.length > 0) {
        queryParts.push(
            `names=${encodeURIComponent(data.companyName.join(','))}`
        )
    }
    if (data.category && data.category.length > 0) {
        queryParts.push(
            `categories=${encodeURIComponent(data.category.join(','))}`
        )
    }
    if (data.phone) {
        queryParts.push(`phone=${encodeURIComponent(data.phone)}`)
    }
    if (data.creatorInfo) {
        queryParts.push(`creatorId=${encodeURIComponent(data.creatorInfo)}`)
    }
    if (data.email) {
        queryParts.push(`email=${encodeURIComponent(data.email)}`)
    }
    if (data.managerInfo) {
        queryParts.push(`leadId=${encodeURIComponent(data.managerInfo)}`)
    }
    if (data.status && data.status.length > 0) {
        queryParts.push(`statuses=${encodeURIComponent(data.status.join(','))}`)
    }
    // Assuming cityId and countryId are fixed values
    if (data.country) {
        queryParts.push(`countryId=${encodeURIComponent(data.country)}`)
    }
    if (data.city) {
        queryParts.push(`cityId=${encodeURIComponent(data.city)}`)
    }

    queryParts.push(`types=${types}`)

    return queryParts.join('&')
}

export async function fetchProspect(
    currentPage: number,
    pageSize: number,
    FilterData: z.infer<typeof FilterCrmSchema>,
    types: 'ASSOCIATION,FOOD_BANK' | 'PARTNER' = 'PARTNER'
): Promise<{ status: number; data: any }> {
    try {
        const filter = buildQueryString(FilterData, types)
        const url =
            `${API_PROSPECTS}?page=${currentPage}&size=${pageSize}` + filter
        console.log('url', url)
        const response = await api.get(url).catch((error) => {
            throw error
        })
        // console.log('response', response)
        return {
            status: response.status,
            data: response.data,
        }
    } catch (error) {
        console.error('Error fetching partners:', error)
        return { status: 500, data: null }
    }
}
