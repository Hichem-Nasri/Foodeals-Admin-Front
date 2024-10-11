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
import SwitchToggle from '@/components/ui/SwitchToggle'
import Link from 'next/link'
import { AppRoutes } from '@/lib/routes'
import { CustomButton } from '@/components/custom/CustomButton'
import { RotateCw, UserRoundPlus } from 'lucide-react'

// Define the API endpoint URL as a constant
const API_ENDPOINT = 'http://localhost:8080/api/v1/crm/prospects'

export default function Crm() {
    const [data, setData] = useState<CrmType[]>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

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
            <SwitchToggle />
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
            <CustomButton
                label="Voir plus"
                onClick={() => {
                    setPage(page + 1)
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
            {error && <div>Error: {error.message}</div>}
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
