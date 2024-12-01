import { FC } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Label } from '@/components/Label'
import {
    Boxes,
    CalendarClock,
    Eye,
    HandCoins,
    ListPlus,
    Mail,
    Pencil,
    PhoneCall,
    Store,
    Users,
} from 'lucide-react'
import { CustomButton } from '@/components/custom/CustomButton'
import Link from 'next/link'
import { PartnerStatus } from '../PartnerStatus'
import { PartnerCollaborators } from '@/types/collaborators'
import { ActionsMenu, ActionType } from '@/components/custom/ActionsMenu'
import { AppRoutes } from '@/lib/routes'
import { useRouter } from 'next/navigation'
import { CollaboratorsUser } from '@/types/collaboratorsUtils'
import { capitalize } from '@/types/utils'

interface PartnerCollaboratesCardProps {
    partner?: CollaboratorsUser
}

export const PartnerCollaboratesCard: FC<PartnerCollaboratesCardProps> = ({
    partner,
}) => {
    const router = useRouter()

    if (!partner) return

    const actions: ActionType[] = [
        {
            actions: (id) =>
                router.push(AppRoutes.newPartner.replace(':id', id)),
            icon: Eye,
            label: 'VOIR PLUS DES DETAIL',
        },
        {
            actions: (id) => {
                router.push(
                    AppRoutes.paymentDetails.replace(':id', id) + '?mode=edit'
                )
            },
            icon: Pencil,
            label: 'MODIFIER UN PARTENAIRE',
        },
    ]
    const fullName =
        capitalize(partner.name.firstName) +
        ' ' +
        capitalize(partner.name.lastName)
    return (
        <div className="flex flex-col gap-3 bg-white p-3 rounded-[20px]">
            <div className="flex justify-between gap-[0.375rem]">
                <div className="flex gap-[0.375rem]">
                    <Avatar className="size-[2.875rem] shrink-0">
                        <AvatarImage className="" src={partner.avatarPath!} />
                        <AvatarFallback>
                            {fullName[0].toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                        <Label
                            label={fullName}
                            className="text-sm font-normal text-lynch-950"
                        />
                        <Label
                            label={partner.city}
                            className="text-xs font-medium text-primary"
                        />
                        <div className="flex items-center gap-2 text-lynch-500">
                            <CalendarClock size={18} />
                            <Label
                                label={partner.createdAt}
                                className="text-xs font-medium text-lynch-500"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-[0.375rem]">
                    <Link href={`tel:${partner.phone}`}>
                        <CustomButton
                            label=""
                            IconLeft={PhoneCall}
                            className="p-[0.625rem] shrink-0 h-fit [&>.icon]:m-0 rounded-full"
                        />
                    </Link>
                    <Link href={`mailto:${partner.email}`}>
                        <CustomButton
                            label=""
                            IconLeft={Mail}
                            className="p-[0.625rem] shrink-0 h-fit [&>.icon]:m-0 rounded-full bg-amethyst-500"
                        />
                    </Link>
                    <ActionsMenu
                        menuList={actions}
                        className="[&>svg]:size-6 p-[0.625rem]"
                    />
                </div>
            </div>
        </div>
    )
}
