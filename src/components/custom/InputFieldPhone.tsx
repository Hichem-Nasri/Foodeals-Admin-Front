import { Control } from 'react-hook-form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from '@/components/ui/select'
import { cn, countryCodes } from '@/lib/utils'
import { FormField, FormMessage } from '../ui/form'
import { Input } from './Input'
import { LucideProps, PhoneCall } from 'lucide-react'
import { Label } from '../Label'
import { TypeOf } from 'zod'
import { FC, ForwardRefExoticComponent, RefAttributes } from 'react'
import { Icon } from 'next/dist/lib/metadata/types/metadata-types'
import Image from 'next/image'

interface InputPhoneFieldProps {
    control: Control<any>
    placeholder: string
    name: string
    className?: string
    countryCode: string
    onChangeCountryCode: (value: string) => void
    label: string
    disabled?: boolean
    IconLeft?: ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
    >
    IconRight?: ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
    >
    styleIcon?: string
}

export const InputPhoneField: React.FC<InputPhoneFieldProps> = ({
    control,
    placeholder,
    name,
    className,
    countryCode,
    label,
    disabled,
    onChangeCountryCode,
    IconRight,
    IconLeft,
    styleIcon,
}): JSX.Element => {
    const selectedCountry = countryCodes.find(
        (option) => option.value === countryCode
    )
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {
                // const countryCode = countryCodes.filter((option) => {
                //     if (option && field.value)
                //         field.value.includes(option.value)
                //     return false
                // })[0]?.value
                // console.log('countryCode', countryCode)

                return (
                    <div className="flex flex-col items-start gap-3 w-full text-lynch-400">
                        <Label
                            htmlFor={name}
                            className="text-sm font-semibold text-lynch-950"
                            label={label}
                        />
                        <div className={cn('flex flex-col w-full', className)}>
                            <div className="flex items-center gap-[0.375rem] w-full">
                                <Select
                                    value={countryCode}
                                    onValueChange={onChangeCountryCode}
                                    disabled={disabled}
                                >
                                    <SelectTrigger className="rounded-[12px] border-0 font-light text-base flex gap-[0.625rem] w-fit min-w-[8rem]">
                                        {selectedCountry && (
                                            <img
                                                src={selectedCountry.flag!}
                                                alt={selectedCountry.value}
                                                width={20}
                                                height={10}
                                            />
                                        )}
                                        <span>{countryCode}</span>
                                    </SelectTrigger>
                                    <SelectContent className="text-normal w-full">
                                        {countryCodes.map((option) => (
                                            <SelectItem
                                                key={option.value}
                                                value={option.value}
                                                className="cursor-pointer flex gap-[0.625rem] w-full items-center justify-evenly"
                                            >
                                                <img
                                                    src={option.flag!}
                                                    alt={option.value}
                                                    width={20}
                                                    height={10}
                                                />
                                                <span className="ml-2">
                                                    {option.value}
                                                </span>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Input
                                    {...field}
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="w-full flex-1"
                                    placeholder={placeholder}
                                    IconRight={IconRight}
                                    IconLeft={PhoneCall}
                                    disabled={disabled}
                                />
                            </div>
                            <FormMessage />
                        </div>
                    </div>
                )
            }}
        />
    )
}
