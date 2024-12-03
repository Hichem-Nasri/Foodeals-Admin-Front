import { FC } from 'react'
import {
    CalendarClock,
    Eye,
    Handshake,
    Mail,
    MapPin,
    PhoneCall,
    Users,
} from 'lucide-react'
import Link from 'next/link'
import { AppRoutes } from '@/lib/routes'
import { useRouter } from 'next/navigation'
import { CollaboratorAssociationsType } from '@/types/association'
import { ActionsMenu, ActionType } from '@/components/custom/ActionsMenu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Label } from '@/components/Label'
import { CustomButton } from '@/components/custom/CustomButton'
import { capitalize } from '@/types/utils'
import { PartnerSolution } from '../Partners/PartnerSolution'
import { PartnerSolutionType } from '@/types/partnersType'
import { CollaboratorsType } from './column/collaboratorColumn'
import { GetListUser } from './column/getListUser'

interface CollaboratorCardProps {
    User?: CollaboratorsType
    partnerId: string
    archive: boolean
    refetch: () => void
}

export const CollaboratorCard: FC<CollaboratorCardProps> = ({
    User,
    partnerId,
    archive,
    refetch,
}) => {
    const router = useRouter()
    if (!User) return

    const actions: ActionType[] = GetListUser(
        archive,
        refetch,
        partnerId,
        User.id
    )
    const fullName =
        capitalize(User.name.firstName) + ' ' + capitalize(User.name.lastName)
    return (
        <div className="flex flex-col gap-3 bg-white p-3 rounded-[20px]">
            <div className="flex justify-between gap-[0.375rem]">
                <div className="flex gap-[0.375rem]">
                    <Avatar className="size-[2.875rem] shrink-0">
                        <AvatarImage className="" src={User.avatarPath!} />
                        <AvatarFallback>{fullName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                        <Label
                            label={fullName}
                            className="text-base font-normal text-lynch-950"
                        />
                        <Label
                            label={User.role}
                            className="text-xs font-medium text-primary"
                        />
                        <div className="flex items-center gap-2 text-lynch-500">
                            <CalendarClock size={18} />
                            <Label
                                label={User.createdAt}
                                className="text-xs font-medium text-lynch-500"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-[0.375rem]">
                    <Link href={`tel:${User.phone}`}>
                        <CustomButton
                            label=""
                            IconLeft={PhoneCall}
                            className="p-[0.625rem] shrink-0 h-fit [&>.icon]:m-0 rounded-full"
                        />
                    </Link>
                    <Link href={`mailto:${User.email}`}>
                        <CustomButton
                            label=""
                            IconLeft={Mail}
                            className="p-[0.625rem] shrink-0 h-fit [&>.icon]:m-0 rounded-full bg-amethyst-500"
                        />
                    </Link>
                    <ActionsMenu
                        id={User.id}
                        menuList={actions}
                        className="[&>svg]:size-6 p-[0.625rem]"
                        prospect={archive ? 'users' : false}
                    />
                </div>
            </div>
        </div>
    )
}
