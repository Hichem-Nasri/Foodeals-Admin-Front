import api from '@/api/Auth'
import { API_URL } from '.'

export async function fetchFilterManager(search: string, type: string) {
    try {
        const [types, archived] = type.split('&')
        const url = `${API_URL.replace(
            '/api',
            ''
        )}/v1/users/search?name=${search}&types=${types}&pageNumber=0&pageSize=10`
        console.log('url: ', url)
        const res = await api.get(url).catch((error) => {
            throw new Error(error)
        })
        return res.data?.content?.map((manager: any) => ({
            label: `${manager.name.firstName} ${manager.name.lastName}`,
            key: manager.id,
        }))
    } catch (error) {
        return []
        console.error(error)
    }
}
