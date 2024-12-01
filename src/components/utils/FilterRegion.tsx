import { FC, useEffect, useRef, useState } from 'react'
import { Control } from 'react-hook-form'
import { FormField, FormMessage } from '../ui/form'
import { cn } from '@/lib/utils'
import { MultiSelectOptionsType } from '../MultiSelect'
import { Select } from '../custom/Select'
import api from '@/lib/Auth'
import { SelectField } from '../custom/SelectField'
import { fetchManager } from '@/lib/api/fetchManager'
import { fetchCities } from '@/lib/api/filterFetchCities'
import { usePathname } from 'next/navigation'
import { fetchRegionsFilter } from '@/lib/api/fetchFilterRegion'

interface FilterRegionProps {
    control: Control<any>
    disabled?: boolean
    name: string
    label: string
    type: string
}

export const FilterRegion: FC<FilterRegionProps> = ({
    control,
    disabled = false,
    name,
    label,
    type,
}) => {
    const [options, setOptions] = useState<MultiSelectOptionsType[]>([])
    const inputRef = useRef<HTMLInputElement>(null)
    const [search, setSearch] = useState('')
    const path = usePathname()
    useEffect(() => {
        if (inputRef.current) inputRef.current.focus()
        const fetchFilterCities = async () => {
            const data = await fetchRegionsFilter(search, type, 'morocco', path)
            console.log('FilterRegion data', data)
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
