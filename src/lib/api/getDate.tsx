import api from '@/api/Auth'
import { API_URL } from '.'

export default async function getDateAvailable(
    type: string,
    id?: string
): Promise<any> {
    try {
        let url = API_URL + '/payments/commissions/available-months'
        switch (type) {
            case 'partner':
                url += '/partners?partnerId=' + id
                break
            case 'organization':
                url += '/organizations?organizationId=' + id
                break
            default:
                break
        }
        const res = await api.get(url).catch((err) => {
            throw new Error(err)
        })
        return res.data
    } catch {
        console.error('Error getting available months')
        return []
    }
}

export async function getYearsAvailable(): Promise<any> {
    try {
        const url = API_URL + '/v1/payments/subscriptions/available-years'
        const res = await api.get(url).catch((err) => {
            throw new Error(err)
        })
        return res.data
    } catch {
        console.error('Error getting available years')
        return []
    }
}
