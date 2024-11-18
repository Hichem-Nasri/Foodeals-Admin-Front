'use client'
import { CustomButton } from '@/components/custom/CustomButton'
import { DataTable } from '@/components/DataTable'
import { MultiSelectOptionsType } from '@/components/MultiSelect'
import { ColumnVisibilityModal } from '@/components/Partners/ColumnVisibilityModal'
import { defaultDataCommissionTable } from '@/components/payment/business/column/commissionColumn'
import {
    columnsPaymentDeliveriesTable,
    defaultDataPaymentDeliveriesTable,
} from '@/components/payment/business/column/paymentDeliveriesColumn'
import { CardTotalValue } from '@/components/payment/CardTotalValue'
import { ConfirmPayment } from '@/components/payment/ConfirmPayment'
import DeliveryPaymentCard from '@/components/payment/delivery/DeliveryPaymentCard'
import { FilterTablePayment } from '@/components/payment/FilterTablePayment'
import SwitchPayment from '@/components/payment/switchPayment'
import PaginationData from '@/components/utils/PaginationData'
import { getPartnerDeliveryPayment } from '@/lib/api/payment/getPartnerDeliveryPayment'
import { formatDate, formatNumberWithSpaces, getFilterDate } from '@/lib/utils'
import { TotalValueProps } from '@/types/GlobalType'
import { PaymentFilterSchema, PaymentDeliveriesType } from '@/types/PaymentType'
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
import { CalendarClock, ArrowRight, RotateCw, CheckCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC, Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface PaymentProps {
    id: string
}

export const PaymentDeliveries: FC<PaymentProps> = ({ id }) => {
    const [payments, setPayments] = useState(defaultDataPaymentDeliveriesTable)
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
    const router = useRouter()
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [open, setOpen] = useState(false)
    const [dateAndPartner, setDateAndPartner] = useState<
        z.infer<typeof PaymentFilterSchema>
    >({
        date: getFilterDate(new Date()),
        partner: id,
    })

    const { data, isLoading, refetch, isRefetching, error } = useQuery({
        queryKey: ['paymentDeliveries', id],
        queryFn: async () => {
            const res = await getPartnerDeliveryPayment(
                dateAndPartner.partner!,
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
            })
            // setPayments(res.data.content)
        },
    })

    const form = useForm({
        resolver: zodResolver(PaymentFilterSchema),
        defaultValues: dateAndPartner,
        mode: 'onBlur',
    })
    const onSubmit = (data: z.infer<typeof PaymentFilterSchema>) => {
        setDateAndPartner(data)
        refetch()
    }

    const table = useReactTable({
        data: payments,
        columns: columnsPaymentDeliveriesTable(),
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    return (
        <div className="flex flex-col gap-3 w-full lg:pr-2 p-2 lg:p-0">
            <SwitchPayment />
            <div className="flex lg:flex-row flex-col items-center gap-3 w-full">
                <FilterTablePayment
                    form={form}
                    onSubmit={onSubmit}
                    setOpen={setOpen}
                    header="Tableau de validation des Subscription"
                    dateForm="YYYY"
                />
                {dateAndPartner.partner && (
                    <>
                        <CardTotalValue
                            Icon={CalendarClock}
                            title="Echéance"
                            value={totals.totalValue}
                            className="text-red-500 bg-red-500"
                            isLoading={isLoading || isRefetching}
                        />
                        <CardTotalValue
                            Icon={CalendarClock}
                            title="Total commission"
                            value={totals.totalCommission}
                            isLoading={isLoading || isRefetching}
                        />
                    </>
                )}
            </div>
            <div className="lg:flex hidden items-center gap-3 justify-between bg-white p-3 rounded-[14px]">
                <ColumnVisibilityModal table={table} />
                <div className="flex justify-center items-center space-x-2">
                    <CustomButton
                        label={formatNumberWithSpaces(totals.totalElements)}
                        IconLeft={ArrowRight}
                        disabled
                        variant="destructive"
                    />
                </div>
            </div>
            <DataTable
                table={table}
                data={payments}
                title="Tableau de validation des commission"
                transform={(data) => <DeliveryPaymentCard commission={data} />}
                hideColumns={['payByFoodeals']}
                isLoading={isLoading || isRefetching}
            />
            <PaginationData
                currentPage={totals.currentPage}
                setCurrentPage={(page) =>
                    setTotals((prev) => ({ ...prev, currentPage: page }))
                }
                totalPages={totals.totalPages}
                pageSize={totals.pageSize}
                refetch={refetch}
            />
        </div>
    )
}
