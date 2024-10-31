import {
    ConfirmPaymentType,
    defaultValuesConfirmPayment,
} from '@/types/PaymentType'
import { API_URL } from '.'
import { appApi } from '../routes'
import api from '@/api/Auth'

export const getConfirmationInfo = async (
    versionId?: string
): Promise<ConfirmPaymentType | undefined> => {
    if (!versionId || !Number.isInteger(Number(versionId))) return undefined
    try {
        const response = await api
            .get(
                API_URL +
                    appApi.paymentReceived.replace('{paymentId}', versionId)
            )
            .catch((error) => {
                throw new Error(error)
            })
        if (!response || !response.data) return undefined
        return response.data as ConfirmPaymentType
    } catch (error) {
        console.error(error)
        return undefined
    }
}
