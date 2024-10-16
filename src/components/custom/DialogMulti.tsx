import React, { FC, Fragment, useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '../ui/command'
import { ChevronDown, ListPlus, X, Map, MapPin } from 'lucide-react'
import { Switch } from '../ui/switch'
import { cn } from '@/lib/utils'
import { MultiSelect, MultiSelectOptionsType } from '../MultiSelect'
import { valuesGetting } from '@/types/DeliveriesUtils'

interface DialogMultiProps {
    setValue: React.Dispatch<React.SetStateAction<string>>
    onChange: React.Dispatch<React.SetStateAction<string[]>>
    value: string
    transform?: ((value: MultiSelectOptionsType[]) => Element[]) | undefined
    disabled?: boolean
    placeholder?: string
}

const getMultiSelectOption = (option: string) => {
    return {
        key: option,
        label: option,
    }
}

const dataToMultiOptions = (selectedCity: string[], data: any) => {
    const Options: MultiSelectOptionsType[] = []
    Object.keys(data)
        .filter((city) => selectedCity?.includes(city))
        .map((city) =>
            data[city].map((region: string) => {
                Options.push(getMultiSelectOption(city + '-' + region))
            })
        )
    return Options
}

const DialogMulti: FC<DialogMultiProps> = ({
    setValue,
    onChange,
    value,
    transform,
    placeholder,
    disabled = false,
}) => {
    const data: Record<string, string[]> = {
        CaseBlanca: [
            'ain diab',
            'anfa',
            'bouskoura',
            'bouskoura golf city',
            'californie',
            'casablanca',
            'centre ville',
            'dar bouazza',
            'gauthier',
            'hay hassani',
            'hay riad',
            'maarif',
            'mohammedia',
            'ouled saleh',
        ],
        rabat: [
            'agdal',
            'ain aouda',
            'ain el aouda',
            'akreuch',
            'al irfane',
            'al manal',
        ],
        fes: [
            'agdal',
            'ain aouda',
            'ain el aouda',
            'akreuch',
            'al irfane',
            'al manal',
        ],
    }
    const [selectedCity, setSelectedCity] = useState<string[] | null>(null)
    const [selectedRegion, setSelectedRegion] = useState<string[]>([])
    const [options, setOptions] = useState<MultiSelectOptionsType[]>([])
    const [open, setOpen] = useState(false)
    useEffect(() => {
        const newOptions = dataToMultiOptions(selectedCity!, data)
        setOptions(newOptions)
    }, [selectedCity, data])
    return (
        <Popover>
            <PopoverTrigger
                className={`text-lynch-400 hover:text-lynch-700 border-0 h-14 rounded-[12px] w-full bg-lynch-50 px-3 flex justify-between items-center [&>icon]:text-lynch-200 hover:[&>icon]:text-lynch-500 ${
                    // options?.find((option) => option.key == value)?.label
                    value ? 'border-textGray' : ''
                } `}
            >
                {selectedRegion.length > 1 ? (
                    <span className="text-base text-start font-normal line-clamp-1 ">
                        {selectedRegion.length > 1 ? (
                            <Fragment>
                                <Dialog open={open} onOpenChange={setOpen}>
                                    <DialogTrigger className="text-lynch-500 hover:text-lynch-700">
                                        Plusieurs ville
                                    </DialogTrigger>
                                    <DialogContent
                                        showContent={false}
                                        className="left-[calc(100%-250px)] min-h-screen min-w-[500px] flex flex-col justify-start"
                                    >
                                        <div className="min-h-full flex flex-col justify-center items-start px-5 py-3 w-full space-y-6">
                                            <div className="flex justify-between items-center w-full text-xl font-normal text-lynch-400">
                                                <h4>List des Zones couverts</h4>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setOpen((prev) => !prev)
                                                    }
                                                >
                                                    <X className="size-8" />
                                                </button>
                                            </div>
                                            <div className="flex flex-col justify-center items-start space-y-6">
                                                {valuesGetting(
                                                    selectedRegion!
                                                ).map((city, index) => {
                                                    return (
                                                        <div
                                                            key={
                                                                city.name +
                                                                index
                                                            }
                                                            className="self-start flex flex-col justify-center items-start space-y-4"
                                                        >
                                                            <h5 className="text-lynch-950 flex justify-center space-x-2">
                                                                <Map className="text-lynch-700" />
                                                                <span>
                                                                    {city.name}
                                                                </span>
                                                            </h5>
                                                            <div className="flex flex-wrap space-y-2 justify-start items-center gap-2 text-lynch-400">
                                                                {city.location.map(
                                                                    (
                                                                        region,
                                                                        index
                                                                    ) => {
                                                                        return (
                                                                            <div
                                                                                key={
                                                                                    region +
                                                                                    index
                                                                                }
                                                                                className=" self-end flex-grow-0 justify-center px-5 py-3 flex items-start space-x-2 bg-lynch-100 rounded-[12px] text-nowrap"
                                                                            >
                                                                                <MapPin />
                                                                                <span>
                                                                                    {region.trim()}
                                                                                </span>
                                                                            </div>
                                                                        )
                                                                    }
                                                                )}
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </Fragment>
                        ) : value ? (
                            value
                        ) : (
                            'Selectionne la zone'
                        )}
                    </span>
                ) : (
                    <div
                        className={`text-base text-start font-normal line-clamp-1  flex items-center`}
                    >
                        {(selectedRegion.length > 0 &&
                            selectedRegion[0].split('-').slice(1).join(' ')) ||
                            placeholder}
                    </div>
                )}
                {selectedRegion.length > 1 ? (
                    <ListPlus className="icon" />
                ) : (
                    <ChevronDown className="icon" />
                )}
            </PopoverTrigger>
            <PopoverContent className="rounded-[16px]  p-3">
                <Command className="flex flex-col  space-y-2 p-0">
                    <h3 className="text-sm font-base text-start">
                        Sélectionner la zone Couverte
                    </h3>
                    <CommandInput
                        className="bg-lynch-50 placeholder:text-base placeholder:font-normal text-base font-normal placeholder:text-input text-textGray w-[80%] rounded-[12px] mt-2"
                        placeholder={'ville...'}
                    />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="">
                            <MultiSelect
                                transform={(value) => {
                                    if (value.length > 1)
                                        return [<div key={1}>Multi</div>]
                                    return value.map((item, index) => {
                                        return (
                                            <div
                                                key={
                                                    item.key.toString() + index
                                                }
                                            >
                                                {item.label
                                                    .split('-')
                                                    .slice(1)
                                                    .join(' ')}
                                            </div>
                                        )
                                    })
                                }}
                                length={1}
                                region={true}
                                options={options}
                                disabled={options.length === 0 || disabled}
                                selectedValues={selectedRegion}
                                onSelect={(value: string[]) => {
                                    setSelectedRegion(value)
                                    onChange(value)
                                }}
                                placeholder={'Selectionne la zone'}
                            />
                        </CommandGroup>
                        <CommandGroup
                            heading="Résultat de la zone ou région"
                            className="text-sm font-base text-lynch-500 mt-4"
                        >
                            {/* list of city using switch ui*/}
                            {Object.keys(data).map((city) => (
                                <CommandItem key={city}>
                                    <div
                                        className={cn(
                                            'flex items-center space-x-2 h-12 justify-between px-2 w-full',
                                            `${
                                                selectedCity?.includes(city) &&
                                                'bg-lynch-50 rounded-[12px] w-full'
                                            }`
                                        )}
                                    >
                                        <div>{city}</div>
                                        <Switch
                                            checked={selectedCity?.includes(
                                                city
                                            )}
                                            className="h-5"
                                            id={city}
                                            onCheckedChange={() => {
                                                setSelectedCity((prev) => {
                                                    if (prev?.includes(city)) {
                                                        return prev?.filter(
                                                            (item) =>
                                                                item !== city
                                                        )
                                                    }
                                                    return [
                                                        ...(prev || []),
                                                        city,
                                                    ]
                                                })
                                            }}
                                        />
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default DialogMulti
