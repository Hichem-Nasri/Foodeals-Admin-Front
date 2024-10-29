import { FC } from 'react'
import { Control } from 'react-hook-form'
import { FormField, FormMessage } from '../ui/form'
import { cn } from '@/lib/utils'
import { MultiSelect, MultiSelectOptionsType } from '../MultiSelect'
import { Label } from '../Label'

interface MultiSelectFieldProps {
    control: Control<any>
    placeholder?: string
    label: string
    options: {
        key: string | number
        label: string
    }[]
    name: string
    disabled?: boolean
    className?: string
    transform?: (value: MultiSelectOptionsType[]) => JSX.Element[]
    len?: number
}

export const MultiSelectField: FC<MultiSelectFieldProps> = ({
    control,
    placeholder = 'Sélectionnez',
    options,
    name,
    label,
    disabled = false,
    className,
    transform,
    len,
}) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {
                return (
                    <div className={cn('flex flex-col w-full', className)}>
                        <div className="flex flex-col items-start gap-3 w-full text-lynch-400">
                            <Label
                                label={label}
                                className="text-sm font-semibold text-lynch-950"
                            />
                            <MultiSelect
                                options={options}
                                disabled={options.length === 0 || disabled}
                                selectedValues={field.value || []}
                                onSelect={(value) => field.onChange(value)}
                                placeholder={placeholder}
                                transform={transform}
                                length={len}
                            />
                        </div>
                        <FormMessage />
                    </div>
                )
            }}
        />
    )
}
