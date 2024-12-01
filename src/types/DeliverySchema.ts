import { z } from 'zod'
import { ContactDto, PartnerPOST } from './partenairUtils'

export const DeliveryPartnerSchema = z.object({
    logo: z.union([z.instanceof(File), z.string()]).optional(),
    cover: z.union([z.instanceof(File), z.string()]).optional(),
    companyName: z.string().min(3),
    companyType: z.array(z.string()).min(1),
    responsibleId: z.string().min(3),
    solutions: z
        .object({
            marketPro: z.object({
                selected: z.boolean().default(false),
                deliveryCost: z
                    .number()
                    .min(1, 'le cout de livraison doit etre superieur a 0')
                    .default(0)
                    .optional(),
                commission: z
                    .number()
                    .min(1, 'le cout de commution doit etre superieur a 0')
                    .default(0)
                    .optional(),
            }),
            donatePro: z.object({
                selected: z.boolean().default(false),
                deliveryCost: z
                    .number()
                    .min(1, 'le cout de livraison doit etre superieur a 0')
                    .default(0)
                    .optional(),
                commission: z
                    .number()
                    .min(1, 'le cout de commution doit etre superieur a 0')
                    .default(0)
                    .optional(),
            }),
        })
        .refine((value) => {
            if (
                value.marketPro.selected &&
                !value.marketPro.deliveryCost &&
                !value.marketPro.commission
            ) {
                return 'Please fill in the delivery cost and commission for Market Pro solution'
            }
            if (
                value.donatePro.selected &&
                !value.donatePro.deliveryCost &&
                !value.donatePro.commission
            ) {
                return 'Please fill in the delivery cost and commission for Donate Pro solution'
            }
            return true
        }),
    solutionsList: z.array(z.string()).min(1),
    phone: z
        .string()
        .min(9, 'Le numéro de téléphone doit contenir au moins 9 chiffres')
        .refine((value) => /^\d+$/.test(value), {
            message: 'Le numéro de téléphone ne doit contenir que des chiffres',
        }),
    email: z.string().email('Veuillez entrer une adresse email valide'),
    country: z.string(),
    siege: z.string().min(3),
    state: z.string().min(3),
    zone: z.array(z.string()).min(1),
    region: z.string().min(3),
    address: z.string().min(3),
    documents: z.array(z.instanceof(File).optional()).optional(),
})

export type DeliveryPartnerType = {
    logo: File | string
    cover: File | string
    companyName: string
    companyType: string[]
    responsibleId: string
    solutionsList: string[]
    phone: string
    email: string
    country: string
    state: string
    siege: string
    region: string
    zone: string[]
    address: string
    documents: File[]
    solutions: {
        marketPro: {
            selected: boolean
            deliveryCost: number
            commission: number
        }
        donatePro: {
            selected: boolean
            deliveryCost: number
            commission: number
        }
    }
    status?: string
}

export const emptyDeliveryPartner: z.infer<typeof DeliveryPartnerSchema> = {
    logo: '',
    cover: '',
    companyName: '',
    companyType: [],
    responsibleId: '',
    solutionsList: [],
    solutions: {
        marketPro: {
            selected: false,
            deliveryCost: 0,
            commission: 0,
        },
        donatePro: {
            selected: false,
            deliveryCost: 0,
            commission: 0,
        },
    },
    phone: '',
    email: '',
    country: '',
    siege: '',
    zone: [],
    address: '',
    documents: [],
    region: '',
    state: '',
}

// export const importDeliveryData: PartnerPOST = (data: )

export const defaultDeliveryPartnerData = {
    logo: null,
    cover: null,
    companyName: '',
    companyType: [],
    responsibleId: '',
    solutions: [],
    phone: '',
    email: '',
    siege: '',
    zone: [],
    address: '',
    country: '',
}

export const defaultDeliveryPartnerSolutionData = {
    solutions: [],
    documents: null,
    deliveryCost: 0,
    commission: 0,
}

export interface DeliveryPartnerSchemaType
    extends z.infer<typeof DeliveryPartnerSchema> {}

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

export const defaultCollaboratorDeliveryData: CollaboratorDeliveryType = {
    id: '',
    name: { firstName: '', lastName: '' },
    avatarPath: '',
    email: '',
    phone: '',
    role: '',
    organization: '',
    status: '',
    gender: '',
    nationalId: '',
    nationality: '',
    workingHours: [
        'Lundi',
        'Mardi',
        'Mercredi',
        'Jeudi',
        'Vendredi',
        'Samedi',
        'Dimanche',
    ].map((day) => ({
        dayOfWeek: day,
        morningStart: '08h',
        morningEnd: '12h',
        afternoonStart: '14h',
        afternoonEnd: '18h',
    })),
}
export type CollaboratorDeliveryType = z.infer<
    typeof CollaboratorDeliveryTypeSchema
>

export interface WorkingHour {
    dayOfWeek: string
    morningStart: string
    morningEnd: string
    afternoonStart: string
    afternoonEnd: string
}
export const WorkingHourSchema = z.object({
    dayOfWeek: z.string(),
    morningStart: z.string(),
    morningEnd: z.string(),
    afternoonStart: z.string(),
    afternoonEnd: z.string(),
})

export const ContactDtoSchema = z.object({
    firstName: z.string().min(3),
    lastName: z.string().min(3),
})

export const CollaboratorDeliveryTypeSchema = z.object({
    id: z.string().optional(),
    name: ContactDtoSchema,
    avatarPath: z.string(),
    email: z.string().email(),
    phone: z.string(),
    role: z.string(),
    organization: z.string(),
    partner: z
        .object({
            id: z.string(),
            name: z.string(),
            avatarPath: z.string(),
            city: z.string(),
        })
        .optional(),
    status: z.string(),
    gender: z.string(),
    nationalId: z.string(),
    nationality: z.string(),
    workingHours: z.array(WorkingHourSchema),
})

export const ScheduleDayTypeSchema = z.object({
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

export const CollaboratorDeliveryScheduleTypeSchema = z.object({
    monday: ScheduleDayTypeSchema.optional(),
    tuesday: ScheduleDayTypeSchema.optional(),
    wednesday: ScheduleDayTypeSchema.optional(),
    thursday: ScheduleDayTypeSchema.optional(),
    friday: ScheduleDayTypeSchema.optional(),
    saturday: ScheduleDayTypeSchema.optional(),
    sunday: ScheduleDayTypeSchema.optional(),
})

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
