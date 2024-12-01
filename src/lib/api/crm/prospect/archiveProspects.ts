import api from '@/lib/Auth'
import { ArchiveType } from '@/types/GlobalType'
import { API_URL } from '../..'

export async function archiveProspect(
    id: string,
    data: ArchiveType,
    status: string = 'CANCELED'
): Promise<{ status: number; data: any }> {
    try {
        const res = await api
            .post(`${API_URL}/v1/crm/prospects/status/${id}`, {
                status: status,
                reason: { ...data },
            })
            .catch((err) => {
                throw err
            })
        console.log('res', res)
        return { status: res.status, data: res.data }
    } catch (e) {
        throw new Error('Failed to archive prospect')
    }
}
