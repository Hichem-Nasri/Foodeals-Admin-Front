import React, { useEffect, useState, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Control } from 'react-hook-form'
import api from '@/lib/Auth'
import { FormField, FormMessage } from '../ui/form'
import { cn } from '@/lib/utils'
import { MultiSelectOptionsType } from '../MultiSelect'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select' // Import ShadCN Select components
import { SelectField } from '../custom/SelectField'
import { fetchManager } from '@/lib/api/fetchManager'
import {
    fetchFilterManager,
    fetchFilterSalesManager,
} from '@/lib/api/filterManager'
import { API_URL } from '@/lib/api'

const SelectManager = ({
    control,
    disabled = false,
    name,
    label,
    isLoaded,
}: {
    control: Control<any>
    disabled?: boolean
    name: string
    label: string
    isLoaded?: boolean
}) => {
    const [search, setSearch] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)
    const [options, setOptions] = useState<MultiSelectOptionsType[]>([])

    useEffect(() => {
        // if (inputRef.current) inputRef.current.focus()
        const fetchManagerData = async () => {
            const data = await api
                .get(
                    `${API_URL.replace(
                        'api',
                        'v1'
                    )}/users/sells-managers?name=${search}&pageNumber=0&pageSize=10`
                )
                .then((res) => {
                    return res.data?.content?.map((manager: any) => ({
                        label: `${manager.name.firstName} ${manager.name.lastName}`,
                        key: manager.id,
                        avatar: manager.avatarPath,
                    }))
                })
                .catch((error) => {
                    console.error(error)
                    return []
                })
            setOptions(data)
            inputRef.current?.focus()
        }
        fetchManagerData()
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
            isLoaded={isLoaded}
        />
    )
}

export default SelectManager
