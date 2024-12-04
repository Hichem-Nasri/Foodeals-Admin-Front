import api from '@/lib/Auth'
import { API_URL } from '..'

async function validateContract(
    id: string,
    contractFile: File[]
): Promise<any> {
    const url = `${API_URL}/api/v1/organizations/partners/validate/${id}`

    const formData = new FormData()
    formData.append('document', contractFile[0])

    try {
        const response = await api
            .post(url, formData)
            .then((res) => res)
            .catch((error) => {
                throw error
            })
        return { status: response.status, data: response.data }
    } catch (error) {
        console.error(error)
        return { status: 500, data: error }
    }
}

export default validateContract
