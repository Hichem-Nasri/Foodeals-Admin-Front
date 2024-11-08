'use client'
import React, { useEffect, useState, useRef } from 'react'
import { MultiSelectOptionsType } from '../MultiSelect'
import { fetchManager } from '@/lib/api/fetchManager'
import { Label } from '../Label'
import { Select } from '../custom/Select'
import { CalendarClock } from 'lucide-react'

const getOptionsDate: (
    format: 'MM/YYYY' | 'YYYY'
) => MultiSelectOptionsType[] = (format) => {
    const date = new Date()
    const years = []
    for (let i = 0; i < 10; i++) {
        years.push(date.getFullYear() - i)
    }
    if (format == 'YYYY')
        return years.map((year) => ({
            key: year.toString(),
            label: year.toString(),
        }))
    return years.flatMap((year) => {
        const months = []
        for (let i = 1; i <= 12; i++) {
            months.push(i)
        }
        return months.map((month) => ({
            key: `${month}/${year}`,
            label: `${month}/${year}`,
        }))
    })
}

const SelectDate = ({
    onChange,
    disabled = false,
    label,
    format = 'MM/YYYY',
    placeholder,
    value,
}: {
    onChange: (value: string) => void
    disabled?: boolean
    label: string
    format?: string
    placeholder?: string
    value: string
}) => {
    // const options: MultiSelectOptionsType[] = []
    const [options, setOptions] = useState<MultiSelectOptionsType[]>(
        getOptionsDate(format as 'MM/YYYY' | 'YYYY')
    )

    return (
        <div className="flex flex-col w-full items-start text-sm font-semibold">
            <Label
                label={label}
                htmlFor={label}
                className="text-sm font-semibold text-lynch-950"
            />
            <Select
                label=""
                placeholder={placeholder || 'Sélectionner'}
                onChange={onChange}
                options={options}
                value={value.toString()}
                // disabled={disabled}
                RightIcon={CalendarClock}
                className="text-lynch-400"
                classNameParent="text-lynch-400"
            />
        </div>
    )
}

export default SelectDate
