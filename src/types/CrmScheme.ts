import { z } from 'zod'
import { PartnerStatusType } from './partners'
import { object } from 'prop-types'
import { CrmInformationSchemaType, CrmObjectType } from './CrmType'

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
    email: z.string().email('Veuillez entrer une adresse email valide'),
    country: z.string().min(3),
    creatorInfo: z.string().min(3),
    managerInfo: z.string().min(3),
    city: z.string().min(3),
    region: z.string().min(3),
    address: z.string().min(3),
})

export const CrmObjectSchema = z.object({
    object: z.string().min(3, "L'objet doit contenir au moins 3 caractères"),
    message: z
        .string()
        .min(3, 'Le message doit contenir au moins 3 caractères'),
})

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

export const defaultCrmObjectData = {
    object: '',
    message: '',
}

export interface PartnerDataType
    extends CrmInformationSchemaType,
        CrmObjectType {}
