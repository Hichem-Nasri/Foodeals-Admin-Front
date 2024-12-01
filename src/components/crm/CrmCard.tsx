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
import { StyleStatus, IconStatus } from '@/types/utils'
import { CrmType } from '@/types/CrmType'

interface CrmCardDetailsProps {
    crm: CrmType
}

export const CrmCardDetails: React.FC<CrmCardDetailsProps> = ({
    crm,
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
    console.log('dataCrm', crm)
    return (
        <div className="flex flex-col gap-3 bg-white p-3 rounded-[20px] w-full">
            <div className="flex justify-between items-center ">
                <div className="flex flex-col justify-center items-start sm:space-y-2 space-y-1">
                    <Label
                        label={crm.companyName}
                        className=" font-normal text-lg text-lynch-950"
                    />
                    <Label
                        label={crm.address.city}
                        className="text-[14px] text-mountain-400 font-medium "
                    />
                    <div className="w-full text-lynch-500 flex justify-center items-center space-x-3 font-medium">
                        <CalendarClock className="size-[24px]" />
                        <Label
                            label={crm.createdAt}
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
                        {crm.status?.toString()}
                    </div>
                    <div className="flex justify-evenly items-center space-x-1">
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
                        <Link href={`/crm/prospects/${crm.id}`}>
                            <CustomButton
                                label=""
                                IconLeft={Eye}
                                className="p-[0.625rem] shrink-0 h-fit [&>.icon]:m-0 rounded-full bg-lynch-300"
                            />
                        </Link>
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
