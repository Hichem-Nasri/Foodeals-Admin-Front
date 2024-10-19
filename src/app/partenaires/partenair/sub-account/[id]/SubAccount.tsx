'use client'
import { CustomButton } from '@/components/custom/CustomButton'
import { DataTable } from '@/components/DataTable'
import { FilterAndCreatePartnerCollaborators } from '@/components/Partners/collaborators/FilterAndCreatePartnerCollaborators'
import { PartnerCollaboratesCard } from '@/components/Partners/collaborators/PartnerCollaboratorsCard'
import { HeaderSubAccount } from '@/components/Partners/subAccount/HeaderSubAccount'
import {
    columnsSubAccountTable,
    SubAccountData,
    SubAccountPartners,
} from '@/types/partners'
import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { table } from 'console'
import { RotateCw, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const SubAccount = () => {
    const data: SubAccountPartners[] = SubAccountData
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([])
    const router = useRouter()
    const table = useReactTable({
        data,
        columns: columnsSubAccountTable(router),
        state: {
            columnFilters,
        },
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })
    const partnerData = {
        id: 1,
        name: 'Marjane',
        avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=MarjaneGourmet',
        city: 'Casablanca',
    }
    return (
        <div className="flex flex-col gap-[0.625rem] w-full px-3 lg:mb-0 mb-4 scroll">
            <HeaderSubAccount collaborators={data} table={table} />
            <DataTable
                title="Listes des sous comptes"
                table={table}
                data={data}
                transform={(value) => (
                    <PartnerCollaboratesCard partner={value} key={value.id} />
                )}
                partnerData={partnerData}
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
                    label="Retour"
                    className="w-full"
                    IconLeft={ArrowLeft}
                />
            </div>
        </div>
    )
}

export default SubAccount
