'use client'
import React, { FC, useState } from 'react'
import {
    Archive,
    ArrowLeft,
    ArrowRight,
    Database,
    UserRoundPlus,
} from 'lucide-react'
import { FilterTableProspects } from './FilterTableProspects'
import { ColumnVisibilityModal } from '../Partners/ColumnVisibilityModal'
import { CustomButton } from '../custom/CustomButton'
import Link from 'next/link'
import { AppRoutes } from '@/lib/routes'
import { ColumnFiltersState } from '@tanstack/react-table'
import { Button } from '../ui/button'
import { CrmType } from '@/types/CrmType'
import { formatNumberWithSpaces } from '@/lib/utils'
import { UseFormReturn } from 'react-hook-form'
import { FilterCrmSchema } from '@/types/CrmScheme'
import { z } from 'zod'

interface FilterCrmProps {
    FilterForm: UseFormReturn<z.infer<typeof FilterCrmSchema>>
    onSubmit: (data: z.infer<typeof FilterCrmSchema>) => void
    table: import('@tanstack/table-core').Table<CrmType>
    handleArchive: () => void
    leadKo: boolean
    totalElements: number
    open: boolean
    setOpen: (open: boolean) => void
}

export const FilterCrm: FC<FilterCrmProps> = ({
    FilterForm,
    onSubmit,
    table,
    handleArchive,
    leadKo,
    totalElements,
    open,
    setOpen,
}) => {
    return (
        <div className="flex justify-between w-full rounded-[18px] lg:bg-white">
            <div className="flex lg:hidden items-center justify-between px-2 space-x-4 lg:space-x-0 w-full">
                <h2 className="font-medium text-[1.375rem] text-lynch-950 mx-4  ">
                    Liste des prospects
                </h2>
                <div className="flex justify-center items-center space-x-4">
                    <FilterTableProspects
                        FilterForm={FilterForm}
                        onSubmit={onSubmit}
                        open={open}
                        setOpen={setOpen}
                    />
                    <Button
                        size="sm"
                        className="text-lynch-500 rounded-full bg-white hover:bg-transparent hover:text-black w-14 h-14"
                        onClick={handleArchive}
                    >
                        <Archive size={26} />
                    </Button>
                </div>
            </div>
            <div className="lg:flex hidden gap-3 p-2">
                <FilterTableProspects
                    FilterForm={FilterForm}
                    onSubmit={onSubmit}
                    open={open}
                    setOpen={setOpen}
                />
                <ColumnVisibilityModal table={table} />
                <CustomButton
                    size="sm"
                    variant="outline"
                    label={leadKo ? 'Lead Ko' : 'Prospects'}
                    onClick={handleArchive}
                    IconRight={leadKo ? Archive : ArrowLeft}
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
                    label={formatNumberWithSpaces(totalElements)}
                    IconLeft={ArrowRight}
                    disabled
                    variant="destructive"
                />
            </div>
        </div>
    )
}
