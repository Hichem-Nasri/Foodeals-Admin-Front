'use client'
import { CustomButton } from '@/components/custom/CustomButton'
import { DataTable } from '@/components/DataTable'
import { FilterAndCreatePartnerCollaborators } from '@/components/Partners/collaborators/FilterAndCreatePartnerCollaborators'
import { PartnerCollaboratesCard } from '@/components/Partners/collaborators/PartnerCollaboratorsCard'
import { columnsSubAccountTable } from '@/components/Partners/column/subentitiesColumn'
import { HeaderSubAccount } from '@/components/Partners/subAccount/HeaderSubAccount'
import PaginationData from '@/components/utils/PaginationData'
import { useNotification } from '@/context/NotifContext'
import { fetchSubEntities } from '@/lib/api/partner/fetchSubEntities'
import fetchSubPartner from '@/lib/api/partner/fetchSubPartner'
import { SchemaFilter, defaultSchemaFilter } from '@/types/associationSchema'
import {
    NotificationType,
    PartnerInfoDto,
    TotalValueProps,
    TotalValues,
} from '@/types/GlobalType'
import { SubAccountPartners } from '@/types/partnersType'
import { zodResolver } from '@hookform/resolvers/zod'
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
import React, { FC, Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { SubAccountCard } from './SubAccountCard'

interface SubAccountProps {
    id: string
}

const SubAccount: FC<SubAccountProps> = ({ id }) => {
    const [subAccount, setSubAccount] = useState<SubAccountPartners[]>([])
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([])
    const [totals, setTotals] = useState<TotalValueProps>(TotalValues)
    const notify = useNotification()
    const [archive, setArchive] = useState(false)
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [partner, setPartner] = useState<PartnerInfoDto & { city: string }>({
        name: '',
        avatarPath: '',
        id: '',
        city: '',
    })
    const [filterData, setFilterData] =
        useState<z.infer<typeof SchemaFilter>>(defaultSchemaFilter)
    const { data, isLoading, refetch, isRefetching, error } = useQuery({
        queryKey: ['subEntities', totals.currentPage, totals.pageSize],
        queryFn: async () => {
            try {
                const res = await fetchSubEntities(
                    id,
                    'PARTNERS',
                    totals.currentPage,
                    totals.pageSize,
                    filterData,
                    archive
                )
                if (res.status === 500)
                    throw new Error(
                        'Erreur lors de la récupération des partenais'
                    )
                const { partnerInfoDto, subentities } = res.data
                setPartner(partnerInfoDto)
                setTotals({
                    ...totals,
                    totalPages: subentities.totalPages,
                    totalElements: subentities.totalElements,
                })
                setSubAccount(subentities.content as SubAccountPartners[])
                return res.data
            } catch (e) {
                notify.notify(
                    NotificationType.ERROR,
                    'Erreur lors de la récupération des partenaires'
                )
                console.log(e)
                setSubAccount([])
            }
        },
        refetchOnWindowFocus: false,
    })
    const table = useReactTable({
        data: subAccount,
        columns: columnsSubAccountTable(router, archive, refetch, partner.id),
        state: {
            columnFilters,
        },
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    const form = useForm<z.infer<typeof SchemaFilter>>({
        resolver: zodResolver(SchemaFilter),
        mode: 'onBlur',
        defaultValues: filterData,
    })

    const onSubmit = (data: z.infer<typeof SchemaFilter>) => {
        console.log('Filters:', data)
        setFilterData(data)
        setOpen(false)
    }

    const handleArchive = () => {
        setArchive((prev) => !prev)
    }
    useEffect(() => {
        if (isLoading || isRefetching) return
        setTotals((prev) => ({
            ...prev,
            currentPage: 0,
        }))
        refetch()
    }, [archive, filterData])
    return (
        <div className="flex flex-col gap-[0.625rem] w-full px-3 lg:mb-0 mb-4 scroll">
            <HeaderSubAccount
                table={table}
                totalElements={totals.totalElements}
                archive={archive}
                handleArchive={handleArchive}
                isFetching={isLoading || isRefetching}
                form={form}
                onSubmit={onSubmit}
                open={open}
                setOpen={setOpen}
            />
            <DataTable
                title="Listes des sous comptes"
                table={table}
                data={subAccount}
                transform={(value) => (
                    <SubAccountCard
                        refetch={refetch}
                        partner={value}
                        archive={archive}
                        key={value.id}
                    />
                )}
                partnerData={{
                    ...partner,
                    avatar: partner.avatarPath,
                }}
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
        </div>
    )
}

export default SubAccount
