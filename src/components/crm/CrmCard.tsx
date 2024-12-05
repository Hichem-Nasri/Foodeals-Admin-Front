import { Label } from '../Label'
import {
    CalendarClock,
    Eye,
    ListCollapse,
    Mail,
    PhoneCall,
    User,
    UserCheck,
} from 'lucide-react'
import Link from 'next/link'
import { CustomButton } from '../custom/CustomButton'
import { StyleStatus, IconStatus, capitalize } from '@/types/utils'
import { CrmType } from '@/types/CrmType'
import { PartnerStatus } from '../Partners/PartnerStatus'
import { PartnerStatusType } from '@/types/partnersType'
import { ActionsMenu, ActionType } from '../custom/ActionsMenu'
import { GetListProspcts } from './Prospect/column/getList'

interface CrmCardDetailsProps {
    crm: CrmType
    refetch: () => void
    LeadKo: boolean
    type: string
}

export const CrmCardDetails: React.FC<CrmCardDetailsProps> = ({
    crm,
    refetch,
    LeadKo,
    type,
}): JSX.Element => {
    const dataCrm = {
        creator:
            crm?.creatorInfo.name.firstName +
            ' ' +
            crm?.creatorInfo.name.lastName,
        manager:
            crm?.managerInfo.name.firstName +
            ' ' +
            crm?.managerInfo.name.lastName,
        classNameStatus: StyleStatus[crm?.status],
        IconStatus: IconStatus[crm?.status],
    }

    const ListActions: ActionType[] = GetListProspcts(
        crm.id,
        refetch,
        LeadKo,
        crm.status,
        type
    )
    console.log('dataCrm', crm)
    return (
        <div className="flex flex-col gap-3 bg-white p-3 rounded-[20px] w-full">
            <div className="flex justify-between items-center ">
                <div className="flex flex-col justify-center items-start sm:space-y-2 space-y-1">
                    <Label
                        label={capitalize(crm.companyName)}
                        className=" font-base text-sm text-lynch-950"
                    />
                    <Label
                        label={crm.address.city.name}
                        className="text-[14px] text-mountain-400 font-medium "
                    />
                    <div className="w-full text-lynch-500 flex justify-center items-center gap-x-3 text-xs font-normal">
                        <CalendarClock size={20} />
                        <Label
                            label={crm.createdAt}
                            className="text-xs font-normal text-lynch-500"
                        />
                    </div>
                </div>
                <div className="flex-col flex justify-between h-full items-end gap-4">
                    <PartnerStatus status={crm.status as PartnerStatusType} />
                    <div className="flex justify-evenly items-center gap-2">
                        <Link href={`tel:${crm.contact.phone}`}>
                            <CustomButton
                                label=""
                                IconLeft={PhoneCall}
                                className="p-[0.625rem] shrink-0 h-fit [&>.icon]:m-0 rounded-full transition-all"
                            />
                        </Link>
                        <Link href={`mailto:${crm.contact.email}`}>
                            <CustomButton
                                label=""
                                IconLeft={Mail}
                                className="p-[0.625rem] shrink-0 h-fit [&>.icon]:m-0 rounded-full bg-amethyst-500"
                            />
                        </Link>
                        <ActionsMenu
                            id={crm.id}
                            menuList={ListActions}
                            prospect={LeadKo ? 'prospect' : false}
                            className="[&>svg]:size-6 p-[0.625rem] "
                        />
                    </div>
                </div>
            </div>
            <span className="h-[1px] w-full bg-lynch-100 [&>*]:font-semi-bold" />
            <div className="w-full flex justify-center flex-col items-start font-medium space-y-1.5">
                <span className="px-2 py-1 flex justify-center items-center bg-lynch-100 rounded-full text-lynch-500 space-x-2 text-xs font-semibold">
                    <User />
                    <span>
                        {`Alimenter par :${
                            crm.creatorInfo.name.firstName +
                            ' ' +
                            crm.creatorInfo.name.lastName
                        }`.toLocaleUpperCase()}
                    </span>
                </span>
                <span className="px-2 py-1 flex justify-center items-center bg-lynch-100 rounded-full text-lynch-500 space-x-2 text-xs font-semibold">
                    <UserCheck />
                    <span>
                        {`Effectuée à : ${
                            crm.managerInfo.name.firstName +
                            ' ' +
                            crm.managerInfo.name.lastName
                        }`.toLocaleUpperCase()}
                    </span>
                </span>
                <span className="px-2 py-1 flex justify-center items-center bg-lynch-100 rounded-full text-lynch-500 space-x-2 text-xs font-semibold">
                    <ListCollapse />
                    <span>{crm.category.toLocaleUpperCase()}</span>
                </span>
            </div>
        </div>
    )
}
