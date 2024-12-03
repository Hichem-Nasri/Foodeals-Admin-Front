import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Label } from '../Label'
import {
    Archive,
    ArchiveRestore,
    Building,
    CalendarClock,
    Eye,
    FileBadge,
    Frame,
    Mail,
    Pen,
    PhoneCall,
    Users,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { AppRoutes } from '@/lib/routes'
import { DeliveryType } from '@/types/deliveries'
import { PartnerSolution } from '../Partners/PartnerSolution'
import { CustomButton } from '../custom/CustomButton'
import { ActionsMenu, ActionType } from '../custom/ActionsMenu'
import { useRouter } from 'next/navigation'
import { PartnerSolutionType, PartnerStatusType } from '@/types/partnersType'
import { getContract } from '@/lib/api/partner/getContract'
import { PartnerStatus } from '../Partners/PartnerStatus'
import { GetListActions } from './column/getListActions'

interface DeliveryCardProps {
    delivery: DeliveryType
    archive: boolean
    refetch: () => void
}

export const DeliveryCard: React.FC<DeliveryCardProps> = ({
    delivery,
    archive,
    refetch,
}): JSX.Element => {
    const router = useRouter()
    const dataArray = [
        {
            label: delivery.numberOfDeliveryPeople,
            icon: Users,
        },
        {
            label: delivery.numberOfDeliveries,
            icon: ArchiveRestore,
        },
    ]

    const actions: ActionType[] = GetListActions(
        delivery.id,
        delivery.status,
        archive,
        refetch,
        true
    )

    return (
        <div className="flex flex-col gap-3 bg-white p-3 rounded-[20px]">
            <div className="flex justify-between gap-[0.375rem] cursor-pointer">
                <div className="flex gap-[0.375rem]">
                    <Avatar className="size-[2.875rem] shrink-0">
                        <AvatarImage src={delivery.partnerInfoDto.avatarPath} />
                        <AvatarFallback>
                            {delivery.partnerInfoDto.name[0].toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                        <Label
                            label={delivery.partnerInfoDto.name}
                            className="text-base font-normal text-lynch-950"
                        />
                        <Label
                            label={delivery.distribution}
                            className="text-xs font-medium text-primary"
                        />
                        <div className="flex items-center gap-2 text-lynch-500">
                            <CalendarClock size={18} />
                            <Label
                                label={delivery.createdAt}
                                className="text-xs font-medium text-lynch-500"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-evenly items-end space-y-4">
                    <PartnerStatus status={delivery.status} />
                    <div className="flex items-center gap-[0.375rem]">
                        <Link href={`tel:${delivery.responsibleInfoDto.phone}`}>
                            <CustomButton
                                label=""
                                IconLeft={PhoneCall}
                                className="p-[0.625rem] shrink-0 h-fit [&>.icon]:m-0 rounded-full"
                            />
                        </Link>
                        <Link
                            href={`mailto:${delivery.responsibleInfoDto.email}`}
                        >
                            <CustomButton
                                label=""
                                IconLeft={Mail}
                                className="p-[0.625rem] shrink-0 h-fit [&>.icon]:m-0 rounded-full bg-amethyst-500"
                            />
                        </Link>
                        <ActionsMenu
                            id={delivery.id}
                            menuList={actions}
                            className="[&>svg]:size-6 p-[0.625rem]"
                            prospect={archive ? 'organisation' : false}
                        />
                    </div>
                </div>
            </div>
            <span className="h-[1px] w-full bg-lynch-100" />
            <div className="flex flex-wrap gap-[0.375rem]">
                {dataArray.map((data) => (
                    <div
                        key={data.label}
                        className={cn(
                            'flex gap-[0.375rem] bg-lynch-100 text-lynch-500 rounded-full py-[0.375rem] px-3'
                        )}
                    >
                        <data.icon size={18} key={data.label} />
                        <Label
                            label={data.label.toString()}
                            className={cn('text-lynch-500')}
                        />
                    </div>
                ))}
            </div>
            <span className="h-[1px] w-full bg-lynch-100" />
            <div className="flex flex-wrap gap-[0.375rem]">
                {delivery.solutions.map((solution) => (
                    <PartnerSolution
                        key={solution as PartnerSolutionType}
                        solution={solution}
                    />
                ))}
            </div>
        </div>
    )
}
