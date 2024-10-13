import { FC, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { CustomButton } from '../custom/CustomButton'
import { Check, ListFilter, X } from 'lucide-react'
import { PartnerSolutionType, PartnerType } from '@/types/partners'
import { Label } from '../Label'
import { UseFormReturn } from 'react-hook-form'
import { Checkbox } from '../ui/checkbox'
import { PartnerSolution } from './PartnerSolution'
import { DialogClose } from '@radix-ui/react-dialog'
import { FilterMultiSelect } from '../utils/FilterMultiSelect'
import { FilterInput } from '../utils/FilterInput'
import { FilterSelect } from '../utils/FilterSelect'
import { DateFilter } from '../utils/DateFilters'
import {
    CheckedType,
    extractOptions,
    OptionsType,
    PartnerFilerType,
} from '@/types/PartnersUtils'

interface FilterTablePartnerProps {
    partners: PartnerType[]
    form: UseFormReturn<any>
    setColumnFilters: React.Dispatch<
        React.SetStateAction<import('@tanstack/react-table').ColumnFiltersState>
    >
}

export const FilterTablePartner: FC<FilterTablePartnerProps> = ({
    partners,
    form,
    setColumnFilters,
}) => {
    const options: OptionsType = extractOptions(partners)
    const [filterData, setFilterData] = useState<PartnerFilerType>({
        createdAt: [],
        companyName: [],
        manager: [],
        city: '',
        status: [],
        solution: [],
        companyType: '',
        collaborators: [],
        phone: '',
        email: '',
    })
    const [solutionChecked, setSolutionChecked] = useState<string[]>(
        filterData.solution
    )
    const handleFilter = () => {
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
            <DialogTrigger className="flex items-center gap-3 lg:rounded-[12px] rounded-full lg:border border-lynch-200 border-0 text-lynch-500 font-medium text-sm p-4 lg:px-5 lg:py-3 hover:text-black hover:bg-neutral-100 my-4 lg:my-0 bg-white">
                <span className="lg:inline-flex hidden">Filtrer par</span>
                <ListFilter />
            </DialogTrigger>
            <DialogContent className="[&>.Icon]:hidden p-5 rounded-[14px] w-full max-w-[36.25rem] gap-[1.875rem] max-h-screen overflow-auto">
                <DialogTitle className="text-[1.375rem] font-normal text-lynch-400">
                    Filtrer par
                </DialogTitle>
                <div className="flex flex-col gap-5">
                    <DateFilter
                        date={filterData.createdAt}
                        setDate={(createdAt) => {
                            setFilterData({ ...filterData, createdAt })
                        }}
                    />
                    <div className="flex  lg:flex-row flex-col gap-3 w-full">
                        <FilterMultiSelect
                            length={1}
                            label="Raison sociale"
                            options={options.companyName}
                            emptyAvatar="/avatar/emptyPartner.png"
                            item={filterData.companyName}
                            setItem={(companyName) => {
                                setFilterData({ ...filterData, companyName })
                            }}
                        />
                        <FilterMultiSelect
                            length={2}
                            label="Manager"
                            options={options.manager}
                            emptyAvatar="/avatar/emptyUser.png"
                            item={filterData.manager}
                            setItem={(manager) => {
                                setFilterData({ ...filterData, manager })
                            }}
                        />
                    </div>
                    <div className="flex lg:flex-row flex-col gap-3 w-full">
                        <FilterInput
                            label="Email"
                            placeholder="Email"
                            input={filterData.email}
                            setInput={(email) => {
                                setFilterData({ ...filterData, email })
                            }}
                        />
                        <FilterInput
                            label="Téléphone"
                            placeholder="Téléphone"
                            input={filterData.phone}
                            setInput={(phone) => {
                                setFilterData({ ...filterData, phone })
                            }}
                        />
                    </div>
                    <div className="flex lg:flex-row flex-col gap-3 w-full">
                        <FilterSelect
                            label="Ville"
                            options={options.city}
                            item={filterData.city}
                            setItem={(city) => {
                                setFilterData({ ...filterData, city })
                            }}
                        />
                        <FilterSelect
                            label="Type de compte"
                            options={options.companyType}
                            item={filterData.companyType}
                            setItem={(companyType) => {
                                setFilterData({ ...filterData, companyType })
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-3 w-full">
                        <div className="flex lg:flex-row flex-col lg:items-center gap-3">
                            <FilterMultiSelect
                                transform={(value) => {
                                    return value.map((val) => {
                                        return (
                                            <PartnerSolution
                                                solution={
                                                    val.label as PartnerSolutionType
                                                }
                                                className="px-4 py-3"
                                                size={20}
                                            />
                                        )
                                    })
                                }}
                                length={3}
                                label="solutions"
                                options={options.solution}
                                item={filterData.solution}
                                setItem={(solution) => {
                                    setFilterData({ ...filterData, solution })
                                }}
                            />
                        </div>
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
                    <CustomButton
                        label="Confirmer"
                        onClick={handleFilter}
                        className="px-5 py-3 h-fit"
                        IconRight={Check}
                        type="submit"
                    />
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}
