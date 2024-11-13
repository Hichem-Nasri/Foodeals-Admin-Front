import { PaymentStatusType, PaymentType } from '@/types/PaymentType'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Label } from '../Label'
import {
    Banknote,
    Building,
    Calendar,
    CalendarClock,
    CirclePercent,
    Coins,
    Frame,
    HandCoins,
} from 'lucide-react'
import { PaymentStatus } from './PaymentStatus'
import { cn } from '@/lib/utils'
import { PaymentValidation } from './PaymentValidation'
import Link from 'next/link'
import { AppRoutes } from '@/lib/routes'

interface PaymentCardDetailsProps {
    payment: PaymentType
}

export const PaymentCardDetails: React.FC<PaymentCardDetailsProps> = ({
    payment,
}): JSX.Element => {
    const dataArray = [
        {
            label: payment.type,
            icon: Building,
        },
        {
            label: payment.ref,
            icon: Frame,
        },
        {
            label: payment.date.getMonth() + ' mois',
            icon: Calendar,
        },
        {
            label: 'T. ventes : ' + payment.totalSales,
            icon: Coins,
        },
        {
            label: 'Commission FD : ' + payment.totalCommission,
            icon: CirclePercent,
        },
        {
            label: 'A payer : ' + payment.toPay,
            icon: Banknote,
            className:
                payment.status !== PaymentStatusType.PAID
                    ? 'text-red-500 bg-red-50'
                    : 'text-green-500 bg-green-50',
        },
        {
            label: 'A recevoir : ' + payment.receiver,
            icon: HandCoins,
            className:
                payment.status !== PaymentStatusType.PAID
                    ? 'text-red-500 bg-red-50'
                    : 'text-green-500 bg-green-50',
        },
    ]
    return (
        <div className="flex flex-col gap-3 bg-white p-3 rounded-[20px]">
            <Link
                href={AppRoutes.paymentDetails.replace(':id', payment.ref)}
                className="flex justify-between gap-[0.375rem] cursor-pointer"
            >
                <div className="flex gap-[0.375rem]">
                    <Avatar className="size-[2.875rem] shrink-0">
                        <AvatarImage src={payment.store.logo} />
                        <AvatarFallback>
                            {payment.store.name[0].toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                        <Label
                            label={payment.store.name}
                            className="text-sm font-normal text-lynch-950"
                        />
                        <div className="flex items-center gap-2 text-lynch-500">
                            <CalendarClock size={18} />
                            <Label
                                label={payment.date.toLocaleDateString()}
                                className="text-xs font-medium text-lynch-500"
                            />
                        </div>
                    </div>
                </div>
                <PaymentStatus status={payment.status} />
            </Link>
            <span className="h-[1px] w-full bg-lynch-100" />
            <div className="flex flex-wrap gap-[0.375rem]">
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
                            className={cn('text-lynch-500', data?.className)}
                        />
                    </div>
                ))}
            </div>
            <div>
                {payment.status === PaymentStatusType.IN_PROGRESS && (
                    <PaymentValidation
                        label="CONFIRMER"
                        id={payment.ref}
                        isMobile
                        amount={payment.toPay}
                    />
                )}
            </div>
        </div>
    )
}
