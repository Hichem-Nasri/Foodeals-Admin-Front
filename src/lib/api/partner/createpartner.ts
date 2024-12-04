import api from '@/lib/Auth'
import { PartnerPOST } from '@/types/partenairUtils'
import { API_URL } from '..'

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
    const { status, logo, cover, ...rest } = partner
    const blob = new Blob([JSON.stringify(rest)], {
        type: 'application/json',
    })
    console.log(JSON.stringify(rest), assets.logo, assets.cover)
    formData.append('dto', blob)
    if (assets.logo) formData.append('logo', assets.logo)
    if (assets.cover) formData.append('cover', assets.cover)
    const url = id
        ? `${API_URL}/api/v1/organizations/partners/edit/${id}`
        : `${API_URL}/api/v1/organizations/partners/create`
    const method = id ? 'put' : 'post'
    console.log('methode: ', method, url)
    const response = await api[method](url, formData).catch((err) => {
        console.error(err)
        throw new Error(' Failed to save partner')
    })
    return response
}
