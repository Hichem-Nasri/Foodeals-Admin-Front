// Import necessary modules and components
'use client'
import { CrmCardDetails } from '@/components/crm/CrmCard'
import { FilterCrm } from '@/components/crm/FilterCrm'
import { DataTable } from '@/components/DataTable'
import { columnsCrmTable, CrmType, defaultDataCrmTable } from '@/types/CrmType'
import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Statistics from './statistics'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { DataToCrmObj } from '@/types/CrmUtils'
import { setDate } from 'date-fns'
import { accessToken } from '@/lib/utils'
import api from '@/api/Auth'

// Define the API endpoint URL as a constant
const API_ENDPOINT = 'http://localhost:8080/api/v1/crm/prospects'

export default function Crm() {
    const [data, setData] = useState<CrmType[]>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const {
        data: query,
        isSuccess,
        error, // TODO: add skeleton loader
    } = useQuery({
        queryKey: ['crm'],
        queryFn: async () => {
            try {
                const response = await api.get(API_ENDPOINT)
                return response.data
            } catch (error) {
                console.error(error)
                throw error
            }
        },
    })

    React.useEffect(() => {
        if (isSuccess && query) {
            setData(DataToCrmObj(query.content)!)
        }
    }, [isSuccess, query])

    const router = useRouter()

    const table = useReactTable({
        data,
        columns: columnsCrmTable(router),
        state: {
            columnFilters,
        },
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    return (
        <div className="flex flex-col gap-3 w-full p-1">
            <Statistics />
            <FilterCrm
                table={table}
                columnFilters={columnFilters}
                setColumnFilters={setColumnFilters}
            />
            <DataTable
                table={table}
                data={data}
                title="Listes des prospects"
                transform={(data: any) => <CrmCardDetails crm={data} />}
            />
            {error && <div>Error: {error.message}</div>}
        </div>
    )
}
