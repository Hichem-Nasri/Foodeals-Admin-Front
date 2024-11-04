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
}

export const FilterTablePayment: FC<FilterTablePaymentProps> = ({
    form,
    onSubmit,
    setOpen,
    header,
}) => {
    // dialog that take all the page and show the filter form with buttons in bottom of the page
    return (
        <div className="w-full ">
            <div className="lg:hidden flex items-center gap-3 lg:rounded-[12px] rounded-full lg:border border-lynch-200 border-0 text-lynch-500 font-medium text-sm p-4 justify-between w-full">
                <span className="text-lg text-lynch-950">
                    {header ? header : 'Tableau de validation des commission'}
                </span>
                <div
                    className="hover:text-black hover:bg-neutral-100 bg-white text-lynch-500 rounded-full p-2 size-12 cursor-pointer flex items-center justify-center"
                    onClick={() => setOpen((prev) => !prev)}
                >
                    <ListFilter />
                </div>
            </div>

            <div className="hidden lg:flex w-full">
                <FormFilterPayment
                    options={[]}
                    form={form}
                    onSubmit={onSubmit}
                    onBlurMode="onChange"
                />
            </div>
        </div>
    )
}
