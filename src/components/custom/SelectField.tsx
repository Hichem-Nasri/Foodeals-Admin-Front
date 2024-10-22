import { FC } from 'react'
import { Control } from 'react-hook-form'
import { Select } from './Select'
import { FormField, FormMessage } from '../ui/form'
import { cn } from '@/lib/utils'
import { MultiSelectOptionsType } from '../MultiSelect'

interface SelectFieldProps {
    control: Control<any>
    placeholder?: string
    label: string
    options: MultiSelectOptionsType[]
    name: string
    disabled?: boolean
    className?: string
    transform?: (value: string | number) => JSX.Element
    onChange?: (value: string) => void
    type?: 'text' | 'number'
    search?: boolean
    onChangeSearch?: (value: string) => void
    inputRef?: React.RefObject<HTMLInputElement>
}

export const SelectField: FC<SelectFieldProps> = ({
    control,
    placeholder = 'Sélectionnez',
    options,
    name,
    label,
    disabled = false,
    className,
    transform,
    onChange,
    type = 'text',
    search = false,
    onChangeSearch,
    inputRef,
}) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {
                return (
                    <div
                        className={cn(
                            'flex flex-col w-full text-sm font-semibold',
                            className
                        )}
                    >
                        <Select
                            options={options}
                            disabled={options.length === 0 || disabled}
                            value={field.value}
                            onChange={(value) => {
                                if (type === 'number') {
                                    console.log('value', value)
                                    field.onChange(parseInt(value))
                                } else field.onChange(value)
                                if (onChange) onChange(value)
                            }}
                            placeholder={placeholder}
                            label={label}
                            transform={transform}
                            search={search}
                            onChangeSearch={onChangeSearch}
                            inputRef={inputRef}
                        />
                        <FormMessage />
                    </div>
                )
            }}
        />
    )
}
