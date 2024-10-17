'use client'
import { CustomButton } from '@/components/custom/CustomButton'
import { ColumnVisibilityModal } from '@/components/Partners/ColumnVisibilityModal'
import { AppRoutes } from '@/lib/routes'
import { table } from 'console'
import { Archive, ArrowRight, Database, UserRoundPlus } from 'lucide-react'
import React, { FC, useState } from 'react'
import { FilterTableProspects } from '../FilterTableProspects'
import { CrmDemandeType } from '@/types/CrmType'
import { ColumnFiltersState } from '@tanstack/react-table'
import { FilterTableDemandes } from './FilterTableDemandes'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface FilterCrmDemandesProps {
    data: CrmDemandeType[]
    table: import('@tanstack/table-core').Table<CrmDemandeType>
    setColumnFilters: (value: ColumnFiltersState) => void
    columnFilters: ColumnFiltersState
}

const FilterCrmDemandes: FC<FilterCrmDemandesProps> = ({
    data,
    table,
    setColumnFilters,
    columnFilters,
}) => {
    const [leadKo, setLeadKo] = useState(true)
    const handleArchive = () => {
        // set column filters  by status that cancled
        if (leadKo)
            setColumnFilters([
                {
                    id: 'status',
                    value: ['canceled'],
                },
            ])
        else setColumnFilters([])
        setLeadKo((prev) => !prev)
    }
    return (
        <div className="flex justify-between w-full rounded-[18px] lg:bg-white">
            <div className="flex lg:hidden items-center justify-start space-x-4 lg:space-x-0 w-full">
                <h2 className="font-medium text-[1.375rem] text-lynch-950 mx-4  ">
                    Liste des prospects
                </h2>
                <FilterTableDemandes
                    data={data}
                    table={table}
                    columnFilters={columnFilters}
                    setColumnFilters={setColumnFilters}
                />
            </div>
            <div className="lg:flex hidden gap-3 p-2">
                <FilterTableDemandes
                    data={data}
                    table={table}
                    columnFilters={columnFilters}
                    setColumnFilters={setColumnFilters}
                />
                <ColumnVisibilityModal table={table} />
            </div>
            <div className="lg:flex hidden gap-3 p-2 px-4">
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

export default FilterCrmDemandes

function setColumnFilters(arg0: never[]) {
    throw new Error('Function not implemented.')
}
