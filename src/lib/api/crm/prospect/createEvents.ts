import api from '@/api/Auth'
import { CrmObjectType } from '@/types/CrmType'

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
