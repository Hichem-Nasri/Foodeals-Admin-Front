import api from '@/lib/Auth'
import { API_URL } from '.'

export async function fetchOragnizations(
    search: string,
    type: string,
    path: string
) {
    const [types, archived] = type.split('&')
    try {
        var url = ''
        if (path.includes('sieges') || path.includes('sub-account')) {
            const entity = path.includes('partenair')
                ? 'PARTNER_SB'
                : 'FOOD_BANK_SB,FOOD_BANK_ASSOCIATION'
            url = `${API_URL}/v1/sub-entities/search?name=${search}&types=${entity}&deleted=${archived}&page=0&size=10`
        } else {
            url =
                `${API_URL}/api/v1/organizations/partners/search?name=${search}&page=0&size=10` +
                (types ? `&types=${types}` : '') +
                `&deleted=${archived}`
        }
        console.log('organization: ', url)
        const res = await api.get(url).catch((error) => {
            throw new Error(error)
        })
        return res.data?.content?.map((organization: any) => ({
            label: organization.name,
            key: organization.name,
            avatar: organization.avatarPath,
        }))
    } catch (error) {
        console.error(error)
        return []
    }
}
