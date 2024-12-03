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
import {
    fetchFilterManager,
    fetchFilterSalesManager,
} from '@/lib/api/filterManager'
import { usePathname } from 'next/navigation'
import { AvatarAndName } from '../AvatarAndName'
import { MultiSelectField } from '../custom/MultiSelectField'

interface FilterManagerProps {
    control: Control<any>
    disabled?: boolean
    name: string
    label: string
    type: string
    filter?: string
}

export const FilterUsers: FC<FilterManagerProps> = ({
    control,
    disabled = false,
    name,
    label,
    type,
    filter = 'organization',
}) => {
    const [options, setOptions] = useState<MultiSelectOptionsType[]>([])
    const inputRef = useRef<HTMLInputElement>(null)
    const id = usePathname()
    useEffect(() => {
        const fetchFilterCities = async () => {
            try {
                const search = inputRef.current?.value || ''
                const data = await fetchFilterSalesManager(search, type, id)
                console.log('FilterUsers data', data)
                const filterData =
                    filter === 'user'
                        ? data.map((item: MultiSelectOptionsType) => ({
                              ...item,
                              key: item.label,
                          }))
                        : data
                console.log('user: ', filterData)
                setOptions(filterData)
            } catch (error) {
                console.error('Error fetching filter cities:', error)
            }
        }

        fetchFilterCities()
    }, [type, id, inputRef])
    return (
        <MultiSelectField
            control={control}
            name={name}
            label={label}
            options={options}
            disabled={disabled}
            ref={inputRef} // Pass the input reference to the SelectField
            emptyAvatar="/avatar/emptyUser.png"
            len={2}
        />
    )
}
