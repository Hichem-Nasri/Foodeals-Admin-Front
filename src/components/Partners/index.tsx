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
import { useQuery } from '@tanstack/react-query'
import api from '@/api/Auth'
import { API_PARTNERS } from '@/lib/api_url'
import { fetchPartners } from '@/lib/api/partner/fetchPartners'
import { useNotification } from '@/context/NotifContext'
import { NotificationType } from '@/types/GlobalType'
import { columnsPartnersTable } from './column/partnerColumn'
import PaginationData from '../utils/PaginationData'
import { SchemaFilter, defaultSchemaFilter } from '@/types/associationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { set } from 'date-fns'
import getArchivedPartners from '@/lib/api/partner/getArchiver'

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
    const [currentPage, setCurrentPage] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const [totalPages, setTotalPages] = useState(0)
    const [totalElements, setTotalElements] = useState(0)
    const [filterData, setFilterData] =
        useState<z.infer<typeof SchemaFilter>>(defaultSchemaFilter)
    const [open, setOpen] = useState(false)
    const notify = useNotification()
    const router = useRouter()
    const { error, isLoading, refetch } = useQuery({
        queryKey: ['partners', currentPage, pageSize],
        queryFn: async () => {
            try {
                const data = await fetchPartners(
                    currentPage,
                    pageSize,
                    filterData
                )
                if (data.status === 500)
                    throw new Error('Error fetching partners')
                setTotalPages(data.data.totalPages)
                setTotalElements(data.data.totalElements)
                setPartners(data.data.content as PartnerType[])
                return data.data
            } catch (error) {
                notify.notify(NotificationType.ERROR, 'Error fetching partners')
                console.log(error)
                setPartners([])
            }
        },
    })

    const form = useForm<z.infer<typeof SchemaFilter>>({
        resolver: zodResolver(SchemaFilter),
        mode: 'onBlur',
        defaultValues: filterData,
    })

    const onSubmit = (data: z.infer<typeof SchemaFilter>) => {
        console.log('Filters:', data)
        setOpen(false)
    }

    const table = useReactTable({
        data: partners || [],
        columns: columnsPartnersTable(router),
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
    useEffect(() => {
        if (archive) {
            const fetchArchive = async () => {
                setCurrentPage(() => 0)
                try {
                    const response = await getArchivedPartners(
                        'NORMAL_PARTNER,PARTNER_WITH_SB',
                        currentPage,
                        pageSize
                    )
                    setTotalPages(response.totalPages)
                    setTotalElements(response.totalElements)
                    const data = response.content as PartnerType[]
                    setPartners(data)
                } catch (error) {
                    notify.notify(
                        NotificationType.ERROR,
                        'Error fetching partners'
                    )
                    setPartners([])
                    console.log(error)
                }
            }
            fetchArchive()
        } else {
            refetch()
        }
    }, [archive])
    return (
        <div className="flex flex-col gap-[0.625rem] items-center w-full px-3 lg:mb-0 mb-4">
            <FilterAndCreatePartners
                form={form}
                onSubmit={onSubmit}
                setOpen={setOpen}
                open={open}
                table={table}
                setArchive={setArchive}
                archive={archive}
                totalElements={totalElements}
            />

            <DataTable
                data={partners!}
                table={table}
                title="Listes des partenaires"
                transform={(value) => (
                    <PartnerCard partner={value} key={value.id} />
                )}
                isLoading={isLoading}
            />
            <PaginationData
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                refetch={refetch}
            />
            <div className="lg:hidden flex flex-col items-center gap-4 ">
                <CustomButton
                    size="sm"
                    label="Voir plus"
                    className="text-sm font-semibold rounded-full border-lynch-400 text-lynch-400 py-[0.375rem] px-5"
                    variant="outline"
                    IconRight={RotateCw}
                />
                <CustomButton
                    label="Ajouter un partenaire"
                    className="w-full"
                    IconRight={Store}
                />
            </div>
        </div>
    )
}
