import React, { FC } from 'react'
import { CustomButton } from '../custom/CustomButton'
import { Archive, ArrowLeft, ArrowRight, Store } from 'lucide-react'
import { FilterTablePartner } from './FilterTablePartner'
import { PartnerType } from '@/types/partnersType'
import { UseFormReturn } from 'react-hook-form'
import { ColumnVisibilityModal } from './ColumnVisibilityModal'
import Link from 'next/link'
import { AppRoutes } from '@/lib/routes'
import { formatNumberWithSpaces } from '@/lib/utils'
import { z } from 'zod'
import { SchemaFilter } from '@/types/associationSchema'

interface FilterAndCreatePartnersProps {
    table: import('@tanstack/table-core').Table<PartnerType>
    handleArchive: () => void
    archive: boolean
    totalElements: number
    form: UseFormReturn<z.infer<typeof SchemaFilter>>
    onSubmit: (data: z.infer<typeof SchemaFilter>) => void
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    isFetching?: boolean
}

export const FilterAndCreatePartners: FC<FilterAndCreatePartnersProps> = ({
    table,
    handleArchive,
    archive,
    totalElements,
    form,
    onSubmit,
    open,
    setOpen,
    isFetching,
}) => {
    return (
        <div className="flex justify-between w-full rounded-[18px] lg:bg-white">
            <div className="flex lg:hidden items-center justify-between w-full">
                <h2 className="font-medium text-[1.375rem] text-lynch-950">
                    Liste des partenaires
                </h2>
                <FilterTablePartner
                    form={form}
                    onSubmit={onSubmit}
                    setOpen={setOpen}
                    open={open}
                    type="PARTNER_WITH_SB,NORMAL_PARTNER,SUB_ENTITY"
                />
            </div>
            <div className="lg:flex hidden gap-3 p-2">
                <FilterTablePartner
                    form={form}
                    onSubmit={onSubmit}
                    setOpen={setOpen}
                    open={open}
                    type="PARTNER_WITH_SB,NORMAL_PARTNER,SUB_ENTITY"
                />
                <ColumnVisibilityModal table={table} />
                <CustomButton
                    size="sm"
                    variant="outline"
                    label={archive ? 'Archive' : 'Partners'}
                    className="text-lynch-500"
                    onClick={handleArchive}
                    IconRight={archive ? Archive : ArrowLeft}
                />
            </div>
            <div className="lg:flex hidden gap-3 p-2">
                <Link href={AppRoutes.newPartner.replace(':id', 'new')}>
                    <CustomButton
                        size="sm"
                        label="Ajouter un partenaire"
                        IconRight={Store}
                    />
                </Link>
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
