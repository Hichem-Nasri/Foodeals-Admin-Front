'use client'
import { columnsPartnersTable, PartnerType } from '@/types/partners'
import React, { FC, useState } from 'react'
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
import axios from 'axios'
import { exportAllPartnerGET, PartnerGET } from '@/types/partenairUtils'
import api from '@/api/Auth'
// import { exportAllPartnerGET, PartnerGET } from '@/types/partenairUtils'

const API_ENDPOINT = 'localhost:8080/api/v1/organizations/partners'
interface PartnersProps {
    partners: PartnerType[]
}

export interface TableRowType {
    key: string
    label: string
}

export const Partners: FC<PartnersProps> = ({ partners }) => {
    const [partnersData, setPartnersData] = useState<PartnerType[]>(partners)
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [currentPage, setCurrentPage] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const [totalPages, setTotalPages] = useState(0)
    const router = useRouter()
    const { data, error, isLoading } = useQuery({
        queryKey: ['partners', currentPage, pageSize],
        queryFn: async () => {
            try {
                const res = await api
                    .get(
                        `http://${API_ENDPOINT}?page=${currentPage}&size=${pageSize}`
                    )
                    .then((res) => res.data)
                    .catch((err) => {
                        throw new Error(err)
                    })
                console.log('res: ', res)
                return exportAllPartnerGET(res.content as PartnerGET[])
            } catch (error) {
                console.log(error)
            }
        },
    })

    const table = useReactTable({
        data: data || [],
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
    if (isLoading) return <div>Loading...</div>
    console.log('data', data)
    return (
        <div className="flex flex-col gap-[0.625rem] items-center w-full px-3 lg:mb-0 mb-4">
            <FilterAndCreatePartners
                table={table}
                partners={data!}
                setColumnFilters={setColumnFilters}
            />
            <DataTable
                data={data!}
                table={table}
                title="Listes des partenaires"
                transform={(value) => (
                    <PartnerCard partner={value} key={value.id} />
                )}
            />
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
