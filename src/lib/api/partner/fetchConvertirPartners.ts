import { defaultPartnerData, PartnerDataType } from '@/types/PartnerSchema'
import { appApi } from '../../routes'
import { API_URL } from '..'
import api from '@/api/Auth'
import {
    exportPartnerConvertir,
    exportPartnerPost,
} from '@/types/partenairUtils'
import { API_PROSPECTS } from '@/lib/api_url'

export const fetchConvertirPartners = async (
    partnerId?: string
): Promise<PartnerDataType | undefined> => {
    // console.log('partnerId', partnerId)
    if (!partnerId || partnerId == '%3Aid') return defaultPartnerData
    try {
        const url = `${API_PROSPECTS}/${partnerId}`
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
