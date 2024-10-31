import api from '@/api/Auth'

export const ConfirmCommission = async (id: string) => {
    try {
        const response = await api
            .post(
                'http://localhost:8080/api/v1/payments/receive?type=COMMISSION',
                { id }
            )
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
