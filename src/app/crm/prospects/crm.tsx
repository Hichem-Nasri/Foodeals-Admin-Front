// Import necessary modules and components
'use client'
import { CrmCardDetails } from '@/components/crm/CrmCard'
import { FilterCrm } from '@/components/crm/FilterCrm'
import { DataTable } from '@/components/DataTable'
import { columnCrmAssociations, columnsCrmTable } from '@/types/CrmType'
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
import { accessToken, getSolutions } from '@/lib/utils'
import api from '@/api/Auth'
import SwitchToggle from '@/components/ui/SwitchToggle'
import Link from 'next/link'
import { AppRoutes } from '@/lib/routes'
import { CustomButton } from '@/components/custom/CustomButton'
import { RotateCw, UserRoundPlus } from 'lucide-react'
import PaginationData from '@/components/utils/PaginationData'
import { CrmType, NotificationType } from '@/types/Global-Type'
import Statistics from '@/components/crm/Prospect/statistics'
import { DataTableSkeleton } from '@/components/TableSkeleton'
import SwitchProspects from '@/components/crm/Prospect/switchProspects'
import { useNotification } from '@/context/NotifContext'

// Define the API endpoint URL as a constant
const API_ENDPOINT = 'http://localhost:8080/api/v1/crm/prospects'

export default function Crm() {
    const [data, setData] = useState<CrmType[]>([])
    const [switchTable, setSetSwitchTable] = useState<
        'partenaires' | 'associations'
    >('partenaires')
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [totalPages, setTotalPages] = useState(0)
    const Notif = useNotification()
    const {
        data: query,
        isSuccess,
        isLoading,
        error,
        refetch,
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
                    .then((res) => res)
                    .catch((e) => {
                        throw new Error(e)
                    })
                if (response.status === 200) {
                    const data = response.data.content.map((crm: any) => {
                        return {
                            ...crm,
                            solutions: getSolutions(crm.solutions),
                        }
                    })
                    setData(data)
                }
                return response
            } catch (error) {
                Notif.notify(
                    NotificationType.ERROR,
                    "Erreur lors de l'obtention des données des prospects"
                )
                console.error(error)
            }
        },
    })
    const router = useRouter()
    const tableAssocciation = useReactTable({
        data,
        columns: columnCrmAssociations(router, setData),
        state: {
            columnFilters,
        },
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

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
    useEffect(() => {
        if (isSuccess) {
            setTotalPages(query?.data.totalPages)
        }
        if (totalPages !== 0) {
            refetch()
        }
    }, [currentPage, pageSize])
    if (error) return <div>Error: {error.message}</div>
    console.log(data)

    return (
        <div className="flex flex-col gap-3 w-full p-1">
            <SwitchProspects data={data} setData={setData} />
            <Statistics />
            <FilterCrm
                data={data || query}
                table={
                    switchTable === 'partenaires' ? table : tableAssocciation
                }
                columnFilters={columnFilters}
                setColumnFilters={setColumnFilters}
            />
            {isLoading ? (
                <DataTableSkeleton columnCount={5} rowCount={5} />
            ) : (
                <DataTable
                    table={
                        switchTable === 'partenaires'
                            ? table
                            : tableAssocciation
                    }
                    data={data || query}
                    title="Listes des prospects"
                    transform={(data: any) => <CrmCardDetails crm={data} />}
                />
            )}
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
