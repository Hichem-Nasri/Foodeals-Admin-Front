import { defaultPartnerData, PartnerDataType } from '@/types/PartnerSchema'
import { appApi } from '../../routes'
import { API_URL } from '..'
import api from '@/lib/Auth'
import {
    exportPartnerConvertir,
    exportPartnerPost,
} from '@/types/partenairUtils'

export const fetchConvertirPartners = async (
    partnerId?: string
): Promise<PartnerDataType | undefined> => {
    // console.log('partnerId', partnerId)
    if (!partnerId || partnerId == 'new') return defaultPartnerData
    try {
        const url = `${API_URL}/api/v1/crm/prospects/${partnerId}`
        const response = await api
            .get(url)
            .then((res) => res.data)
            .catch((error) => {
                throw new Error(error)
            })
        return exportPartnerConvertir(response)
    } catch (error) {
        console.error('error', error)
        return defaultPartnerData
    }
}
