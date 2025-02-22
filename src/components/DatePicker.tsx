'use client'

import { FC, useEffect, useState } from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'

interface DatePickerProps {
    id?: string
    onChange?: (date: Date | undefined) => void
    value?: Date
    disabled?: boolean
    myFormat?: string
}

export const DatePicker: FC<DatePickerProps> = ({
    id,
    disabled,
    onChange,
    value = undefined,
    myFormat = 'MM/dd/yyyy',
}) => {
    const [date, setDate] = useState<Date | undefined>(value)
    useEffect(() => {
        setDate(value)
    }, [value])
    return (
        <Popover>
            <PopoverTrigger asChild disabled={disabled}>
                <Button
                    variant={'outline'}
                    disabled={disabled}
                    className="justify-start gap-3 text-left font-normal text-lynch-950 hover:text-lynch-700 [&>span]:hover:text-lynch-700 bg-lynch-50 rounded-[12px] px-3 py-4 w-full h-14 disabled:text-lynch-700 border-0 disabled:opacity-100"
                    id={id}
                >
                    <CalendarIcon className="text-green-400" size={24} />
                    {date ? (
                        format(date, myFormat)
                    ) : (
                        <span className="text-lynch-400">
                            Sélectionner une date
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(value) => {
                        setDate(value)
                        if (onChange) onChange(value)
                    }}
                    className="rounded-md border h-fit"
                    id={id}
                />
            </PopoverContent>
        </Popover>
    )
}
