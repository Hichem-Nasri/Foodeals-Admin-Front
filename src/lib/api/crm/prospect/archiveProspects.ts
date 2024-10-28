import api from '@/api/Auth'

export async function archiveProspect(
    id: string
): Promise<{ status: number; data: any }> {
    try {
        const res = await api
            .post(`http://localhost:8080/api/v1/crm/prospects/status/${id}`, {
                status: 'CANCELED',
            })
            .catch((err) => err)
        return { status: res.status, data: res.data }
    } catch (e) {
        console.error(e)
        return { status: 500, data: null }
    }
}
