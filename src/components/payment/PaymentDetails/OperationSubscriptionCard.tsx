import {
    partnerSubscriptionType,
    partnerSubscriptonOnesType,
    PaymentStatusType,
    ValidationSubscriptionType,
} from '@/types/PaymentType'
import React from 'react'
import { cn } from '@/lib/utils'
// import { Label } from '@radix-ui/react-dropdown-menu';
import {
    ArrowRight,
    Building,
    CalendarClock,
    CalendarMinus,
    CirclePercent,
    Frame,
    HandCoins,
    Minus,
} from 'lucide-react'
import { Arrow } from '@radix-ui/react-dropdown-menu'
import { PartnerSolutionType } from '@/types/partners'
import { PartnerInfoDto } from '@/types/GlobalType'
import { useRouter } from 'next/navigation'
import { AppRoutes } from '@/lib/routes'
import { OperationCard } from './OperationCard'
import { Label } from '@/components/Label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { PartnerSolution } from '@/components/Partners/PartnerSolution'
import { ConfirmPayment } from '../ConfirmPayment'
import { PaymentValidation } from '../PaymentValidation'
import { CustomButton } from '@/components/custom/CustomButton'

const OperationSubscriptionCard = ({
    subscription,
}: {
    subscription: ValidationSubscriptionType
}) => {
    const router = useRouter()
    const dataArray = [
        {
            label: subscription.ref,
            icon: Frame,
        },
        {
            label: 'D. écheance: ' + subscription.deadline.toDateString(),
            icon: CalendarMinus,
            className: '',
        },
        {
            label: 'P. d’échéance: ' + subscription.price,
            icon: CirclePercent,
            className:
                subscription.validation === PaymentStatusType.PAID
                    ? ''
                    : 'bg-coral-100 text-coral-500',
        },
    ]
    return (
        <div className="flex flex-col gap-3 bg-white p-3 rounded-[20px]">
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
            <div className="flex flex-wrap justify-normal w-full">
                <ConfirmPayment
                    IconRight={ArrowRight}
                    label="A RECEVOIR"
                    className="w-full bg-mountain-400 text-white hover:text-mountain-400 hover:bg-white"
                    isMobile={true}
                    id={subscription.id}
                />
            </div>
        </div>
    )
}

export default OperationSubscriptionCard
