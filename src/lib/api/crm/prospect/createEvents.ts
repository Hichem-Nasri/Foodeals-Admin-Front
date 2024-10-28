import api from '@/api/Auth'
import { API_PARTNERS, API_PROSPECTS } from '@/lib/api_url'
import { CrmObjectType } from '@/types/CrmType'
import { CrmType } from '@/types/CrmType'
import { exportAllPartnerGET, PartnerGET } from '@/types/partenairUtils'
import { PartnerType } from '@/types/partners'

export async function createArchive(event: CrmObjectType, id: string) {
    try {
        const newEvent = {
            object: event.object,
            message: event.message,
            dateAndTime: new Date().toISOString(),
            lead: 1, //Todo: Change this value to the lead id
        }
        const res = await api
            .post(
                `http://localhost:8080/api/v1/crm/prospects/${id}/events/create`,
                newEvent
            )
            .then((res) => res.data)
            .catch((error) => {
                throw error
            })
        console.log('res', res)
        return { status: res.status, data: res.data }
    } catch (e) {
        console.error(e)
        return { status: 500, data: [] }
    }
}
