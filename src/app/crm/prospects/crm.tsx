// Import necessary modules and components
'use client'
import { CrmCardDetails } from '@/components/crm/CrmCard'
import { FilterCrm } from '@/components/crm/FilterCrm'
import { DataTable } from '@/components/DataTable'
import { columnsCrmTable } from '@/types/CrmType'
import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { setDate } from 'date-fns'
import { accessToken } from '@/lib/utils'
import api from '@/api/Auth'
import SwitchToggle from '@/components/ui/SwitchToggle'
import Link from 'next/link'
import { AppRoutes } from '@/lib/routes'
import { CustomButton } from '@/components/custom/CustomButton'
import { RotateCw, UserRoundPlus } from 'lucide-react'
import PaginationData from '@/components/utils/PaginationData'
import { CrmType } from '@/types/Global-Type'
import Statistics from '@/components/crm/Prospect/statistics'

// Define the API endpoint URL as a constant
const API_ENDPOINT = 'http://localhost:8080/api/v1/crm/prospects'

export default function Crm() {
    const [data, setData] = useState<CrmType[]>([])
    const [setSwitchTable, setSetSwitchTable] = useState<
        'partenaires' | 'associations'
    >('partenaires')
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [totalPages, setTotalPages] = useState(0)

    const {
        data: query,
        isSuccess,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['prospects', currentPage, pageSize],
        queryFn: async () => {
            try {
                const response = await api
                    .get(
                        `${API_ENDPOINT}?page=${
                            currentPage - 1
                        }&size=${pageSize}&sort=createdAt,desc`
                    )
                    .then((res) => res.data)
                    .catch((e) => console.error(e))
                if (response) {
                    setTotalPages(response.totalPages)
                    setData(response.content)
                }
                return response.content
            } catch (error) {
                console.error(error)
                throw error
            }
        },
    })
    const router = useRouter()

    const table = useReactTable({
        data,
        columns: columnsCrmTable(router, setData),
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
    if (error) return <div>Error: {error.message}</div>
    console.log(data)

    return (
        <div className="flex flex-col gap-3 w-full p-1">
            <SwitchToggle setSwitchTable={setSetSwitchTable} />
            <Statistics />
            <FilterCrm
                data={data || query}
                table={table}
                columnFilters={columnFilters}
                setColumnFilters={setColumnFilters}
            />
            <DataTable
                table={table}
                data={data || query}
                title="Listes des prospects"
                transform={(data: any) => <CrmCardDetails crm={data} />}
            />
            <CustomButton
                label="Voir plus"
                onClick={() => {
                    // setPage(page + 1)
                }}
                className="lg:hidden flex w-fit self-center px-[18px] py-1.5 h-auto hover:text-white hover:bg-lynch-400 rounded-full justify-center bg-transparent text-lynch-400 border-2 border-lynch-400 text-md font-base transition-all"
                IconRight={RotateCw}
            />
            <Link
                href={AppRoutes.newProspect}
                className="lg:hidden grid w-full"
            >
                <CustomButton
                    size="lg"
                    className="h-16 rounded-xl"
                    label="Ajouter une prospect"
                    IconRight={UserRoundPlus}
                />
            </Link>
            <PaginationData
                className="items-center"
                setData={setData}
                url={API_ENDPOINT}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={pageSize}
            />
            {/* {error && <div>Error: {error.message}</div>} */}
        </div>
    )
}

const fetchMore = async (page: number, pageSize: number) => {
    try {
        const response = await api
            .get(API_ENDPOINT, {
                headers: {
                    pageNum: page,
                    pageSize: pageSize,
                },
            })
            .then((res) => res.data)
            .catch((error) => {
                throw new Error(error)
            })
        return response
    } catch (error) {
        console.error(error)
        throw error
    }
}
