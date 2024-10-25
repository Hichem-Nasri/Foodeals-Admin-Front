import {
    defaultValuesPaymentFilter,
    PaymentFilterSchema,
} from '@/types/PaymentType'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormField } from '../ui/form'
import { Select } from '../custom/Select'
import { DatePicker } from '../DatePicker'
import { AvatarProfile } from '../AvatarProfile'
import { Label } from '../Label'
import { PartnerOptions } from '@/lib/utils'
import { MultiSelectOptionsType } from '../MultiSelect'

interface FilterPayment {
    date: Date
    setData: (date: Date) => void
    partener: string
    setPartener: (partner: string) => void
    options: MultiSelectOptionsType[]
}

export const FilterPayment: FC<FilterPayment> = ({
    date,
    setData,
    partener,
    setPartener,
    options,
}) => {
    return (
        <div className="w-1/2">
            <div className="flex lg:flex-row flex-col items-center gap-3 p-4 bg-white rounded-[14px] w-full">
                <div className="flex flex-col gap-3 w-full">
                    <Label
                        label="Etat mensuel en cours"
                        className="text-sm font-medium text-lynch-950"
                    />
                    <DatePicker
                        onChange={(date) => setData(date)}
                        value={date}
                    />
                </div>
                <Select
                    value={partener}
                    options={options}
                    disabled={false}
                    onChange={(value) => setPartener(value)}
                    label="Partenaire"
                    placeholder="Selectionner un partenaire"
                    className={'text-sm font-normal'}
                />
            </div>
        </div>
    )
}
