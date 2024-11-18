import api from '@/api/Auth'
import { API_URL } from '..'

interface Contract {
    // Define the expected properties of the contract
}

export async function getContract(id: string): Promise<Contract> {
    const url = `${API_URL}/v1/organizations/partners/contracts/${id}`

    try {
        const response = await api.get(url, { responseType: 'blob' })

        // Check if the response is successful
        if (response.status !== 200) {
            throw new Error(`Error fetching contract: ${response.statusText}`)
        }
        console.log('generated')
        return response.data // Directly return the data
    } catch (error) {
        throw error
    }
}
