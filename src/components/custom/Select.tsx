import { FC } from 'react'
import {
    Select as SelectShadCn,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from '@/components/ui/select'
import { Label } from '../Label'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { AvatarAndName } from '../AvatarAndName'
import { AvatarImage } from '@radix-ui/react-avatar'
import { MultiSelectOptionsType } from '../MultiSelect'
import { Input } from './Input'
import { Search, SearchCheck } from 'lucide-react'

interface SelectProps {
    onChange: (value: string) => void
    transform?: (value: string | number) => JSX.Element
    value: string
    options?: MultiSelectOptionsType[]
    placeholder?: string
    disabled?: boolean
    label: string
    search?: boolean
    onChangeSearch?: (value: string) => void
    inputRef?: React.RefObject<HTMLInputElement>
}

export const Select: FC<SelectProps> = ({
    options,
    onChange,
    transform,
    value,
    disabled = false,
    placeholder,
    label,
    search,
    onChangeSearch,
    inputRef,
}) => {
    const avatar = options?.find((option) => option.key === value)?.avatar

    return (
        <div className="flex flex-col items-start gap-3 w-full text-lynch-400">
            <Label
                label={label}
                className="text-sm font-semibold text-lynch-950"
            />
            <SelectShadCn
                disabled={(options && options.length === 0) || disabled}
                value={value}
                onValueChange={(value) => {
                    console.log('value', value)
                    onChange(value)
                }}
            >
                <SelectTrigger
                    className={`text-lynch-400 hover:text-lynch-700 border-0 ${
                        options?.find((option) => option.key === value)?.label
                            ? 'border-textGray'
                            : ''
                    } `}
                >
                    {!value ? (
                        <span className="text-base text-start font-normal line-clamp-1">
                            {placeholder}
                        </span>
                    ) : transform ? (
                        transform(
                            options && options.length > 0
                                ? options?.find(
                                      (option) => option.key === value
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
                                                (option) =>
                                                    option.key.toString() ===
                                                    value.toString()
                                            )?.label
                                        }
                                    />
                                    <AvatarFallback>
                                        {
                                            options?.find(
                                                (option) =>
                                                    option.key.toString() ===
                                                    value.toString()
                                            )?.label
                                        }
                                    </AvatarFallback>
                                </Avatar>
                            )}
                            {options?.length
                                ? options?.find(
                                      (option) =>
                                          option.key.toString() ===
                                          value.toString()
                                  )?.label
                                : value}
                        </div>
                    )}
                </SelectTrigger>
                <SelectContent className="absolute z-10">
                    {' '}
                    {/* Added absolute positioning */}
                    {search && (
                        <div className="py-2 space-x-2 px-1 flex justify-center items-center">
                            <Search className="w-5 h-5 text-lynch-400" />
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Rechercher"
                                className="w-full p-2 border-2 border-lynch-400 rounded-md focus:outline-none focus:border-lynch-700"
                                onChange={(e) => {
                                    e.preventDefault() // Prevent default behavior
                                    const target = e.target as HTMLInputElement
                                    onChangeSearch &&
                                        onChangeSearch(target.value + '')
                                }}
                                onFocus={(e) => e.preventDefault()} // Prevent default focus behavior
                            />
                        </div>
                    )}
                    {options?.map((option) => (
                        <SelectItem
                            key={option.key}
                            value={option.key.toString()}
                            defaultChecked={option.key === value}
                            className="cursor-pointer"
                            onClick={() => {
                                onChange(option.label.toString())
                            }}
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
