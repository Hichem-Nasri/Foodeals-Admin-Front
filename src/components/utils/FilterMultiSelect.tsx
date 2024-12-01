'use client'
import { FC, useEffect, useState } from 'react'
import { MultiSelectOptionsType, MultiSelect } from '../MultiSelect'
import { Label } from '../Label'
import { Control } from 'react-hook-form'
import { MultiSelectField } from '../custom/MultiSelectField'
import { PartnerSolutionType, PartnerStatusType } from '@/types/partnersType'

interface FilterMultiSelectProps {
    control: Control<any>
    name: string
    label: string
    placeholder?: string
    transform?: (value: MultiSelectOptionsType[]) => JSX.Element[]
    disabled?: boolean
    length?: number
    normalTransform?: boolean
    emptyAvatar?: string
    type?: string
}

const optionsStatus = [
    {
        label: 'EN COURS',
        key: PartnerStatusType.IN_PROGRESS,
    },
    {
        label: 'Valide',
        key: PartnerStatusType.VALID,
    },
    {
        label: 'Annuler',
        key: PartnerStatusType.CANCELED,
    },
]

const optionsSolutions = [
    {
        label: 'Market PRO',
        key: PartnerSolutionType.MARKET_PRO,
    },
    {
        label: 'Donate',
        key: PartnerSolutionType.DONATE_PRO,
    },
    {
        label: 'DLC PRO',
        key: PartnerSolutionType.DLC_PRO,
    },
]

export const FilterMultiSelect: FC<FilterMultiSelectProps> = ({
    control,
    name,
    label,
    placeholder,
    transform,
    type,
    ...rest
}) => {
    const [options, setOptions] = useState<MultiSelectOptionsType[]>(() =>
        name == 'status'
            ? optionsStatus
            : name == 'solution' || name == 'solutions'
            ? type?.includes('DELIVERY_PARTNER')
                ? optionsSolutions.filter(
                      (option) => option.key !== PartnerSolutionType.DLC_PRO
                  )
                : optionsSolutions
            : []
    )
    console.log(options)

    return (
        <MultiSelectField
            options={options}
            control={control}
            name={name}
            label={label}
            placeholder={placeholder}
            transform={transform}
            {...rest}
        />
    )
}
