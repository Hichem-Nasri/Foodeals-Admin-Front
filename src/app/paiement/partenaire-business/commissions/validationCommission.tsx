'use client'
import { CustomButton } from '@/components/custom/CustomButton'
import {
    ArrowRight,
    CheckCheck,
    ChevronLeft,
    Coins,
    ListFilter,
    Percent,
    RotateCw,
    X,
} from 'lucide-react'
import { DataTable } from '@/components/DataTable'
import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { FC, Fragment, useEffect, useState } from 'react'
import { ColumnVisibilityModal } from '@/components/Partners/ColumnVisibilityModal'
import { CardTotalValue } from '@/components/payment/CardTotalValue'
import { useRouter } from 'next/navigation'
import { SwitchValidation } from '@/components/payment/payment-validations/SwitchValidations'
import SwitchPayment from '@/components/payment/switchPayment'
import { useQuery } from '@tanstack/react-query'
import { fetchPaymentCommission } from '@/lib/api/payment/getPayment'
import { useNotification } from '@/context/NotifContext'
import {
    NotificationType,
    TotalValueProps,
    TotalValues,
} from '@/types/GlobalType'
import { PaymentCommission } from '@/types/paymentUtils'
import { MultiSelectOptionsType } from '@/components/MultiSelect'
import PaymentCommissionCard from '@/components/payment/PaymentCommissionCard'
import {
    defaultDataCommissionTable,
    columnsCommissionTable,
} from '@/components/payment/business/column/commissionColumn'
import { PaymentFilterSchema } from '@/types/PaymentType'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormFilterPayment } from '@/components/payment/FormFilterPayment'
import { FilterTablePayment } from '@/components/payment/FilterTablePayment'
import MobileHeader from '@/components/utils/MobileHeader'
import PaginationData from '@/components/utils/PaginationData'
import { formatNumberWithSpaces, getFilterDate } from '@/lib/utils'
import { MyError } from '@/components/Error'

interface OperationsProps {}

export const ValidationCommissions: FC<OperationsProps> = ({}) => {
    const [commission, setCommission] = useState<PaymentCommission[]>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [totals, setTotals] = useState<
        TotalValueProps & {
            totalCommission: number
            totalSales: number
        }
    >({ ...TotalValues, totalCommission: 0, totalSales: 0 })
    const [dateAndPartner, setDateAndPartner] = useState<
        z.infer<typeof PaymentFilterSchema>
    >({
        // date MM/yyyy
        date: getFilterDate(new Date()),
        partner: 'all',
    })
    const [open, setOpen] = useState(false)
    const notify = useNotification()
    const router = useRouter()

    const { data, isLoading, isRefetching, error, refetch } = useQuery({
        queryKey: ['commissions'],
        queryFn: async () => {
            try {
                const response = await fetchPaymentCommission(
                    totals.currentPage,
                    totals.pageSize,
                    dateAndPartner.date!
                )
                console.log(response)
                const statistics = response.data.statistics
                const data = response.data.commissions
                setTotals({
                    ...totals,
                    totalCommission: statistics.totalCommission.amount,
                    totalSales: statistics.total.amount,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                })
                setCommission(data.content)
                return response.data
            } catch (error) {
                notify.notify(
                    NotificationType.ERROR,
                    'Erreur lors de la récupération des données'
                )
                throw new Error('Error fetching commissions')
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
        refetch()
    }

    const { handleSubmit } = form

    const tableCommission = useReactTable({
        data: commission,
        columns: columnsCommissionTable(router),
        state: {
            columnFilters,
        },
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    if (error) {
        return <MyError message={error.message} />
    }

    return (
        <Fragment>
            {!open ? (
                <div className="flex flex-col gap-3 w-full lg:px-0 p-2 lg:pr-2">
                    <SwitchPayment />
                    <div className="flex justify-center items-center lg:hidden">
                        <SwitchValidation />
                    </div>

                    <div className="flex lg:flex-row flex-col items-center gap-3 w-full">
                        <FilterTablePayment
                            form={form}
                            onSubmit={onSubmit}
                            setOpen={setOpen}
                            type="all"
                        />
                        <CardTotalValue
                            Icon={Coins}
                            title="Total des ventes"
                            value={totals.totalCommission}
                            className="text-mountain-400 bg-mountain-400"
                            isLoading={isLoading || isRefetching}
                        />
                        <CardTotalValue
                            Icon={Percent}
                            title="Total des commissions"
                            value={totals.totalSales}
                            className="bg-amethyst-500 text-amethyst-500"
                            isLoading={isLoading || isRefetching}
                        />
                    </div>
                    <div className="lg:flex hidden items-center gap-3 justify-between bg-white p-3 rounded-[14px]">
                        <div className="flex justify-center items-center space-x-4">
                            <ColumnVisibilityModal
                                table={tableCommission}
                                hiddens={['payable', 'entityId', 'id']}
                            />
                            <SwitchValidation />
                        </div>
                        <CustomButton
                            label={formatNumberWithSpaces(totals.totalElements)}
                            IconLeft={ArrowRight}
                            disabled
                            variant="destructive"
                        />
                    </div>
                    <DataTable
                        table={tableCommission}
                        data={commission}
                        title="Tableau de validation des commission"
                        transform={(data) => (
                            <PaymentCommissionCard
                                commission={data}
                                path="partner"
                            />
                        )}
                        hideColumns={['payable', 'entityId', 'id']}
                        isLoading={isLoading || isRefetching}
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
            ) : (
                <div
                    className={`flex flex-col justify-between w-full min-w-full gap-[1.875rem] min-h-screen top-0 left-0 right-0 fixed bg-white overflow-auto`}
                    spellCheck
                >
                    <div className="flex justify-between items-center flex-col h-full">
                        <MobileHeader
                            title="Filtrer"
                            onClick={() => setOpen((prev) => !prev)}
                        />
                        <FormFilterPayment form={form} onSubmit={onSubmit} />
                    </div>
                    <div className="flex justify-between w-full rounded-[18px] lg:bg-white p-4 space-x-4">
                        <CustomButton
                            size="sm"
                            variant="outline"
                            label="Annuler"
                            className="w-full"
                            IconRight={X}
                            onClick={() => setOpen((prev) => !prev)}
                        />
                        <CustomButton
                            type="submit"
                            size="sm"
                            label="Filtrer"
                            className="w-full"
                            IconRight={CheckCheck}
                            onClick={() => {
                                handleSubmit(onSubmit)
                                setOpen((prev) => !prev)
                            }}
                        />
                    </div>
                </div>
            )}
        </Fragment>
    )
}
