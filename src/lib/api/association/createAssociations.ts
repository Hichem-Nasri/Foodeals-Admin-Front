import api from '@/lib/Auth'
import { AssociationPostType } from '@/types/association'
import { API_URL } from '..'

export const createAssociation = async (
    id: string,
    association: AssociationPostType
): Promise<any> => {
    const formData = new FormData()
    const { logo, cover, ...rest } = association
    const blob = new Blob([JSON.stringify(rest)], {
        type: 'application/json',
    })
    console.log(JSON.stringify(rest))
    formData.append('dto', blob)
    formData.append('logo', logo as Blob)
    formData.append('cover', cover as Blob)
    const url = id
        ? `${API_URL}/api/v1/organizations/associations/${id}`
        : `${API_URL}/api/v1/organizations/associations/create`
    const method = id ? 'put' : 'post'

    const response = await api[method](url, formData).catch((err) => {
        console.error(err)
        throw new Error('Failed to save partner')
    })
    return response
}
