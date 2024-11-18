'use client'

import { FC, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { RotateCw, Store } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { SiegesType } from '@/types/association'
import { CustomButton } from '@/components/custom/CustomButton'
import { DataTable } from '@/components/DataTable'
import { FiltersAssociation } from '../FiltersAssociation'
import { SiegeCard } from './SiegeCard'
import { defaultSchemaFilter, SchemaFilter } from '@/types/associationSchema'
import { columnsSiegesTable, siegesData } from '../column/siegeColumn'
import { useNotification } from '@/context/NotifContext'
import {
    NotificationType,
    TotalValueProps,
    TotalValues,
} from '@/types/GlobalType'
import { useQuery } from '@tanstack/react-query'
import { arch } from 'os'
import PaginationData from '@/components/utils/PaginationData'
import { fetchSieages } from '@/lib/api/association/getSieages'

interface SiegesProps {
    id: string
}

export interface TableRowType {
    key: string
    label: string
}

export const Sieges: FC<SiegesProps> = ({ id }) => {
    const [sieges, setSieges] = useState<SiegesType[]>(siegesData)
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [filterData, setFilterData] =
        useState<z.infer<typeof SchemaFilter>>(defaultSchemaFilter)
    const [open, setOpen] = useState(false)
    const [totals, setTotals] = useState<TotalValueProps>(TotalValues)
    const [archive, setArchive] = useState(false)
    const notify = useNotification()
    const router = useRouter()
    const { error, isLoading, isRefetching, refetch } = useQuery({
        queryKey: ['partners', totals.currentPage, totals.pageSize],
        queryFn: async () => {
            try {
                const data = await fetchSieages(
                    id,
                    totals.currentPage,
                    totals.pageSize
                )
                if (data.status === 500)
                    throw new Error('Error fetching partners')
                setTotals({
                    ...totals,
                    totalPages: data.data?.totalPages,
                    totalElements: data.data?.totalElements,
                })
                setSieges(data.data?.content)
                return data.data
            } catch (error) {
                notify.notify(NotificationType.ERROR, 'Error fetching partners')
                console.log(error)
                setSieges([])
            }
        },
    })

    // handleArchive function
    const handleArchive = () => {
        // fetching Archived associations
        setArchive((prev) => !prev)
    }

    const form = useForm<z.infer<typeof SchemaFilter>>({
        resolver: zodResolver(SchemaFilter),
        mode: 'onBlur',
        defaultValues: filterData,
    })

    const onSubmit = (data: z.infer<typeof SchemaFilter>) => {
        setFilterData(data)
        setOpen(false)
    }

    const table = useReactTable({
        data: sieges,
        columns: columnsSiegesTable(router),
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    return (
        <div className="flex flex-col gap-[0.625rem] w-full px-3 lg:mb-0 mb-4">
            <FiltersAssociation
                table={table}
                form={form}
                onSubmit={onSubmit}
                archive={archive}
                handleArchive={handleArchive}
                open={open}
                setOpen={setOpen}
                totalElements={totals.totalElements}
                isFetching={isLoading || isRefetching}
                siege
            />
            <DataTable
                data={sieges}
                table={table}
                title="Liste des sièges"
                transform={(value) => <SiegeCard sieges={value} />}
                isLoading={isLoading || isRefetching}
            />
            <PaginationData
                pageSize={totals.pageSize}
                currentPage={totals.currentPage}
                totalPages={totals.totalPages}
                setCurrentPage={(page) =>
                    setTotals({ ...totals, currentPage: page })
                }
                refetch={refetch}
            />
        </div>
    )
}
