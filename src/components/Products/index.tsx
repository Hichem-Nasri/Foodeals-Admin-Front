'use client'
import { CustomButton } from '@/components/custom/CustomButton'
import { DataTable } from '@/components/DataTable'
import { FilterAndCreatePartners } from '@/components/Partners/FilterAndCreatePartners'
import { PartnerCard } from '@/components/Partners/PartnerCard'
import FilterProducts from '@/components/Products/FilterProducts'
import PaginationData from '@/components/utils/PaginationData'
import { columnsSubAccountTable } from '@/types/partners'
import { columnsProducts, dataProducts } from '@/types/products'
import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { table } from 'console'
import { RotateCw, Store } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { FC, Fragment } from 'react'

interface ProductProps {}

const Product: FC<ProductProps> = () => {
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([])
    const router = useRouter()
    const table = useReactTable({
        data: dataProducts,
        columns: columnsProducts,
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
        <div className="flex flex-col gap-[0.625rem] items-center w-full px-3 lg:mb-0 mb-4">
            <FilterProducts
                table={table}
                products={dataProducts}
                setColumnFilters={setColumnFilters}
                columnFilters={columnFilters}
            />
            <DataTable
                data={dataProducts}
                table={table}
                title="Listes des Products"
                transform={(value) => <Fragment />}
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
                    label="Ajouter un partenaire"
                    className="w-full"
                    IconRight={Store}
                />
            </div>
        </div>
    )
}

export default Product
