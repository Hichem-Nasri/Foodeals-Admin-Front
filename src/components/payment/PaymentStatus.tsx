import { PaymentStatusType } from '@/types/PaymentType'
import { CheckCheck, FileMinus, LoaderCircle, X } from 'lucide-react'
import { FC } from 'react'

interface PaymentStatusProps {
    status: PaymentStatusType
}

export const PaymentStatus: FC<PaymentStatusProps> = ({ status }) => {
    const statusData =
        status === PaymentStatusType.PAID
            ? {
                  style: 'text-mountain-500 bg-mountain-100',
                  icon: <CheckCheck strokeWidth="3px" size={14} />,
                  text: 'Validé',
              }
            : status === PaymentStatusType.IN_PROGRESS
            ? {
                  style: 'bg-amethyst-100 text-amethyst-500',
                  icon: <LoaderCircle strokeWidth="3px" size={14} />,
                  text: 'En attente',
              }
            : {
                  style: 'text-coral-500 bg-coral-100',
                  icon: <X strokeWidth="3px" size={14} />,
                  text: 'Annulé',
              }

    return (
        <span
            className={`flex items-center gap-[0.375rem] text-[0.625rem] font-bold py-[0.403rem] px-3 rounded-full w-fit h-fit ${statusData.style}`}
        >
            {statusData.icon}
            {statusData.text.toUpperCase()}
        </span>
    )
}
