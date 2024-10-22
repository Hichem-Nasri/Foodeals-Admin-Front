import api from '@/api/Auth'

async function validateContract(
    id: string,
    contractFile: File[]
): Promise<any> {
    const url = `http://localhost:8080/api/v1/organizations/partners/validate/${id}`

    const formData = new FormData()
    formData.append('contract', contractFile[0])

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
