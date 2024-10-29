import { PaymentStatusType } from '@/types/PaymentType'
import {
    Banknote,
    Calendar,
    CalendarClock,
    CirclePercent,
    Coins,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { AppRoutes } from '@/lib/routes'
import { DeliveryPaymentsType } from '@/types/deliveries'
import { PaymentStatus } from '@/components/payment/PaymentStatus'
import { PaymentValidation } from '@/components/payment/PaymentValidation'
import { Label } from '@/components/Label'

interface DeliveryPaymentCardProps {
    payment: DeliveryPaymentsType
}

export const DeliveryPaymentCard: React.FC<DeliveryPaymentCardProps> = ({
    payment,
}): JSX.Element => {
    const dataArray = [
        {
            label: payment.month,
            icon: Calendar,
        },
        {
            label: 'T. Commission : ' + payment.commissionTotal,
            icon: Coins,
        },
        {
            label: 'Commission FD : ' + payment.commissionFoodeals,
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
    ]
    return (
        <div className="flex flex-col gap-3 bg-white p-3 rounded-[20px]">
            <Link
                href={AppRoutes.paymentDetails.replace(':id', payment.id)}
                className="flex justify-between gap-[0.375rem] cursor-pointer"
            >
                <div className="flex gap-[0.375rem]">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-lynch-500">
                            <CalendarClock size={18} />
                            <Label
                                label={payment.month}
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
                        id={payment.id}
                        isMobile
                    />
                )}
            </div>
        </div>
    )
}
