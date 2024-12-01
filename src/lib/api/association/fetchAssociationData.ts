import { defaultPartnerData, PartnerDataType } from '@/types/PartnerSchema'
import { appApi } from '../../routes'
import { API_URL } from '..'
import api from '@/lib/Auth'
import { exportPartnerPost } from '@/types/partenairUtils'
import {
    AssociationInformationSchemaType,
    defaultAssociationInformationData,
    defaultEngagementData,
} from '@/types/associationSchema'
import { API_ASSOCIATIONS } from '@/lib/api_url'
import { exportAssociationPost } from '@/types/association'

export const getAssociationData = async (
    associationId?: string
): Promise<AssociationInformationSchemaType | undefined> => {
    // console.log('associationId', associationId)
    if (!associationId || associationId == 'new')
        return {
            ...defaultAssociationInformationData,
            ...defaultEngagementData,
        }
    try {
        const url = `${API_URL}/v1/organizations/associations/form-data/${associationId}`
        const response = await api
            .get(url)
            .then((res) => res.data)
            .catch((error) => {
                throw new Error(error)
            })
        console.log('response', response)
        return exportAssociationPost(response)
    } catch (error) {
        console.error('error', error)
        return {
            ...defaultAssociationInformationData,
            ...defaultEngagementData,
        }
    }
}
