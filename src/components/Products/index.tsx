'use client'
import { CustomButton } from '@/components/custom/CustomButton'
import { DataTable } from '@/components/DataTable'
import FilterProducts from '@/components/Products/FilterProducts'
import { fetchAllProduct } from '@/lib/api/product/fetchProduct'
import { columnsProducts, dataProducts } from '@/types/products'
import { useQuery } from '@tanstack/react-query'
import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { Plus, RotateCw, Store } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { FC, Fragment } from 'react'
import ProductCard from './ProductCard'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'

interface ProductProps {}

const Product: FC<ProductProps> = () => {
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([])
    const [currentPage, setCurrentPage] = React.useState(1)
    const [pageSize, setPageSize] = React.useState(10)
    const [totalPages, setTotalPages] = React.useState(0)
    const router = useRouter()

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['products', currentPage, pageSize],
        queryFn: async () => {
            try {
                const response = await fetchAllProduct(currentPage, pageSize)
                if (response.status === 200) {
                    return response.data
                }
                return null
            } catch (error) {
                return null
            }
        },
    })

    const table = useReactTable({
        data: dataProducts,
        columns: columnsProducts(router),
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
        <div className="flex flex-col gap-[0.625rem] items-center w-full px-3 lg:mb-0 mb-4 ">
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
                transform={(value) => <ProductCard product={value} />}
                isLoading={isLoading}
            />
        </div>
    )
}

export default Product
