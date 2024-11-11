'use client'
import { FC, useEffect, useState } from 'react'
import { MultiSelectOptionsType, MultiSelect } from '../MultiSelect'
import { Label } from '../Label'
import { Control } from 'react-hook-form'
import { MultiSelectField } from '../custom/MultiSelectField'
import { PartnerStatusType } from '@/types/partnersType'

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
}

export const FilterMultiSelect: FC<FilterMultiSelectProps> = ({
    control,
    name,
    label,
    placeholder,
    transform,
    ...rest
}) => {
    const [options, setOptions] = useState<MultiSelectOptionsType[]>(() =>
        name == 'status'
            ? [
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
            : []
    )

    useEffect(() => {
        const fetchOptions = async () => {
            // fetch options
        }
        fetchOptions()
    }, [])

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
