'use client'
import { CustomButton } from '@/components/custom/CustomButton'
import { DataTable } from '@/components/DataTable'
import { MyError } from '@/components/Error'
import { ColumnVisibilityModal } from '@/components/Partners/ColumnVisibilityModal'
import { CardTotalValue } from '@/components/payment/CardTotalValue'
import { ConfirmPayment } from '@/components/payment/ConfirmPayment'
import {
    columnsMultiProductTable,
    columnsOperationDeliveryTable,
    MultiProductType,
} from '@/components/payment/delivery/column/paymentOperationMonth'
import { FilterTablePayment } from '@/components/payment/FilterTablePayment'
import SwitchPayment from '@/components/payment/switchPayment'
import PaginationData from '@/components/utils/PaginationData'
import { getPartnerDeliveryPayment } from '@/lib/api/payment/getPartnerDeliveryPayment'
import { formatNumberWithSpaces, getFilterDate } from '@/lib/utils'
import { TotalValueProps } from '@/types/GlobalType'
import { PaymentFilterSchema } from '@/types/PaymentType'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import {
    ColumnFiltersState,
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getPaginationRowModel,
} from '@tanstack/react-table'
import {
    CalendarClock,
    ArrowRight,
    RotateCw,
    CheckCheck,
    PercentCircle,
    Coins,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC, Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface PaymentProps {
    id: string
    month: string
}

export const OperationMonthDeliveries: FC<PaymentProps> = ({ id, month }) => {
    const [payments, setPayments] = useState([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [totals, setTotals] = useState<
        TotalValueProps & { totalCommission: number; totalValue: number }
    >({
        totalElements: 0,
        totalPages: 0,
        currentPage: 0,
        pageSize: 10,
        totalCommission: 0,
        totalValue: 0,
    })
    const [open, setOpen] = useState(false)
    const [multiProductId, setMultiProductId] = useState<string>('')
    const [multiProduct, setMultiProduct] = useState<MultiProductType[]>([])
    const router = useRouter()
    const [dateAndPartner, setDateAndPartner] = useState<
        z.infer<typeof PaymentFilterSchema>
    >({
        date: month,
        partner: id,
    })

    const { data, isLoading, refetch, isRefetching, error } = useQuery({
        queryKey: ['paymentDeliveries', id],
        queryFn: async () => {
            if (!dateAndPartner.date) return
            if (multiProductId) {
                setTotals({
                    ...totals,
                    currentPage: 0,
                })
                // const res = await getMultiProduct(id, totals.currentPage, totals.pageSize)
                // setTotals({
                //     ...totals,
                //     totalElements: res.data.totalElements,
                //     totalPages: res.data.totalPages,
                // })
                // setMultiProduct(res.data)
            } else {
                const res = await getPartnerDeliveryPayment(
                    id,
                    dateAndPartner.date!,
                    totals.currentPage,
                    totals.pageSize
                )
                if (res.status == 500) {
                    // setPayments([])
                    return
                }
                setTotals({
                    ...totals,
                    totalElements: res.data.totalElements,
                    totalCommission: res.data.totalCommission,
                    totalValue: res.data.totalValue,
                    totalPages: res.data.totalPages,
                })
                setPayments(res.data.content)
            }
        },
    })

    const form = useForm({
        resolver: zodResolver(PaymentFilterSchema),
        defaultValues: dateAndPartner,
        mode: 'onBlur',
    })
    const onSubmit = (data: z.infer<typeof PaymentFilterSchema>) => {
        setDateAndPartner(data)
        setOpen(false)
        refetch()
    }

    const table = useReactTable({
        data: payments,
        columns: columnsOperationDeliveryTable(router, setMultiProductId),
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    const mutliProductTable = useReactTable({
        data: payments,
        columns: columnsMultiProductTable(),
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    useEffect(() => {
        if (!isRefetching || !isLoading) return
        refetch()
    }, [id, month, multiProductId, isRefetching, isLoading])

    if (error) {
        return <MyError message={error.message} />
    }

    return (
        <div className="flex flex-col gap-3 w-full">
            <SwitchPayment />
            <div className="flex lg:flex-row flex-col items-center gap-3 w-full">
                <FilterTablePayment
                    form={form}
                    onSubmit={onSubmit}
                    setOpen={setOpen}
                    header="Tableau de validation des Subscription"
                />
                <CardTotalValue
                    Icon={Coins}
                    title="Total des ventes"
                    value={totals.totalValue}
                />
                <CardTotalValue
                    Icon={PercentCircle}
                    title="Total des commissions"
                    className="bg-amethyst-500 text-amethyst-500"
                    value={totals.totalCommission}
                />
            </div>
            <div className="lg:flex hidden items-center gap-3 justify-between bg-white p-3 rounded-[14px]">
                <ColumnVisibilityModal table={table} />
                <div className="flex justify-center items-center space-x-2">
                    <ConfirmPayment
                        id=""
                        label="Confirmer tout"
                        className={`${
                            multiProductId && 'hidden'
                        } rounded-[12px]`}
                        IconRight={CheckCheck}
                    />
                    <CustomButton
                        label={formatNumberWithSpaces(totals.totalElements)}
                        IconLeft={ArrowRight}
                        disabled
                        variant="destructive"
                    />
                </div>
            </div>
            {!multiProductId ? (
                <DataTable
                    table={table}
                    data={payments}
                    title="Tableau de validation des commission"
                    transform={(data) => <Fragment />}
                    hideColumns={['payByFoodeals']}
                    isLoading={isLoading || isRefetching}
                /> // TODO: Add transform
            ) : (
                <DataTable
                    table={mutliProductTable}
                    data={payments}
                    title="Tableau des produits"
                    transform={(data) => <Fragment />}
                    isLoading={isLoading || isRefetching}
                /> // TODO: Add transform
            )}
            <PaginationData
                currentPage={totals.currentPage}
                totalPages={totals.totalPages}
                setCurrentPage={(page) =>
                    setTotals({ ...totals, currentPage: page })
                }
                refetch={refetch}
                pageSize={totals.pageSize}
            />
            <div className="lg:hidden flex flex-col items-center gap-4 my-3 w-full">
                <ConfirmPayment
                    id=""
                    label="Confirmer tout"
                    className={`${
                        multiProductId && 'hidden'
                    } rounded-[12px] w-full`}
                    IconRight={CheckCheck}
                />
            </div>
        </div>
    )
}
