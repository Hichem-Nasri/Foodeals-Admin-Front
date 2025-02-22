import { FC, ForwardRefExoticComponent, RefAttributes } from 'react'
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
import { LucideProps, Search, SearchCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Skeleton } from '../ui/skeleton'
import { Command, CommandGroup, CommandInput, CommandList } from '../ui/command'

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
    className?: string
    classNameParent?: string
    LeftIcon?: ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
    >
    RightIcon?: ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
    >
    emptyAvatar?: string
    isLoaded?: boolean
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
    className,
    inputRef,
    classNameParent,
    LeftIcon,
    RightIcon,
    emptyAvatar = '',
    isLoaded,
}) => {
    const avatar = options?.find(
        (option) => option.key?.toString() === value?.toString()
    )?.avatar
    return (
        <div
            className={cn(
                'flex flex-col items-start gap-3 w-full text-lynch-400',
                classNameParent
            )}
        >
            <Label
                label={label}
                className={cn(
                    'text-sm font-semibold text-lynch-950',
                    className
                )}
            />
            <SelectShadCn
                disabled={disabled}
                value={value}
                onValueChange={(value) => {
                    console.log('value', value)
                    onChange(value)
                }}
            >
                <>
                    {isLoaded ? (
                        <Skeleton className="w-full h-14 rounded-[14px]" />
                    ) : (
                        <SelectTrigger
                            className={`text-lynch-400 hover:text-lynch-700 border-0 z-30 w-full ${
                                options?.find((option) => option.key === value)
                                    ?.label
                                    ? 'border-textGray'
                                    : ''
                            } ${
                                (LeftIcon || RightIcon) && '[&>.icon]:hidden'
                            } `}
                        >
                            {LeftIcon && (
                                <LeftIcon
                                    size={20}
                                    className="text-lynch-400 ml-[0
                            5rem]"
                                />
                            )}
                            {!value || !value.toString().length ? (
                                <span className="text-base text-start font-normal line-clamp-1">
                                    {emptyAvatar && emptyAvatar.length ? (
                                        <AvatarAndName
                                            avatar={emptyAvatar}
                                            name={'Selectionner'}
                                        />
                                    ) : (
                                        <span>{placeholder}</span>
                                    )}
                                </span>
                            ) : transform ? (
                                transform(
                                    options && options.length > 0
                                        ? options?.find(
                                              (option) => option.key === value
                                          )!?.label
                                        : value
                                )
                            ) : (
                                <div
                                    className={`text-base text-start font-normal line-clamp-1 text-lynch-950 flex items-center ${
                                        avatar ? ' justify-start gap-2' : ''
                                    }`}
                                >
                                    {avatar ? (
                                        <AvatarAndName
                                            name={
                                                options?.find(
                                                    (option) =>
                                                        option.key?.toString() ===
                                                        value.toString()
                                                )?.label!
                                            }
                                            avatar={avatar}
                                        />
                                    ) : options?.length ? (
                                        options?.find(
                                            (option) =>
                                                option.key?.toString() ===
                                                value.toString()
                                        )?.label
                                    ) : (
                                        value
                                    )}
                                </div>
                            )}
                            {RightIcon && (
                                <RightIcon
                                    size={20}
                                    className="text-lynch-400"
                                />
                            )}
                        </SelectTrigger>
                    )}
                </>

                <SelectContent className={`z-50 py-2 px-1`}>
                    <Command className="flex flex-col gap-5 p-0 w-full">
                        {!disabled && search && (
                            <CommandInput
                                value={inputRef?.current?.value}
                                className="bg-lynch-50 placeholder:text-base placeholder:font-normal text-base font-normal placeholder:text-input text-textGray [&>.icon]:text-lynch-400 border-0 focus:border-0 focus:outline-none"
                                placeholder={'Rechercher'}
                                ref={inputRef}
                                onValueChange={(value) => {
                                    onChangeSearch && onChangeSearch(value + '')
                                }}
                            />
                        )}
                        <CommandList>
                            {options?.map((option, index) => (
                                <SelectItem
                                    key={option.key}
                                    value={option.key?.toString()}
                                    defaultChecked={option.key === value}
                                    className={`cursor-pointer`}
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
                                        <div className="flex items-center gap-2 p-2 hover:bg-lynch-10">
                                            {option.icon && (
                                                <option.icon size={20} />
                                            )}
                                            {option.label}
                                        </div>
                                    )}
                                </SelectItem>
                            ))}
                        </CommandList>
                    </Command>

                    {/* {search && (
                        <div className="py-2 space-x-2 px-1 flex justify-center items-center absolute m top-0 left-0 right-0">
                            <div className="w-full flex justify-start items-center  px-1 border-2 border-lynch-400 rounded-md focus:outline-none focus:border-lynch-700">
                                <Search className="w-5 h-5 text-lynch-400 sticky top-0 left-0 right-0" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="Rechercher"
                                    className="w-full p-2 focus-within:outline-none focus-within:border-0"
                                    onChange={(e) => {
                                        // e.preventDefault() // Prevent default behavior
                                        
                                    }}
                                    // onFocus={(e) => e.preventDefault()} // Prevent default focus behavior
                                />
                            </div>
                        </div>
                    )}
                    {options?.map((option, index) => (
                        <SelectItem
                            key={option.key}
                            value={option.key?.toString()}
                            defaultChecked={option.key === value}
                            className={`cursor-pointer ${
                                search && index == 0 && 'mt-11'
                            }`}
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
                                <div className="flex items-center gap-2 p-2 hover:bg-lynch-10">
                                    {option.icon && <option.icon size={20} />}
                                    {option.label}
                                </div>
                            )}
                        </SelectItem>
                    ))} */}
                </SelectContent>
            </SelectShadCn>
        </div>
    )
}
