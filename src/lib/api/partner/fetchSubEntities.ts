import api from '@/lib/Auth'
import { API_URL } from '..'

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
            `names=${encodeURIComponent(data.companyName.join(',') + ',')}`
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
                queryParts.push(`types=PARTNER_SB`)
                break
            default:
                queryParts.push(`types=FOOD_BANK_SB,FOOD_BANK_ASSOCIATION`)
                break
        }
    }

    return '&' + queryParts.join('&')
}

export async function fetchSubEntities(
    id: string,
    type: 'PARTNERS' | 'ASSOCIATIONS',
    currentPage: number,
    pageSize: number,
    filterData: any,
    archived: boolean = false
): Promise<{ status: number; data: any }> {
    try {
        const filterUrl = buildQueryString(filterData, type)
        const url =
            `${API_URL}/v1/sub-entities/organizations/${id}?page=${currentPage}&size=${pageSize}` +
            `&organizationsType=${type}` +
            filterUrl +
            (archived ? '&deletedAt=true' : '&deletedAt=false') +
            '&sort=createdAt,desc'
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
