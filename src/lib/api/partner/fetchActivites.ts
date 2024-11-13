import api from '@/api/Auth'

const API_URL = 'http://localhost:8080/Activities'

export const fetchActivities = async (type: string) => {
    try {
        const response = await api
            .get(API_URL + '?types=' + type)
            .then((res) => res.data)
            .catch((error) => {
                throw new Error(error)
            })

        const data = response.content.map(
            (user: { id: string; name: string }) => ({
                key: user.name,
                label: user.name,
            })
        )
        // Return the data from the response
        return data
    } catch (error) {
        // Handle any errors that occur during the API request
        console.error('Error fetching manager:', error)
        throw error
    }
}
