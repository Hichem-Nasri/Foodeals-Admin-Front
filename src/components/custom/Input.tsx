'use client'
import { cn } from '@/lib/utils'
import { Eye, EyeOff, LucideProps } from 'lucide-react'
import { ForwardRefExoticComponent, RefAttributes, FC, useState } from 'react'
import { Label } from '../ui/label'
import { Input as ShadCnInput } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Skeleton } from '../ui/skeleton'

interface InputProps {
    onChange: (value: string | number) => void
    value: string | number | undefined
    placeholder?: string
    type?: 'number' | 'text' | 'email' | 'password' | 'file' | 'textarea'
    name: string
    className?: string
    IconLeft?: ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
    >
    IconRight?: ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
    >
    onClickRight?: () => void
    disabled?: boolean
    label?: string
    iconLeftColor?: string
    onBlur?: () => void
    isLoaded?: boolean
}

export const Input: FC<InputProps> = ({
    name,
    placeholder,
    type = 'text',
    className,
    IconRight = null,
    IconLeft = null,
    disabled = false,
    onClickRight: handleShowPassword = () => {},
    onChange,
    value,
    label,
    iconLeftColor,
    onBlur,
    isLoaded = false,
}) => {
    const [password, setPassword] = useState(false)
    return (
        <div className="flex flex-col items-start gap-3 w-full text-lynch-400">
            {isLoaded ? (
                <Skeleton className="w-full h-10 rounded-[8px]" />
            ) : (
                <>
                    {label && (
                        <Label
                            htmlFor={name}
                            className="text-sm font-semibold text-lynch-950"
                        >
                            {label}
                        </Label>
                    )}
                </>
            )}
            {isLoaded ? (
                <Skeleton className="w-full h-10 rounded-[8px]" />
            ) : (
                <div
                    className={`relative w-full  ${
                        !value || value != ''
                            ? '[&>svg]:text-description'
                            : '[&>svg]:text-label-grayLight'
                    }`}
                >
                    {IconLeft && (
                        <IconLeft
                            className={cn(
                                'cursor-pointer absolute left-3 top-1/2 -translate-y-1/2 text-primary ',
                                iconLeftColor
                            )}
                        />
                    )}
                    <ShadCnInput
                        type={password && type == 'password' ? 'text' : type}
                        disabled={disabled}
                        onChange={(e) =>
                            (type === 'number' && onChange(+e.target.value)) ||
                            onChange(e.target.value)
                        }
                        value={
                            type === 'number' && value === 0 ? undefined : value
                        }
                        placeholder={placeholder}
                        className={cn(
                            'text-base font-normal',
                            className,
                            IconLeft && 'ps-12'
                        )}
                        onBlur={onBlur}
                    />
                    {IconRight && (
                        <IconRight
                            onClick={handleShowPassword}
                            className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2"
                        />
                    )}
                    {type === 'password' && (
                        <button
                            type="button"
                            className="absolute flex items-center justify-center right-0 top-1/2 -translate-y-1/2 h-full w-12"
                            onClick={() => {
                                setPassword((prev) => !prev)
                            }}
                        >
                            {!password ? <EyeOff /> : <Eye />}
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}
