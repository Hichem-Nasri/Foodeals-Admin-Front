import { FC, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { DialogClose } from '@radix-ui/react-dialog'
import { useMediaQuery } from 'react-responsive'
import { cn } from '@/lib/utils'
import { OptionStatus } from '@/types/utils'
import { ColumnFiltersState } from '@tanstack/react-table'
import { DateFilter } from '@/components/utils/DateFilters'
import { CustomButton } from '@/components/custom/CustomButton'
import { MultiSelectOptionsType } from '@/components/MultiSelect'
import { FilterInput } from '@/components/utils/FilterInput'
import { FilterMultiSelect } from '@/components/utils/FilterMultiSelect'
import { FilterSelect } from '@/components/utils/FilterSelect'
import { ListFilter, X, Check } from 'lucide-react'
import { CrmDemandeType } from '@/types/CrmType'
import { FilterData, emptyFilterData } from '@/types/CrmUtils'

interface FilterTableDemandesProps {
    data: CrmDemandeType[]
    table: import('@tanstack/table-core').Table<CrmDemandeType>
    columnFilters: ColumnFiltersState
    setColumnFilters: (value: ColumnFiltersState) => void
}

const setMultiSelectPerson = (
    value: { name: { firstName: string; lastName: string }; avatar: string }[]
) => {
    return Array.from(
        new Set(
            value.map(
                (items) => items.name.firstName + ' ' + items.name.lastName
            )
        )
    ).map((items) => ({
        key: items,
        label: items,
        avatar: value.find(
            (item) => item.name.firstName + ' ' + item.name.lastName === items
        )?.avatar,
    }))
}

const setMultiSelect = (value: string[]) => {
    return Array.from(new Set(value)).map((items) => ({
        key: items,
        label: items,
    }))
}

const getDateFilter = (data: CrmDemandeType[]) => {
    return {
        companyName: Array.from(new Set(data.map((item) => item.companyName))),
        category: Array.from(new Set(data.map((item) => item.activity).flat())),
        country: Array.from(new Set(data.map((item) => item.country))),
        city: Array.from(new Set(data.map((item) => item.city))),
        role: Array.from(new Set(data.map((item) => item.role))),
    }
}

export const FilterTableDemandes: FC<FilterTableDemandesProps> = ({
    data,
    table,
    columnFilters,
    setColumnFilters,
}) => {
    const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' })
    const [filterTable, setFilterTable] = useState(getDateFilter(data))

    const [filterData, setFilterData] = useState<
        FilterData & { role: string[] }
    >({ ...emptyFilterData, role: [] })
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
                            normalTransform={true}
                        />
                        <FilterMultiSelect
                            item={filterData.category}
                            setItem={(item) =>
                                setFilterData({ ...filterData, category: item })
                            }
                            options={setMultiSelect(filterTable.category)}
                            label="Categorie"
                            normalTransform={true}
                        />
                    </div>
                    <div className="flex lg:flex-row flex-col gap-3 w-full text-sm">
                        <FilterMultiSelect
                            item={filterData.city}
                            setItem={(city) =>
                                setFilterData({ ...filterData, city })
                            }
                            options={filterTable.city.map((city) => ({
                                label: city,
                                key: city,
                            }))}
                            label="Ville"
                            placeholder="Sélectionner la ville"
                            normalTransform={true}
                        />
                        <FilterMultiSelect
                            item={filterData.country}
                            setItem={(country) =>
                                setFilterData({ ...filterData, country })
                            }
                            options={setMultiSelect(filterTable.country)}
                            label="Pays"
                            placeholder="Sélectionner le pays"
                            normalTransform={true}
                        />
                    </div>
                    <div className="flex lg:flex-row flex-col gap-3 w-full">
                        <FilterMultiSelect
                            item={filterData.role}
                            setItem={(role) =>
                                setFilterData({ ...filterData, role: role })
                            }
                            options={setMultiSelect(filterTable.role)}
                            label="Pays"
                            placeholder="Sélectionner le pays"
                            normalTransform={true}
                        />
                    </div>
                    <div className="flex lg:flex-row flex-col gap-3 w-full">
                        <FilterInput
                            input={filterData.email}
                            setInput={(email) =>
                                setFilterData({ ...filterData, email })
                            }
                            label="Email"
                        />
                        <FilterInput
                            input={filterData.phone}
                            setInput={(phone) =>
                                setFilterData({ ...filterData, phone })
                            }
                            label="Téléphone"
                            placeholder="Saisir le téléphone"
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
