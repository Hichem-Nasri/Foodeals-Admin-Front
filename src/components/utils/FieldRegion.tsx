import React, { FC, useEffect, useState } from 'react'
import { Control } from 'react-hook-form'
import { SelectField } from '../custom/SelectField'
import { getCities, getCountries, getRegions } from '@/lib/api/fetchAddress'
import { MultiSelectOptionsType } from '../MultiSelect'

interface FieldRegionProps {
    control: Control<any>
    disabled: boolean
    name?: string
    label?: string
    placeholder?: string
    city: string
    state: string
    country: string
    onChange: (value: string) => void
}

const FieldRegion: FC<FieldRegionProps> = ({
    control,
    disabled,
    name = 'region',
    label = 'Region',
    placeholder = 'Sélectionner le region',
    city,
    country,
    state,
    onChange,
}) => {
    const [regions, setRegions] = useState<MultiSelectOptionsType[]>([])
    useEffect(() => {
        const fetchRgions = async () => {
            const countries = await getRegions(city)
            setRegions(countries)
        }
        if (city && country) fetchRgions()
    }, [city, country])
    return (
        <SelectField
            control={control}
            name={name}
            label={label}
            options={regions}
            placeholder={
                city
                    ? placeholder
                    : country
                    ? "Sélectionner la ville d'abord"
                    : state
                    ? "Sélectionner la state d'abord"
                    : "Sélectionner le pays d'abord"
            }
            disabled={disabled}
            onChange={(value) => {
                const id = regions.find((values) => values.key === value)?.id
                console.log('id', id)
                onChange(id!)
            }}
        />
    )
}

export default FieldRegion
