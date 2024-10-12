'use client'
import { FC, useEffect, useState } from 'react'
import { Control } from 'react-hook-form'
import { FormField, FormMessage } from '../ui/form'
import { cn } from '@/lib/utils'
import DialogMulti from './DialogMulti'
import { Label } from '../Label'
import { ArrowBigDown } from 'lucide-react'

interface CitySelectFieldProps {
    control: Control<any>
    placeholder?: string
    label: string
    name: string
    disabled?: boolean
    className?: string
}

export const CitySelectField: FC<CitySelectFieldProps> = ({
    control,
    placeholder = 'Sélectionnez',
    label,
    name,
    disabled = false,
    className,
}) => {
    const [value, setValue] = useState<string>('')
    useEffect(() => {
        console.log('value:', value)
    }, [value])
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className={cn('flex flex-col w-full', className)}>
                    <div className="flex flex-col items-start gap-3 w-full text-lynch-400">
                        <Label
                            label={label}
                            className="text-xs font-semibold text-lynch-950"
                        />
                        <DialogMulti
                            placeholder={placeholder}
                            value={field.value}
                            setValue={setValue}
                            onChange={(e) => field.onChange(e)}
                        />
                    </div>
                    <FormMessage />
                </div>
            )}
        />
    )
}
