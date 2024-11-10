// Import necessary modules and components
'use client'
import { CrmCardDetails } from '@/components/crm/CrmCard'
import { FilterCrm } from '@/components/crm/FilterCrm'
import { DataTable } from '@/components/DataTable'
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
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { AppRoutes } from '@/lib/routes'
import { CustomButton } from '@/components/custom/CustomButton'
import { UserRoundPlus } from 'lucide-react'
import PaginationData from '@/components/utils/PaginationData'
import { NotificationType } from '@/types/GlobalType'
import Statistics from '@/components/crm/Prospect/statistics'
import { DataTableSkeleton } from '@/components/TableSkeleton'
import SwitchProspects from '@/components/crm/Prospect/switchProspects'
import { useNotification } from '@/context/NotifContext'
import { fetchProspect } from '@/lib/api/crm/prospect/getProspects'
import {
    columnCrmAssociations,
    columnsCrmTable,
} from '@/components/crm/Prospect/column/ProspectColumn'
import { CrmType } from '@/types/CrmType'

export default function Crm() {
    const [data, setData] = useState<CrmType[]>([])
    const [switchTable, setSetSwitchTable] = useState<
        'partenaires' | 'associations'
    >('partenaires')
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [currentPage, setCurrentPage] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const [totalPages, setTotalPages] = useState(0)
    const [totalElements, setTotalElements] = useState(0)
    const [leadKo, setLeadKo] = useState(true)

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
                const response = await fetchProspect(
                    currentPage,
                    pageSize,
                    leadKo
                )
                if (response.status === 500) {
                    throw new Error('Error while fetching data')
                }
                setData(response.data.content)
                setTotalElements(response.data.totalElements)
                setTotalPages(response.data.totalPages)
                return response
            } catch (error) {
                Notif.notify(
                    NotificationType.ERROR,
                    "Erreur lors de l'obtention des données des prospects"
                )
                setData([])
                console.error(error)
            }
        }, // Todo: add keepData for paginantion
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
    const handleArchive = () => {
        setLeadKo((prev: boolean) => !prev)
        refetch()
    }
    if (error) return <div>Error: {error.message}</div>
    console.log('totalPages', totalPages)
    return (
        <div className="flex flex-col gap-3 w-full p-1">
            <SwitchProspects data={data} setData={setData} />
            <Statistics />
            <FilterCrm
                data={data}
                table={
                    switchTable === 'partenaires' ? table : tableAssocciation
                }
                columnFilters={columnFilters}
                setColumnFilters={setColumnFilters}
                leadKo={leadKo}
                handleArchive={handleArchive}
                totalElements={totalElements}
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
                    data={data}
                    title="Listes des prospects"
                    transform={(data: any) => <CrmCardDetails crm={data} />}
                />
            )}
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
                refetch={refetch}
            />
        </div>
    )
}
