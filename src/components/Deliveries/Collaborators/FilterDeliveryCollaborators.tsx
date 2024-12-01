import React, { FC } from 'react'
import { Archive, ArrowLeft, ArrowRight } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { CustomButton } from '@/components/custom/CustomButton'
import { ColumnVisibilityModal } from '@/components/Partners/ColumnVisibilityModal'
import { FilterTablePartnerCollaborators } from '@/components/Partners/collaborators/FilterTablePartnerCollaborators'
import { DeliveryCollaboratorsType } from '@/types/deliveries'
import { formatNumberWithSpaces } from '@/lib/utils'
import { FilterTablePartner } from '@/components/Partners/FilterTablePartner'
import { FilterCollaborators } from '@/components/Collaborators/FilterCollaborators'
import { FormFilterCollaborator } from './FilterCollaborator'

interface FilterDeliveryCollaboratorsProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    onSubmit: (data: any) => void
    form: UseFormReturn<any>
    table: import('@tanstack/table-core').Table<DeliveryCollaboratorsType>
    setArchive: React.Dispatch<React.SetStateAction<boolean>>
    archive: boolean
    totalElements: number
}

export const FilterDeliveryCollaborators: FC<
    FilterDeliveryCollaboratorsProps
> = ({
    form,
    table,
    totalElements,
    archive,
    setArchive,
    open,
    setOpen,
    onSubmit,
}) => {
    return (
        <div className="flex justify-between w-full rounded-[18px] lg:bg-white">
            <div className="flex lg:hidden items-center justify-between w-full">
                <h2 className="font-medium text-[1.375rem] text-lynch-950">
                    Liste des collaborateurs
                </h2>
                <FormFilterCollaborator
                    form={form}
                    open={open}
                    setOpen={setOpen}
                    onSubmit={onSubmit}
                    archive={archive}
                />
            </div>
            <div className="lg:flex hidden gap-3 p-2">
                <FormFilterCollaborator
                    form={form}
                    open={open}
                    setOpen={setOpen}
                    onSubmit={onSubmit}
                    archive={archive}
                />
                <ColumnVisibilityModal table={table} />
                <CustomButton
                    onClick={() => {
                        setArchive((prev: boolean) => !prev)
                    }}
                    size="sm"
                    label={archive ? 'Collaborateur' : 'Archiver'}
                    className="flex items-center gap-1 rounded-[12px] border border-lynch-200 text-lynch-500 font-medium text-sm px-5 py-3 hover:text-black hover:bg-neutral-100 bg-transparent"
                    IconRight={archive ? ArrowLeft : Archive}
                />
            </div>
            <div className="lg:flex hidden gap-3 p-2">
                <CustomButton
                    label={formatNumberWithSpaces(totalElements)}
                    IconLeft={ArrowRight}
                    disabled
                    variant="destructive"
                />
            </div>
        </div>
    )
}
