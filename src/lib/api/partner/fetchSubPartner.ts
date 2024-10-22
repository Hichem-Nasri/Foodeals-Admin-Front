import api from '@/api/Auth'

async function fetchSubPartner(id: string) {
    const url = `http://localhost:8080/v1/sub-entities/partners/${id}`

    try {
        const response = await api
            .get(url)
            .then((res) => res.data)
            .catch((error) => {
                throw error
            })
        return response
    } catch (error) {
        console.error('Error fetching subpartner:', error)
        return { status: 404, data: [] }
    }
}

export default fetchSubPartner
