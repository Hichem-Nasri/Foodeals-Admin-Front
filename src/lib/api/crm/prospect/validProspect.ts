import api from '@/lib/Auth'
import { API_URL } from '../..'

export async function validProspect(id: string, status = 'VALID') {
    try {
        const response = await api
            .post(`${API_URL}/v1/crm/prospects/status/${id}`, {
                status: status,
            })
            .catch((error) => {
                throw new Error('Field valid prospect')
            })
        return response
    } catch (error) {
        console.error(error)
        return { status: 500 }
    }
}
