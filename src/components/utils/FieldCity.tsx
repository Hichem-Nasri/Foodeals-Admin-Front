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
    onChange: (value: string) => void
}

const FieldCity: FC<FieldCityProps> = ({
    control,
    disabled,
    name = 'city',
    label = 'Ville',
    placeholder = 'Sélectionner le ville',
    country,
    onChange,
}) => {
    const [cities, setCities] = useState<MultiSelectOptionsType[]>([])
    useEffect(() => {
        const fetchCountry = async () => {
            const countries = await getCities(country)
            setCities(countries)
        }
        if (country) fetchCountry()
    }, [country])
    return (
        <SelectField
            control={control}
            name={name}
            label={label}
            options={cities}
            placeholder={placeholder}
            disabled={disabled}
            onChange={(value) => {
                const id = cities.find((values) => values.key === value)?.id
                onChange(id!)
            }}
        />
    )
}

export default FieldCity
