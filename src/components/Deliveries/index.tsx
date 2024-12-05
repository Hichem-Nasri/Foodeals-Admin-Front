'use client'

import { FC, useEffect, useState } from 'react'

import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { CustomButton } from '../custom/CustomButton'
import { Store } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { DataTable } from '../DataTable'
import { DeliveryType } from '@/types/deliveries'
import { FiltersDeliveries } from './FilterDeliveries'
import { DeliveryCard } from './DeliveryCard'
import { useNotification } from '@/context/NotifContext'
import {
    NotificationType,
    TotalValueProps,
    TotalValues,
} from '@/types/GlobalType'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import PaginationData from '../utils/PaginationData'
import { columnsDeliveriesTable } from './column/deliveryColumn'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Link from 'next/link'
import { AppRoutes } from '@/lib/routes'
import { fetchPartners } from '@/lib/api/partner/fetchPartners'
import { defaultSchemaFilter, SchemaFilter } from '@/types/associationSchema'
interface DeliveriesProps {}

export interface TableRowType {
    key: string
    label: string
}

export const Deliveries: FC<DeliveriesProps> = ({}) => {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [deliveries, setDeliveries] = useState<DeliveryType[]>([])
    const [totals, setTotals] = useState<TotalValueProps>(TotalValues)
    const [FilterData, setFilterData] =
        useState<z.infer<typeof SchemaFilter>>(defaultSchemaFilter)
    const [open, setOpen] = useState(false)
    const notify = useNotification()
    const router = useRouter()
    const [archive, setArchive] = useState(false)

    const { error, isLoading, isRefetching, refetch } = useQuery({
        queryKey: ['partners', totals.currentPage, totals.pageSize],
        queryFn: async (data: any) => {
            try {
                const data = await fetchPartners(
                    'DELIVERIES',
                    totals.currentPage,
                    totals.pageSize,
                    FilterData,
                    archive
                )
                if (data.status === 500) {
                    throw new Error(
                        'Erreur lors de la récupération des partenaires'
                    )
                }
                console.log('data', data)
                setTotals((prev) => ({
                    ...prev,
                    totalPages: data.data.totalPages,
                    totalElements: data.data.totalElements,
                }))
                setDeliveries(data.data.content)
                return data.data
            } catch (error) {
                notify.notify(
                    NotificationType.ERROR,
                    'Erreur lors de la récupération des partenaires'
                )
                console.log(error)
                setDeliveries([])
            }
        },
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    })

    const form = useForm<z.infer<typeof SchemaFilter>>({
        resolver: zodResolver(SchemaFilter),
        mode: 'onBlur',
        defaultValues: FilterData,
    })

    const onSubmit = (data: z.infer<typeof SchemaFilter>) => {
        setFilterData(data)
        setOpen(false)
    }

    const table = useReactTable({
        data: deliveries,
        columns: columnsDeliveriesTable(router, archive, refetch),
        state: {
            columnFilters,
        },
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })
    const handleArchive = () => {
        if (isRefetching || isLoading) return
        setArchive((prev) => !prev)
    }

    useEffect(() => {
        if (isLoading || isRefetching) return
        refetch()
    }, [archive, FilterData])

    return (
        <div className="flex flex-col gap-[0.625rem] w-full px-3 lg:px-0 lg:pr-2 lg:mb-0 mb-4">
            <FiltersDeliveries
                onSubmit={onSubmit}
                table={table}
                form={form}
                handleArchive={handleArchive}
                archive={archive}
                totalElements={totals.totalElements}
                open={open}
                setOpen={setOpen}
                isFetching={isLoading || isRefetching}
            />
            <DataTable
                data={deliveries}
                table={table}
                title="Liste des partenaires de livraison"
                transform={(value) => (
                    <DeliveryCard
                        delivery={value}
                        archive={archive}
                        refetch={refetch}
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
                href={AppRoutes.newDelivery.replace(':id', 'new')}
                className="lg:hidden flex flex-col items-center gap-4 "
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
