'localhost:8080/v1/users/associations/f7baee18-6ff9-4c37-8edd-e2d2ce47257eea'

import api from '@/api/Auth'
import { API_URL } from '..'

export async function getCollaborator(
    id: string,
    type: string,
    currentPage: number,
    pageSize: number
): Promise<any> {
    try {
        const url =
            API_URL.replace('/api', '') +
            (!type ? '/v1/users/organizations/' : `v1/users/subentities/`) +
            `${id}?page=${currentPage}&size=${pageSize}&sort=createdAt,desc`
        const res = await api.get(url).catch((error) => {
            throw new Error('Error fetching collaborator')
        })
        return res
    } catch (error) {
        console.error('Error fetching collaborator:', error)
        return { status: 500, data: [] }
    }
}
