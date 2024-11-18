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

interface UsersCardProps {
    User?: CollaboratorAssociationsType
}

export const UsersCard: FC<UsersCardProps> = ({ User }) => {
    const router = useRouter()
    if (!User) return

    const dataArray = [
        {
            label: `Responsable : ${User.userInfoDto.role}`,
            icon: Handshake,
        },
        {
            label: `Region : ${User.region}`,
            icon: MapPin,
        },
    ]

    const actions: ActionType[] = [
        {
            actions: (id) =>
                router.push(AppRoutes.paymentDetails.replace(':id', id)),
            icon: Eye,
            label: 'Voir',
        },
        {
            actions: (id) =>
                router.push(AppRoutes.collaborator.replace(':id', id)),
            icon: Users,
            label: 'Collaborateurs',
        },
    ]
    const fullName =
        capitalize(User.userInfoDto.name.firstName) +
        ' ' +
        capitalize(User.userInfoDto.name.lastName)
    return (
        <div className="flex flex-col gap-3 bg-white p-3 rounded-[20px]">
            <div className="flex justify-between gap-[0.375rem]">
                <div className="flex gap-[0.375rem]">
                    <Avatar className="size-[2.875rem] shrink-0">
                        <AvatarImage
                            className=""
                            src={User.userInfoDto.avatarPath}
                        />
                        <AvatarFallback>{fullName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                        <Label
                            label={fullName}
                            className="text-sm font-normal text-lynch-950"
                        />
                        <Label
                            label={User.city}
                            className="text-xs font-medium text-primary"
                        />
                        <div className="flex items-center gap-2 text-lynch-500">
                            <CalendarClock size={18} />
                            <Label
                                label={User.userInfoDto.createdAt}
                                className="text-xs font-medium text-lynch-500"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-[0.375rem]">
                        <Link href={`tel:${User.userInfoDto.phone}`}>
                            <CustomButton
                                label=""
                                IconLeft={PhoneCall}
                                className="p-[0.625rem] shrink-0 h-fit [&>.icon]:m-0 rounded-full"
                            />
                        </Link>
                        <Link href={`mailto:${User.userInfoDto.email}`}>
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
            <span className="h-[1px] w-full bg-lynch-100" />
            <div className="flex items-start gap-3">
                <div className="flex flex-wrap gap-[0.375rem]">
                    {dataArray.map((data) => (
                        <div
                            key={data.label}
                            className="flex gap-[0.375rem] bg-lynch-100 text-lynch-500 rounded-full py-[0.375rem] px-3"
                        >
                            <data.icon size={18} key={data.label} />
                            <Label
                                label={data.label.toString()}
                                className="text-lynch-500"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
