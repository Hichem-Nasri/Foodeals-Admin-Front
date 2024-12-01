import { FC, useState } from 'react'
import { Archive, ArrowLeft, ArrowRight } from 'lucide-react'
import { ColumnVisibilityModal } from '../ColumnVisibilityModal'
import { CustomButton } from '@/components/custom/CustomButton'
import { FilterSubAccount } from './FilterSubAccount'
import { SubAccountPartners } from '@/types/partnersType'
import { formatNumberWithSpaces } from '@/lib/utils'

interface HeaderSubAccountProps {
    form: any
    onSubmit: (data: any) => void
    table: import('@tanstack/table-core').Table<SubAccountPartners>
    totalElements: number
    archive: boolean
    handleArchive: () => void
    isFetching?: boolean
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const HeaderSubAccount: FC<HeaderSubAccountProps> = ({
    form,
    onSubmit,
    table,
    totalElements,
    archive,
    handleArchive,
    isFetching,
    open,
    setOpen,
}) => {
    return (
        <div className="flex justify-between w-full rounded-[18px] lg:bg-white">
            <div className="flex lg:hidden items-center justify-between w-full">
                <h2 className="font-medium text-[1.375rem] text-lynch-950">
                    Liste des sous comptes
                </h2>
                <FilterSubAccount
                    form={form}
                    onSubmit={onSubmit}
                    setOpen={setOpen}
                    open={open}
                    type={'PARTNERS&' + `${archive}`}
                />
            </div>
            <div className="lg:flex hidden gap-3 p-2">
                <FilterSubAccount
                    form={form}
                    onSubmit={onSubmit}
                    setOpen={setOpen}
                    open={open}
                    type={'PARTNERS&' + `${archive}`}
                />
                <ColumnVisibilityModal table={table} />
                <CustomButton
                    size="sm"
                    variant="outline"
                    label={!archive ? 'Archive' : 'Sub Entites'}
                    className="text-lynch-500"
                    onClick={handleArchive}
                    IconRight={!archive ? Archive : ArrowLeft}
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
