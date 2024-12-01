import api from '@/lib/Auth'
import { API_ASSOCIATIONS_USERS } from '@/lib/api_url'
import { API_URL } from '..'

const buildQueryString = (data: any, type: string) => {
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
    if (data.companyType) queryParts.push(`entityTypes=${data.companyType}`)
    else queryParts.push(`entityTypes=${type}`)
    if (data.solutions)
        queryParts.push(`solutions=${encodeURIComponent(data.solutions)}`)

    return queryParts.join('&')
}

export async function getCollaborator(
    id: string,
    currentPage: number,
    pageSize: number,
    archive: boolean = false,
    filterData: any,
    type: string
): Promise<any> {
    try {
        const queryString = buildQueryString(filterData, type)
        const url = `${API_URL.replace(
            'api',
            'v1'
        )}/users/organizations/${id}?page=${currentPage}&size=${pageSize}&sort=createdAt,desc&deletedAt=${
            archive ? 'true' : 'false'
        }&${queryString}`
        console.log('URL', url)
        const res = await api.get(url).catch((error) => {
            throw new Error('Error fetching collaborator')
        })
        return res
    } catch (error) {
        console.error('Error fetching collaborator:', error)
        return { status: 500, data: [] }
    }
}
