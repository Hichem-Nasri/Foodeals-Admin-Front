import api from '@/api/Auth'
import { ArchiveType } from '@/types/GlobalType'
import { API_URL } from '../..'

export async function archiveProspect(
    id: string,
    data: ArchiveType
): Promise<{ status: number; data: any }> {
    try {
        const res = await api
            .post(`${API_URL}/v1/crm/prospects/${id}`, {
                status: 'CANCELED',
                reason: { ...data },
            })
            .catch((err) => {
                throw err
            })
        return { status: res.status, data: res.data }
    } catch (e) {
        console.error(e)
        return { status: 500, data: null }
    }
}
