import { PaymentStatusType } from '@/types/PaymentType'
import {
    Banknote,
    Boxes,
    Building,
    Calendar,
    CalendarClock,
    CirclePercent,
    Coins,
    Eye,
    HandCoins,
    Mail,
    PhoneCall,
    Store,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { AppRoutes } from '@/lib/routes'
import {
    DeliveryCollaboratorsType,
    DeliveryPaymentsType,
} from '@/types/deliveries'
import { PaymentStatus } from '@/components/payment/PaymentStatus'
import { PaymentValidation } from '@/components/payment/PaymentValidation'
import { Label } from '@/components/Label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CustomButton } from '@/components/custom/CustomButton'
import { ActionsMenu, ActionType } from '@/components/custom/ActionsMenu'
import { useRouter } from 'next/navigation'
import { BadgeDisponibility } from './BadgeDisponibility'
import { capitalize } from '@/types/utils'

interface DeliveryCollaboratorCardProps {
    collaborator: DeliveryCollaboratorsType
}

export const DeliveryCollaboratorCard: React.FC<
    DeliveryCollaboratorCardProps
> = ({ collaborator }): JSX.Element => {
    const router = useRouter()
    const dataArray = [
        {
            label: collaborator.userInfoDto.role,
            icon: Store,
        },
        {
            label: collaborator?.commands || 0,
            icon: Boxes,
        },
        {
            label: collaborator.city,
            icon: Building,
        },
    ]

    const actions: ActionType[] = [
        {
            actions: (id) =>
                router.push(
                    AppRoutes.deliveryCollaboratorDetails.replace(':id', id)
                ),
            icon: Eye,
            label: 'Voir',
        },
    ]
    const fullName =
        capitalize(collaborator.userInfoDto.name.firstName) +
        ' ' +
        capitalize(collaborator.userInfoDto.name.lastName)
    return (
        <div className="flex flex-col gap-3 bg-white p-3 rounded-[20px]">
            <div className="flex justify-between gap-[0.375rem]">
                <div className="flex gap-[0.375rem]">
                    <Avatar className="size-[2.875rem] shrink-0">
                        <AvatarImage
                            className=""
                            src={collaborator.userInfoDto.avatarPath}
                        />
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
                            label={collaborator.city}
                            className="text-xs font-medium text-primary"
                        />
                        <div className="flex items-center gap-2 text-lynch-500">
                            <CalendarClock size={18} />
                            <Label
                                label={collaborator.userInfoDto.createdAt}
                                className="text-xs font-medium text-lynch-500"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-[0.375rem]">
                    <Link href={`tel:${collaborator.userInfoDto.phone}`}>
                        <CustomButton
                            label=""
                            IconLeft={PhoneCall}
                            className="p-[0.625rem] shrink-0 h-fit [&>.icon]:m-0 rounded-full"
                        />
                    </Link>
                    <Link href={`mailto:${collaborator.userInfoDto.email}`}>
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
            <span className="h-[1px] w-full bg-lynch-100" />
            <div className="flex items-start gap-3">
                <div className="flex flex-wrap gap-[0.375rem]">
                    {dataArray.map((data) => (
                        <div
                            key={data.label.toString()}
                            className="flex gap-[0.375rem] bg-lynch-100 text-lynch-500 rounded-full py-[0.375rem] px-3"
                        >
                            <data.icon size={18} />
                            <Label
                                label={data.label.toString()}
                                className="text-lynch-500"
                            />
                        </div>
                    ))}
                </div>
                <BadgeDisponibility isDisponible={collaborator.status} />
            </div>
        </div>
    )
}
