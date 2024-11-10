import api from '@/api/Auth'
import { API_PARTNERS } from '@/lib/api_url'

const getArchivedPartners = async (
    type:
        | 'DELIVERY_PARTNER'
        | 'ASSOCIATION'
        | 'FOOD_BANK_ASSO'
        | 'FOOD_BANK'
        | 'NORMAL_PARTNER'
        | 'PARTNER_WITH_SB',
    currentPage: number,
    pageSize: number
): Promise<any> => {
    try {
        const response = await api
            .get(
                `${API_PARTNERS}/deleted?page=${currentPage}&size=${pageSize}&sort=deletedAt,desc&type=${type}`
            )
            .catch((error) => {
                throw new Error(error)
            })
        return { status: response.status, data: response.data }
    } catch (error) {
        console.error(error)
        return { status: 500, data: null }
    }
}

export default getArchivedPartners
