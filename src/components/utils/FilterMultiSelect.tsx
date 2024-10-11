'use client'
import { FC, useState } from 'react'
import { MultiSelectOptionsType, MultiSelect } from '../MultiSelect'
import { Label } from '../Label'

interface FilterMultiSelectProps {
    item: string[]
    setItem: (item: string[]) => void
    options: MultiSelectOptionsType[]
    label: string
    placeholder?: string
    transform?: (value: MultiSelectOptionsType[]) => JSX.Element[]
    disabled?: boolean
    length?: number
    normalTransform?: boolean
    emptyAvatar?: string
}

export const FilterMultiSelect: FC<FilterMultiSelectProps> = ({
    item,
    setItem,
    options,
    label,
    placeholder,
    transform,
    ...rest
}) => {
    const [selectedItem, setselectedItem] = useState(item)
    const handleCountryChange = (item: string[]) => {
        setselectedItem(item)
        setItem(item)
    }

    return (
        <div className="flex flex-col gap-3 w-full">
            <Label label={label} htmlFor={label} />
            <MultiSelect
                {...rest}
                transform={transform}
                placeholder={placeholder || 'Sélectionner'}
                onSelect={handleCountryChange}
                options={options}
                selectedValues={selectedItem}
            />
        </div>
    )
}
