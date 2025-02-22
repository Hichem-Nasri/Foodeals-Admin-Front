import api from '@/lib/Auth'
import { API_URL } from '.'

export default async function getDateAvailable(
    type: string,
    id?: string
): Promise<any> {
    try {
        let url = API_URL + '/api/v1/payments/commissions/available-months'
        switch (type) {
            case 'organization':
                url += '/organizations?organizationId=' + (id ? id : '')
                break
            case 'partner':
                url += '/partners?partnerId=' + (id ? id : '')
                break
            default:
                break
        }
        console.log('url is: ', url)
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
        const url = API_URL + '/api/v1/payments/subscriptions/available-years'
        const res = await api.get(url).catch((err) => {
            throw new Error(err)
        })
        return res.data
    } catch {
        console.error('Error getting available years')
        return []
    }
}
