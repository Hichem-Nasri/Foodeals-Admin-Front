import { z } from 'zod'
import { ContactType } from './GlobalType'
import { PartnerSolutionType } from './partnersType'

export type CollaboratorsType = {
    id: string
    createdAt: string
    roleName: string
    solutions: PartnerSolutionType[]
    userInfoDto: ContactType & { avatarPath: string }
}

export interface CollaboratorsUser {
    createdAt: string
    id: string
    role: string
    name: ContactType['name']
    city: string
    region: string
    avatarPath: string | null
    email: string
    phone: string
}

export const SchemaCollaborators = z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    roleName: z.string().optional(),
    solutions: z.array(z.string()).optional(),
    name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
})

export const defaultSchemaCollaborators = {
    startDate: '',
    endDate: '',
    roleName: '',
    solutions: [],
    name: '',
    email: '',
    phone: '',
}
