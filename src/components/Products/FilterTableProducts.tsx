import { FC, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { CustomButton } from '../custom/CustomButton'
import { ListFilter, X, Check } from 'lucide-react'
import { DialogClose } from '@radix-ui/react-dialog'
import { useMediaQuery } from 'react-responsive'
import { ColumnFiltersState } from '@tanstack/react-table'
import { DateFilter } from '../utils/DateFilters'
import { FilterSelect } from '../utils/FilterSelect'
import { FilterInput } from '../utils/FilterInput'
import { ProductType } from '@/types/products'
import { CrmType } from '@/types/CrmType'

interface FilterTableProductsProps {
    data: ProductType[]
    table: import('@tanstack/table-core').Table<CrmType>
    columnFilters: ColumnFiltersState
    setColumnFilters: (value: ColumnFiltersState) => void
}

export const FilterTableProducts: FC<FilterTableProductsProps> = ({
    data,
    table,
    columnFilters,
    setColumnFilters,
}) => {
    const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' })
    const [filterTable, setFilterTable] = useState<any>(null)
    console.log('data: ', filterTable)

    const [filterData, setFilterData] = useState<any>({
        date: '',
        partenaire: '',
        poweredby: '',
        product: '',
        brand: '',
        category: '',
        subCategory: '',
        city: '',
        country: '',
        status: '',
    })
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
                {/* <div className="flex flex-col gap-y-2 gap-x-4">
                    <DateFilter
                        date={filterData.date}
                        setDate={(date) =>
                            setFilterData({ ...filterData, date })
                        }
                    />
                    <div className="flex lg:flex-row flex-col gap-3 w-full">
                        <FilterSelect
                            item={filterData.partenaire}
                            setItem={(item) =>
                                setFilterData({
                                    ...filterData,
                                    partenaire: item,
                                })
                            }
                            options={filterTable.partenaire}
                            label="Raison sociale"
                            emptyAvatar="/avatar/emptyUser.png"
                            // normalTransform={true}
                        />
                        <FilterSelect
                            item={filterData.poweredby}
                            setItem={(item) =>
                                setFilterData({
                                    ...filterData,
                                    poweredby: item,
                                })
                            }
                            options={filterTable.poweredby}
                            label="Categorie"
                            // normalTransform={true}
                            // emptyAvatar="/avatar/emptyPartner.png"
                        />
                    </div>
                    <div className="flex lg:flex-row flex-col gap-3 w-full text-sm">
                        <FilterSelect
                            placeholder=""
                            item={filterData.product}
                            setItem={(product) =>
                                setFilterData({ ...filterData, product })
                            }
                            options={filterTable.product || []}
                            label="Alimente par"
                        />
                        <FilterSelect
                            item={filterData.brand}
                            setItem={(brand) =>
                                setFilterData({ ...filterData, brand })
                            }
                            options={filterTable.brand || []}
                            label="Effectuée à"
                        />
                    </div>
                    <div className="flex lg:flex-row flex-col gap-3 w-full">
                        <FilterSelect
                            item={filterData.category}
                            setItem={(category) =>
                                setFilterData({ ...filterData, category })
                            }
                            options={filterTable.category || []}
                            label="Categorie"
                        />
                        <FilterSelect
                            item={filterData.subCategory}
                            setItem={(subCategory) =>
                                setFilterData({ ...filterData, subCategory })
                            }
                            options={filterTable.subCategory || []}
                            label="Categorie"
                        />
                    </div>

                    <div className="flex lg:flex-row flex-col gap-3 w-full">
                        <FilterInput
                            input={filterData.codeBar}
                            setInput={(codeBar) =>
                                setFilterData({ ...filterData, codeBar })
                            }
                            label="Code Bar"
                            placeholder="2231055690887 4566633"
                        />
                    </div>
                    {/* <div className="flex lg:flex-row flex-col gap-3 w-full">
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
                    </div> */}
                hello world
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
