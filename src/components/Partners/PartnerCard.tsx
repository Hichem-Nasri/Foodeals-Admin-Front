import { FC } from 'react'
import { PartnerCompanyType, PartnerType } from '@/types/partnersType'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Label } from '../Label'
import {
    Archive,
    Boxes,
    Building,
    CalendarClock,
    Eye,
    HandCoins,
    ListPlus,
    Mail,
    PhoneCall,
    Store,
    Users,
} from 'lucide-react'
import { CustomButton } from '../custom/CustomButton'
import { PartnerStatus } from './PartnerStatus'
import Link from 'next/link'
import { ActionsMenu, ActionType } from '../custom/ActionsMenu'
import { AppRoutes } from '@/lib/routes'
import { useRouter } from 'next/navigation'
import { capitalize } from '@/types/utils'
import { PartnerContractStatus } from './PartnerContractStatus'
import { GetListActions } from './column/getActionsList'
import { PartnerEntitiesType } from '@/types/GlobalType'

interface PartnerCardProps {
    refetch: () => void
    archive: boolean
    partner?: PartnerType
}

export const PartnerCard: FC<PartnerCardProps> = ({
    partner,
    archive,
    refetch,
}) => {
    const router = useRouter()
    if (!partner) return

    const dataArray = [
        {
            label:
                partner.type == PartnerEntitiesType.SUB_ENTITY
                    ? 'S.COMPTE'
                    : 'PRINCIPAL',
            icon: Building,
        },
        {
            label: partner.subEntities,
            icon: Store,
        },
        {
            label: partner.users,
            icon: Users,
        },
        {
            label: 'OFFERS: ' + partner.offers,
            icon: Boxes,
        },
        {
            label: 'COMMANDE: ' + partner.orders,
            icon: HandCoins,
        },
    ]

    const actions: ActionType[] = GetListActions(
        partner.id!,
        {
            status: partner.contractStatus,
            subEntities: partner.subEntities,
            users: partner.users,
        },
        archive,
        refetch
    )
    const name =
        capitalize(partner.contactDto.name.firstName) +
        ' ' +
        capitalize(partner.contactDto.name.lastName)
    return (
        <div className="flex flex-col gap-3 bg-white p-3 rounded-[20px]">
            <div className="flex justify-between gap-[0.375rem]">
                <div className="flex gap-[0.375rem]">
                    <Avatar className="size-[2.875rem] shrink-0">
                        <AvatarImage className="" src={partner.logo} />
                        <AvatarFallback>
                            {name && name[0].toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                        <Label
                            label={partner.partnerInfoDto.name}
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
                    <Link href={`tel:${partner.contactDto?.phone}`}>
                        <CustomButton
                            label=""
                            IconLeft={PhoneCall}
                            className="p-[0.625rem] shrink-0 h-fit [&>.icon]:m-0 rounded-full"
                        />
                    </Link>
                    <Link href={`mailto:${partner.contactDto?.email}`}>
                        <CustomButton
                            label=""
                            IconLeft={Mail}
                            className="p-[0.625rem] shrink-0 h-fit [&>.icon]:m-0 rounded-full bg-amethyst-500"
                        />
                    </Link>
                    <ActionsMenu
                        menuList={actions}
                        className="[&>svg]:size-6 p-[0.625rem]"
                        prospect={archive ? 'organisation' : false}
                    />
                </div>
            </div>
            <span className="h-[1px] w-full bg-lynch-100" />
            <div className="flex items-start gap-3">
                <div className="flex flex-wrap gap-[0.375rem]">
                    {dataArray.map((data, index) => (
                        <div
                            key={index.toString()}
                            className="flex gap-[0.375rem] bg-lynch-100 text-lynch-500 rounded-full py-[0.375rem] px-3"
                        >
                            <data.icon size={18} key={data.label} />
                            <Label
                                label={data.label.toString()}
                                className="text-lynch-500 font-semibold text-xs"
                            />
                        </div>
                    ))}
                </div>
                <PartnerContractStatus status={partner.contractStatus} />
            </div>
        </div>
    )
}
