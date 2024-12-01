import api from '@/lib/Auth'
import { API_URL } from '.'

// Define the API function for fetching a manager
export const fetchManager = async (searchName: string) => {
    try {
        // Make a GET request to the API endpoint with the search name as a query parameter
        const url = `${API_URL.replace(
            '/api',
            'v1'
        )}/users/search?name=${searchName}&pageNumber=1&pageSize=10`
        const response = await api
            .get(url)
            .then((res) => res.data)
            .catch((error) => {
                throw new Error(error)
            })
        const data = response.content.map(
            (user: {
                id: string
                name: { firstName: string; lastName: string }
                avatarPath: string
            }) => ({
                key: user.id,
                label: `${user.name.firstName} ${user.name.lastName}`,
                avatar: user.avatarPath,
            })
        )
        console.log('data', data)
        // Return the data from the response
        return data
    } catch (error) {
        // Handle any errors that occur during the API request
        console.error('Error fetching manager:', error)
        return []
    }
}

export const fetchUsers = async (searchName: string) => {}
