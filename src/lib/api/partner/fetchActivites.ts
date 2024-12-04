import api from '@/lib/Auth'
import { API_URL } from '..'
import { capitalize } from '@/types/utils'

export const fetchActivities = async (type: string) => {
    try {
        const response = await api
            .get(API_URL + '/v1/activities?types=' + type)
            .then((res) => res.data)
            .catch((error) => {
                throw new Error(error)
            })

        const data = response.content.map(
            (user: { id: string; name: string }) => ({
                key: user.name.toLowerCase(),
                label: capitalize(user.name),
            })
        )
        console.log('data', data)
        // Return the data from the response
        return data
    } catch (error) {
        // Handle any errors that occur during the API request
        console.error('Error fetching manager:', error)
        throw error
    }
}
