'use client'
import CrmDemandesCard from '@/components/crm/Demandes/CrmDemandesCard'
import FilterCrmDemandes from '@/components/crm/Demandes/filterCrmDemandes'
import { FilterTableDemandes } from '@/components/crm/Demandes/FilterTableDemandes'
import SwitchToggleDemandes from '@/components/crm/Demandes/SwitchToggle'
import { CustomButton } from '@/components/custom/CustomButton'
import { DataTable } from '@/components/DataTable'
import { ColumnVisibilityModal } from '@/components/Partners/ColumnVisibilityModal'
import {
    columnCrmAssociations,
    columnsDemandeTable,
    CrmDemandeType,
} from '@/types/CrmType'
import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import router from 'next/router'
import React, { Fragment } from 'react'

const demoData: CrmDemandeType[] = [
    {
        id: '1',
        companyName: 'Company 1',
        activity: ['Activity 1'],
        country: 'Country 1',
        city: 'City 1',
        role: 'Role 1',
        date: '2024-08-08T00:00:00.000Z',
        respansable: 'Respansable 1',
        address: 'Address 1',
        email: 'Email 1',
        phone: 'Phone 1',
    },
    {
        id: '2',
        companyName: 'Company 2',
        activity: ['Activity 2'],
        country: 'Country 2',
        city: 'City 2',
        role: 'Role 2',
        date: '2024-08-08T00:00:00.000Z',
        respansable: 'Respansable 2',
        address: 'Address 2',
        email: 'Email 2',
        phone: 'Phone 2',
    },
    {
        id: '3',
        companyName: 'Company 3',
        activity: ['Activity 3'],
        country: 'Country 3',
        city: 'City 3',
        role: 'Role 3',
        date: '2024-08-08T00:00:00.000Z',
        respansable: 'Respansable 3',
        address: 'Address 3',
        email: 'Email 3',
        phone: 'Phone 3',
    },
    {
        id: '4',
        companyName: 'Company 4',
        activity: ['Activity 4'],
        country: 'Country 4',
        city: 'City 4',
        role: 'Role 4',
        date: '2024-08-08T00:00:00.000Z',
        respansable: 'Respansable 4',
        address: 'Address 4',
        email: 'Email 4',
        phone: 'Phone 4',
    },
    {
        id: '5',
        companyName: 'Company 5',
        activity: ['Activity 5'],
        country: 'Country 5',
        city: 'City 5',
        role: 'Role 5',
        date: '2024-08-08T00:00:00.000Z',
        respansable: 'Respansable 5',
        address: 'Address 5',
        email: 'Email 5',
        phone: 'Phone 5',
    },
    {
        id: '6',
        companyName: 'Company 6',
        activity: ['Activity 6'],
        country: 'Country 6',
        city: 'City 6',
        role: 'Role 6',
        date: '2024-08-08T00:00:00.000Z',
        respansable: 'Respansable 6',
        address: 'Address 6',
        email: 'Email 6',
        phone: 'Phone 6',
    },
]

const CrmDemandes = () => {
    const data: CrmDemandeType[] = demoData
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([])
    const router = useRouter()
    const table = useReactTable({
        data,
        columns: columnsDemandeTable(router),
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
            <SwitchToggleDemandes />
            <FilterCrmDemandes
                data={data}
                table={table}
                columnFilters={columnFilters}
                setColumnFilters={setColumnFilters}
            />
            <DataTable
                table={table}
                data={data}
                title="Listes des demandes"
                transform={(data: any) => <CrmDemandesCard />}
            />
        </div>
    )
}

export default CrmDemandes
