import api from '@/lib/Auth'
import { API_URL } from '.'

export async function fetchRegionsFilter(
    search: string,
    type: string,
    country?: string,
    path?: string
) {
    try {
        const id = path?.split('/')?.pop()!
        const [types, archived] = type.split('&')
        let url = `${API_URL.replace(
            'api',
            'v1'
        )}/users/regions/organizations/search?region=${search}&organizationId=${id}`
        const res = await api.get(url).catch((error) => {
            throw new Error(error)
        })

        return res.data?.content?.map((city: any) => ({
            label: city.name,
            key: city.id,
        }))
    } catch (error) {
        console.error(error)
        return []
    }
}
