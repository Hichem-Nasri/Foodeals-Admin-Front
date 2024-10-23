import api from '@/api/Auth'
import { exportAllSubPartnerGET } from '@/types/partenairUtils'
import { SubAccountPartners } from '@/types/partners'

async function fetchSubPartner(id: string): Promise<{
    status: number
    data: SubAccountPartners[]
}> {
    const url = `http://localhost:8080/v1/sub-entities/partners/${id}`

    try {
        const response = await api.get(url).catch((error) => {
            throw error
        })
        return {
            status: 200,
            data: exportAllSubPartnerGET(response.data.content),
        }
    } catch (error) {
        console.error('Error fetching subpartner:', error)
        return { status: 404, data: [] }
    }
}

export default fetchSubPartner
