import { z } from 'zod'
import { PartnerSolutionType } from './partnersType'

export const associationInformationSchema = z.object({
    logo: z.union([z.instanceof(File), z.string()]).optional(),
    cover: z.union([z.instanceof(File), z.string()]).optional(),
    companyName: z.string().min(3),
    companyType: z.array(z.string()).min(1),
    responsible: z.string().min(3),
    phone: z
        .string()
        .min(9, 'Le numéro de téléphone doit contenir au moins 9 chiffres')
        .refine((value) => /^\d+$/.test(value), {
            message: 'Le numéro de téléphone ne doit contenir que des chiffres',
        }),
    email: z.string().email('Veuillez entrer une adresse email valide'),
    PVNumber: z
        .string()
        .min(0, 'Le numéro de téléphone doit contenir au moins 9 chiffres'),
    managerId: z.string().min(1, 'selectionner un manager'),
    country: z.string().min(3, 'selectionner un pays'),
    city: z.string().min(3, 'selectionner une ville'),
    region: z.string().min(3, 'selectionner une region'),
    address: z.string().min(3, 'saissir une adresse'),
    associationType: z.string().min(3, "selectionner un type d'association"),
    mapLocation: z.string().min(3, 'coller iframe'),
})

export const SchemaFilter = z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    companyName: z.array(z.string()).optional(),
    collaborators: z.array(z.string()).optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    city: z.string().optional(),
    companyType: z.string().optional(),
    solution: z.array(z.string()).optional(),
})

export const defaultSchemaFilter = {
    startDate: undefined,
    endDate: undefined,
    companyName: [],
    collaborators: [],
    email: '',
    phone: '',
    city: '',
    companyType: '',
    solution: [],
}

export const defaultAssociationInformationData = {
    logo: '',
    cover: '',
    companyName: '',
    companyType: [],
    responsible: '',
    phone: '',
    email: '',
    PVNumber: '',
    managerId: '',
    country: '',
    city: '',
    region: '',
    address: '',
    associationType: '',
    mapLocation: '',
}

export const engagementSchema = z.object({
    numberOfSieges: z
        .number()
        .min(1, 'le nombre de sieges doit etre superieur a 0'),
    solutions: z.array(z.string()).min(1, 'selectionner au moins une solution'),
})

export const defaultEngagementData = {
    numberOfSieges: 0,
    solutions: [],
    documents: [],
}

export interface AssociationInformationSchemaType {
    logo: string | File
    cover: string | File
    companyName: string
    companyType: string[]
    responsible: string
    phone: string
    email: string
    PVNumber: string
    managerId: string
    country: string
    city: string
    region: string
    address: string
    associationType: string
    mapLocation: string
    numberOfSieges: number
    solutions: PartnerSolutionType[]
    documents: string[]
}
