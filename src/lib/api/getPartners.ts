import api from '@/lib/Auth'
import { PartnerInfoDto } from '@/types/GlobalType'
import { API_URL } from '.'

export async function getPartners(
    types: string,
    name?: string,
    id?: string,
    state?: 'commissions' | 'subscriptions'
): Promise<any> {
    try {
        const url =
            API_URL +
            `/v1/payments/${
                !state ? 'commissions' : state
            }/search?name=${name}&types=${types}` +
            (id ? `&id=${id}` : '')
        const res = await api.get(url).catch((err) => {
            throw new Error(err)
        })
        console.log('res', res)
        return res.data.content as PartnerInfoDto & { city: string }[]
    } catch {
        console.error('Error getting partners')
        return []
    }
}
