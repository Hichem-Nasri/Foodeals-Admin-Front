'use client'
import { FC, useState } from 'react'
import { Label } from '../Label'
import { MultiSelectOptionsType } from '../MultiSelect'
import { Select } from '../custom/Select'

interface FilterSelectProps {
    item: string
    setItem: (item: string) => void
    options: MultiSelectOptionsType[]
    label: string
    placeholder?: string
}

export const FilterSelect: FC<FilterSelectProps> = ({
    item,
    setItem,
    options,
    label,
    placeholder,
}) => {
    return (
        <div className="flex flex-col gap-2 w-full">
            <Label label={label} htmlFor={label} />
            <Select
                label=""
                placeholder={placeholder || 'Sélectionner'}
                onChange={setItem}
                options={options}
                value={item}
            />
        </div>
    )
}
