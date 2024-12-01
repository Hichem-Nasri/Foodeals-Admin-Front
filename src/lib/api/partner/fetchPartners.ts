import api from '@/lib/Auth'
import { API_PARTNERS } from '@/lib/api_url'
import { SchemaFilter } from '@/types/associationSchema'
import { PartnerType } from '@/types/partnersType'
import { z } from 'zod'

const buildQueryString = (
    data: any,
    type: 'PARTNERS' | 'DELIVERIES' | 'ASSOCIATIONS'
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
    if (data.collaborators) {
        queryParts.push(`collabId=${encodeURIComponent(data.collaborators)}`)
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
            `solutions=${encodeURIComponent(data.solution.join(','))}`
        )
    }
    if (data.status) {
        queryParts.push(`status=${encodeURIComponent(data.status)}`)
    }
    if (data.city) {
        queryParts.push(`cityId=${encodeURIComponent(data.city)}`)
    }
    if (data.companyType) queryParts.push(`types=${data.companyType}`)
    else {
        switch (type) {
            case 'PARTNERS':
                queryParts.push(`types=PARTNER_WITH_SB,NORMAL_PARTNER`)
                break
            case 'ASSOCIATIONS':
                queryParts.push(`types=ASSOCIATION,FOOD_BANK,FOOD_BANK_ASSO`)
                break
            case 'DELIVERIES':
                queryParts.push(`types=DELIVERY_PARTNER`)
                break
        }
    }

    return '&' + queryParts.join('&')
}

export async function fetchPartners(
    type: 'PARTNERS' | 'DELIVERIES' | 'ASSOCIATIONS',
    currentPage: number,
    pageSize: number,
    filterData: any,
    archived: boolean = false
): Promise<{ status: number; data: any }> {
    try {
        const filterUrl = buildQueryString(filterData, type)
        const url =
            `${API_PARTNERS}?page=${currentPage}&size=${pageSize}` +
            `&organizationsType=${type}` +
            filterUrl +
            (archived ? '&deletedAt=true' : '&deletedAt=false')
        console.log('filterUrl', filterUrl)
        console.log('archived', url)
        const response = await api.get(url).catch((error) => {
            throw error
        })
        console.log('response', response)
        return {
            status: response.status,
            data: response.data,
        }
    } catch (error) {
        console.error('Error fetching partners:', error)
        return { status: 500, data: null }
    }
}
