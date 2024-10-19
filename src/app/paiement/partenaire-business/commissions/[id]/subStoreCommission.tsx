'use client'
import React, { Fragment, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ColumnVisibilityModal } from '@/components/Partners/ColumnVisibilityModal'
import { CustomButton } from '@/components/custom/CustomButton'
import { DataTable } from '@/components/DataTable'
import { CardTotalValue } from '@/components/payment/CardTotalValue'
import { FilterPayment } from '@/components/payment/FilterPayment'
import { SwitchValidation } from '@/components/payment/payment-validations/SwitchValidations'
import {
    defaultDataCommissionTable,
    columnsCommissionTable,
    columnsCommissionSSTable,
    defaultDataCommissionSSTable,
} from '@/types/PaymentType'
import {
    ColumnFiltersState,
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getPaginationRowModel,
} from '@tanstack/react-table'
import { Coins, Percent, ArrowRight, RotateCw } from 'lucide-react'
import SwitchPayment from '@/components/payment/switchPayment'

const SubStoreCommission = () => {
    const { id } = useParams()

    const fetchSubStore = async () => {
        // fetch sub store by id
    }
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const onSubmit = () => {}
    const totalCommission = 12222
    const totalSales = 51554516
    const router = useRouter()

    const tableCommission = useReactTable({
        data: defaultDataCommissionSSTable,
        columns: columnsCommissionSSTable(router, id as string),
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    const PaymentData = {
        name: 'Marjane',
        avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=Ikea',
        city: 'Casablanca',
    }

    return (
        <div className="flex flex-col gap-3 w-full">
            <SwitchPayment />
            <div className="flex lg:flex-row flex-col items-center gap-3 w-full">
                <FilterPayment onSubmit={onSubmit} />
                <CardTotalValue
                    Icon={Coins}
                    title="Total des ventes"
                    value={totalCommission}
                    className="text-mountain-400 bg-mountain-400"
                />
                <CardTotalValue
                    Icon={Percent}
                    title="Total des commissions"
                    value={totalSales}
                    className="bg-amethyst-500 text-amethyst-500"
                />
            </div>
            <div className="lg:flex hidden items-center gap-3 justify-between bg-white p-3 rounded-[14px]">
                <div className="flex justify-center items-center space-x-4">
                    <ColumnVisibilityModal table={tableCommission} />
                    <SwitchValidation />
                </div>
                <CustomButton
                    label={'3025'}
                    IconLeft={ArrowRight}
                    disabled
                    variant="outline"
                    className="disabled:border-lynch-400 disabled:opacity-100 disabled:text-lynch-400 font-semibold text-lg py-3 px-5 h-fit"
                />
            </div>
            <DataTable
                table={tableCommission}
                data={defaultDataCommissionTable}
                title="Tableau de validation des commission"
                transform={(data) => <Fragment />}
            />
            <div className="lg:hidden flex flex-col items-center gap-4 my-3">
                <CustomButton
                    size="sm"
                    label="Voir plus"
                    className="text-sm font-semibold rounded-full border-lynch-400 text-lynch-400 py-[0.375rem] px-5"
                    variant="outline"
                    IconRight={RotateCw}
                />
            </div>
        </div>
    )
}

export default SubStoreCommission
