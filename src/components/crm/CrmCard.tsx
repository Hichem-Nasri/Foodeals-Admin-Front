import { PaymentStatusType, PaymentType } from '@/types/PaymentType'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Label } from '../Label'
import {
    Banknote,
    Building,
    Calendar,
    CalendarCheck,
    CalendarClock,
    CheckCheck,
    CirclePercent,
    Coins,
    FileMinus,
    Frame,
    HandCoins,
    ListCollapse,
    ListPlus,
    LoaderCircle,
    Mail,
    MailMinus,
    PhoneCall,
    User,
    UserCheck,
    X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { CrmStatusType, CrmType } from '@/types/CrmType'
import { Icon, SelectIconProps } from '@radix-ui/react-select'
import Link from 'next/link'
import { CustomButton } from '../custom/CustomButton'
import { StyleStatus, IconStatus } from '@/types/utils'

interface CrmCardDetailsProps {
    crm: CrmType
}

export const CrmCardDetails: React.FC<CrmCardDetailsProps> = ({
    crm,
}): JSX.Element => {
    const dataCrm = {
        creator:
            crm.creatorInfo.name.firstName +
            ' ' +
            crm.creatorInfo.name.lastName,
        manager:
            crm.managerInfo.name.firstName +
            ' ' +
            crm.managerInfo.name.lastName,
        classNameStatus: StyleStatus[crm.status],
        IconStatus: IconStatus[crm.status],
    }
    return (
        <div className="flex flex-col gap-3 bg-white p-3 rounded-[20px] w-full">
            <div className="flex justify-between items-center ">
                <div className="flex flex-col justify-center items-start sm:space-y-2 space-y-1">
                    <Label
                        label={crm.companyName}
                        className=" font-normal text-lg text-lynch-950"
                    />
                    <Label
                        label={crm.city}
                        className="text-[14px] text-mountain-400 font-medium "
                    />
                    <div className="w-full text-lynch-500 flex justify-center items-center space-x-3 font-medium">
                        <CalendarClock className="size-[24px]" />
                        <Label
                            label={crm.date.toLocaleDateString()}
                            className="text-md font-medium text-lynch-500"
                        />
                    </div>
                </div>
                <div className="flex-col flex justify-between h-full items-center space-y-4">
                    <div
                        className={`flex justify-center gap-2 font-semibold px-2 py-1 items-center rounded-full ${dataCrm.classNameStatus} px-3 py-1.5 min-w-32`}
                    >
                        {dataCrm.IconStatus && (
                            <dataCrm.IconStatus className="size-[18px]" />
                        )}
                        {crm.status.toString()}
                    </div>
                    <div className="flex justify-evenly items-center space-x-1">
                        <Link href={`tel:${crm.phone}`}>
                            <CustomButton
                                label=""
                                IconLeft={PhoneCall}
                                className="p-[0.625rem] shrink-0 h-fit [&>.icon]:m-0 rounded-full transition-all"
                            />
                        </Link>
                        <Link href={`mailto:${crm.email}`}>
                            <CustomButton
                                label=""
                                IconLeft={Mail}
                                className="p-[0.625rem] shrink-0 h-fit [&>.icon]:m-0 rounded-full bg-amethyst-500"
                            />
                        </Link>
                        <CustomButton
                            label=""
                            IconLeft={ListPlus}
                            className="p-[0.625rem] shrink-0 h-fit [&>.icon]:m-0 rounded-full bg-lynch-300"
                        />
                    </div>
                </div>
            </div>
            <span className="h-[1px] w-full bg-lynch-100" />
            <div className="w-full flex justify-center flex-col items-start font-medium space-y-1.5">
                <span className="px-2 py-1 flex justify-center items-center bg-lynch-200 rounded-full text-lynch-500">
                    <User />
                    <span>
                        {crm.creatorInfo.name.firstName +
                            ' ' +
                            crm.creatorInfo.name.lastName}
                    </span>
                </span>
                <span className="px-2 py-1 flex justify-center items-center bg-lynch-200 rounded-full text-lynch-500 space-x-2">
                    <UserCheck />
                    <span>
                        {crm.managerInfo.name.firstName +
                            ' ' +
                            crm.managerInfo.name.lastName}
                    </span>
                </span>
                <span className="px-2 py-1 flex justify-center items-center bg-lynch-200 rounded-full text-lynch-500 space-x-2">
                    <ListCollapse />
                    <span>Restaurant</span>
                </span>
            </div>
        </div>
    )
}
