import api from '@/lib/Auth'
import { API_URL } from '..'

export const ConfirmCommission = async (id: string) => {
    try {
        const response = await api
            .post(`${API_URL}/v1/payments/receive?type=COMMISSION`, {
                id,
            })
            .catch((error) => {
                throw {
                    status: error.response.status,
                    data: error.response.data,
                }
            })
        return { status: response.status, data: response.data }
    } catch (error) {
        return { status: 500, data: null }
    }
}
