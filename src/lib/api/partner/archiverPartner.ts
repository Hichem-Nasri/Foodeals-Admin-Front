import api from '@/api/Auth'
import { ArchiveType } from '@/types/GlobalType'

const archivePatner = async (
    partnerId: string,
    archiveReason: ArchiveType
): Promise<any> => {
    const url = `http://localhost:8080/api/v1/organizations/${partnerId}`
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

export default archivePatner
