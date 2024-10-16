import { FC, useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { CustomButton } from '../custom/CustomButton'
import { ListFilter, Mail, PhoneCall, X, Check } from 'lucide-react'
import { PartnerSolutionType } from '@/types/partners'
import { DatePicker } from '../DatePicker'
import { Label } from '../Label'
import { MultiSelect, MultiSelectOptionsType } from '../MultiSelect'
import { Input } from '../custom/Input'
import { Select } from '../custom/Select'
import { DialogClose } from '@radix-ui/react-dialog'
import { useMediaQuery } from 'react-responsive'
import { cn } from '@/lib/utils'
import { PartnerStatusType } from '@/types/CrmType'
import {
    IconStatus,
    OptionStatus,
    StringStatus,
    StyleStatus,
} from '@/types/utils'
import { ColumnFiltersState, Row } from '@tanstack/react-table'
import { DateFilter } from '../utils/DateFilters'
import { FilterSelect } from '../utils/FilterSelect'
import { FilterMultiSelect } from '../utils/FilterMultiSelect'
import { FilterInput } from '../utils/FilterInput'
import { set } from 'date-fns'
import { FilterData, emptyFilterData } from '@/types/CrmUtils'
import {
    AddressType,
    CrmType,
    CustomFilterType,
    FilteredData,
    ProfileType,
} from '@/types/Global-Type'

interface FilterTableProspectsProps {
    data: CrmType[]
    table: import('@tanstack/table-core').Table<CrmType>
    columnFilters: ColumnFiltersState
    setColumnFilters: (value: ColumnFiltersState) => void
}

const setMultiSelectPerson = (value: ProfileType[]) => {
    return Array.from(
        new Set(
            value.map(
                (items) => items.name.firstName + ' ' + items.name.lastName
            )
        )
    ).map((items) => ({
        key: items,
        label: items,
        avatarPath: value.find(
            (item) => item.name.firstName + ' ' + item.name.lastName === items
        )?.avatarPath,
    }))
}

const setMultiSelect = (value: string[]) => {
    return Array.from(new Set(value)).map((items) => ({
        key: items,
        label: items,
    }))
}

const getDataFilter = (data: CrmType[]) => {
    const filterTable: CustomFilterType = {
        date: Array.from(new Set(data.map((items) => items.createdAt))),
        companyName: Array.from(
            new Set(data.map((items) => items.companyName))
        ),
        category: Array.from(new Set(data.map((items) => items.category))),
        creatorInfo: Array.from(
            new Set(
                data.map((item) =>
                    JSON.stringify({
                        name: {
                            firstName: item.creatorInfo.name.firstName,
                            lastName: item.creatorInfo.name.lastName,
                        },
                        avatarPath: item.creatorInfo.avatarPath,
                    })
                )
            )
        ).map((person) => JSON.parse(person)),
        managerInfo: Array.from(
            new Set(
                data.map((item) =>
                    JSON.stringify({
                        name: {
                            firstName: item.managerInfo.name.firstName,
                            lastName: item.managerInfo.name.lastName,
                        },
                        avatarPath: item.managerInfo.avatarPath,
                    })
                )
            )
        ).map((person) => JSON.parse(person)),
        status: Array.from(new Set(data.map((items) => items.status))),
        city: Array.from(new Set(data.map((items) => items.address.city))),
        country: Array.from(
            new Set(data.map((items) => items.address.country))
        ),
    }
    return filterTable
}

export const FilterTableProspects: FC<FilterTableProspectsProps> = ({
    data,
    table,
    columnFilters,
    setColumnFilters,
}) => {
    const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' })
    const [filterTable, setFilterTable] = useState<CustomFilterType>(
        getDataFilter(data)
    )
    console.log('data: ', filterTable)

    const [filterData, setFilterData] = useState<FilterData>(emptyFilterData)
    const handleConfirm = () => {
        const filterArray = Object.entries(filterData)
            .filter(
                ([key, value]) =>
                    value &&
                    (Array.isArray(value) ? value.length > 0 : value !== '')
            )
            .map(([key, value]) => {
                return {
                    id: key,
                    value: value,
                }
            })
        setColumnFilters(filterArray)
    }
    return (
        <Dialog>
            <DialogTrigger className="flex  items-center gap-3 lg:rounded-[12px] rounded-full lg:border border-lynch-200 border-0 text-lynch-500 font-medium text-sm p-4 lg:px-5 lg:py-3 hover:text-black hover:bg-neutral-100 my-4 lg:my-0 bg-white">
                <span className="lg:inline-flex hidden">Filtrer par</span>
                <ListFilter />
            </DialogTrigger>
            <DialogContent className="[&>.Icon]:hidden p-5 rounded-[14px] w-full max-w-[36.25rem] gap-[1.875rem] max-h-screen overflow-auto">
                <DialogTitle className="text-[1.375rem] font-normal text-lynch-400">
                    Filtrer par
                </DialogTitle>
                <div className="flex flex-col gap-y-2 gap-x-4">
                    <DateFilter
                        date={filterData.date}
                        setDate={(date) =>
                            setFilterData({ ...filterData, date })
                        }
                    />
                    <div className="flex lg:flex-row flex-col gap-3 w-full">
                        <FilterMultiSelect
                            item={filterData.companyName}
                            setItem={(item) =>
                                setFilterData({
                                    ...filterData,
                                    companyName: item,
                                })
                            }
                            options={setMultiSelect(filterTable.companyName)}
                            label="Raison sociale"
                            emptyAvatar="/avatar/emptyUser.png"
                            // normalTransform={true}
                        />
                        <FilterMultiSelect
                            item={filterData.category}
                            setItem={(item) =>
                                setFilterData({ ...filterData, category: item })
                            }
                            options={setMultiSelect(filterTable.category)}
                            label="Categorie"
                            // normalTransform={true}
                            emptyAvatar="/avatar/emptyPartner.png"
                        />
                    </div>
                    <div className="flex lg:flex-row flex-col gap-3 w-full text-sm">
                        <FilterSelect
                            placeholder=""
                            item={filterData.creatorInfo}
                            setItem={(creatorInfo) =>
                                setFilterData({ ...filterData, creatorInfo })
                            }
                            options={setMultiSelectPerson(
                                filterTable.creatorInfo || []
                            )}
                            label="Alimente par"
                        />
                        <FilterSelect
                            item={filterData.managerInfo}
                            setItem={(managerInfo) =>
                                setFilterData({ ...filterData, managerInfo })
                            }
                            options={setMultiSelectPerson(
                                filterTable.managerInfo || []
                            )}
                            label="Effectuée à"
                        />
                    </div>
                    <div className="flex lg:flex-row flex-col gap-3 w-full">
                        <FilterInput
                            input={filterData.email}
                            setInput={(email) =>
                                setFilterData({ ...filterData, email })
                            }
                            label="Email"
                            LeftIcon={Mail}
                        />
                        <FilterInput
                            input={filterData.phone}
                            setInput={(phone) =>
                                setFilterData({ ...filterData, phone })
                            }
                            label="Téléphone"
                            placeholder="Saisir le téléphone"
                            LeftIcon={PhoneCall}
                        />
                    </div>
                    <div className="flex lg:flex-row flex-col gap-3 w-full">
                        <FilterMultiSelect
                            length={2}
                            item={filterData.city}
                            setItem={(city) =>
                                setFilterData({ ...filterData, city })
                            }
                            options={filterTable.city?.map((city: string) => ({
                                label: city,
                                key: city,
                            }))}
                            label="Ville"
                            placeholder="Sélectionner la ville"
                            normalTransform={true}
                        />
                        <FilterMultiSelect
                            length={2}
                            item={filterData.country}
                            setItem={(country) =>
                                setFilterData({ ...filterData, country })
                            }
                            options={
                                filterTable.country?.map((country: string) => {
                                    return {
                                        label: country,
                                        key: country,
                                    }
                                }) || []
                            }
                            label="Pays"
                            placeholder="Sélectionner le pays"
                            normalTransform={true}
                        />
                    </div>
                    <div className="flex lg:flex-row flex-col gap-3 w-full">
                        <FilterMultiSelect
                            item={filterData.status}
                            setItem={(status) =>
                                setFilterData({ ...filterData, status })
                            }
                            options={
                                filterTable.status?.map((status: string) => {
                                    const str = StringStatus[status]
                                    return {
                                        label: str,
                                        key: status as string,
                                        icon: IconStatus[status],
                                        className: StyleStatus[status],
                                    } as MultiSelectOptionsType
                                }) || []
                            }
                            label="Status"
                            length={2}
                            transform={(value: MultiSelectOptionsType[]) => {
                                return value.map((option, index) => (
                                    <div
                                        key={index}
                                        className={cn(
                                            'text-xs w-full p-1 max-w-28 flex justify-around items-center rounded-full whitespace-nowrap text-ellipsis',
                                            option.className
                                        )}
                                    >
                                        {option.icon && <option.icon />}
                                        <span>{option.label}</span>
                                    </div>
                                ))
                            }}
                        />
                    </div>
                </div>

                <DialogDescription className="flex lg:flex-row flex-col justify-end gap-[0.625rem]">
                    <DialogClose className="lg:w-fit w-full">
                        <CustomButton
                            variant="secondary"
                            label="Annuler"
                            onClick={() => {}}
                            className="px-5 py-3 h-fit lg:w-fit w-full"
                            IconRight={X}
                            type="submit"
                        />
                    </DialogClose>
                    <DialogClose className="lg:w-fit w-full">
                        <CustomButton
                            label="Confirmer"
                            onClick={handleConfirm}
                            className="px-5 py-3 h-fit lg:w-fit w-full"
                            IconRight={Check}
                            type="submit"
                        />
                    </DialogClose>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}

///** DateFilter */
//** */

//** */

//** */

//** RegionFilter */

interface RegionFilterProps {
    region: string[]
    setRegion: (region: string[]) => void
    options: MultiSelectOptionsType[]
}

const RegionFilter: FC<RegionFilterProps> = ({
    region,
    setRegion,
    options,
}) => {
    const [selectedRegion, setSelectedRegion] = useState(region)

    const handleRegionChange = (region: string[]) => {
        setSelectedRegion(region)
        setRegion(region)
    }

    return (
        <div className="flex flex-col gap-3 w-full">
            <Label label="Region" htmlFor="region" />
            <MultiSelect
                length={2}
                placeholder="Sélectionner la région"
                normalTransform={true}
                onSelect={handleRegionChange}
                options={options}
                selectedValues={selectedRegion}
            />
        </div>
    )
}

//** */

//** CompanyFilter */

interface CompanyFilterProps {
    companyName: string[]
    setCompanyName: (companyName: string[]) => void
    options: MultiSelectOptionsType[]
}

const CompanyFilter: FC<CompanyFilterProps> = ({
    companyName,
    setCompanyName,
    options,
}) => {
    const [selectedCompanies, setSelectedCompanies] = useState(companyName)

    const handleCompanyChange = (companies: string[]) => {
        setSelectedCompanies(companies)
        setCompanyName(companies)
    }

    return (
        <div className="flex flex-col gap-3 w-full">
            <Label label="Raison sociale" htmlFor="raisonSociale" />
            <MultiSelect
                length={2}
                normalTransform={true}
                placeholder="Sélectionner la raison sociale"
                onSelect={handleCompanyChange}
                options={options}
                selectedValues={selectedCompanies}
            />
        </div>
    )
}

//** CategoryFilter */

interface CategoryFilterProps {
    options: MultiSelectOptionsType[]
    categories: string[]
    setCategories: (categories: string[]) => void
}

const CategoryFilter: FC<CategoryFilterProps> = ({
    categories,
    setCategories,
    options,
}) => {
    const [selectedCategories, setSelectedCategories] = useState(categories)

    const handleCategoryChange = (category: string[]) => {
        setSelectedCategories(category)
        setCategories(category)
    }

    return (
        <div className="flex flex-col gap-3 w-full">
            <Label label="categorie" htmlFor="categorie" />
            <MultiSelect
                length={2}
                normalTransform={true}
                placeholder="Sélectionner la catégorie"
                onSelect={handleCategoryChange}
                options={options}
                selectedValues={selectedCategories}
            />
        </div>
    )
}

//** CityFilter */

interface CityFilterProps {
    city: string[]
    setCity: (city: string[]) => void
    options: MultiSelectOptionsType[]
}

const CityFilter: FC<CityFilterProps> = ({ city, setCity, options }) => {
    const [selectedCity, setSelectedCity] = useState(city)

    const handleCityChange = (city: string[]) => {
        setSelectedCity(city)
        setCity(city)
    }

    return (
        <div className="flex flex-col gap-3 w-full">
            <Label label="ville" htmlFor="ville" />
            <MultiSelect
                length={2}
                normalTransform={true}
                placeholder="Sélectionner la ville"
                onSelect={handleCityChange}
                options={options}
                selectedValues={selectedCity}
            />
        </div>
    )
}

//** CreatorFilter */

interface CreatorFilterProps {
    creatorInfo: string
    setCreatorInfo: (creatorInfo: string) => void
    options: MultiSelectOptionsType[]
}

const CreatorFilter: FC<CreatorFilterProps> = ({
    creatorInfo,
    setCreatorInfo,
    options,
}) => {
    return (
        <div className="flex flex-col gap-2 w-full">
            <Label label="Alimente par" htmlFor="Alimente par" />
            <Select
                label=""
                placeholder="Alimente par"
                onChange={setCreatorInfo}
                options={options}
                value={creatorInfo}
            />
        </div>
    )
}

//** ManagerFilter */

interface ManagerFilterProps {
    managerInfo: string
    setManagerInfo: (managerInfo: string) => void
    options: MultiSelectOptionsType[]
}

const ManagerFilter: FC<ManagerFilterProps> = ({
    managerInfo,
    setManagerInfo,
    options,
}) => {
    return (
        <div className="flex flex-col gap-2 w-full">
            <Label label="Effectuée à" htmlFor="Effectuée à" />
            <Select
                label=""
                placeholder="Effectuée à"
                onChange={setManagerInfo}
                options={options}
                value={managerInfo}
            />
        </div>
    )
}

//** EmailFilter */

interface EmailFilterProps {
    email: string
    setEmail: (email: string) => void
}

const EmailFilter: FC<EmailFilterProps> = ({ email, setEmail }) => {
    return (
        <div className="flex flex-col gap-3 w-full">
            <Label label="Email" htmlFor="email" />
            <Input
                name="email"
                onChange={(e: string | number) => {
                    setEmail(e + '')
                }}
                placeholder="Email"
                value={email}
                IconLeft={Mail}
            />
        </div>
    )
}

//** PhoneFilter */

//** StatusFilter */

interface StatusFilterProps {
    status: string[]
    setStatus: (status: string[]) => void
    options: MultiSelectOptionsType[]
    isLargeScreen: boolean
}

const StatusFilter: FC<StatusFilterProps> = ({
    status,
    setStatus,
    options,
    isLargeScreen,
}) => {
    const [selectedStatus, setSelectedStatus] = useState(status)

    const handleStatusChange = (status: string[]) => {
        setSelectedStatus(status)
        setStatus(status)
    }

    return (
        <div className="flex flex-col gap-3 w-full justify-between">
            <Label label="status" htmlFor="status" />
            <MultiSelect
                options={options}
                placeholder="Sélectionner le status"
                onSelect={handleStatusChange}
                selectedValues={selectedStatus}
                type="status"
            />
        </div>
    )
}

//** */
