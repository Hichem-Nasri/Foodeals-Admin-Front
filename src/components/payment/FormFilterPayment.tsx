import { PaymentFilterSchema, PaymentType } from '@/types/PaymentType'

import { zodResolver } from '@hookform/resolvers/zod'
import React, { FC } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormField, FormMessage } from '../ui/form'
import { Select } from '../custom/Select'
import { DatePicker } from '../DatePicker'
import { AvatarProfile } from '../AvatarProfile'
import { Label } from '../Label'
import { PartnerOptions } from '@/lib/utils'
import { MultiSelectOptionsType } from '../MultiSelect'
import { SelectField } from '../custom/SelectField'

interface FormFilterPaymentProps {
    options: MultiSelectOptionsType[]
    form: UseFormReturn<z.infer<typeof PaymentFilterSchema>>
    onSubmit: (data: z.infer<typeof PaymentFilterSchema>) => void
    onBlurMode?: 'onBlur' | 'onChange'
    dateForm?: string
}

export const FormFilterPayment: FC<FormFilterPaymentProps> = ({
    options,
    form,
    onSubmit,
    onBlurMode = 'onBlur',
    dateForm = 'MM/yyyy',
}) => {
    const { handleSubmit, control } = form
    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <div className="flex lg:flex-row flex-grow flex-col items-end gap-3 p-4 bg-white rounded-[14px] w-full">
                    <FormField
                        control={control}
                        name={'date' as any}
                        render={({ field }) => (
                            <div className="flex flex-col items-start gap-3 w-full text-lynch-400">
                                <Label
                                    label="Etat mensuel en cours"
                                    className="text-sm font-semibold text-lynch-950"
                                />
                                <DatePicker
                                    myFormat={dateForm}
                                    onChange={(value) => {
                                        field.onChange(value)
                                        if (onBlurMode === 'onChange') {
                                            handleSubmit(onSubmit)()
                                        }
                                    }}
                                    value={field.value}
                                />
                                <FormMessage {...field} />
                            </div>
                        )}
                    />
                    <SelectField
                        control={control}
                        name="partner"
                        options={options}
                        disabled={false}
                        label="Partenaire"
                        onChange={(value) => {
                            if (onBlurMode === 'onChange') {
                                handleSubmit(onSubmit)()
                            }
                        }}
                        placeholder="Selectionner un partenaire"
                        className={'text-sm font-normal'}
                    />
                </div>
            </form>
        </Form>
    )
}
