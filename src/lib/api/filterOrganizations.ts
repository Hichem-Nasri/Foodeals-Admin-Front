import api from '@/api/Auth'
import { API_URL } from '.'

export async function fetchOragnizations(search: string, type: string) {
    try {
        const res = await api
            .get(
                `${API_URL}i/v1/organizations/partners/search?name=${search}&types=${type}&deleted=true&page=0&size=10`
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
