import { PaymentDeliveriesType } from '@/types/PaymentType'
import React from 'react'
import { cn } from '@/lib/utils'
// import { Label } from '@radix-ui/react-dropdown-menu';
import {
    ArrowRight,
    Banknote,
    CalendarClock,
    CheckCheck,
    CirclePercent,
    Coins,
    HandCoins,
    ListOrdered,
} from 'lucide-react'
import { PartnerType, PaymentStatusEnum } from '@/types/paymentUtils'
import { useRouter } from 'next/navigation'
import { ConfirmPayment } from '../ConfirmPayment'
import { PaymentValidation } from '../PaymentValidation'
import { Label } from '@/components/Label'
import Link from 'next/link'
import { AppRoutes } from '@/lib/routes'

const DeliveryPaymentCard = ({
    commission,
}: {
    commission: PaymentDeliveriesType
}) => {
    const payed = commission.amountToPay.amount != 0
    const label = payed ? 'A PAYER' : 'A RECEVOIR'
    const icon = payed ? Banknote : HandCoins
    const className = payed
        ? commission.status == PaymentStatusEnum.VALID_BY_FOODEALS
            ? ''
            : 'bg-coral-100 text-coral-500'
        : commission.status == PaymentStatusEnum.VALID_BY_PARTNER
        ? 'bg-mountain-100 text-mountain-500'
        : ''
    const showValidation =
        (payed && commission.status == PaymentStatusEnum.IN_VALID) ||
        (!payed && commission.status == PaymentStatusEnum.VALID_BY_PARTNER)
    const router = useRouter()
    const dataArray = [
        {
            label: commission.orderCount,
            icon: ListOrdered,
        },
        {
            label: commission.month,
            icon: CalendarClock,
            className: '',
        },
        {
            label: 'C. de livraison: ' + commission.deliveryCost.amount,
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
                (commission.amountToPay.amount
                    ? commission.amountToPay.amount
                    : commission.amountToReceive.amount),
            icon: icon,
            className: className,
        },
    ]
    return (
        <div className="flex flex-col gap-3 bg-white p-3 rounded-[20px] items-start h-fit w-full">
            <div className="w-full flex justify-between items-center">
                <div className="flex flex-col gap-1 items-center justify-center">
                    <div className="flex items-center gap-2 text-mountain-400 text-xl">
                        <CalendarClock size={24} />
                        <Label
                            label={commission.month}
                            className="text-sm font-semibold text-lynch-500"
                        />
                    </div>
                </div>
                <Link
                    className="bg-lynch-300 size-11 rounded-full text-white grid place-content-center"
                    href={AppRoutes.paymentDeliveriesDetails.replace(
                        ':id',
                        commission.id + '?month=' + commission.month
                    )}
                >
                    <ArrowRight size={18} className="m-auto w-full" />
                </Link>
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
                <div className="flex flex-wrap justify-normal w-full">
                    {payed ? (
                        <PaymentValidation
                            IconRight={CheckCheck}
                            label="Payé"
                            className="w-full bg-mountain-400 text-white hover:text-mountain-400 hover:bg-white"
                            isMobile
                            id={commission.id}
                            amount={commission.amountToPay.amount}
                        />
                    ) : (
                        <ConfirmPayment
                            IconRight={CheckCheck}
                            label="Confirmer"
                            className="w-full bg-mountain-400 text-white hover:text-mountain-400 hover:bg-white"
                            isMobile
                            id={commission.id}
                        />
                    )}
                </div>
            )}
        </div>
    )
}

export default DeliveryPaymentCard
