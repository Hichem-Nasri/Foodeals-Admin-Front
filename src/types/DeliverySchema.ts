import { z } from 'zod'

export const DeliveryPartnerSchema = z.object({
    logo: z
        .string()
        .refine((value) => !value.includes('https://via.placeholder.com/120'), {
            message: 'Veuillez ajouter une image de logo',
        }),
    cover: z
        .string()
        .refine((value) => !value.includes('https://via.placeholder.com/740'), {
            message: 'Veuillez ajouter une image de couverture',
        }),
    companyName: z.string().min(3),
    companyType: z.array(z.string()).min(1),
    responsibleId: z.string().min(3),
    solutions: z.array(z.string()).min(1),
    phone: z
        .string()
        .min(9, 'Le numéro de téléphone doit contenir au moins 9 chiffres')
        .refine((value) => /^\d+$/.test(value), {
            message: 'Le numéro de téléphone ne doit contenir que des chiffres',
        }),
    email: z.string().email('Veuillez entrer une adresse email valide'),
    siege: z.string().min(3),
    zone: z.array(z.string()).min(1),
    address: z.string().min(3),
    associationType: z.string().min(3),
})

export const defaultDeliveryPartnerData = {
    logo: 'https://via.placeholder.com/120',
    cover: 'https://via.placeholder.com/740x223',
    companyName: '',
    companyType: [],
    responsibleId: '',
    solutions: [],
    phone: '',
    email: '',
    siege: '',
    zone: [],
    address: '',
    associationType: '',
}

export const DeliveryPartnerSolutionSchema = z.object({
    solutions: z.array(z.string()).min(1, 'selectionner au moins une solution'),
    documents: z.array(z.string()).min(1, 'selectionner au moins un document'),
    deliveryCost: z
        .number()
        .min(1, 'le cout de livraison doit etre superieur a 0'),
    commission: z
        .number()
        .min(1, 'le cout de commution doit etre superieur a 0'),
})

export const defaultDeliveryPartnerSolutionData = {
    solutions: [],
    documents: [],
    deliveryCost: 0,
    commission: 0,
}

export interface DeliveryPartnerSchemaType
    extends z.infer<typeof DeliveryPartnerSchema>,
        z.infer<typeof DeliveryPartnerSolutionSchema> {}

export const CollaboratorDeliverySchema = z.object({
    avatar: z
        .string()
        .refine((value) => !value.includes('https://via.placeholder.com/150'), {
            message: 'Veuillez ajouter une image de profil',
        }),
    civility: z.string().min(3, 'selectionner une civilité'),
    firstName: z
        .string()
        .min(3, 'Le prénom doit contenir au moins 3 caractères'),
    lastName: z.string().min(3, 'Le nom doit contenir au moins 3 caractères'),
    origin: z.string().min(3, 'selectionner une nationalité'),
    numberId: z
        .number()
        .min(4, "Le numéro d'identification doit être supérieur à 4"),
    role: z.string().min(3, 'Le rôle doit contenir au moins 3 caractères'),
    phone: z
        .string()
        .min(9, 'Le numéro de téléphone doit contenir au moins 9 chiffres')
        .refine(
            (value) => /^\d+$/.test(value),
            'Le numéro de téléphone doit contenir au moins 9 chiffres'
        ),
    email: z
        .string()
        .email({ message: 'Veuillez entrer une adresse email valide' }),
    partner: z.string().min(3, 'selectionner un partenaire'),
})

export const defaultCollaboratorDeliveryData = {
    avatar: 'https://via.placeholder.com/150',
    civility: '',
    firstName: '',
    lastName: '',
    origin: '',
    numberId: 0,
    role: '',
    phone: '',
    email: '',
    partner: '',
}

const ScheduleDayType = z.object({
    morning: z
        .object({
            start: z.string(),
            end: z.string(),
        })
        .optional(),
    afternoon: z
        .object({
            start: z.string(),
            end: z.string(),
        })
        .optional(),
})

export const CollaboratorDeliveryScheduleSchema = z.object({
    monday: ScheduleDayType,
    tuesday: ScheduleDayType,
    wednesday: ScheduleDayType,
    thursday: ScheduleDayType,
    friday: ScheduleDayType,
    saturday: ScheduleDayType,
    sunday: ScheduleDayType,
})

export const defaultCollaboratorDeliveryScheduleData = {
    monday: {
        morning: undefined,
        afternoon: { start: '14h', end: '18h' },
    },
    tuesday: {
        morning: { start: '08h', end: '12h' },
        afternoon: { start: '14h', end: '18h' },
    },
    wednesday: {
        morning: { start: '08h', end: '12h' },
        afternoon: { start: '14h', end: '18h' },
    },
    thursday: {
        morning: { start: '08h', end: '12h' },
        afternoon: undefined,
    },
    friday: {
        morning: undefined,
        afternoon: { start: '14h', end: '18h' },
    },
    saturday: {
        morning: { start: '08h', end: '12h' },
        afternoon: { start: '14h', end: '18h' },
    },
    sunday: {
        morning: { start: '08h', end: '12h' },
        afternoon: { start: '14h', end: '18h' },
    },
}

export interface CollaboratorDeliveryDataType
    extends z.infer<typeof CollaboratorDeliverySchema>,
        z.infer<typeof CollaboratorDeliveryScheduleSchema> {}

// morning: string
// afternoon: string
