import { FC, ForwardRefExoticComponent, RefAttributes } from 'react'

import { Control } from 'react-hook-form'
import { FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from './Input'
import { LucideProps } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InputFieldProps {
    label?: string
    name: string
    control: Control<any>
    type?: 'number' | 'text' | 'email' | 'password' | 'textarea'
    placeholder?: string
    className?: string
    disabled?: boolean
    IconLeft?: ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
    >
    IconRight?: ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
    >
    iconLeftColor?: string
    onClickIconRight?: () => void
    classNameParent?: string
}

export const InputFieldForm: FC<InputFieldProps> = ({
    label,
    name,
    control,
    IconLeft,
    IconRight,
    className,
    disabled,
    placeholder,
    type,
    iconLeftColor,
    classNameParent,
    onClickIconRight = () => {},
}) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {
                return (
                    <FormItem
                        className={cn(
                            'flex flex-col items-start w-full ',
                            classNameParent
                        )}
                    >
                        <div
                            className={`relative w-full  ${
                                field.value != ''
                                    ? '[&>svg]:text-description'
                                    : '[&>svg]:text-label-grayLight'
                            }`}
                        >
                            <Input
                                {...field}
                                type={type}
                                label={label}
                                disabled={disabled}
                                onBlur={field.onBlur}
                                onChange={(value) =>
                                    (type === 'number' &&
                                        field.onChange(+value)) ||
                                    field.onChange(value)
                                }
                                value={
                                    type === 'number' && field.value === ''
                                        ? undefined
                                        : field.value
                                }
                                placeholder={placeholder}
                                className={className}
                                IconLeft={IconLeft}
                                IconRight={IconRight}
                                iconLeftColor={iconLeftColor}
                                onClickRight={onClickIconRight}
                            />
                        </div>
                        <FormMessage />
                    </FormItem>
                )
            }}
        />
    )
}
