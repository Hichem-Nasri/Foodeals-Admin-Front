import React, { FC, useEffect, useState } from 'react'
import { Control } from 'react-hook-form'
import { SelectField } from '../custom/SelectField'
import { getCities, getCountries, getState } from '@/lib/api/fetchAddress'
import { MultiSelectOptionsType } from '../MultiSelect'

interface FieldStateProps {
    control: Control<any>
    disabled: boolean
    name?: string
    label?: string
    placeholder?: string
    country: string
    onChange: (value: string) => void
}

const FieldState: FC<FieldStateProps> = ({
    control,
    disabled,
    name = 'state',
    label = 'State',
    placeholder = 'Sélectionner le State',
    country,
    onChange,
}) => {
    const [states, setState] = useState<MultiSelectOptionsType[]>([])
    useEffect(() => {
        const fetchCountry = async () => {
            const states = await getState(country)
            setState(states)
        }
        if (country) fetchCountry()
    }, [country])
    return (
        <SelectField
            control={control}
            name={name}
            label={label}
            options={states}
            placeholder={country ? placeholder : "Sélectionner le pays d'abord"}
            disabled={disabled}
            onChange={(value) => {
                const id = states.find((values) => values.key === value)?.id
                onChange(id!)
            }}
        />
    )
}

export default FieldState
