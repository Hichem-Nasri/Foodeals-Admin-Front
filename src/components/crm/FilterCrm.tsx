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
import ArchiveButton from '../custom/ArchiveButton'

interface FilterCrmProps {
    FilterForm: UseFormReturn<z.infer<typeof FilterCrmSchema>>
    onSubmit: (data: z.infer<typeof FilterCrmSchema>) => void
    table: import('@tanstack/table-core').Table<CrmType>
    handleArchive: () => void
    leadKo: boolean
    totalElements: number
    open: boolean
    setOpen: (open: boolean) => void
    switchTable: string
    isLoading?: boolean
    type: string
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
    switchTable,
    isLoading,
    type,
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
                        type={type}
                    />
                    <ArchiveButton
                        archive={leadKo}
                        isLoading={isLoading!}
                        handleArchive={handleArchive}
                    />
                </div>
            </div>
            <div className="lg:flex hidden gap-3 p-2">
                <FilterTableProspects
                    FilterForm={FilterForm}
                    onSubmit={onSubmit}
                    open={open}
                    setOpen={setOpen}
                    type={type}
                />
                <ColumnVisibilityModal table={table} />
                <CustomButton
                    size="sm"
                    variant="outline"
                    label={!leadKo ? 'Lead Ko' : 'Prospects'}
                    onClick={handleArchive}
                    IconRight={!leadKo ? Archive : ArrowLeft}
                    disabled={isLoading}
                />
            </div>
            <div className="lg:flex hidden gap-3 p-2 px-4">
                <CustomButton
                    size={'sm'}
                    variant="outline"
                    className="border-[1.5px] border-primary text-primary hover:bg-primary bg-white hover:text-white transition-all"
                    label={'Importer'}
                    IconRight={Database}
                    disabled={isLoading}
                />
                <Link
                    href={
                        AppRoutes.newProspect +
                        '?type=' +
                        (switchTable === 'partenaires'
                            ? 'PARTNER'
                            : 'ASSOCIATION,FOOD_BANK')
                    }
                >
                    <CustomButton
                        size="sm"
                        label="Ajouter un prospect"
                        IconRight={UserRoundPlus}
                        disabled={isLoading}
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
