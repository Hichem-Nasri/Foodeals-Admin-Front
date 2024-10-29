import {
    partnerSubscriptionType,
    partnerSubscriptonOnesType,
    PaymentStatusType,
} from '@/types/PaymentType'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { cn } from '@/lib/utils'
// import { Label } from '@radix-ui/react-dropdown-menu';
import {
    ArrowRight,
    Building,
    CalendarClock,
    CirclePercent,
    Frame,
    HandCoins,
    Minus,
} from 'lucide-react'
import { PaymentStatus } from './PaymentStatus'
import { PaymentValidation } from './PaymentValidation'
import { Label } from '../Label'
import { Arrow } from '@radix-ui/react-dropdown-menu'
import { PartnerSolution } from '../Partners/PartnerSolution'
import { PartnerSolutionType } from '@/types/partners'
import { PartnerInfoDto } from '@/types/GlobalType'
import { useRouter } from 'next/navigation'
import { AppRoutes } from '@/lib/routes'

const PaymentOnesSubscriptionCard = ({
    subscription,
    store,
}: {
    subscription: partnerSubscriptonOnesType
    store: PartnerInfoDto
}) => {
    const router = useRouter()
    const dataArray = [
        {
            label: subscription.ref,
            icon: Frame,
        },
        {
            label: 'Nbr d’écheance: ' + subscription.nbrEcheance,
            icon: Minus,
            className: '',
        },
        {
            label: 'T. d’échéance: ' + subscription.totalEcheance,
            icon: HandCoins,
        },
        {
            label: 'P. d’échéance: ' + subscription.prixEcheance,
            icon: CirclePercent,
        },
    ]
    return (
        <div className="flex flex-col gap-3 bg-white p-3 rounded-[20px]">
            <div className="w-full flex justify-between items-start">
                <div className="flex gap-[0.375rem]">
                    <Avatar className="size-[2.875rem] shrink-0">
                        <AvatarImage src={store.avatarPath} />
                        <AvatarFallback>
                            {store.name && store.name[0].toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                        <Label
                            label={store.name}
                            className="text-sm font-normal text-lynch-950"
                        />
                        <div className="flex items-center gap-2 text-lynch-500">
                            <CalendarClock size={18} />
                            <Label
                                label={subscription.createdAt}
                                className="text-xs font-medium text-lynch-500"
                            />
                        </div>
                    </div>
                </div>
                <button
                    className="bg-lynch-500 size-11 rounded-full text-white hover:bg-lynch-300"
                    onClick={() => {
                        router.push(
                            AppRoutes.PBSubscriptionDetails.replace(
                                ':id',
                                subscription.id
                            )
                        )
                    }}
                >
                    <ArrowRight size={18} className="m-auto w-full" />
                </button>
            </div>
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
            <div className="flex flex-wrap justify-normal">
                <PartnerSolution
                    solution={subscription.solution as PartnerSolutionType}
                />
            </div>
        </div>
    )
}

export default PaymentOnesSubscriptionCard
