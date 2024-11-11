import api from '@/api/Auth'
import { PartnerInfoDto } from '@/types/GlobalType'
import { API_URL } from '.'

export async function getPartners(
    types: string[],
    name?: string
): Promise<any> {
    try {
        const url =
            API_URL +
            `/v1/payments/commissions/search?name=${name}&types=${types.join(
                ','
            )}`
        const res = await api.get(url).catch((err) => {
            throw new Error(err)
        })
        console.log('res', res)
        return res.data.content as PartnerInfoDto[]
    } catch {
        console.error('Error getting partners')
        return []
    }
}
