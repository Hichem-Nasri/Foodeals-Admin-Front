import api from '@/api/Auth'

export async function getContract(id: string): Promise<any> {
    const url = `http://localhost:8080/api/v1/organizations/partners/contracts/${id}`

    try {
        const response = await api.get(url, { responseType: 'blob' })
        const contract = await response.data
        return contract
    } catch (error) {
        console.error('Error fetching contract:', error)
        throw error
    }
}
