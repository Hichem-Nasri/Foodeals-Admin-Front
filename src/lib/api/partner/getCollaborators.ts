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
        queryParts.push(`names=${encodeURIComponent(data.user.join(','))}`)
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

export async function getCollaborator(
    id: string,
    entityType: string,
    archive: boolean,
    currentPage: number,
    pageSize: number,
    filterData: any,
    type: string
): Promise<any> {
    try {
        console.log('types: ', type)
        const queryString = buildQueryString(filterData, entityType, type)
        const url =
            API_URL.replace('/api', '') +
            (!type || !type?.length
                ? '/v1/users/organizations/'
                : `/v1/users/subentities/`) +
            `${id}?page=${currentPage}&size=${pageSize}&sort=createdAt,desc` +
            `&deletedAt=${archive}&${queryString}`
        console.log('url+++++++++', url)
        const res = await api.get(url).catch((error) => {
            throw new Error('Error fetching collaborator')
        })
        return res
    } catch (error) {
        console.error('Error fetching collaborator:', error)
        return { status: 500, data: [] }
    }
}
