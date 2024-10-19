import { FC } from 'react'
import { Archive, ArrowRight } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { CustomButton } from '@/components/custom/CustomButton'
import { ColumnVisibilityModal } from '@/components/Partners/ColumnVisibilityModal'
import { FilterTablePartnerCollaborators } from '@/components/Partners/collaborators/FilterTablePartnerCollaborators'
import { DeliveryCollaboratorsType } from '@/types/deliveries'

interface FilterDeliveryCollaboratorsProps {
    collaborators: DeliveryCollaboratorsType[]
    form: UseFormReturn<any>
    table: import('@tanstack/table-core').Table<DeliveryCollaboratorsType>
}

export const FilterDeliveryCollaborators: FC<
    FilterDeliveryCollaboratorsProps
> = ({ collaborators, form, table }) => {
    return (
        <div className="flex justify-between w-full rounded-[18px] lg:bg-white">
            <div className="flex lg:hidden items-center justify-between w-full">
                <h2 className="font-medium text-[1.375rem] text-lynch-950">
                    Liste des collaborateurs
                </h2>
                <FilterTablePartnerCollaborators />
            </div>
            <div className="lg:flex hidden gap-3 p-2">
                <FilterTablePartnerCollaborators />
                <ColumnVisibilityModal table={table} />
                <CustomButton
                    onClick={() => {}}
                    size="sm"
                    label="Archiver"
                    className="flex items-center gap-1 rounded-[12px] border border-lynch-200 text-lynch-500 font-medium text-sm px-5 py-3 hover:text-black hover:bg-neutral-100 bg-transparent"
                    IconRight={Archive}
                />
            </div>
            <div className="lg:flex hidden gap-3 p-2">
                <CustomButton
                    size="sm"
                    className="disabled:bg-white font-semibold text-lynch-400 border-[1.5px] border-lynch-400 hover:bg-primary/40"
                    label={'1666'}
                    IconLeft={ArrowRight}
                    disabled
                />
            </div>
        </div>
    )
}
