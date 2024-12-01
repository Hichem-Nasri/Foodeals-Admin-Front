import api from '@/lib/Auth'
import { CollaboratorDeliveryType } from '@/types/DeliverySchema'
import { API_URL } from '..'

export async function getCollaboratorDelivery(id: string): Promise<{
    status: number
    data: any
}> {
    try {
        const res = await api
            .get(`${API_URL.replace('api', 'v1')}/users/${id}/profile`)
            .catch((error) => {
                throw new Error(error.response.data.message)
            })
        console.log('res', res)
        return { status: res.status, data: res.data }
    } catch (error) {
        console.error(error)
        return {
            status: 500,
            data: null,
        }
    }
}

export const demoData: CollaboratorDeliveryType = {
    id: '1234',
    name: {
        firstName: 'John',
        lastName: 'Doe',
    },
    avatarPath: '/avatars/john-doe.jpg',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    role: 'MANAGER',
    organization: 'Superettes',
    status: 'ACTIVE',
    gender: 'MALE',
    nationalId: 'ABC123456789',
    nationality: 'Morocco',
    workingHours: [
        {
            dayOfWeek: 'MONDAY',
            morningStart: '09h',
            morningEnd: '12h',
            afternoonStart: '13h',
            afternoonEnd: '17h',
        },
        {
            dayOfWeek: 'TUESDAY',
            morningStart: '09h',
            morningEnd: '12h',
            afternoonStart: '13h',
            afternoonEnd: '17h',
        },
    ],
}
