import { z } from 'zod'
import { ContactType, PartnerInfoDto } from './GlobalType'

type ContactWithAvatarType = ContactType & {
    avatarPath: string
}

export type SupportType = {
    id: string
    createdAt: string
    received: ContactWithAvatarType
    role: string
    parnter: PartnerInfoDto
    attachment: File[] | null
    object: string
}

export const SupportSchema = z.object({
    received: z.string(),
    parnter: z.string(),
    attachment: z.array(z.instanceof(File)).nullable(),
    object: z.string(),
    demande: z.string(),
})
