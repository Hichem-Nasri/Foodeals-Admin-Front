import api from '@/api/Auth'

export async function fetchFilterManager(search: string, type: string) {
    try {
        const url =
            `localhost:8080/v1/users/search?name=${search}/roleName=MANAGERR&pageNumber=0&pageSize=10` +
            (type ? `&types=${type}` : '')
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
