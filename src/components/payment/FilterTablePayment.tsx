import { FC } from 'react'
import { CustomButton } from '../custom/CustomButton'
import { ChevronLeft, ListFilter, X } from 'lucide-react'
import LayoutMobile from '../LayoutMobile'
import { FormFilterPayment } from './FormFilterPayment'
import { useRouter } from 'next/navigation'
import { PaymentFilterSchema } from '@/types/PaymentType'
import { z } from 'zod'
import { UseFormReturn } from 'react-hook-form'
import { Dialog, DialogHeader } from '../ui/dialog'
import { DialogContent, DialogTrigger } from '@radix-ui/react-dialog'
import React from 'react'
import { Button } from '../ui/button'

interface FilterTablePaymentProps {
    form: UseFormReturn<z.infer<typeof PaymentFilterSchema>>
    onSubmit: (data: z.infer<typeof PaymentFilterSchema>) => void
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    header?: string
    dateForm?: string
    type?: string
    typePartner?:
        | 'PARTNER_SB,NORMAL_PARTNER'
        | 'PARTNER_SB'
        | 'NORMAL_PARTNER'
        | 'SUB_ENTITY'
    id?: string
}

export const FilterTablePayment: FC<FilterTablePaymentProps> = ({
    form,
    onSubmit,
    setOpen,
    header,
    dateForm,
    type,
    typePartner,
    id,
}) => {
    // dialog that take all the page and show the filter form with buttons in bottom of the page

    return (
        <div className=" lg:w-full w-fit lg:max-w-2xl">
            <div className="lg:hidden flex items-center gap-3 lg:rounded-[12px] rounded-full lg:border border-lynch-200 border-0 text-lynch-500 font-medium text-sm p-4 justify-between w-full">
                <span className="text-lg text-lynch-950">
                    {header ? header : 'Tableau de validation des commission'}
                </span>
                <div
                    className=" bg-white text-lynch-500 rounded-full p-3  cursor-pointer flex items-center justify-center w-fit"
                    onClick={() => setOpen((prev) => !prev)}
                >
                    <ListFilter />
                </div>
            </div>

            <div className="hidden lg:flex w-full ">
                <FormFilterPayment
                    form={form}
                    onSubmit={onSubmit}
                    onBlurMode="onChange"
                    dateForm={dateForm}
                    type={type}
                    typePartner={typePartner}
                    id={id}
                />
            </div>
        </div>
    )
}
