import { FC } from 'react'
import { Archive, ArrowLeft, ArrowRight } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { ColumnVisibilityModal } from '../ColumnVisibilityModal'
import { FilterTablePartnerCollaborators } from './FilterTablePartnerCollaborators'
import { CustomButton } from '@/components/custom/CustomButton'
import { PartnerCollaborators } from '@/types/collaborators'
import { formatNumberWithSpaces } from '@/lib/utils'
import { CollaboratorsUser } from '@/types/collaboratorsUtils'

interface FilterAndCreatePartnerCollaboratorsProps {
    form: UseFormReturn<any>
    table: import('@tanstack/table-core').Table<CollaboratorsUser>
    onSubmit: (data: any) => void
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    archive: boolean
    totalElements: number
    handleArchive: () => void
    isFetching?: boolean
}

export const FilterAndCreatePartnerCollaborators: FC<
    FilterAndCreatePartnerCollaboratorsProps
> = ({
    form,
    table,
    onSubmit,
    open,
    setOpen,
    archive,
    totalElements,
    handleArchive,
    isFetching,
}) => {
    return (
        <div className="flex justify-between w-full rounded-[18px] lg:bg-white">
            <div className="flex lg:hidden items-center justify-between w-full">
                <h2 className="font-medium text-[1.375rem] text-lynch-950">
                    Liste des collaborateurs
                </h2>
                <FilterTablePartnerCollaborators
                    form={form}
                    onSubmit={onSubmit}
                    open={open}
                    setOpen={setOpen}
                    archive={archive}
                />
            </div>
            <div className="lg:flex hidden gap-3 p-2">
                <FilterTablePartnerCollaborators
                    form={form}
                    onSubmit={onSubmit}
                    open={open}
                    setOpen={setOpen}
                    archive={archive}
                />
                <ColumnVisibilityModal table={table} />
                <CustomButton
                    size="sm"
                    variant="outline"
                    label={!archive ? 'Archive' : 'Collaborateurs'}
                    IconRight={!archive ? Archive : ArrowLeft}
                    onClick={handleArchive}
                    disabled={isFetching}
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
