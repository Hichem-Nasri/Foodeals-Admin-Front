import { FC, useEffect, useRef, useState } from 'react'
import { Control } from 'react-hook-form'
import { FormField, FormMessage } from '../ui/form'
import { cn } from '@/lib/utils'
import { MultiSelectOptionsType } from '../MultiSelect'
import { Select } from '../custom/Select'
import api from '@/api/Auth'
import { SelectField } from '../custom/SelectField'
import { fetchManager } from '@/lib/api/fetchManager'
import { fetchCities } from '@/lib/api/filterFetchCities'

interface FilterCityProps {
    control: Control<any>
    disabled?: boolean
    name: string
    label: string
    type?: string
}

export const FilterCity: FC<FilterCityProps> = ({
    control,
    disabled = false,
    name,
    label,
    type,
}) => {
    const [options, setOptions] = useState<MultiSelectOptionsType[]>([])
    const inputRef = useRef<HTMLInputElement>(null)
    const [search, setSearch] = useState('')
    useEffect(() => {
        if (inputRef.current) inputRef.current.focus()
        const fetchFilterCities = async () => {
            const data = await fetchCities(search, 'morocco', type)
            console.log('FilterCity data', data)
            setOptions(data)
        }
        fetchFilterCities()
    }, [search])
    return (
        <SelectField
            control={control}
            name={name}
            label={label}
            options={options || []}
            disabled={disabled}
            search={true} // Enable search
            onChangeSearch={(value) => {
                inputRef.current?.focus()
                console.log('value', value)
                setSearch(value) // Update search term
            }}
            inputRef={inputRef} // Pass the input reference to the SelectField
        />
    )
}
