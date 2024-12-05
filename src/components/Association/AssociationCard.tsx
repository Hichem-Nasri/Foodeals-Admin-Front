import { FC } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Label } from '../Label'
import {
    Archive,
    Building,
    CalendarClock,
    Eye,
    FileBadge,
    HandCoins,
    HeartHandshake,
    Mail,
    Pen,
    PhoneCall,
    Store,
    Users,
} from 'lucide-react'
import { CustomButton } from '../custom/CustomButton'
import Link from 'next/link'
import { ActionsMenu, ActionType } from '../custom/ActionsMenu'
import { AppRoutes } from '@/lib/routes'
import { useRouter } from 'next/navigation'
import { AssociationType } from '@/types/association'
import { PaymentStatus } from '../payment/PaymentStatus'
import { PartnerSolution } from '../Partners/PartnerSolution'
import { PaymentStatusType } from '@/types/PaymentType'
import { ContractStatus, PartnerSolutionType } from '@/types/partnersType'
import { getContract } from '@/lib/api/partner/getContract'
import DetailsArchive from '../utils/DetailsArchive'
import { GetListAssociation } from './column/getAssociationList'
import { ContractStatusPartner } from '@/types/GlobalType'
import { PartnerStatus } from '../Partners/PartnerStatus'

interface AssociationCardProps {
    association?: AssociationType
    archive?: boolean
    refetch: () => void
}

export const AssociationCard: FC<AssociationCardProps> = ({
    association,
    archive,
    refetch,
}) => {
    if (!association) return
    console.log(association)
    const dataArray = [
        {
            label: association.type == 'FOOD_BANK' ? 'B.A' : 'ASSO',
            icon: Building,
        },
        {
            label: `Association : ${association.associations}`.toLocaleUpperCase(),
            icon: HeartHandshake,
        },
        {
            label: `siège : ${association.subEntities}`.toLocaleUpperCase(),
            icon: Store,
        },
        {
            label: `Donation : ${association.donations}`.toLocaleUpperCase(),
            icon: HeartHandshake,
        },
        {
            label: `récupération : ${association.recovered}`.toLocaleUpperCase(),
            icon: HeartHandshake,
        },
        {
            label: `collaborateurs : ${association.users}`.toLocaleUpperCase(),
            icon: HandCoins,
        },
    ]
    const id = association.id
    const listActions: ActionType[] = GetListAssociation(
        archive!,
        refetch,
        {
            status: association.status,
            subEntities: association.subEntities,
            collaborator: association.users,
        },
        id
    )
    return (
        <div className="flex flex-col gap-3 bg-white p-3 rounded-[20px]">
            <div className="flex justify-between gap-[0.375rem]">
                <div className="flex gap-[0.375rem]">
                    <Avatar className="size-[2.875rem] shrink-0">
                        <AvatarImage
                            className=""
                            src={association.partner.avatarPath}
                        />
                        <AvatarFallback>
                            {association.partner.name[0].toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                        <Label
                            label={association.partner.name}
                            className="text-sm font-normal text-lynch-950"
                        />
                        <Label
                            label={association.city}
                            className="text-xs font-medium text-primary"
                        />
                        <div className="flex items-center gap-2 text-lynch-500">
                            <CalendarClock size={18} />
                            <Label
                                label={association.createdAt}
                                className="text-xs font-medium text-lynch-500"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <PartnerStatus
                        status={ContractStatusPartner[association.status]}
                    />
                    <div className="flex items-center gap-[0.375rem]">
                        <Link href={`tel:${association.responsible.phone}`}>
                            <CustomButton
                                label=""
                                IconLeft={PhoneCall}
                                className="p-[0.625rem] shrink-0 h-fit [&>.icon]:m-0 rounded-full"
                            />
                        </Link>
                        <Link href={`mailto:${association.responsible.email}`}>
                            <CustomButton
                                label=""
                                IconLeft={Mail}
                                className="p-[0.625rem] shrink-0 h-fit [&>.icon]:m-0 rounded-full bg-amethyst-500"
                            />
                        </Link>
                        <ActionsMenu
                            id={association.id}
                            menuList={listActions}
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
                            className="flex gap-[0.375rem] bg-lynch-100 font-semibold text-lynch-500 rounded-full py-[0.375rem] px-3 text-xs"
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
            <div className="flex items-start gap-3">
                {association.solutions.map((solution) => (
                    <PartnerSolution
                        key={solution}
                        solution={solution as PartnerSolutionType}
                    />
                ))}
            </div>
        </div>
    )
}
