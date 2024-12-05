'use client'
import { PartnerType } from '@/types/partnersType'
import React, { FC, useEffect, useState } from 'react'
import { FilterAndCreatePartners } from './FilterAndCreatePartners'

import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { CustomButton } from '../custom/CustomButton'
import { RotateCw, Store } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { DataTable } from '../DataTable'
import { PartnerCard } from './PartnerCard'
import {
    keepPreviousData,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query'
import { fetchPartners } from '@/lib/api/partner/fetchPartners'
import { useNotification } from '@/context/NotifContext'
import {
    NotificationType,
    PartnerEntitiesType,
    TotalValueProps,
    TotalValues,
} from '@/types/GlobalType'
import { columnsPartnersTable } from './column/partnerColumn'
import PaginationData from '../utils/PaginationData'
import { SchemaFilter, defaultSchemaFilter } from '@/types/associationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { set } from 'date-fns'
import getArchivedPartners from '@/lib/api/partner/getArchiver'
import Link from 'next/link'
import { AppRoutes } from '@/lib/routes'
import { MyError } from '../Error'

interface PartnersProps {
    params?: {
        id: string
        query: string
    }
}

export interface TableRowType {
    key: string
    label: string
}

export const Partners: FC<PartnersProps> = ({}) => {
    const [archive, setArchive] = React.useState(false)
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [partners, setPartners] = useState<PartnerType[]>([])
    const [totals, setTotals] = useState<TotalValueProps>(TotalValues)
    const [filterData, setFilterData] =
        useState<z.infer<typeof SchemaFilter>>(defaultSchemaFilter)
    const [open, setOpen] = useState(false)
    const notify = useNotification()
    const router = useRouter()
    const { error, isLoading, isRefetching, refetch } = useQuery({
        queryKey: ['partners', totals.currentPage, totals.pageSize],
        queryFn: async () => {
            try {
                console.log('fetching partners')
                const data = await fetchPartners(
                    'PARTNERS',
                    totals.currentPage,
                    totals.pageSize,
                    filterData,
                    archive
                )
                console.log(data)
                if (data.status === 500)
                    throw new Error(
                        'Erreur lors de la récupération des partenaires'
                    )
                setTotals((prev) => ({
                    ...prev,
                    totalElements: data.data.totalElements,
                    totalPages: data.data.totalPages,
                }))
                setPartners(data.data.content as PartnerType[])
                return data.data
            } catch (error) {
                notify.notify(
                    NotificationType.ERROR,
                    'Erreur lors de la récupération des partenaires'
                )
                console.log(error)
                setPartners([])
            }
        },
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: false,
    })

    const form = useForm<z.infer<typeof SchemaFilter>>({
        resolver: zodResolver(SchemaFilter),
        mode: 'onBlur',
        defaultValues: filterData,
    })

    const onSubmit = (data: z.infer<typeof SchemaFilter>) => {
        console.log('Filters:', data)
        setFilterData(data)
        setOpen(false)
    }

    const table = useReactTable({
        data: partners || [],
        columns: columnsPartnersTable(router, archive, refetch),
        state: {
            columnFilters,
        },
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })
    // Handle archive
    const handleArchive = () => {
        if (isRefetching || isLoading) return
        setArchive((prev) => !prev)
    }
    useEffect(() => {
        if (isLoading || isRefetching) return
        setTotals({
            ...totals,
            currentPage: 0,
        })
        refetch()
    }, [archive, filterData])
    console.log('Partners:', partners)
    return (
        <div className="flex flex-col gap-[0.625rem] items-center w-full px-3 lg:px-0 lg:pr-2  lg:mb-0 mb-4">
            <FilterAndCreatePartners
                form={form}
                onSubmit={onSubmit}
                setOpen={setOpen}
                open={open}
                table={table}
                handleArchive={handleArchive}
                archive={archive}
                totalElements={totals.totalElements}
                isFetching={isLoading || isRefetching}
            />
            <DataTable
                data={partners! || []}
                table={table}
                title="Listes des partenaires"
                transform={(value) => (
                    <PartnerCard
                        partner={value}
                        refetch={refetch}
                        archive={archive}
                    />
                )}
                isLoading={isLoading || isRefetching}
            />
            <PaginationData
                currentPage={totals.currentPage}
                setCurrentPage={(page) =>
                    setTotals({ ...totals, currentPage: page })
                }
                totalPages={totals.totalPages}
                pageSize={totals.pageSize}
                refetch={refetch}
            />
            <Link
                href={AppRoutes.newPartner.replace(':id', 'new')}
                className="w-full lg:hidden flex flex-col items-center gap-4 "
            >
                <CustomButton
                    label="Ajouter un partenaire"
                    className="w-full"
                    IconRight={Store}
                />
            </Link>
        </div>
    )
}
