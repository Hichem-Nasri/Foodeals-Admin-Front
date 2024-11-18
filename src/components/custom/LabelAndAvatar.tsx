import { cn } from '@/lib/utils'
import { LucideProps } from 'lucide-react'
import { ForwardRefExoticComponent, RefAttributes, FC } from 'react'
import { Input, Input as ShadCnInput } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { AvatarAndName } from '../AvatarAndName'
import { Label } from '../Label'

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
    avatar?: string
}

export const LabelAndAvatar: FC<InputProps> = ({
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
    avatar,
}) => {
    return (
        <div
            className={`flex flex-col items-start gap-3 w-full text-lynch-500 ${
                label == 'Adresse' && 'col-span-2'
            }`}
        >
            {label && (
                <Label
                    label={label}
                    className="text-sm font-semibold text-lynch-950"
                />
            )}
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
                {avatar ? (
                    <AvatarAndName
                        name={value + ''}
                        avatar={avatar}
                        className={cn(
                            'text-base font-normal h-14 flex items-center bg-lynch-50 rounded-[14px] px-4 w-full',
                            className,
                            IconLeft && 'ps-12'
                        )}
                    />
                ) : (
                    <Input
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
                )}
                {IconRight && (
                    <IconRight
                        onClick={handleShowPassword}
                        className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2"
                    />
                )}
            </div>
        </div>
    )
}
