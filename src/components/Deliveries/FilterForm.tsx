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
import { PartnerSolutionType } from '@/types/partnersType'
import { Label } from '../Label'
import { Checkbox } from '../ui/checkbox'
import { DialogClose } from '@radix-ui/react-dialog'
import { PartnerSolution } from '../Partners/PartnerSolution'
import { DateFilter } from '../utils/DateFilters'
import { FilterInput } from '../utils/FilterInput'
import { FilterMultiSelect } from '../utils/FilterMultiSelect'
import { FilterSelect } from '../utils/FilterSelect'
import { DeliveryType } from '@/types/deliveries'
import { CheckedType, DeliveryFilterType } from '@/types/DeliveriesUtils'

interface FormFilterProps {
    data: DeliveryType[]
    setColumnFilters: (val: any) => void
}

export const FormFilter: FC<FormFilterProps> = ({ data, setColumnFilters }) => {
    const [filterData, setFilterData] = useState<DeliveryFilterType>({
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
                            normalTransform
                            length={2}
                            label="Raison sociale"
                            options={[]}
                            emptyAvatar="/avatar/emptyPartner.png"
                            item={filterData.companyName}
                            setItem={(companyName) => {
                                setFilterData({ ...filterData, companyName })
                            }}
                        />
                        <FilterMultiSelect
                            normalTransform
                            length={2}
                            label="Manager"
                            options={[]}
                            emptyAvatar="/avatar/emptyPartner.png"
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
                            options={[]}
                            item={filterData.city}
                            setItem={(city) => {
                                setFilterData({ ...filterData, city })
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-3 w-full">
                        <Label label="Type de compte" htmlFor="accountType" />
                        <div className="flex lg:flex-row flex-col lg:items-center gap-3">
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    checked={solutionChecked.includes(
                                        PartnerSolutionType.MARKET_PRO
                                    )}
                                    name={PartnerSolutionType.MARKET_PRO}
                                    className="size-5"
                                    onClick={(e) => {
                                        const target =
                                            e.target as HTMLInputElement
                                        CheckedType(
                                            target,
                                            PartnerSolutionType.MARKET_PRO,
                                            solutionChecked,
                                            setSolutionChecked,
                                            setFilterData
                                        )
                                    }}
                                />
                                <PartnerSolution
                                    solution={PartnerSolutionType.MARKET_PRO}
                                    className="px-4 py-3"
                                    size={20}
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    checked={solutionChecked.includes(
                                        PartnerSolutionType.DLC_PRO
                                    )}
                                    name={PartnerSolutionType.DLC_PRO}
                                    className="size-5"
                                    onClick={(e) => {
                                        const target =
                                            e.target as HTMLInputElement
                                        CheckedType(
                                            target,
                                            PartnerSolutionType.DLC_PRO,
                                            solutionChecked,
                                            setSolutionChecked,
                                            setFilterData
                                        )
                                    }}
                                />
                                <PartnerSolution
                                    solution={PartnerSolutionType.DLC_PRO}
                                    className="px-4 py-3"
                                    size={20}
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    checked={solutionChecked.includes(
                                        PartnerSolutionType.DONATE_PRO
                                    )}
                                    name={PartnerSolutionType.DONATE_PRO}
                                    className="size-5"
                                    onClick={(e) => {
                                        const target =
                                            e.target as HTMLInputElement
                                        CheckedType(
                                            target,
                                            PartnerSolutionType.DONATE_PRO,
                                            solutionChecked,
                                            setSolutionChecked,
                                            setFilterData
                                        )
                                    }}
                                />
                                <PartnerSolution
                                    solution={PartnerSolutionType.DONATE_PRO}
                                    className="px-4 py-3"
                                    size={20}
                                />
                            </div>
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
                    <DialogClose>
                        <CustomButton
                            label="Confirmer"
                            onClick={handleFilter}
                            className="px-5 py-3 h-fit"
                            IconRight={Check}
                            type="submit"
                        />
                    </DialogClose>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}
