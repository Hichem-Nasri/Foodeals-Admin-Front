'use client'
import { CustomButton } from '@/components/custom/CustomButton'
import {
    ArrowRight,
    CheckCheck,
    Coins,
    FileBadge,
    LoaderCircle,
    Percent,
    RotateCw,
} from 'lucide-react'
import { DataTable } from '@/components/DataTable'
import {
    columnsSubscriptionTable,
    columnsPaymentsDetailsTable,
    columnsValidationTable,
    defaultDataSubscriptionTable,
    defaultDataPaymentsDetailsTable,
    defaultDataValidationTable,
} from '@/types/PaymentType'
import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { Fragment, useState } from 'react'
import { cn } from '@/lib/utils'
import { ColumnVisibilityModal } from '@/components/Partners/ColumnVisibilityModal'
import { CardTotalValue } from '@/components/payment/CardTotalValue'
import { FilterPayment } from '@/components/payment/FilterPayment'
import { SubscriptionCard } from '@/components/payment/PaymentDetails/SubscriptionCard'
import { usePathname, useRouter } from 'next/navigation'
import { SwitchValidation } from '@/components/payment/payment-validations/SwitchValidations'
import SwitchPayment from '@/components/payment/switchPayment'

interface OperationsProps {}

export const ValidationSubscription = ({}: OperationsProps) => {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [showOperations, setShowOperations] = useState(true)
    const onSubmit = () => {}
    const totalPending = 12222
    const totalSales = 51554516

    // const tableOperations = useReactTable({
    //     data: defaultDataPaymentsDetailsTable,
    //     columns: columnsPaymentsDetailsTable,
    //     getCoreRowModel: getCoreRowModel(),
    //     onColumnFiltersChange: setColumnFilters,
    //     getFilteredRowModel: getFilteredRowModel(),
    //     getSortedRowModel: getSortedRowModel(),
    //     getPaginationRowModel: getPaginationRowModel(),
    // })

    const router = useRouter()
    const tableSubscription = useReactTable({
        data: defaultDataSubscriptionTable,
        columns: columnsSubscriptionTable(router),
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
                    Icon={FileBadge}
                    title="Total des Subscriptions"
                    value={totalPending}
                    className="text-mountain-400 bg-mountain-400"
                />
                <CardTotalValue
                    Icon={Percent}
                    title="Total des écheances"
                    value={totalSales}
                    className="bg-amethyst-500 text-amethyst-500"
                />
            </div>
            <div className="lg:flex hidden items-center gap-3 justify-between bg-white p-3 rounded-[14px]">
                <div className="flex justify-center items-center space-x-4">
                    <ColumnVisibilityModal table={tableSubscription} />
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
                table={tableSubscription}
                data={defaultDataSubscriptionTable}
                title="Tableau de validation des Subscription"
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
