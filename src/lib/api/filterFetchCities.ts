import api from '@/lib/Auth'
import { API_URL } from '.'

export async function fetchCities(
    search: string,
    type: string,
    country?: string,
    path?: string,
    fullUrl?: string
) {
    try {
        const [types, archived] = type.split('&')
        let url = `${API_URL}`
        if (path?.includes('sieges') || path?.includes('sub-account')) {
            const id = path.split('/')?.pop()!
            url = `${API_URL}/v1/sub-entities/cities/search?city=${search}&organizationId=${id}&pageNum=0&pageSize=10`
        } else if (
            path?.includes('collaborator') ||
            path?.includes('collaborateur')
        ) {
            const id = path.split('/')?.pop()!
            url = `${API_URL}/v1/users/cities/${
                fullUrl?.includes('sub') ? 'subentities' : 'organizations'
            }/search?city=${search}&organizationId=${id}&pageNum=0&pageSize=10`
        } else {
            url = `${API_URL}/api/v1/organizations/cities/search?city=${search}&country=${country}&pageNum=0&pageSize=10&types=${types}`
        }
        console.log('cities: ', url)
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
