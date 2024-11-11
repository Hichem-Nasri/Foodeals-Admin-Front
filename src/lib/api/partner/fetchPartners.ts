import api from '@/api/Auth'
import { API_PARTNERS } from '@/lib/api_url'
import { SchemaFilter } from '@/types/associationSchema'
import { PartnerType } from '@/types/partnersType'
import { z } from 'zod'

const buildQueryString = (
    data: z.infer<typeof SchemaFilter>,
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
    if (data.collaborators && data.collaborators.length > 0) {
        queryParts.push(
            `collabId=${encodeURIComponent(data.collaborators.join(','))}`
        )
    }
    if (data.phone) {
        queryParts.push(`phone=${encodeURIComponent(data.phone)}`)
    }
    if (data.email) {
        queryParts.push(`email=${encodeURIComponent(data.email)}`)
    }
    if (data.city) {
        queryParts.push(`leadId=${encodeURIComponent(data.city)}`)
    }
    if (data.solution && data.solution.length > 0) {
        queryParts.push(
            `statuses=${encodeURIComponent(data.solution.join(','))}`
        )
    }
    if (data.city) {
        queryParts.push(`cityId=${encodeURIComponent(data.city)}`)
    }

    queryParts.push(`types=${types}`)

    return queryParts.join('&')
}

export async function fetchPartners(
    currentPage: number,
    pageSize: number,
    filterData: z.infer<typeof SchemaFilter>
): Promise<{ status: number; data: any }> {
    try {
        const filterUrl = buildQueryString(filterData, 'PARTNER')
        console.log('filterUrl', filterUrl)
        const response = await api
            .get(
                `${API_PARTNERS}?page=${currentPage}&size=${pageSize}` +
                    filterUrl
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
