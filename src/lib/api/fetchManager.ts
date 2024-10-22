import api from '@/api/Auth'
import axios from 'axios'

// Define the base URL for your API
const BASE_URL = 'https://api.example.com'

// Define the API function for fetching a manager
export const fetchManager = async (searchName: string) => {
    try {
        // Make a GET request to the API endpoint with the search name as a query parameter
        const response = await api
            .get(
                `http://localhost:8080/v1/users/search?query=${searchName}&page=0&size=20&sort=name.firstName,asc`
            )
            .then((res) => res.data)
            .catch((error) => console.error(error))

        const data = response.content.map(
            (user: {
                id: string
                name: { firstName: string; lastName: string }
            }) => ({
                key: user.id,
                label: `${user.name.firstName} ${user.name.lastName}`,
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
