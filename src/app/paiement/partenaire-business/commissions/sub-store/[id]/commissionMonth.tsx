'use client'
import React, { FC, Fragment, useEffect, useState } from 'react'
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
import {
    NotificationType,
    PartnerEntitiesType,
    TotalValueProps,
    TotalValues,
} from '@/types/GlobalType'
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
import { MyError } from '@/components/Error'

interface CommissionMonthProps {
    id: string
    type: 'NORMAL_PARTNER' | 'SUB_ENTITY'
}

const CommissionMonth: FC<CommissionMonthProps> = ({ id, type }) => {
    const [commissionMonth, setCommissionMonth] = useState<
        partnerCommissionMonthType[]
    >([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [open, setOpen] = useState(false)
    const [multiProductId, setMultiProductId] = useState<string>('')
    const [value, setValue] = useState<boolean>(false)
    const [totals, setTotals] = useState<
        TotalValueProps & {
            totalCommission: number
            totalSales: number
        }
    >({ ...TotalValues, totalCommission: 0, totalSales: 0 })
    const notify = useNotification()
    const router = useRouter()

    const [dateAndPartner, setDateAndPartner] = useState<
        z.infer<typeof PaymentFilterSchema>
    >({
        date: getFilterDate(new Date()),
        partner: id,
    })

    const form = useForm({
        resolver: zodResolver(PaymentFilterSchema),
        defaultValues: dateAndPartner,
        mode: 'onBlur',
    })
    const onSubmit = (data: z.infer<typeof PaymentFilterSchema>) => {
        setDateAndPartner(data)
    }
    const { data, isLoading, isRefetching, error, refetch } = useQuery({
        queryKey: ['commissionMonth', id],
        queryFn: async () => {
            try {
                const response = await fetchPaymentCommissionMonth(
                    totals.currentPage,
                    totals.pageSize,
                    multiProductId ? multiProductId : dateAndPartner.partner!,
                    dateAndPartner.date!,
                    type
                )
                if (response.status === 500) {
                    throw new Error('Error fetching commissions')
                }
                const { partner, statistics, operations } = response.data
                setTotals({
                    ...totals,
                    totalCommission: statistics.totalCommission.amount,
                    totalSales: statistics.total.amount,
                    totalElements: operations.numberOfElements,
                    totalPages: operations.totalPages,
                })
                setDateAndPartner((prev) => {
                    return { ...prev, partner: partner.name }
                })
                console.log('data++++++++++++++++', response.data)
                setCommissionMonth(operations.content)
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

    const tableCommission = useReactTable({
        data: commissionMonth,
        columns: columnsCommissionMonthTable(
            router,
            setMultiProductId,
            setValue
        ),
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })
    console.log('Heeeeeeeeeeey')
    useEffect(() => {
        if (isLoading || isRefetching) return
        console.log('Refetch________________:', multiProductId)
        setTotals({
            ...totals,
            currentPage: 0,
        })
        refetch()
    }, [value, dateAndPartner])
    return (
        <Fragment>
            <div className="flex flex-col gap-3 w-full px-3 lg:px-0 mr-2">
                <SwitchPayment />
                <div className="flex lg:flex-row flex-col-reverse items-center gap-3 w-full">
                    <FilterTablePayment
                        form={form}
                        onSubmit={onSubmit}
                        setOpen={setOpen}
                        type="partner"
                        typePartner={'SUB_ENTITY'}
                        id={id}
                        state="commissions"
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
                        <ColumnVisibilityModal table={tableCommission} />
                        <SwitchValidation />
                    </div>
                    <div
                        className={` ${
                            multiProductId ? 'hidden' : 'flex'
                        } items-center gap-4 w-fit`}
                    >
                        <ConfirmationAll
                            isLoading={isLoading}
                            details={data?.details}
                        />
                        <CustomButton
                            label={formatNumberWithSpaces(totals.totalElements)}
                            IconLeft={ArrowRight}
                            disabled
                            variant="destructive"
                        />
                    </div>
                </div>
                <DataTable
                    table={tableCommission}
                    data={commissionMonth}
                    title="Tableau de validation des commission"
                    transform={(data) => <Fragment />}
                    isLoading={isLoading || isRefetching}
                />
                <PaginationData
                    pageSize={totals.pageSize}
                    currentPage={totals.currentPage}
                    totalPages={totals.totalPages}
                    setCurrentPage={(page) => {
                        setTotals({ ...totals, currentPage: page })
                    }}
                    refetch={refetch}
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
        </Fragment>
    )
}
export default CommissionMonth
