import api from '@/api/Auth'
import { API_PARTNERS } from '@/lib/api_url'
import { NotificationType } from '@/types/GlobalType'
import { PartnerPOST } from '@/types/partenairUtils'

export const createPartner = async (
    id: string,
    partner: PartnerPOST,
    assets: {
        logo: File | null
        cover: File | null
    }
): Promise<any> => {
    const formData = new FormData()
    // remover status from data
    const { status, ...rest } = partner
    const blob = new Blob([JSON.stringify(rest)], {
        type: 'application/json',
    })
    console.log(JSON.stringify(rest))
    formData.append('dto', blob)
    formData.append('logo', assets.logo as Blob)
    formData.append('cover', assets.cover as Blob)
    const url = id ? `${API_PARTNERS}/edit/${id}` : `${API_PARTNERS}/create`
    const method = id ? 'put' : 'post'

    const response = await api[method](url, formData).catch((err) => {
        console.error(err)
        throw new Error('Failed to save partner')
    })
    return response
}
