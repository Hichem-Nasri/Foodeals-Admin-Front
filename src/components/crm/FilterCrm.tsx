import React, { FC } from 'react'
import { Archive, ArrowRight, Database, UserRoundPlus } from 'lucide-react'
import { FilterTableProspects } from './FilterTableProspects'
import { ColumnVisibilityModal } from '../Partners/ColumnVisibilityModal'
import { CustomButton } from '../custom/CustomButton'
import Link from 'next/link'
import { AppRoutes } from '@/lib/routes'
import { ColumnFiltersState } from '@tanstack/react-table'
import { Button } from '../ui/button'
import { CrmType } from '@/types/Global-Type'

interface FilterCrmProps {
    data: CrmType[]
    table: import('@tanstack/table-core').Table<CrmType>
    setColumnFilters: (value: ColumnFiltersState) => void
    columnFilters: ColumnFiltersState
}

export const FilterCrm: FC<FilterCrmProps> = ({
    data,
    table,
    setColumnFilters,
    columnFilters,
}) => {
    const handleArchive = () => {
        // handle archive
    }

    return (
        <div className="flex justify-between w-full rounded-[18px] lg:bg-white">
            <div className="flex lg:hidden items-center justify-start space-x-4 lg:space-x-0 w-full">
                <h2 className="font-medium text-[1.375rem] text-lynch-950 mx-4  ">
                    Liste des prospects
                </h2>
                <FilterTableProspects
                    data={data}
                    table={table}
                    columnFilters={columnFilters}
                    setColumnFilters={setColumnFilters}
                />
                <Button
                    size="sm"
                    className="text-lynch-500 rounded-full bg-white hover:bg-transparent hover:text-black w-14 h-14"
                    onClick={handleArchive}
                >
                    <Archive size={26} />
                </Button>
            </div>
            <div className="lg:flex hidden gap-3 p-2">
                <FilterTableProspects
                    data={data}
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
                    label={table.getRowCount().toString()}
                    IconLeft={ArrowRight}
                />
            </div>
        </div>
    )
}
