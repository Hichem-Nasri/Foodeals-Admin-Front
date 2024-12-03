import { FC } from 'react'
import { DatePicker } from '../DatePicker'
import { Label } from '../Label'
import { UseFormReturn, Controller } from 'react-hook-form'

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
                                    console.log('newDate', newDate)
                                    console.log(
                                        "newDate.toISOString().split('T')[0]",
                                        newDate.toISOString().split('T')[0]
                                    )
                                    field.onChange(
                                        `${newDate.getFullYear()}-${
                                            newDate.getMonth() + 1
                                        }-${newDate
                                            .getDate()
                                            .toString()
                                            .padStart(2, '0')}`
                                    )
                                } else {
                                    field.onChange('')
                                }
                            }}
                            value={
                                !field.value ? undefined : new Date(field.value)
                            }
                            id="start"
                            disabled={disabled}
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
                                        `${newDate.getFullYear()}-${
                                            newDate.getMonth() + 1
                                        }-${newDate
                                            .getDate()
                                            .toString()
                                            .padStart(2, '0')}`
                                    )
                                } else {
                                    field.onChange('')
                                }
                            }}
                            value={
                                !field.value ? undefined : new Date(field.value)
                            }
                            disabled={disabled}
                        />
                    )}
                />
            </div>
        </div>
    )
}
