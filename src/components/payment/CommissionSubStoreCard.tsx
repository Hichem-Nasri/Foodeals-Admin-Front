import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { cn } from '@/lib/utils'
// import { Label } from '@radix-ui/react-dropdown-menu';
import { CheckCheck, Coins, CreditCard, Frame, HandCoins } from 'lucide-react'
import { PaymentValidation } from './PaymentValidation'
import { Label } from '../Label'
import { ConfirmPayment } from './ConfirmPayment'
import { useRouter } from 'next/navigation'
import { partnerCommissionMonthType } from '@/types/PaymentType'

const CommissionSubStoreCard = ({
    commission,
}: {
    commission: partnerCommissionMonthType
}) => {
    // const payed = commission.toPay.amount != 0
    // const label = payed ? 'A PAYER' : 'A RECEVOIR'
    // const icon = payed ? Banknote : HandCoins
    // const className = !commission.payable
    //     ? ''
    //     : payed
    //     ? commission.paymentStatus == PaymentStatusEnum.VALID_BY_FOODEALS
    //         ? ''
    //         : 'bg-mountain-100 text-mountain-500'
    //     : commission.paymentStatus == PaymentStatusEnum.VALID_BY_PARTNER
    //     ? 'bg-coral-100 text-coral-500'
    //     : ''
    // const showValidation =
    //     commission.payable &&
    //     ((payed && commission.paymentStatus == PaymentStatusEnum.IN_VALID) ||
    //         (!payed &&
    //             commission.paymentStatus == PaymentStatusEnum.VALID_BY_PARTNER))
    // console.log('showValidation', showValidation, commission.payable)
    const router = useRouter()
    const dataArray = [
        {
            label: commission.ref || '0236',
            icon: Frame,
        },
        {
            label: 'PRIX: ' + commission.amount,
            icon: HandCoins,
            className: '',
        },
        {
            label: 'QTE ' + commission.quantity,
            icon: HandCoins,
        },
        {
            label:
                commission.cardAmount.amount > 0
                    ? 'V.CARTE: ' + commission.cardAmount.amount
                    : 'V.ESPECE: ' + commission.cashAmount.amount,
            icon: commission.cardAmount.amount > 0 ? CreditCard : Coins,
        },
        {
            label:
                commission.commissionCard.amount > 0
                    ? 'C.CARTE: ' + commission.commissionCard.amount
                    : 'C.ESPECE: ' + commission.cashCommission.amount,
            icon: commission.commissionCard.amount > 0 ? CreditCard : Coins,
            className: '',
        },
    ]
    const name = commission.product.name
    return (
        <div className="flex flex-col gap-3 bg-white p-3 rounded-[20px] w-full items-center justify-center">
            <div className="w-full flex justify-between items-start">
                <div className="flex gap-[0.375rem]">
                    <Avatar className="size-[2.875rem] shrink-0">
                        <AvatarImage src={commission.product.avatarPath} />
                        <AvatarFallback>
                            {name && name[0]?.toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                        <Label
                            label={name}
                            className="text-sm font-normal text-lynch-950"
                        />
                    </div>
                </div>
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
        </div>
    )
}

export default CommissionSubStoreCard
