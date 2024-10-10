'use client'
import { FC, useState } from 'react'
import { DatePicker } from '../DatePicker'
import { Label } from '../Label'

interface DateFilterProps {
    date: string[]
    setDate: (date: string[]) => void
}

export const DateFilter: FC<DateFilterProps> = ({ date, setDate }) => {
    const [startDate, setStartDate] = useState(date[0] || '')
    const [endDate, setEndDate] = useState(date[1] || '')

    const handleDateChange = (date: string, type: 'start' | 'end') => {
        if (type === 'start') {
            setStartDate(date)
            setDate([date, endDate])
        } else {
            setEndDate(date)
            setDate([startDate, date])
        }
    }

    return (
        <div className="flex flex-col gap-3 w-full">
            <Label label="Date de création (Début et fin)" htmlFor="start" />
            <div className="flex lg:flex-row flex-col items-center gap-3 w-full">
                <DatePicker
                    id="start"
                    onChange={(newDate) =>
                        handleDateChange(newDate.toLocaleDateString(), 'start')
                    }
                />
                <DatePicker
                    onChange={(newDate) =>
                        handleDateChange(newDate.toLocaleDateString(), 'end')
                    }
                />
            </div>
        </div>
    )
}
