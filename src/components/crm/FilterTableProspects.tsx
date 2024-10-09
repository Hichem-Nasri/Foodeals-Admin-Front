import { FC, useState } from 'react'
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
import { CrmStatusType, CrmType } from '@/types/CrmType'
import { OptionStatus } from '@/types/utils'
import { ColumnFiltersState, Row } from '@tanstack/react-table'
import {
    setupFilterTable,
    emptyFilterData,
    FilterData,
    FilterClass,
} from '@/types/CrmUtils'

interface FilterTableProspectsProps {
    table: import('@tanstack/table-core').Table<CrmType>
    columnFilters: ColumnFiltersState
    setColumnFilters: (value: ColumnFiltersState) => void
}

export const FilterTableProspects: FC<FilterTableProspectsProps> = ({
    table,
    columnFilters,
    setColumnFilters,
}) => {
    const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' })
    const filterTable = setupFilterTable(table.getRowModel().rows)
    const [options, setDataOption] = useState<FilterClass>(
        new FilterClass(filterTable)
    )
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
        console.log('table', filterArray)
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
                        <CountryFilter
                            country={filterData.country}
                            setCountry={(country) =>
                                setFilterData({ ...filterData, country })
                            }
                            options={options.dataOption.country}
                        />
                        <RegionFilter
                            region={filterData.region}
                            setRegion={(region) =>
                                setFilterData({ ...filterData, region })
                            }
                            options={options.dataOption.region}
                        />
                    </div>
                    <div className="flex lg:flex-row flex-col gap-3 w-full">
                        <CompanyFilter
                            companyName={filterData.companyName}
                            setCompanyName={(companyName) =>
                                setFilterData({ ...filterData, companyName })
                            }
                            options={options.dataOption.companyName}
                        />
                        <CategoryFilter
                            categories={filterData.category}
                            setCategories={(category) =>
                                setFilterData({ ...filterData, category })
                            }
                            options={options.dataOption.category}
                        />
                    </div>
                    <div className="flex lg:flex-row flex-col gap-3 w-full">
                        <CreatorFilter
                            creatorInfo={filterData.creatorInfo}
                            setCreatorInfo={(creatorInfo) =>
                                setFilterData({ ...filterData, creatorInfo })
                            }
                            options={options.dataOption.creatorInfo}
                        />
                        <ManagerFilter
                            managerInfo={filterData.managerInfo}
                            setManagerInfo={(managerInfo) =>
                                setFilterData({ ...filterData, managerInfo })
                            }
                            options={options.dataOption.managerInfo}
                        />
                    </div>
                    <div className="flex lg:flex-row flex-col gap-3 w-full">
                        <EmailFilter
                            email={filterData.email}
                            setEmail={(email) =>
                                setFilterData({ ...filterData, email })
                            }
                        />
                        <PhoneFilter
                            phone={filterData.phone}
                            setPhone={(phone) =>
                                setFilterData({ ...filterData, phone })
                            }
                        />
                    </div>
                    <div className="flex lg:flex-row flex-col gap-3 w-full">
                        <CityFilter
                            city={filterData.city}
                            setCity={(city) =>
                                setFilterData({ ...filterData, city })
                            }
                            options={options.dataOption.city}
                        />
                        <StatusFilter
                            status={filterData.status}
                            setStatus={(status) =>
                                setFilterData({ ...filterData, status })
                            }
                            options={options.dataOption.status}
                            isLargeScreen={isLargeScreen}
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
interface DateFilterProps {
    date: string[]
    setDate: (date: string[]) => void
}

const DateFilter: FC<DateFilterProps> = ({ date, setDate }) => {
    const [startDate, setStartDate] = useState(date[0] || '')
    const [endDate, setEndDate] = useState(date[1] || '')

    const handleDateChange = (date: string, type: 'start' | 'end') => {
        if (type === 'start') {
            setStartDate(date)
            setDate([date, endDate])
        } else {
            setEndDate(date)
            setDate([startDate, date])
        }
    }

    return (
        <div className="flex flex-col gap-3 w-full">
            <Label label="Date de création (Début et fin)" htmlFor="start" />
            <div className="flex lg:flex-row flex-col items-center gap-3 w-full">
                <DatePicker
                    id="start"
                    onChange={(newDate) =>
                        handleDateChange(newDate.toLocaleDateString(), 'start')
                    }
                />
                <DatePicker
                    onChange={(newDate) =>
                        handleDateChange(newDate.toLocaleDateString(), 'end')
                    }
                />
            </div>
        </div>
    )
}

//** */

//** */

interface CountryFilterProps {
    country: string[]
    setCountry: (country: string[]) => void
    options: MultiSelectOptionsType[]
}

const CountryFilter: FC<CountryFilterProps> = ({
    country,
    setCountry,
    options,
}) => {
    const [selectedCountry, setSelectedCountry] = useState(country)

    const handleCountryChange = (country: string[]) => {
        setSelectedCountry(country)
        setCountry(country)
    }

    return (
        <div className="flex flex-col gap-3 w-full">
            <Label label="Pays" htmlFor="pays" />
            <MultiSelect
                length={2}
                placeholder="Sélectionner le pays"
                normalTransform={true}
                onSelect={handleCountryChange}
                options={options}
                selectedValues={selectedCountry}
            />
        </div>
    )
}

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
                placeholder="Sélectionner la raison sociale"
                normalTransform={true}
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

interface PhoneFilterProps {
    phone: string
    setPhone: (phone: string) => void
}

const PhoneFilter: FC<PhoneFilterProps> = ({ phone, setPhone }) => {
    return (
        <div className="flex flex-col gap-3 w-full">
            <Label label="Téléphone" htmlFor="Phone" />
            <Input
                name="Phone"
                onChange={(e: string | number) => {
                    setPhone(e + '')
                }}
                placeholder="Téléphone"
                value={phone}
                IconLeft={PhoneCall}
            />
        </div>
    )
}

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
                transform={(value: MultiSelectOptionsType[]) => {
                    return value.map((option, index) => (
                        <div
                            key={index}
                            className={cn(
                                'text-xs w-full p-1 max-w-24 flex justify-around items-center rounded-full whitespace-nowrap text-ellipsis',
                                option.className
                            )}
                        >
                            {option.icon && <option.icon />}
                            <span>{option.label}</span>
                        </div>
                    ))
                }}
                options={options}
                placeholder="Sélectionner le status"
                onSelect={handleStatusChange}
                selectedValues={selectedStatus}
                type="status"
                length={isLargeScreen ? 2 : 3}
            />
        </div>
    )
}

//** */
