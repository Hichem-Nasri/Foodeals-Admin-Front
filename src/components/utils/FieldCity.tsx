import React, { FC, useEffect, useState } from 'react'
import { Control } from 'react-hook-form'
import { SelectField } from '../custom/SelectField'
import { getCities, getCountries } from '@/lib/api/fetchAddress'
import { MultiSelectOptionsType } from '../MultiSelect'

interface FieldCityProps {
    control: Control<any>
    disabled: boolean
    name?: string
    label?: string
    placeholder?: string
    country: string
    state: string
    onChange: (value: string) => void
}

const FieldCity: FC<FieldCityProps> = ({
    control,
    disabled,
    name = 'city',
    label = 'Ville',
    placeholder = 'Sélectionner le ville',
    country,
    state,
    onChange,
}) => {
    const [cities, setCities] = useState<MultiSelectOptionsType[]>([])
    useEffect(() => {
        const fetchCountry = async () => {
            const cities = await getCities(state)
            setCities(cities)
        }
        if (state) fetchCountry()
    }, [state])
    return (
        <SelectField
            control={control}
            name={name}
            label={label}
            options={cities}
            placeholder={
                state
                    ? placeholder
                    : country
                    ? "Sélectionner le state d'abord"
                    : "Sélectionner le pays d'abord"
            }
            disabled={disabled}
            onChange={(value) => {
                const id = cities.find((values) => values.key === value)?.id
                onChange(id!)
            }}
        />
    )
}

export default FieldCity
