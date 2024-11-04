import { partnerSubscriptionType, PaymentStatusType } from '@/types/PaymentType'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { cn } from '@/lib/utils'
// import { Label } from '@radix-ui/react-dropdown-menu';
import {
    ArrowRight,
    Banknote,
    Building,
    CalendarClock,
    CheckCheck,
    CirclePercent,
    Coins,
    Frame,
    HandCoins,
    Minus,
} from 'lucide-react'
import { PaymentStatus } from './PaymentStatus'
import { PaymentValidation } from './PaymentValidation'
import { Label } from '../Label'
import { Arrow } from '@radix-ui/react-dropdown-menu'
import { PartnerSolution } from '../Partners/PartnerSolution'
import { PartnerSolutionType } from '@/types/partnersType'
import {
    PartnerType,
    PaymentCommission,
    PaymentStatusEnum,
} from '@/types/paymentUtils'
import { ConfirmPayment } from './ConfirmPayment'
import { useRouter } from 'next/navigation'
import { AppRoutes } from '@/lib/routes'

const PaymentCommissionCard = ({
    commission,
    path,
}: {
    commission: PaymentCommission
    path: 'partner' | 'subStore'
}) => {
    const payed = commission.toPay.amount != 0
    const label = payed ? 'A PAYER' : 'A RECEVOIR'
    const icon = payed ? Banknote : HandCoins
    const className = !commission.payable
        ? ''
        : payed
        ? commission.paymentStatus == PaymentStatusEnum.VALID_BY_FOODEALS
            ? ''
            : 'bg-mountain-100 text-mountain-500'
        : commission.paymentStatus == PaymentStatusEnum.VALID_BY_PARTNER
        ? 'bg-coral-100 text-coral-500'
        : ''
    const showValidation =
        commission.payable &&
        ((payed && commission.paymentStatus == PaymentStatusEnum.IN_VALID) ||
            (!payed &&
                commission.paymentStatus == PaymentStatusEnum.VALID_BY_PARTNER))
    console.log('showValidation', showValidation, commission.payable)
    console.log('commission', commission)
    const router = useRouter()
    const dataArray = [
        {
            label: commission.ref || '0236',
            icon: Frame,
        },
        {
            label:
                commission.partnerType == PartnerType.SUB_ENTITY
                    ? 'Sous Compte'
                    : 'Principal',
            icon: Building,
            className: '',
        },
        {
            label: 'T. VENTES: ' + commission.totalAmount.amount,
            icon: Coins,
        },
        {
            label: 'COMMISSIOM FD: ' + commission.foodealsCommission.amount,
            icon: CirclePercent,
        },
        {
            label:
                label +
                ': ' +
                (commission.toPay.amount
                    ? commission.toPay.amount
                    : commission.toReceive.amount),
            icon: icon,
            className: className,
        },
    ]
    const name = commission.partnerInfoDto.name
    return (
        <div className="flex flex-col gap-3 bg-white p-3 rounded-[20px] max-w-[500px] min-w-min">
            <div className="w-full flex justify-between items-start">
                <div className="flex gap-[0.375rem]">
                    <Avatar className="size-[2.875rem] shrink-0">
                        <AvatarImage
                            src={commission.partnerInfoDto.avatarPath}
                        />
                        <AvatarFallback>
                            {name && name[0]?.toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                        <Label
                            label={commission.partnerInfoDto.name}
                            className="text-sm font-normal text-lynch-950"
                        />
                        <div className="flex items-center gap-2 text-lynch-500">
                            <CalendarClock size={18} />
                            <Label
                                label={commission.date}
                                className="text-xs font-medium text-lynch-500"
                            />
                        </div>
                    </div>
                </div>
                <button
                    className="bg-lynch-300 size-11 rounded-full text-white "
                    onClick={() => {
                        if (path == 'partner')
                            router.push(
                                AppRoutes.PBCommissionDetails.replace(
                                    ':id',
                                    commission.id
                                )
                            )
                        else {
                            router.push(
                                AppRoutes.SubStoreCommission.replace(
                                    ':id',
                                    commission.id
                                )
                            )
                        }
                    }}
                >
                    <ArrowRight size={18} className="m-auto w-full" />
                </button>
            </div>
            <span className="h-[1px] w-full bg-lynch-100" />
            <div className="flex flex-wrap gap-[0.375rem] ">
                {dataArray.map((data) => (
                    <div
                        key={data.label}
                        className={cn(
                            'flex gap-[0.375rem] bg-lynch-100 text-lynch-500 rounded-full py-[0.375rem] px-3',
                            data?.className
                        )}
                    >
                        <data.icon size={18} key={data.label} />
                        <Label
                            label={data.label.toString()}
                            className={cn(
                                'text-lynch-500 font-semibold',
                                data?.className
                            )}
                        />
                    </div>
                ))}
            </div>
            {showValidation && (
                <div className="flex flex-wrap justify-normal">
                    {payed ? (
                        <PaymentValidation
                            IconRight={CheckCheck}
                            label="Payé"
                            className="w-full bg-mountain-400 text-white hover:text-mountain-400 hover:bg-white"
                            isMobile={true}
                            id={commission.id}
                        />
                    ) : (
                        <ConfirmPayment
                            IconRight={CheckCheck}
                            label="Confirmer"
                            className="w-full bg-mountain-400 text-white hover:text-mountain-400 hover:bg-white"
                            isMobile={true}
                            id={commission.id}
                        />
                    )}
                </div>
            )}
        </div>
    )
}

export default PaymentCommissionCard
