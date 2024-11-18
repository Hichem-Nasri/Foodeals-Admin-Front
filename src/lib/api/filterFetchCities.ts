import api from '@/api/Auth'
import { API_URL } from '.'

export async function fetchCities(
    search: string,
    type: string,
    country?: string
) {
    try {
        const [types, archived] = type.split('&')
        const res = await api
            .get(
                `${API_URL}/v1/organizations/cities/search?city=${search}&country=${
                    country ? country : 'morocco'
                }&page=0&size=10` +
                    (types ? `&types=${types}` : '') +
                    `&deleted=${archived}`
            )
            .catch((error) => {
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
