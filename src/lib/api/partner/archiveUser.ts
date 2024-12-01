import api from '@/lib/Auth'
import { ArchiveType } from '@/types/GlobalType'
import { API_URL } from '..'

const archiveUser = async (
    partnerId: string,
    archiveReason: ArchiveType
): Promise<any> => {
    const url = `${API_URL.replace('api', 'v1')}/users/${partnerId}`
    try {
        console.log('archiveReason:', archiveReason)
        const response = await api
            .delete(url, {
                data: {
                    ...archiveReason,
                },
            })
            .then((res) => res)
            .catch((error) => {
                throw error
            })
        return { status: response.status, data: response.data }
    } catch (error) {
        console.error(error)
        throw error
    }
}

export default archiveUser
