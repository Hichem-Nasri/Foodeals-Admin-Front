import { ConfirmPayment } from '@/components/payment/ConfirmPayment'
import { PaymentValidation } from '@/components/payment/PaymentValidation'
import { Skeleton } from '@/components/ui/skeleton'
import { PaymentStatusEnum } from '@/types/paymentUtils'
import { CheckCheck } from 'lucide-react'
import React from 'react'

export type DetailsPayment = {
    id: string
    payable: boolean
    status: PaymentStatusEnum
    direction: 'PARTNER_TO_FOODEALS' | 'FOODEALS_TO_PARTENER'
}

const ConfirmationAll = ({
    isLoading,
    details,
    isMobile = false,
}: {
    isLoading: boolean
    details: DetailsPayment
    isMobile?: boolean
}) => {
    console.log('details', details)
    return (
        <>
            {isLoading || !details ? (
                <Skeleton
                    className="w-48 h-14 rounded-[18px] bg-white lg:bg-lynch-50"
                    title="Waiting"
                />
            ) : (
                <>
                    {details?.direction === 'PARTNER_TO_FOODEALS' ? (
                        <ConfirmPayment
                            id={details.id}
                            label="Confirmer tout"
                            className="rounded-[12px] h-12"
                            IconRight={CheckCheck}
                            disabled={
                                !details.payable ||
                                [
                                    PaymentStatusEnum.IN_VALID,
                                    PaymentStatusEnum.VALID_BY_BOTH,
                                ].includes(details.status as PaymentStatusEnum)
                            }
                            isMobile={isMobile}
                        />
                    ) : (
                        <PaymentValidation
                            id={details.id}
                            label="Paye tout"
                            className="rounded-[12px] h-12"
                            IconRight={CheckCheck}
                            disabled={
                                !details.payable ||
                                PaymentStatusEnum.IN_VALID !=
                                    (details.status as PaymentStatusEnum)
                            }
                            isMobile={isMobile}
                        />
                    )}
                </>
            )}
        </>
    )
}

export default ConfirmationAll
