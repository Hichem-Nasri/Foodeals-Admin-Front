import api from '@/api/Auth'

const archivePatner = async (
    partnerId: string,
    archiveReason: {
        reason: string
        details: string
    }
): Promise<any> => {
    const url = `http://localhost:8080/api/v1/organizations/partners/${partnerId}`
    try {
        const response = await api
            .delete(url, {
                data: archiveReason,
            })
            .then((res) => res)
            .catch((error) => {
                throw error
            })
        return { status: response.status, data: response.data }
    } catch (error) {
        console.error(error)
    }
}

export default archivePatner
