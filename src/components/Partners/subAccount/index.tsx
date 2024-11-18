'use client'
import { CustomButton } from '@/components/custom/CustomButton'
import { DataTable } from '@/components/DataTable'
import { FilterAndCreatePartnerCollaborators } from '@/components/Partners/collaborators/FilterAndCreatePartnerCollaborators'
import { PartnerCollaboratesCard } from '@/components/Partners/collaborators/PartnerCollaboratorsCard'
import { columnsSubAccountTable } from '@/components/Partners/column/subentitiesColumn'
import { HeaderSubAccount } from '@/components/Partners/subAccount/HeaderSubAccount'
import PaginationData from '@/components/utils/PaginationData'
import { useNotification } from '@/context/NotifContext'
import fetchSubPartner from '@/lib/api/partner/fetchSubPartner'
import {
    NotificationType,
    TotalValueProps,
    TotalValues,
} from '@/types/GlobalType'
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
import React, { FC, Fragment, useState } from 'react'

interface SubAccountProps {
    id: string
}

const SubAccount: FC<SubAccountProps> = ({ id }) => {
    const [subAccount, setSubAccount] = useState<SubAccountPartners[]>([])
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([])
    const [totals, setTotals] = useState<TotalValueProps>(TotalValues)
    const notify = useNotification()
    const router = useRouter()
    const { data, isLoading, refetch, isRefetching, error } = useQuery({
        queryKey: ['subEntities', id],
        queryFn: async () => {
            try {
                const res = await fetchSubPartner(
                    id,
                    totals.currentPage,
                    totals.pageSize
                )
                if (res.status === 500)
                    throw new Error('Error fetching partners')
                setTotals({
                    ...totals,
                    totalPages: res.data.totalPages,
                    totalElements: res.data.totalElements,
                })
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
    // const partnerData = {
    //     id: 1,
    //     name: 'Marjane',
    //     avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=MarjaneGourmet',
    //     city: 'Casablanca',
    // }
    return (
        <div className="flex flex-col gap-[0.625rem] w-full px-3 lg:mb-0 mb-4 scroll">
            <HeaderSubAccount
                collaborators={subAccount}
                table={table}
                totalElements={totals.totalElements}
            />
            <DataTable
                title="Listes des sous comptes"
                table={table}
                data={subAccount}
                transform={(value) => <Fragment key={value.id} />}
                back={false}
                isLoading={isLoading || isRefetching}
                hideColumns={['contractStatus']}
            />
            <PaginationData
                currentPage={totals.currentPage}
                totalPages={totals.totalPages}
                setCurrentPage={(page) =>
                    setTotals({ ...totals, currentPage: page })
                }
                pageSize={totals.pageSize}
                refetch={refetch}
            />
            <div className="lg:hidden flex flex-col items-center gap-4 ">
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
