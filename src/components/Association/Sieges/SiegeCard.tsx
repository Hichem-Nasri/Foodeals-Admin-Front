import { FC } from 'react'
import {
    CalendarClock,
    Eye,
    HandCoins,
    HeartHandshake,
    Mail,
    PhoneCall,
    Store,
    Users,
} from 'lucide-react'
import Link from 'next/link'
import { AppRoutes } from '@/lib/routes'
import { useRouter } from 'next/navigation'
import { AssociationType, SiegesType } from '@/types/association'
import { ActionsMenu, ActionType } from '@/components/custom/ActionsMenu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Label } from '@/components/Label'
import { PaymentStatus } from '@/components/payment/PaymentStatus'
import { CustomButton } from '@/components/custom/CustomButton'
import { PartnerSolution } from '@/components/Partners/PartnerSolution'
import { GetListSiege } from '../column/getSiegeList'

interface SiegeCardProps {
    sieges?: SiegesType
    archive: boolean
    refetch: () => void
    partnerId: string
}

export const SiegeCard: FC<SiegeCardProps> = ({
    sieges,
    archive,
    refetch,
    partnerId,
}) => {
    const router = useRouter()
    if (!sieges) return

    const dataArray = [
        {
            label: `récupération : ${sieges.recovered}`,
            icon: HeartHandshake,
        },
        {
            label: `collaborateurs : ${sieges.users}`,
            icon: HandCoins,
        },
    ]

    const actions: ActionType[] = GetListSiege(
        archive,
        refetch,
        partnerId,
        sieges.id
    )
    return (
        <div className="flex flex-col gap-3 bg-white p-3 rounded-[20px]">
            <div className="flex justify-between gap-[0.375rem]">
                <div className="flex gap-[0.375rem]">
                    <Avatar className="size-[2.875rem] shrink-0">
                        <AvatarImage
                            className=""
                            src={sieges.responsibleInfoDto.avatarPath}
                        />
                        <AvatarFallback>
                            {sieges.responsibleInfoDto.name[0].toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                        <Label
                            label={sieges.responsibleInfoDto.name}
                            className="text-sm font-normal text-lynch-950"
                        />
                        <Label
                            label={sieges.city}
                            className="text-xs font-medium text-primary"
                        />
                        <div className="flex items-center gap-2 text-lynch-500">
                            <CalendarClock size={18} />
                            <Label
                                label={sieges.createdAt}
                                className="text-xs font-medium text-lynch-500"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-[0.375rem]">
                        <Link href={`tel:${sieges.responsibleInfoDto.phone}`}>
                            <CustomButton
                                label=""
                                IconLeft={PhoneCall}
                                className="p-[0.625rem] shrink-0 h-fit [&>.icon]:m-0 rounded-full"
                            />
                        </Link>
                        <Link
                            href={`mailto:${sieges.responsibleInfoDto.email}`}
                        >
                            <CustomButton
                                label=""
                                IconLeft={Mail}
                                className="p-[0.625rem] shrink-0 h-fit [&>.icon]:m-0 rounded-full bg-amethyst-500"
                            />
                        </Link>
                        <ActionsMenu
                            id={sieges.id}
                            menuList={actions}
                            className="[&>svg]:size-6 p-[0.625rem]"
                            prospect={archive ? 'organisation' : false}
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
            <span className="h-[1px] w-full bg-lynch-100" />
            <div className="flex items-start gap-3">
                {sieges.solutions.map((solution) => (
                    <PartnerSolution key={solution} solution={solution} />
                ))}
            </div>
        </div>
    )
}
