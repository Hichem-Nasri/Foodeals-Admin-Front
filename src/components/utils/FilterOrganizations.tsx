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
import { fetchOragnizations } from '@/lib/api/filterOrganizations'
import { MultiSelectField } from '../custom/MultiSelectField'
import { AvatarAndName } from '../AvatarAndName'

interface FilterOrganizationsProps {
    control: Control<any>
    disabled?: boolean
    name: string
    label: string
    placeholder?: string
    type: string
}

export const FilterOrganizations: FC<FilterOrganizationsProps> = ({
    control,
    disabled = false,
    name,
    placeholder = 'Selectionner',
    label,
    type,
}) => {
    const [options, setOptions] = useState<MultiSelectOptionsType[]>([])
    const inputRef = useRef<HTMLInputElement>(null)
    const [search, setSearch] = useState('')
    useEffect(() => {
        if (inputRef.current) inputRef.current.focus()
        const fetchFilters = async () => {
            const data = await fetchOragnizations(
                search,
                inputRef.current?.value!
            )
            console.log('FilterOrganizations data', data)
            setOptions(data)
        }
        fetchFilters()
    }, [search])
    return (
        <MultiSelectField
            options={options}
            control={control}
            name={name}
            label={label}
            placeholder={'Selectionner'}
            transform={(value) => {
                return value.map((item) => {
                    return (
                        <AvatarAndName name={item.label} avatar={item.avatar} />
                    )
                })
            }}
            ref={inputRef}
            emptyAvatar="/avatar/emptyPartner.png"
        />
    )
}
