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
import { getAllCities, getRegions } from '@/lib/api/fetchAddress'

interface DialogMultiProps {
    setValue: React.Dispatch<React.SetStateAction<string>>
    onChange: React.Dispatch<React.SetStateAction<string[]>>
    value: string[]
    transform?: ((value: MultiSelectOptionsType[]) => Element[]) | undefined
    disabled?: boolean
    placeholder?: string
}

type ZoneType = {
    name: string
    location: string[]
}

const getMultiSelectOption = (option: string) => {
    return {
        key: option,
        label: option,
    }
}

const DialogMulti: FC<DialogMultiProps> = ({
    setValue,
    onChange,
    value,
    transform,
    placeholder,
    disabled = false,
}) => {
    console.log(value)
    // const data: Record<string, string[]> = {
    //     CaseBlanca: [
    //         'ain diab',
    //         'anfa',
    //         'bouskoura',
    //         'bouskoura golf city',
    //         'californie',
    //         'casablanca',
    //         'centre ville',
    //         'dar bouazza',
    //         'gauthier',
    //         'hay hassani',
    //         'hay riad',
    //         'maarif',
    //         'mohammedia',
    //         'ouled saleh',
    //     ],
    //     rabat: [
    //         'agdal',
    //         'ain aouda',
    //         'ain el aouda',
    //         'akreuch',
    //         'al irfane',
    //         'al manal',
    //     ],
    //     fes: [
    //         'agdal',
    //         'ain aouda',
    //         'ain el aouda',
    //         'akreuch',
    //         'al irfane',
    //         'al manal',
    //     ],
    // }
    const [myData, setData] = useState<ZoneType[]>([])
    useEffect(() => {
        const fetchCities = async () => {
            const cities = await getAllCities()
            const allregion: ZoneType[] = cities.map(
                async (value: MultiSelectOptionsType) => {
                    const regions = await getRegions(value.id!)
                    return {
                        name: value.label,
                        location: regions.map(
                            (region: MultiSelectOptionsType) => region.label
                        ),
                    }
                }
            )
            const data = await Promise.all(allregion)
            console.log('region Data: ', data)
            setData(data)
        }
        fetchCities()
    }, [])
    const [selectedCity, setSelectedCity] = useState<string[] | null>(() => {
        if (!value) return null
        return value.map((item) => item.split('-')[0])
    })
    const [selectedRegion, setSelectedRegion] = useState<string[]>(value)
    const [options, setOptions] = useState<MultiSelectOptionsType[]>([])
    const [open, setOpen] = useState(false)
    useEffect(() => {
        if (!selectedCity) return
        const newOptions = myData
            .filter((value) => selectedCity.includes(value.name))
            .flatMap((city) =>
                city.location.map((region) => ({
                    key: city.name + '-' + region,
                    label: region,
                }))
            )
        setOptions(newOptions)
    }, [selectedCity])
    useEffect(() => {
        console.log('region: ', options)
    }, [options])
    return (
        <Popover>
            <PopoverTrigger
                className={`text-lynch-400 hover:text-lynch-700 border-0 h-14 rounded-[12px] w-full bg-lynch-50 px-3 flex justify-between items-center [&>icon]:text-lynch-200 hover:[&>icon]:text-lynch-500 ${
                    // options?.find((option) => option.key == value)?.label
                    value ? 'border-textGray' : ''
                } `}
                disabled={disabled}
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
                                                {item.label}
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
                            {myData.map((city, index) => (
                                <CommandItem key={index}>
                                    <div
                                        className={cn(
                                            'flex items-center space-x-2 h-12 justify-between px-2 w-full',
                                            `${
                                                selectedCity?.includes(
                                                    city.name
                                                ) &&
                                                'bg-lynch-50 rounded-[12px] w-full'
                                            }`
                                        )}
                                    >
                                        <div>{city.name}</div>
                                        <Switch
                                            checked={selectedCity?.includes(
                                                city.name
                                            )}
                                            className="h-5"
                                            id={city.name}
                                            onCheckedChange={() => {
                                                setSelectedCity((prev) => {
                                                    if (
                                                        prev?.includes(
                                                            city.name
                                                        )
                                                    ) {
                                                        return prev?.filter(
                                                            (item) =>
                                                                item !==
                                                                city.name
                                                        )
                                                    }
                                                    return [
                                                        ...(prev || []),
                                                        city.name,
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
