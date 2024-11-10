'use client'
import React, { FC, Fragment, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { CustomButton } from '@/components/custom/CustomButton'
import { DataTable } from '@/components/DataTable'
import { ColumnVisibilityModal } from '@/components/Partners/ColumnVisibilityModal'
import { CardTotalValue } from '@/components/payment/CardTotalValue'
import { SwitchValidation } from '@/components/payment/payment-validations/SwitchValidations'
import {
    partnerCommissionMonthType,
    PaymentFilterSchema,
} from '@/types/PaymentType'
import {
    ColumnFiltersState,
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getPaginationRowModel,
} from '@tanstack/react-table'
import {
    Coins,
    Percent,
    ArrowRight,
    RotateCw,
    CheckCheck,
    X,
} from 'lucide-react'
import { PaymentValidation } from '@/components/payment/PaymentValidation'
import SwitchPayment from '@/components/payment/switchPayment'
import { MultiSelectOptionsType } from '@/components/MultiSelect'
import { useNotification } from '@/context/NotifContext'
import { fetchPaymentCommission } from '@/lib/api/payment/getPayment'
import { NotificationType } from '@/types/GlobalType'
import { useQuery } from '@tanstack/react-query'
import { fetchPaymentCommissionMonth } from '@/lib/api/payment/getCommissionMonth'
import { defaultDataCommissionTable } from '@/components/payment/business/column/commissionColumn'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import {
    columnsCommissionMonthTable,
    defaultDataCommissionMonthTable,
} from '@/components/payment/business/column/commissionMonthColumn'
import CommissionSubStoreCard from '@/components/payment/CommissionSubStoreCard'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FilterTablePayment } from '@/components/payment/FilterTablePayment'
import { FormFilterPayment } from '@/components/payment/FormFilterPayment'
import MobileHeader from '@/components/utils/MobileHeader'
import { formatNumberWithSpaces, getFilterDate } from '@/lib/utils'
import ConfirmationAll, {
    DetailsPayment,
} from '@/components/payment/PaymentDetails/ConfirmationAll'
import PaginationData from '@/components/utils/PaginationData'

interface CommissionMonthProps {
    id: string
}

const CommissionMonth: FC<CommissionMonthProps> = ({ id }) => {
    const [commissionMonth, setCommissionMonth] = useState<
        partnerCommissionMonthType[]
    >(defaultDataCommissionMonthTable)
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [totalPages, setTotalPages] = useState(0)
    const [totalCommission, setTotalCommission] = useState(0)
    const [totalSales, setTotalSales] = useState(0)
    const notify = useNotification()
    const router = useRouter()

    const [dateAndPartner, setDateAndPartner] = useState<
        z.infer<typeof PaymentFilterSchema>
    >({
        date: getFilterDate(new Date()),
        partner: 'all',
    })
    const form = useForm({
        resolver: zodResolver(PaymentFilterSchema),
        defaultValues: dateAndPartner,
        mode: 'onBlur',
    })
    const [open, setOpen] = useState(false)
    const onSubmit = (data: z.infer<typeof PaymentFilterSchema>) => {
        console.log(data)
    }

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['commissionMonth', id],
        queryFn: async () => {
            try {
                const response = await fetchPaymentCommissionMonth(
                    currentPage,
                    pageSize,
                    id as string,
                    dateAndPartner.date!
                )
                if (response.status === 500) {
                    throw new Error('Error fetching commissions')
                }
                const { partner, statistics, operations } = response.data

                setTotalCommission(statistics?.total.amount)
                setTotalSales(statistics?.totalCommission.amount)
                setTotalPages(operations.totalPages)
                setCommissionMonth(operations.content)
                setDateAndPartner((prev) => {
                    return { ...prev, partner: partner.name }
                })
                // setOptions(options)
                console.log('response', response.data)
                return response.data
            } catch (error) {
                notify.notify(
                    NotificationType.ERROR,
                    'Erreur lors de la récupération des données'
                )
                throw new Error('Error fetching commissions')
            }
        },
        refetchOnWindowFocus: false,
    })
    const { handleSubmit } = form
    const tableCommission = useReactTable({
        data: defaultDataCommissionMonthTable,
        columns: columnsCommissionMonthTable(router),
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    const handleConfirmAll = () => {
        // handle confirm all
    }
    console.log('data', data)
    return (
        <Fragment>
            <div className="flex flex-col gap-3 w-full px-3 lg:px-0 mr-2">
                <SwitchPayment />
                <div className="flex lg:flex-row flex-col-reverse items-center gap-3 w-full">
                    <FilterTablePayment
                        form={form}
                        onSubmit={onSubmit}
                        setOpen={setOpen}
                    />
                    <CardTotalValue
                        Icon={Coins}
                        title="Total des ventes"
                        value={totalCommission}
                        className="text-mountain-400 bg-mountain-400"
                        isLoading={isLoading}
                    />
                    <CardTotalValue
                        Icon={Percent}
                        title="Total des commissions"
                        value={totalSales}
                        className="bg-amethyst-500 text-amethyst-500"
                        isLoading={isLoading}
                    />
                </div>
                <div className="lg:flex hidden items-center gap-3 justify-between bg-white p-3 rounded-[14px]">
                    <div className="flex justify-center items-center space-x-4">
                        <ColumnVisibilityModal table={tableCommission} />
                        <SwitchValidation />
                    </div>
                    <div className="flex justify-center items-center space-x-4">
                        <ConfirmationAll
                            isLoading={isLoading}
                            details={data?.details}
                        />
                        <CustomButton
                            label={formatNumberWithSpaces(3026)}
                            IconLeft={ArrowRight}
                            disabled
                            variant="destructive"
                        />
                    </div>
                </div>
                <DataTable
                    table={tableCommission}
                    data={defaultDataCommissionMonthTable}
                    title="Tableau de validation des commission"
                    transform={(data) => (
                        <CommissionSubStoreCard commission={data} />
                    )}
                    isLoading={isLoading}
                />
                <PaginationData
                    pageSize={pageSize}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                    refetch={refetch}
                />
                <div className="lg:hidden flex flex-col items-center gap-4 my-3 w-full">
                    <ConfirmationAll
                        isLoading={isLoading}
                        details={data?.details}
                        isMobile={true}
                    />
                </div>
            </div>
        </Fragment>
    )
}
export default CommissionMonth
