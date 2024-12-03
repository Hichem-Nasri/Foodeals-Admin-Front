import { FC } from 'react'
import {
    PartnerCompanyType,
    PartnerType,
    SubAccountPartners,
} from '@/types/partnersType'
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
import Link from 'next/link'
import { AppRoutes } from '@/lib/routes'
import { useRouter } from 'next/navigation'
import { capitalize } from '@/types/utils'
import { PartnerEntitiesType } from '@/types/GlobalType'
import { ActionsMenu, ActionType } from '@/components/custom/ActionsMenu'
import { GetListActionsSubAccount } from '../column/getActionsList'
import { CustomButton } from '@/components/custom/CustomButton'
import { PartnerContractStatus } from '../PartnerContractStatus'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Label } from '@/components/Label'
import { PartnerSolution } from '../PartnerSolution'

interface SubAccountCardProps {
    refetch: () => void
    archive: boolean
    partner?: SubAccountPartners
}

export const SubAccountCard: FC<SubAccountCardProps> = ({
    partner,
    archive,
    refetch,
}) => {
    const router = useRouter()
    if (!partner) return

    const dataArray = [
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

    const actions: ActionType[] = GetListActionsSubAccount(
        partner.id!,
        {
            status: partner.contractStatus,
            partnerId: partner.partnerInfoDto.id,
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
                        <AvatarImage
                            className=""
                            src={partner.partnerInfoDto.avatarPath}
                        />
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
                        id={partner.id!}
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
            </div>
            <span className="h-[1px] w-full bg-lynch-100" />
            <div className="flex flex-wrap gap-[0.375rem]">
                {partner.solutions.map((solution) => (
                    <PartnerSolution solution={solution} key={solution} />
                ))}
            </div>
        </div>
    )
}
