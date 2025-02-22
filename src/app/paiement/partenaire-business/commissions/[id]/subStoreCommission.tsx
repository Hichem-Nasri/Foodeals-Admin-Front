'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ColumnVisibilityModal } from '@/components/Partners/ColumnVisibilityModal'
import { CustomButton } from '@/components/custom/CustomButton'
import { DataTable } from '@/components/DataTable'
import { CardTotalValue } from '@/components/payment/CardTotalValue'
import { SwitchValidation } from '@/components/payment/payment-validations/SwitchValidations'
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
import SwitchPayment from '@/components/payment/switchPayment'
import PaymentCommissionCard from '@/components/payment/PaymentCommissionCard'
import {
    defaultDataCommissionTable,
    columnsCommissionTable,
} from '@/components/payment/business/column/commissionColumn'
import { PaymentCommission } from '@/types/paymentUtils'
import { useQuery } from '@tanstack/react-query'
import { fetchPaymentCommission } from '@/lib/api/payment/getPayment'
import { useNotification } from '@/context/NotifContext'
import {
    NotificationType,
    TotalValueProps,
    TotalValues,
} from '@/types/GlobalType'
import { FilterTablePayment } from '@/components/payment/FilterTablePayment'
import { PaymentFilterSchema } from '@/types/PaymentType'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormFilterPayment } from '@/components/payment/FormFilterPayment'
import MobileHeader from '@/components/utils/MobileHeader'
import PaginationData from '@/components/utils/PaginationData'
import { formatNumberWithSpaces, getFilterDate } from '@/lib/utils'
import { MyError } from '@/components/Error'

const SubStoreCommission = () => {
    const { id } = useParams()
    const [commissionSubStore, setCommissionSubStore] = useState<
        PaymentCommission[]
    >([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [totals, setTotals] = useState<
        TotalValueProps & {
            totalCommission: number
            totalSales: number
        }
    >({ ...TotalValues, totalCommission: 0, totalSales: 0 })
    const notify = useNotification()
    const [open, setOpen] = useState(false)

    const router = useRouter()
    const [dateAndPartner, setDateAndPartner] = useState<
        z.infer<typeof PaymentFilterSchema>
    >({
        date: getFilterDate(new Date()),
        partner: id as string,
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
        queryKey: ['commissions', id, totals.currentPage, totals.pageSize],
        queryFn: async () => {
            try {
                const response = await fetchPaymentCommission(
                    totals.currentPage,
                    totals.pageSize,
                    dateAndPartner.date!,
                    dateAndPartner.partner!
                )
                console.log(response)
                const statistics = response.data.statistics
                const data = response.data.commissions
                setTotals({
                    ...totals,
                    totalCommission: statistics.totalCommission.amount,
                    totalSales: statistics.total.amount,
                    totalElements: data.totalElements,
                    totalPages: data.totalPages,
                })
                setCommissionSubStore(data.content)
                return response.data
            } catch (error) {
                notify.notify(
                    NotificationType.ERROR,
                    'Erreur lors de la récupération des données'
                )
                return []
            } //TODO: add page of error
        },
        refetchOnWindowFocus: false,
    })
    const { handleSubmit } = form
    const table = useReactTable({
        data: commissionSubStore,
        columns: columnsCommissionTable(router, 'subStore'),
        state: {
            columnFilters,
        },
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    useEffect(() => {
        if (isLoading || isRefetching) return
        setTotals({
            ...totals,
            currentPage: 0,
        })
        refetch()
    }, [dateAndPartner])

    return (
        <>
            {!open ? (
                <div className="flex flex-col gap-4 px-3 pb-4 lg:gap-3 w-full">
                    <SwitchPayment />
                    <div className="flex justify-center items-center lg:hidden px-">
                        <SwitchValidation />
                    </div>
                    <div className="flex lg:flex-row flex-col items-center gap-3 w-full">
                        <FilterTablePayment
                            form={form}
                            onSubmit={onSubmit}
                            setOpen={setOpen}
                            type="organization"
                            id={id as string}
                            typePartner="PARTNER_SB"
                            state={'commissions'}
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
                                table={table}
                                hiddens={['payable', 'entityId', 'partnerType']}
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
                        table={table}
                        data={commissionSubStore}
                        title="Tableau de validation des commission"
                        hideColumns={['payable', 'entityId', 'partnerType']}
                        transform={(data) => (
                            <PaymentCommissionCard
                                commission={data}
                                path="subStore"
                            />
                        )}
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
            ) : (
                <div
                    className={` flex   flex-col justify-between  w-full min-w-full gap-[1.875rem] min-h-screen top-0 left-0 right-0 fixed bg-white overflow-auto`}
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
        </>
    )
}

export default SubStoreCommission
