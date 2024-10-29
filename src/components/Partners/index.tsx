'use client'
import { columnsPartnersTable, PartnerType } from '@/types/partners'
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
    const notify = useNotification()
    const router = useRouter()
    const { error, isLoading, refetch } = useQuery({
        queryKey: ['partners', currentPage, pageSize],
        queryFn: async () => {
            try {
                const data = await fetchPartners(currentPage, pageSize)
                if (data.status === 500)
                    throw new Error('Error fetching partners')
                setTotalPages(data.data.totalPages)
                setPartners(data.data.content as PartnerType[])
                return data.data
            } catch (error) {
                notify.notify(NotificationType.ERROR, 'Error fetching partners')
                console.log(error)
                setPartners([])
            }
        },
    })

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
    useEffect(() => {
        if (archive) {
            const fetchArchive = async () => {
                try {
                    const response = await api
                        .get(
                            `${API_PARTNERS}/deleted?page=0&size=20&sort=deletedAt,desc`
                        )
                        .then((res) => res.data)
                        .catch((error) => {
                            throw new Error(error)
                        })
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
    if (isLoading) return <div>Loading...</div>
    return (
        <div className="flex flex-col gap-[0.625rem] items-center w-full px-3 lg:mb-0 mb-4">
            <FilterAndCreatePartners
                table={table}
                partners={partners!}
                setColumnFilters={setColumnFilters}
                setArchive={setArchive}
                archive={archive}
            />

            <DataTable
                data={partners!}
                table={table}
                title="Listes des partenaires"
                transform={(value) => (
                    <PartnerCard partner={value} key={value.id} />
                )}
            />
            {archive && partners.length === 0 ? (
                <div className="flex flex-col items-center gap-4">
                    <h2 className="text-lg font-semibold text-lynch-950">
                        Aucun partenaire archivé
                    </h2>
                </div>
            ) : null}
            {/* <PaginationData /> */}
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
