import { deadlineType } from '@/types/PaymentType'
import React from 'react'
import { cn } from '@/lib/utils'
// import { Label } from '@radix-ui/react-dropdown-menu';
import { CalendarMinus, CirclePercent, Frame } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Label } from '@/components/Label'
import { ConfirmPayment } from '../ConfirmPayment'
import { PartnerInfoDto } from '@/types/GlobalType'

const OperationSubscriptionCard = ({
    subscription,
    partner,
}: {
    subscription: deadlineType
    partner: PartnerInfoDto
}) => {
    const router = useRouter()
    const dataArray = [
        {
            label: subscription.id.slice(0, 4) + subscription.id.slice(-4),
            icon: Frame,
        },
        {
            label: 'D. écheance: ' + subscription.date,
            icon: CalendarMinus,
            className: '',
        },
        {
            label: 'P. d’échéance: ' + subscription.amount.amount,
            icon: CirclePercent,
            className:
                subscription.deadlineStatus == 'CONFIRMED_BY_FOODEALS'
                    ? ''
                    : 'bg-coral-100 text-coral-500',
        },
    ]
    console.log('subscription', subscription.payable)
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
            {subscription.payable &&
                subscription.deadlineStatus != 'CONFIRMED_BY_FOODEALS' && (
                    <div className="flex flex-wrap justify-normal w-full">
                        <ConfirmPayment
                            id={subscription.id}
                            disabled={
                                !(
                                    subscription.deadlineStatus ==
                                    'CONFIRMED_BY_PARTNER'
                                )
                            }
                            label={
                                subscription.deadlineStatus ==
                                'CONFIRMED_BY_PARTNER'
                                    ? 'A Recevoir'.toUpperCase()
                                    : 'Reçu'.toUpperCase()
                            }
                            className="w-full bg-primary text-white rounded-[18px] p-5 h-16 hover:bg-primary/90 hover:text-white"
                            isMobile={true}
                        />
                    </div>
                )}
        </div>
    )
}

export default OperationSubscriptionCard
