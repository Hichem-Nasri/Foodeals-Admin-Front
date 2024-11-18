import api from '@/api/Auth'
import { API_URL } from '.'

export async function fetchOragnizations(search: string, type: string) {
    const [types, archived] = type.split('&')
    try {
        const res = await api
            .get(
                `${API_URL}/v1/organizations/partners/search?name=${search}&page=0&size=10` +
                    (types ? `&types=${types}` : '') +
                    `&deleted=${archived}`
            )
            .catch((error) => {
                throw new Error(error)
            })
        return res.data?.content?.map((organization: any) => ({
            label: organization.name,
            key: organization.id,
            avatar: organization.avatarPath,
        }))
    } catch (error) {
        console.error(error)
        return []
    }
}
