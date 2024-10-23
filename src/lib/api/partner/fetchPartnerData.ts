import { defaultPartnerData, PartnerDataType } from '@/types/PartnerSchema'
import { appApi } from '../../routes'
import { API_URL } from '..'
import api from '@/api/Auth'
import { exportPartnerPost } from '@/types/partenairUtils'

export const getPartnerData = async (
    partnerId?: string
): Promise<PartnerDataType | undefined> => {
    // console.log('partnerId', partnerId)
    if (!partnerId || partnerId == '%3Aid') return defaultPartnerData
    try {
        const url = `http://localhost:8080/api/v1/organizations/partners/form-data/${partnerId}`
        const response = await api
            .get(url)
            .then((res) => res.data)
            .catch((error) => {
                throw new Error(error)
            })
        return exportPartnerPost(response)
    } catch (error) {
        console.error('error', error)
        return defaultPartnerData
    }
}
