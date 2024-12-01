'use client'
import { FC, useEffect, useState } from 'react'
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
import { CustomButton } from '../custom/CustomButton'
import { HeartHandshake, RotateCw, Store } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { DataTable } from '../DataTable'
import { AssociationType } from '@/types/association'
import { FiltersAssociation } from './FiltersAssociation'
import { AssociationCard } from './AssociationCard'
import { defaultSchemaFilter, SchemaFilter } from '@/types/associationSchema'
import { fetchAssociations } from '@/lib/api/association/getAssociations'
import { useNotification } from '@/context/NotifContext'
import {
    NotificationType,
    TotalValueProps,
    TotalValues,
} from '@/types/GlobalType'
import { PartnerType } from '@/types/partnersType'
import { useQuery } from '@tanstack/react-query'
import PaginationData from '../utils/PaginationData'
import { AppRoutes } from '@/lib/routes'
import { columnsAssociationsTable } from './column/associationColumn'
import getArchivedPartners from '@/lib/api/partner/getArchiver'
import { fetchPartners } from '@/lib/api/partner/fetchPartners'
import { MyError } from '../Error'

interface AssociationsProps {}

export interface TableRowType {
    key: string
    label: string
}

export const Associations: FC<AssociationsProps> = ({}) => {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [associations, setAssociations] = useState<AssociationType[]>([])
    const [filterData, setFilterData] =
        useState<z.infer<typeof SchemaFilter>>(defaultSchemaFilter)
    const [totals, setTotals] = useState<TotalValueProps>(TotalValues)
    const [archive, setArchive] = useState(() => false)
    const [open, setOpen] = useState(false)
    const notify = useNotification()
    const router = useRouter()
    const { error, isLoading, isRefetching, refetch } = useQuery({
        queryKey: ['partners', totals.currentPage, totals.pageSize],
        queryFn: async () => {
            try {
                const data = await fetchPartners(
                    'ASSOCIATIONS',
                    totals.currentPage,
                    totals.pageSize,
                    filterData,
                    archive
                )
                if (data.status === 500)
                    throw new Error('Error fetching partners')
                setTotals((prev) => ({
                    ...prev,
                    totalElements: data.data.numberOfElements,
                    totalPages: data.data.totalPages,
                }))
                setAssociations(data.data.content)
                return data.data
            } catch (error) {
                notify.notify(NotificationType.ERROR, 'Error fetching partners')
                console.log(error)
                setAssociations([])
            }
        },
    })

    const form = useForm<z.infer<typeof SchemaFilter>>({
        resolver: zodResolver(SchemaFilter),
        mode: 'onBlur',
        defaultValues: defaultSchemaFilter,
    })

    const onSubmit = (data: z.infer<typeof SchemaFilter>) => {
        console.log('Filters:', data)
        setFilterData(data)
        setOpen(false)
    }

    const table = useReactTable({
        data: associations,
        columns: columnsAssociationsTable(router, archive, refetch),
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    // handleArchive function
    const handleArchive = () => {
        if (isRefetching || isLoading) return
        setArchive((prev) => !prev)
    }
    useEffect(() => {
        if (isLoading || isRefetching) return
        refetch()
    }, [archive, filterData])

    if (error) return <MyError message={error.message} />

    return (
        <div className="flex flex-col gap-[0.625rem] w-full px-2 lg:px-0 lg:pr-2 lg:mb-0 mb-4">
            <FiltersAssociation
                open={open}
                setOpen={setOpen}
                table={table}
                form={form}
                onSubmit={onSubmit}
                archive={archive}
                handleArchive={handleArchive}
                totalElements={totals.totalElements}
                isFetching={isLoading || isRefetching}
            />
            <DataTable
                data={associations}
                table={table}
                title="Liste des associations"
                transform={(value) => (
                    <AssociationCard
                        association={value}
                        archive={archive}
                        refetch={refetch}
                    />
                )}
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
            <div className="lg:hidden flex flex-col items-center gap-4 ">
                <CustomButton
                    size="default"
                    className="w-full"
                    label="Ajouter une association"
                    IconRight={HeartHandshake}
                    onClick={() =>
                        router.push(
                            AppRoutes.newAssociation.replace(':id', 'new')
                        )
                    }
                />
            </div>
        </div>
    )
}
