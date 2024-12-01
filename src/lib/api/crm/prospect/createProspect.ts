import api from '@/lib/Auth'
import { API_URL } from '../..'

export async function createProspect(data: any) {
    const url = `${API_URL}/v1/crm/prospects/create`
    try {
        console.log('url; ', url)
        console.log(JSON.stringify(data))
        const response = await api
            .post(url, JSON.stringify(data))
            .catch((err) => {
                console.log(err)
                throw err
            })
        console.log('done: ', response)
        return { status: response.status, data: response.data }
    } catch (error) {
        console.error('Error creating prospect:', error)
        return { status: 500, data: error }
    }
}
