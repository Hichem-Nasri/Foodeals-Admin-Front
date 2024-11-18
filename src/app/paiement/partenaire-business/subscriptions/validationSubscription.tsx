'use client'
import { CustomButton } from '@/components/custom/CustomButton'
import {
    ArrowRight,
    CheckCheck,
    FileBadge,
    Percent,
    RotateCw,
    X,
} from 'lucide-react'
import { DataTable } from '@/components/DataTable'
import {
    partnerSubscriptionType,
    partnerSubscriptonOnesType,
    defaultDataSubscriptionOnesTable,
    PaymentFilterSchema,
} from '@/types/PaymentType'
import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { ColumnVisibilityModal } from '@/components/Partners/ColumnVisibilityModal'
import { CardTotalValue } from '@/components/payment/CardTotalValue'
import { useRouter } from 'next/navigation'
import { SwitchValidation } from '@/components/payment/payment-validations/SwitchValidations'
import SwitchPayment from '@/components/payment/switchPayment'
import { useQuery } from '@tanstack/react-query'
import {
    NotificationType,
    PartnerInfoDto,
    TotalValueProps,
    TotalValues,
} from '@/types/GlobalType'
import { useNotification } from '@/context/NotifContext'
import { fetchSubscription } from '@/lib/api/payment/getSubscription'
import { MultiSelectOptionsType } from '@/components/MultiSelect'
import PaymentSubscriptionCard from '@/components/payment/paymentSubscriptionCard'
import PaymentOnesSubscriptionCard from '@/components/payment/paymentOneSubscriptionCard'
import {
    columnsSubscriptionOnesTable,
    columnsSubscriptionTable,
    defaultDataSubscriptionTable,
} from '@/components/payment/business/column/subscriptionColumn'
import { FilterTablePayment } from '@/components/payment/FilterTablePayment'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import MobileHeader from '@/components/utils/MobileHeader'
import { FormFilterPayment } from '@/components/payment/FormFilterPayment'
import { PartnerType } from '@/types/paymentUtils'
import { Staatliches } from 'next/font/google'
import PaginationData from '@/components/utils/PaginationData'
import { formatNumberWithSpaces } from '@/lib/utils'
import { MyError } from '@/components/Error'

interface OperationsProps {}

export const ValidationSubscription = ({}: OperationsProps) => {
    const [subscriptionData, setSubscriptionData] = useState<
        partnerSubscriptionType[]
    >(defaultDataSubscriptionTable)
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [subscriptionID, setSubscriptionId] = useState('')
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
        date: new Date().getFullYear().toString(),
        partner: 'all',
    })

    const { data, isLoading, error, isRefetching, refetch } = useQuery({
        queryKey: ['subscription'],
        queryFn: async () => {
            try {
                const response = await fetchSubscription(
                    totals.currentPage,
                    totals.pageSize,
                    dateAndPartner.date!,
                    dateAndPartner.partner!
                )
                const { statistics, list } = response.data
                console.log('response', response.data)
                setTotals({
                    ...totals,
                    totalCommission: statistics.total?.amount,
                    totalSales: statistics.deadlines?.amount,
                    totalPages: list.totalPages,
                    totalElements: list.totalElements,
                })
                setSubscriptionData(list.content)
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

    const [open, setOpen] = useState(false)

    const form = useForm({
        resolver: zodResolver(PaymentFilterSchema),
        defaultValues: dateAndPartner,
        mode: 'onBlur',
    })
    const onSubmit = (data: z.infer<typeof PaymentFilterSchema>) => {
        console.log(data)
        // handle filter by refetching date with the new filter
    }

    const { handleSubmit } = form

    const tableSubscription = useReactTable({
        data: subscriptionData,
        columns: columnsSubscriptionTable(router),
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    if (error) return <MyError message={error.message} />

    return (
        <>
            {!open ? (
                <div className="flex flex-col gap-3 w-full lg:px-0 p-2 lg:pr-2">
                    <SwitchPayment />
                    <div className="flex justify-center items-center lg:hidden">
                        <SwitchValidation />
                    </div>
                    <div className="flex lg:flex-row flex-col items-center gap-3 w-full px-3 lg:px-0">
                        <FilterTablePayment
                            form={form}
                            onSubmit={onSubmit}
                            setOpen={setOpen}
                            header="Tableau de validation des abonnements"
                            dateForm="YYYY"
                        />
                        <CardTotalValue
                            Icon={FileBadge}
                            title="Total des abonnements"
                            value={totals.totalCommission}
                            className="text-mountain-400 bg-mountain-400"
                            isLoading={isLoading || isRefetching}
                        />
                        <CardTotalValue
                            Icon={Percent}
                            title="Total des écheances"
                            value={totals.totalSales}
                            className="bg-amethyst-500 text-amethyst-500"
                            isLoading={isLoading || isRefetching}
                        />
                    </div>
                    <div className="lg:flex hidden items-center gap-3 justify-between bg-white p-3 rounded-[14px]">
                        <div className="flex justify-center items-center space-x-1.5">
                            <ColumnVisibilityModal table={tableSubscription} />
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
                        table={tableSubscription}
                        data={subscriptionData}
                        title="Tableau de validation des Subscription"
                        transform={(data) => (
                            <PaymentSubscriptionCard
                                subscription={data}
                                setSubscriptionId={setSubscriptionId}
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
                        <FormFilterPayment
                            form={form}
                            onSubmit={onSubmit}
                            dateForm="YYYY"
                        />
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
