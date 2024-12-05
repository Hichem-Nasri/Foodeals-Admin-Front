import api from '@/lib/Auth'
import { API_URL } from '.'
import { usePathname } from 'next/navigation'

export async function fetchFilterManager(search: string, type: string) {
    try {
        const [types, archived] = type.split('&')
        const url = `${API_URL}/v1/users/search?name=${search}&types=${types}&pageNumber=0&pageSize=10`
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
export async function fetchFilterSalesManager(
    search: string,
    type: string,
    id: string,
    partnerType?: string
) {
    try {
        const [types, archived] = type.split('&')

        console.log('id: ', id)
        let url = ''
        if (
            id.includes('sub-account') ||
            id.includes('sub-entity') ||
            id.includes('sieges') ||
            partnerType == 'sub'
        ) {
            const partner = id.split('/').pop()!
            url = `${API_URL}/v1/users/subentities/search?name=${search}&organizationId=${partner}&pageNumber=0&pageSize=10`
        } else {
            url = `${API_URL}/v1/users/organizations/search?name=${search}&types=${types}&deleted=${archived}&pageNumber=0&pageSize=10`
        }
        console.log('url: ', url)
        const res = await api.get(url).catch((error) => {
            throw new Error(error)
        })
        return res.data?.content?.map((manager: any) => ({
            label: `${manager.name.firstName} ${manager.name.lastName}`,
            key: manager.id,
            avatar: manager.avatarPath,
        }))
    } catch (error) {
        return []
        console.error(error)
    }
}

export async function fetchManagerSubEntity(
    search: string,
    type: string,
    id: string
) {
    try {
        const [types, archived] = type.split('&')
        const url = `${API_URL}/v1/users/subentities/search?name=${search}&types=${types}&organizationId=${id}&pageNumber=0&pageSize=10`
        console.log('url: ', url)
        const res = await api.get(url).catch((error) => {
            throw new Error(error)
        })
        return res.data?.content?.map((manager: any) => ({
            label: `${manager.name?.firstName} ${manager.name?.lastName}`,
            key: manager.id,
        }))
    } catch (error) {
        return []
        console.error(error)
    }
}
