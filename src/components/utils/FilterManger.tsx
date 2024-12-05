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

interface FilterManagerProps {
    control: Control<any>
    disabled?: boolean
    name: string
    label: string
    type: string
    filter?: string
    partnerType?: string
}

export const FilterManager: FC<FilterManagerProps> = ({
    control,
    disabled = false,
    name,
    label,
    type,
    filter = 'organization',
    partnerType,
}) => {
    const [options, setOptions] = useState<MultiSelectOptionsType[]>([])
    const inputRef = useRef<HTMLInputElement>(null)
    const [search, setSearch] = useState('')
    const id = usePathname()
    useEffect(() => {
        const fetchFilterCities = async () => {
            try {
                const data = await fetchFilterSalesManager(
                    search,
                    type,
                    id,
                    partnerType
                )
                console.log('FilterManager data', data)
                console.log('types: ', type)
                console.log('partnerType: ', partnerType)
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
    }, [search, type, id, filter])
    return (
        <SelectField
            control={control}
            name={name}
            label={label}
            options={options}
            disabled={disabled}
            search={true} // Enable search
            onChangeSearch={(value) => {
                setSearch(value) // Update search term
            }}
            inputRef={inputRef} // Pass the input reference to the SelectField
            emptyAvatar="/avatar/emptyUser.png"
        />
    )
}
