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
    OperationMonthDeliveriesType,
} from '@/components/payment/delivery/column/paymentOperationMonth'
import { FilterTablePayment } from '@/components/payment/FilterTablePayment'
import ConfirmationAll from '@/components/payment/PaymentDetails/ConfirmationAll'
import SwitchPayment from '@/components/payment/switchPayment'
import PaginationData from '@/components/utils/PaginationData'
import { useNotification } from '@/context/NotifContext'
import {
    fetchPaymentCommissionMonth,
    getMultiProduct,
} from '@/lib/api/payment/getCommissionMonth'
import {
    getPartnerDeliveryPayment,
    getPartnerDeliveryPaymentByMonth,
} from '@/lib/api/payment/getPartnerDeliveryPayment'
import { formatNumberWithSpaces, getFilterDate } from '@/lib/utils'
import {
    NotificationType,
    TotalValueProps,
    TotalValues,
} from '@/types/GlobalType'
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
import { FC, Fragment, use, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface PaymentProps {
    id: string
    month: string
}

export const OperationMonthDeliveries: FC<PaymentProps> = ({ id, month }) => {
    const [payments, setPayments] = useState<OperationMonthDeliveriesType[]>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [totals, setTotals] = useState<
        TotalValueProps & { totalCommission: number; totalValue: number }
    >({
        ...TotalValues,
        totalCommission: 0,
        totalValue: 0,
    })
    const [open, setOpen] = useState(false)
    const [multiProductId, setMultiProductId] = useState<string>('')
    const [multiProduct, setMultiProduct] = useState<MultiProductType[]>([])
    const router = useRouter()
    const notif = useNotification()
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
                const res = await getMultiProduct(
                    id,
                    totals.currentPage,
                    totals.pageSize
                ).then((res) => {
                    return res.data.map((item: any) => ({
                        product: item.product,
                        quantity: item.quantity,
                        amount: item.amount,
                    }))
                })
                setMultiProduct(res)
            } else {
                const res = await fetchPaymentCommissionMonth(
                    totals.currentPage,
                    totals.pageSize,
                    dateAndPartner.partner!,
                    dateAndPartner.date,
                    'DELIVERY'
                )

                // setPayments(demoDataOparatoinMonthDeliveries)
                if (res.status == 500) {
                    notif.notify(
                        NotificationType.ERROR,
                        'Error fetching partners'
                    )
                    // setPayments([])
                    return
                }
                const { partner, operations, statistics, details } = res.data
                setDateAndPartner({
                    ...dateAndPartner,
                    partner: partner.id,
                })
                setPayments(res.data.operations)
                setTotals({
                    ...totals,
                    totalElements: operations.totalElements,
                    totalCommission: statistics.totalCommission.amount,
                    totalValue: statistics.total.amount,
                    totalPages: operations.totalPages,
                })
                setPayments(operations.content)
                return res.data
            }
        },
        refetchOnWindowFocus: false,
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
        data: multiProduct,
        columns: columnsMultiProductTable(),
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    useEffect(() => {
        if (!isRefetching || !isLoading) return
        setTotals({
            ...totals,
            currentPage: 0,
        })
        refetch()
    }, [id, month, multiProductId, dateAndPartner])

    return (
        <div className="flex flex-col gap-3 w-full lg:pr-2 pr-0 p-4 lg:p-0 ">
            <SwitchPayment />
            <div className="flex lg:flex-row flex-col items-center gap-3 w-full">
                <FilterTablePayment
                    form={form}
                    onSubmit={onSubmit}
                    setOpen={setOpen}
                    header="Tableau de validation des abonnements"
                    state="commissions"
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
                    <div
                        className={` ${
                            multiProductId ? 'hidden' : 'flex'
                        } flex-col items-center gap-4 w-full`}
                    >
                        <ConfirmationAll
                            isLoading={isLoading}
                            details={data?.details}
                        />
                    </div>
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
                    title="Tableau de validation des commissions"
                    transform={(data) => <Fragment />}
                    hideColumns={['type']}
                    isLoading={isLoading || isRefetching}
                /> // TODO: Add transform
            ) : (
                <DataTable
                    table={mutliProductTable}
                    data={payments}
                    title="Tableau des produits"
                    transform={(data) => <Fragment />}
                    isLoading={isLoading || isRefetching}
                    back={false}
                    onBack={() => setMultiProductId('')}
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
            <div
                className={`lg:hidden ${
                    multiProductId ? 'hidden' : 'flex'
                } flex-col items-center gap-4 my-3 w-full`}
            >
                <ConfirmationAll
                    isLoading={isLoading}
                    details={data?.details}
                    isMobile={true}
                />
            </div>
        </div>
    )
}
