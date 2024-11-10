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

interface FilterAndCreatePartnersProps {
    partners: PartnerType[]
    table: import('@tanstack/table-core').Table<PartnerType>
    setColumnFilters: React.Dispatch<
        React.SetStateAction<import('@tanstack/react-table').ColumnFiltersState>
    >
    setArchive: React.Dispatch<React.SetStateAction<boolean>>
    archive: boolean
    totalElements: number
}

export const FilterAndCreatePartners: FC<FilterAndCreatePartnersProps> = ({
    partners,
    table,
    setColumnFilters,
    setArchive,
    archive,
    totalElements,
}) => {
    const handleArchive = () => {
        setArchive((prev) => !prev)
        // handle archive
    }
    return (
        <div className="flex justify-between w-full rounded-[18px] lg:bg-white">
            <div className="flex lg:hidden items-center justify-between w-full">
                <h2 className="font-medium text-[1.375rem] text-lynch-950">
                    Liste des partenaires
                </h2>
                <FilterTablePartner
                    partners={partners}
                    setColumnFilters={setColumnFilters}
                />
            </div>
            <div className="lg:flex hidden gap-3 p-2">
                <FilterTablePartner
                    partners={partners}
                    setColumnFilters={setColumnFilters}
                />
                <ColumnVisibilityModal table={table} />
                <CustomButton
                    size="sm"
                    variant="outline"
                    label={archive ? 'Partners' : 'Archive'}
                    className="text-lynch-500"
                    onClick={handleArchive}
                    IconRight={archive ? ArrowLeft : Archive}
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
