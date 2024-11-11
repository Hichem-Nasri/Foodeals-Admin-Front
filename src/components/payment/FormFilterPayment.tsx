import { PaymentFilterSchema } from '@/types/PaymentType'

import React, { FC } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormField } from '../ui/form'
import { PartnerOptions } from '@/lib/utils'
import { MultiSelectOptionsType } from '../MultiSelect'
import SelectDate from '../utils/SelectDate'
import SelectParnter from '@/components/utils/SelectPartners'
import { PartnerEntitiesType } from '@/types/GlobalType'

interface FormFilterPaymentProps {
    form: UseFormReturn<z.infer<typeof PaymentFilterSchema>>
    onSubmit: (data: z.infer<typeof PaymentFilterSchema>) => void
    onBlurMode?: 'onBlur' | 'onChange'
    dateForm?: string
    type?: string
    id?: string
    typePartner?: PartnerEntitiesType[]
}

export const FormFilterPayment: FC<FormFilterPaymentProps> = ({
    form,
    onSubmit,
    onBlurMode = 'onBlur',
    dateForm = 'MM/YYYY',
    type,
    typePartner = ['PARTNER_SB', 'NORMAL_PARTNER', 'SUB_ENTITY'],
    id,
}) => {
    const { handleSubmit, control } = form
    console.log('FormFilterPaymentProps')
    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <div className="flex lg:flex-row flex-grow flex-col items-end gap-3 p-4 bg-white rounded-[14px] w-full">
                    <FormField
                        control={control}
                        name={'date'}
                        render={({ field }) => (
                            <SelectDate
                                onChange={(value) => {
                                    field.onChange(value)
                                    if (onBlurMode === 'onChange') {
                                        handleSubmit(onSubmit)()
                                    }
                                }}
                                label="Etat mensuel en cours"
                                format={dateForm}
                                placeholder="Selectionner une date"
                                value={field.value!}
                                type={type}
                                id={id}
                            />
                        )}
                    />
                    <SelectParnter
                        control={control}
                        name="partner"
                        label="Partenaire"
                        disabled={false}
                        type={typePartner}
                    />
                </div>
            </form>
        </Form>
    )
}
