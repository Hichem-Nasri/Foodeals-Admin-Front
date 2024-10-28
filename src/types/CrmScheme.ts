import { z } from 'zod'
import { CrmInformationSchemaType, CrmObjectType } from './CrmType'
import CrmDemandes from '@/app/crm/demandes/crmDemandes'
import { CrmType } from './CrmType'
import { capitalize } from './utils'
import { getSolutions } from '@/lib/utils'

export const CrmInformationSchema = z.object({
    companyName: z.string().min(3),
    category: z.array(z.string()).min(1),
    responsable: z.string().min(3),
    phone: z
        .string()
        .min(9, 'Le numéro de téléphone doit contenir au moins 9 chiffres')
        .refine((value) => /^\d+$/.test(value), {
            message: 'Le numéro de téléphone ne doit contenir que des chiffres',
        }),
    creatorInfo: z.union([z.string(), z.number()]),
    email: z.string().email('Veuillez entrer une adresse email valide'),
    country: z.string().min(3),
    managerInfo: z.union([z.string(), z.number()]),
    city: z.string().min(3),
    region: z.string().min(3),
    solutions: z.array(z.string()).min(1),
    address: z.string().min(3),
})

export const CrmObjectSchema = z.object({
    object: z.string().min(3, "L'objet doit contenir au moins 3 caractères"),
    message: z
        .string()
        .min(3, 'Le message doit contenir au moins 3 caractères'),
})

export interface NotificationType {
    responsable: string
    object: string
    message: string
    image: string
}

export const NotificationSchema = z.object({
    responsable: z.string().min(3),
    object: z.string().min(3, "L'objet doit contenir au moins 3 caractères"),
    message: z
        .string()
        .min(3, 'Le message doit contenir au moins 3 caractères'),
    image: z.string().min(1, "L'image est obligatoire"),
})

export const defaultNotificationData = {
    responsable: '',
    object: '',
    message: '',
    image: '',
}

export const defaultCrmInformationData = {
    companyName: '',
    category: [],
    responsable: '',
    phone: '',
    email: '',
    creatorInfo: '',
    managerInfo: '',
    country: '',
    city: '',
    region: '',
    address: '',
}

export function getInfoData(data: CrmType) {
    if (!data) return defaultCrmInformationData
    return {
        companyName: data.companyName,
        category: [data.category],
        responsable:
            capitalize(data.contact.name.firstName) +
            ' ' +
            capitalize(data.contact.name.lastName),
        phone: data.contact.phone,
        email: data.contact.email,
        creatorInfo: data.creatorInfo.id,
        managerInfo: data.managerInfo.id,
        country: data.address.country,
        city: data.address.city,
        region: data.address.region,
        address: data.address.address,
        solutions: getSolutions(data.solutions),
    }
}

export const getCrmCreateData = (data: CrmInformationSchemaType) => {
    const [firstName, lastName] = data.responsable.split(' ')
    return {
        companyName: data.companyName,
        activities: data.category,
        responsible: {
            name: {
                firstName: firstName,
                lastName: lastName,
            },
            email: data.email,
            phone: data.phone,
        },
        powered_by: data?.creatorInfo,
        manager_id: data.managerInfo,
        address: {
            country: data.country,
            city: data.city,
            address: data.address,
            region: data.region,
        },
        event: null,
        solutions: data.solutions,
    }
}

export const defaultCrmObjectData = {
    object: '',
    message: '',
}
