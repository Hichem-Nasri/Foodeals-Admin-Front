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
import { fetchOragnizations } from '@/lib/api/filterOrganizations'
import { MultiSelectField } from '../custom/MultiSelectField'
import { AvatarAndName } from '../AvatarAndName'
import { usePathname } from 'next/navigation'

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
    const path = usePathname()
    useEffect(() => {
        if (inputRef.current) inputRef.current.focus()
        const fetchFilters = async () => {
            const data = await fetchOragnizations(search, type, path)
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
                if (value.length > 1) {
                    return [
                        <AvatarAndName
                            key={0}
                            name="Multi"
                            avatar="/avatar/emptyPartner.png"
                        />,
                    ]
                }
                return value.map((item, index) => {
                    return (
                        <AvatarAndName
                            key={index}
                            name={item.label}
                            avatar={item.avatar}
                        />
                    )
                })
            }}
            ref={inputRef}
            emptyAvatar="/avatar/emptyPartner.png"
        />
    )
}
