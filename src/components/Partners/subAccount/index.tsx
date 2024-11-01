'use client'
import { CustomButton } from '@/components/custom/CustomButton'
import { DataTable } from '@/components/DataTable'
import { FilterAndCreatePartnerCollaborators } from '@/components/Partners/collaborators/FilterAndCreatePartnerCollaborators'
import { PartnerCollaboratesCard } from '@/components/Partners/collaborators/PartnerCollaboratorsCard'
import { columnsSubAccountTable } from '@/components/Partners/column/subentitiesColumn'
import { HeaderSubAccount } from '@/components/Partners/subAccount/HeaderSubAccount'
import { useNotification } from '@/context/NotifContext'
import fetchSubPartner from '@/lib/api/partner/fetchSubPartner'
import { NotificationType } from '@/types/GlobalType'
import { SubAccountPartners } from '@/types/partnersType'
import { useQuery } from '@tanstack/react-query'
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
import React, { FC, useState } from 'react'

interface SubAccountProps {
    id: string
}

const SubAccount: FC<SubAccountProps> = ({ id }) => {
    const [subAccount, setSubAccount] = useState<SubAccountPartners[]>([])
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([])
    const [currentPage, setCurrentPage] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const [totalPages, setTotalPages] = useState(0)
    const notify = useNotification()
    const router = useRouter()
    const { data, isLoading, error } = useQuery({
        queryKey: ['subEntities', id],
        queryFn: async () => {
            try {
                const res = await fetchSubPartner(id, currentPage, pageSize)
                if (res.status === 500)
                    throw new Error('Error fetching partners')
                setTotalPages(res.data.totalPages)
                setSubAccount(res.data.content as SubAccountPartners[])
                return res.data
            } catch (e) {
                notify.notify(NotificationType.ERROR, 'Error fetching partners')
                console.log(e)
                setSubAccount([])
            }
        },
    })
    const table = useReactTable({
        data: subAccount,
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
            <HeaderSubAccount collaborators={subAccount} table={table} />
            <DataTable
                title="Listes des sous comptes"
                table={table}
                data={subAccount}
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
