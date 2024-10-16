import { FC } from 'react'
import {
    Select as SelectShadCn,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from '@/components/ui/select'
import { Label } from '../Label'
// import { Avatar } from '@radix-ui/react-avatar'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { AvatarAndName } from '../AvatarAndName'
import { AvatarImage, Image } from '@radix-ui/react-avatar'

interface SelectProps {
    onChange: (value: string) => void
    transform?: (value: string | number) => JSX.Element
    value: string
    options?: {
        key: string | number
        label: string
        avatar?: string
    }[]
    placeholder?: string
    disabled?: boolean
    label: string
}

export const Select: FC<SelectProps> = ({
    options,
    onChange,
    transform,
    value,
    disabled = false,
    placeholder,
    label,
}) => {
    const avatar = options?.find((option) => option.key == value)?.avatar
    return (
        <div className="flex flex-col items-start gap-3 w-full text-lynch-400">
            <Label
                label={label}
                className="text-sm font-semibold text-lynch-950"
            />
            <SelectShadCn
                disabled={(options && options.length === 0) || disabled}
                value={value}
                onValueChange={onChange}
            >
                <SelectTrigger
                    className={`text-lynch-400 hover:text-lynch-700 border-0 ${
                        options?.find((option) => option.key == value)?.label
                            ? 'border-textGray'
                            : ''
                    } `}
                >
                    {!value || value === '' ? (
                        <span className="text-base text-start font-normal line-clamp-1">
                            {placeholder}
                        </span>
                    ) : transform ? (
                        transform(
                            options && options.length > 0
                                ? options?.find(
                                      (option) => option.key == value
                                  )!.label
                                : value
                        )
                    ) : (
                        <div
                            className={`text-base text-start font-normal line-clamp-1 text-lynch-950 flex items-center ${
                                avatar ? ' justify-start gap-2' : ''
                            }`}
                        >
                            {avatar && (
                                <Avatar>
                                    <AvatarImage
                                        className="avatar"
                                        src={avatar}
                                        alt={
                                            options?.find(
                                                (option) => option.key == value
                                            )?.label
                                        }
                                    />
                                    <AvatarFallback>
                                        {
                                            options?.find(
                                                (option) => option.key == value
                                            )?.label
                                        }
                                    </AvatarFallback>
                                </Avatar>
                            )}
                            {
                                options?.find((option) => option.key == value)
                                    ?.label
                            }
                        </div>
                    )}
                </SelectTrigger>
                <SelectContent>
                    {options?.map((option) => (
                        <SelectItem
                            key={option.key}
                            value={option.key.toString()}
                            defaultChecked={option.key == value}
                            className="cursor-pointer"
                            onChange={() => console.log("I'm clicked")}
                        >
                            {option.avatar ? (
                                <AvatarAndName
                                    avatar={option.avatar}
                                    name={option.label}
                                />
                            ) : (
                                <>{option.label}</>
                            )}
                        </SelectItem>
                    ))}
                </SelectContent>
            </SelectShadCn>
        </div>
    )
}
