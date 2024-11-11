import { FC } from 'react'
import { DatePicker } from '../DatePicker'
import { Label } from '../Label'
import { UseFormReturn, Controller } from 'react-hook-form'
import { FilterCrmSchema } from '@/types/CrmScheme'
import { z } from 'zod'

interface DateFilterProps {
    form: UseFormReturn<any>
    disabled: boolean
}

export const DateFilter: FC<DateFilterProps> = ({ form, disabled }) => {
    const { control } = form

    return (
        <div className="flex flex-col gap-3 w-full">
            <Label label="Date de création (Début et fin)" htmlFor="start" />
            <div className="flex lg:flex-row flex-col items-center gap-3 w-full">
                <Controller
                    control={control}
                    name="startDate"
                    render={({ field }) => (
                        <DatePicker
                            onChange={(newDate) => {
                                if (newDate) {
                                    field.onChange(
                                        newDate.toISOString().split('T')[0]
                                    )
                                } else {
                                    field.onChange('')
                                }
                            }}
                            value={
                                !field.value ? undefined : new Date(field.value)
                            }
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="endDate"
                    render={({ field }) => (
                        <DatePicker
                            onChange={(newDate) => {
                                if (newDate) {
                                    field.onChange(
                                        newDate.toISOString().split('T')[0]
                                    )
                                } else {
                                    field.onChange('')
                                }
                            }}
                            value={
                                !field.value ? undefined : new Date(field.value)
                            }
                        />
                    )}
                />
            </div>
        </div>
    )
}
