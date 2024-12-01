import { z } from 'zod'
import { CrmInformationSchemaType, CrmObjectType } from './CrmType'
import { CrmType } from './CrmType'
import { capitalize } from './utils'
import { getSolutions } from '@/lib/utils'
import { start } from 'repl'

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
    creatorInfo: z
        .object({
            id: z.union([z.string(), z.number()]),
            name: z.object({
                firstName: z.string(),
                lastName: z.string(),
            }),
            avatarPath: z.string().nullable().optional(),
        })
        .optional(),
    email: z.string().email('Veuillez entrer une adresse email valide'),
    country: z.string().min(3),
    managerInfo: z.union([z.string().min(1), z.number().min(1)]),
    state: z.string().min(3),
    city: z.string().min(3),
    region: z.string().min(3),
    solutions: z.array(z.string()).min(1),
    address: z.string().min(3),
    type: z.string().default('PARTNER'),
})

export const CrmObjectSchema = z.object({
    object: z.string().min(3, "L'objet doit contenir au moins 3 caractères"),
    message: z
        .string()
        .min(3, 'Le message doit contenir au moins 3 caractères'),
})

export const FilterCrmSchema = z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    companyName: z.array(z.string()).optional(),
    category: z.array(z.string()).optional(),
    phone: z.string().optional(),
    creatorInfo: z.union([z.string(), z.number()]).optional(),
    email: z.string().optional(),
    country: z.string().optional(),
    managerInfo: z.union([z.string(), z.number()]).optional(),
    city: z.string().optional(),
    status: z.array(z.string()).optional(),
})

export const emptyFilterCrmData = {
    startDate: '',
    endDate: '',
    companyName: [],
    category: [],
    phone: '',
    creatorInfo: '',
    email: '',
    country: '',
    managerInfo: '',
    city: '',
    status: [],
}

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
    creatorInfo: {
        id: '',
        name: {
            firstName: '',
            lastName: '',
        },
        avatarPath: '',
    },
    managerInfo: '',
    country: '',
    city: '',
    state: '',
    region: '',
    address: '',
}

export function getInfoData(data: CrmType) {
    if (!data) return defaultCrmInformationData
    return {
        companyName: data.companyName,
        category: [data.category],
        responsable:
            capitalize(data.contact?.name?.firstName) +
            ' ' +
            capitalize(data.contact?.name?.lastName),
        phone: data.contact.phone,
        email: data.contact.email,
        creatorInfo: data.creatorInfo,
        managerInfo: data.managerInfo.id,
        country: data.address.country,
        city: data.address.city,
        state: data.address.state,
        region: data.address.region,
        address: data.address.address,
        solutions: data.solutions,
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
        manager_id: data.managerInfo,
        address: {
            country: data.country,
            city: data.city,
            state: data.state,
            address: data.address,
            region: data.region,
        },
        event: null,
        type: data.type,
        solutions: data.solutions,
    }
}

export const defaultCrmObjectData = {
    object: '',
    message: '',
}
