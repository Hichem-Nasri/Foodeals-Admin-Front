'localhost:8080/v1/users/associations/f7baee18-6ff9-4c37-8edd-e2d2ce47257eea'

import api from '@/api/Auth'
import { API_ASSOCIATIONS_USERS } from '@/lib/api_url'

export async function getCollaborator(
    id: string,
    currentPage: number,
    pageSize: number
): Promise<any> {
    try {
        const res = await api
            .get(
                API_ASSOCIATIONS_USERS +
                    '/' +
                    id +
                    `?page=${currentPage}&size=${pageSize}&sort=createdAt,desc`
            )
            .catch((error) => {
                throw new Error('Error fetching collaborator')
            })
        return res
    } catch (error) {
        console.error('Error fetching collaborator:', error)
        return { status: 500, data: [] }
    }
}
