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
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { AppRoutes } from '@/lib/routes'
import { CustomButton } from '@/components/custom/CustomButton'
import { UserRoundPlus } from 'lucide-react'
import PaginationData from '@/components/utils/PaginationData'
import {
    NotificationType,
    TotalValueProps,
    TotalValues,
} from '@/types/GlobalType'
import Statistics from '@/components/crm/Prospect/statistics'
import SwitchProspects from '@/components/crm/Prospect/switchProspects'
import { useNotification } from '@/context/NotifContext'
import { fetchProspect } from '@/lib/api/crm/prospect/getProspects'
import {
    columnCrmAssociations,
    columnsCrmTable,
} from '@/components/crm/Prospect/column/ProspectColumn'
import { CrmType } from '@/types/CrmType'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { emptyFilterCrmData, FilterCrmSchema } from '@/types/CrmScheme'
import { zodResolver } from '@hookform/resolvers/zod'
import { PartnerStatusType } from '@/types/partnersType'
import { set } from 'date-fns'
import { MyError } from '../Error'

export default function Crm() {
    const [data, setData] = useState<CrmType[]>([])
    const [switchTable, setSwitchTable] = useState<
        'partenaires' | 'associations'
    >('partenaires')
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [totals, setTotals] = useState<TotalValueProps>(TotalValues)
    const [leadKo, setLeadKo] = useState(false)
    const [filterData, setFilterData] =
        useState<z.infer<typeof FilterCrmSchema>>(emptyFilterCrmData)
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const FilterForm = useForm<z.infer<typeof FilterCrmSchema>>({
        resolver: zodResolver(FilterCrmSchema),
        mode: 'onBlur',
        defaultValues: emptyFilterCrmData,
    })

    const onSubmit = (data: z.infer<typeof FilterCrmSchema>) => {
        console.log('Filter', data)
        setFilterData(data)
        setOpen(false)
    }

    const Notif = useNotification()
    const {
        data: query,
        isLoading,
        isRefetching,
        error,
        refetch,
    } = useQuery({
        queryKey: ['prospects', totals.currentPage, totals.pageSize],
        queryFn: async () => {
            try {
                const response = await fetchProspect(
                    totals.currentPage,
                    totals.pageSize,
                    filterData,
                    switchTable === 'partenaires'
                        ? 'PARTNER'
                        : 'ASSOCIATION,FOOD_BANK'
                ) // TODO: check teh pagination work with the filter
                if (response.status === 500) {
                    throw new Error('Error while fetching data')
                }
                setData(response.data.content)
                setTotals({
                    ...totals,
                    totalPages: response.data.totalPages,
                    totalElements: response.data.totalElements,
                })
                return response
            } catch (error) {
                Notif.notify(
                    NotificationType.ERROR,
                    "Erreur lors de l'obtention des données des prospects"
                )
                setData([])
                console.error(error)
            }
        },
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    })
    const tableAssocciation = useReactTable({
        data,
        columns: columnCrmAssociations(router, setData, leadKo, refetch),
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
        columns: columnsCrmTable(router, setData, leadKo, refetch),
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
        setFilterData((prev) => {
            return {
                ...prev,
                status: leadKo ? [] : [PartnerStatusType.CANCELED],
            }
        })
    }
    useEffect(() => {
        if (error || isLoading || isRefetching) return
        refetch()
    }, [filterData, switchTable])

    // if (error) return <MyError message={error.message} />
    return (
        <div className="flex flex-col gap-3 w-full p-2 lg:pr-2 lg:px-0 lg:p-0 pb-4 lg:pb-0">
            <SwitchProspects setSwitch={setSwitchTable} />
            <Statistics
                type={
                    switchTable == 'partenaires'
                        ? 'PARTNER'
                        : 'ASSOCIATION,FOOD_BANK'
                }
                isFetching={isLoading || isRefetching}
            />
            <FilterCrm
                FilterForm={FilterForm}
                onSubmit={onSubmit}
                table={
                    switchTable === 'partenaires' ? table : tableAssocciation
                }
                leadKo={leadKo}
                handleArchive={handleArchive}
                totalElements={totals.totalElements}
                open={open}
                setOpen={setOpen}
                switchTable={switchTable}
                isLoading={isLoading || isRefetching}
                type={
                    switchTable == 'partenaires'
                        ? 'PARTNER'
                        : 'ASSOCIATION,FOOD_BANK'
                }
            />

            <DataTable
                table={
                    switchTable === 'partenaires' ? table : tableAssocciation
                }
                data={data}
                title="Listes des prospects"
                transform={(data: any) => <CrmCardDetails crm={data} />}
                isLoading={isLoading || isRefetching}
            />
            <PaginationData
                className="items-center"
                setCurrentPage={(page) =>
                    setTotals({ ...totals, currentPage: page })
                }
                currentPage={totals.currentPage}
                totalPages={totals.totalPages}
                pageSize={totals.pageSize}
                isLoading={isLoading || isRefetching}
                refetch={refetch}
            />
            <Link
                href={
                    AppRoutes.newProspect +
                    '?type=' +
                    (switchTable === 'partenaires'
                        ? 'PARTNER'
                        : 'ASSOCIATION,FOOD_BANK')
                }
                className="lg:hidden grid w-full"
            >
                <CustomButton
                    size="lg"
                    className="h-16 rounded-xl"
                    label="Ajouter une prospect"
                    IconRight={UserRoundPlus}
                />
            </Link>
        </div>
    )
}
