import React, { FC } from 'react'
import { Archive, ArrowRight, Database, UserRoundPlus } from 'lucide-react'
import { FilterTableProspects } from './FilterTableProspects'
import { ColumnVisibilityModal } from '../Partners/ColumnVisibilityModal'
import { CustomButton } from '../custom/CustomButton'
import Link from 'next/link'
import { AppRoutes } from '@/lib/routes'
import { CrmType } from '@/types/CrmType'
import { ColumnFiltersState } from '@tanstack/react-table'

interface FilterCrmProps {
    table: import('@tanstack/table-core').Table<CrmType>
    setColumnFilters: (value: ColumnFiltersState) => void
    columnFilters: ColumnFiltersState
}

export const FilterCrm: FC<FilterCrmProps> = ({
    table,
    setColumnFilters,
    columnFilters,
}) => {
    const handleArchive = () => {
        // handle archive
    }

    return (
        <div className="flex justify-between w-full rounded-[18px] lg:bg-white">
            <div className="flex lg:hidden items-center justify-between w-full">
                <h2 className="font-medium text-[1.375rem] text-lynch-950 mx-4  ">
                    Liste des prospects
                </h2>
                <FilterTableProspects
                    table={table}
                    columnFilters={columnFilters}
                    setColumnFilters={setColumnFilters}
                />
            </div>
            <div className="lg:flex hidden gap-3 p-2">
                <FilterTableProspects
                    table={table}
                    columnFilters={columnFilters}
                    setColumnFilters={setColumnFilters}
                />
                <ColumnVisibilityModal table={table} />
                <CustomButton
                    size="sm"
                    variant="outline"
                    label="Lead Ko"
                    className="text-lynch-500"
                    onClick={handleArchive}
                    IconRight={Archive}
                />
            </div>
            <div className="lg:flex hidden gap-3 p-2 px-4">
                <CustomButton
                    size={'sm'}
                    className="border-[1.5px] border-primary text-primary hover:bg-primary bg-white hover:text-white transition-all"
                    label={'Importer'}
                    IconRight={Database}
                />
                <Link href={AppRoutes.newProspect}>
                    <CustomButton
                        size="sm"
                        label="Ajouter un prospect"
                        IconRight={UserRoundPlus}
                    />
                </Link>
                <CustomButton
                    size="sm"
                    disabled
                    className="disabled:bg-white text-primary border-[1.5px] border-primary hover:bg-primary/40  "
                    label={'17'}
                    IconLeft={ArrowRight}
                />
            </div>
        </div>
    )
}
