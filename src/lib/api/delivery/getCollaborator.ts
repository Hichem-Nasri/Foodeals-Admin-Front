import api from '@/lib/Auth'
import { API_URL } from '..'

const buildQueryString = (data: any, type: string, sub: string) => {
    const queryParts = []
    const entityType = sub ? 'subEntityTypes' : 'entityTypes'
    if (data.startDate) {
        queryParts.push(`startDate=${encodeURIComponent(data.startDate)}`)
    }
    if (data.endDate) {
        queryParts.push(`endDate=${encodeURIComponent(data.endDate)}`)
    }
    if (data.user && data.user.length > 0) {
        queryParts.push(
            `names=${encodeURIComponent(data.user.join(',') + ',')}`
        )
    }
    if (data.roleName) {
        queryParts.push(`roleName=${encodeURIComponent(data.roleName)}`)
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
        queryParts.push(`city=${encodeURIComponent(data.city)}`)
    }
    if (data.region) {
        queryParts.push(`region=${encodeURIComponent(data.region)}`)
    }
    if (data.companyType) queryParts.push(`${entityType}=${data.companyType}`)
    else queryParts.push(`${entityType}=${type}`)
    if (data.solutions && data.solutions.length > 0)
        queryParts.push(`solutions=${encodeURIComponent(data.solutions)}`)

    return queryParts.join('&')
}

export async function getCollaboratorDelivery(
    id: string,
    currentPage: number,
    pageSize: number,
    filterData: any,
    archive: boolean
): Promise<{
    status: number
    data: any
}> {
    try {
        const query = buildQueryString(filterData, 'DELIVERY_PARTNER', '')
        const url =
            API_URL +
            `/v1/users/organizations/${id}` +
            `?page=${currentPage}&size=${pageSize}&sort=name.firstName,asc&deletedAt=${archive}&${query}`
        console.log('url', url)
        const res = await api.get(url).catch((error) => {
            throw new Error(error.response.data.message)
        })

        return { status: res.status, data: res.data }
    } catch (error) {
        console.error(error)
        return { status: 500, data: [] }
    }
}
