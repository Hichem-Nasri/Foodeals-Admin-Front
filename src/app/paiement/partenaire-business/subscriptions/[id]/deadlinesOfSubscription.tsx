'use client'
import { CustomButton } from '@/components/custom/CustomButton'
import { DataTable } from '@/components/DataTable'
import { ColumnVisibilityModal } from '@/components/Partners/ColumnVisibilityModal'
import {
    columnsSubscriptionOnesTable,
    columnsValidationTable,
    defaultDataValidationTable,
} from '@/components/payment/business/column/subscriptionColumn'
import { SwitchValidation } from '@/components/payment/payment-validations/SwitchValidations'
import OperationSubscriptionCard from '@/components/payment/PaymentDetails/OperationSubscriptionCard'
import PaymentOnesSubscriptionCard from '@/components/payment/paymentOneSubscriptionCard'
import SwitchPayment from '@/components/payment/switchPayment'
import PaginationData from '@/components/utils/PaginationData'
import { useNotification } from '@/context/NotifContext'
import { fetchSubscription } from '@/lib/api/payment/getSubscription'
import { formatNumberWithSpaces } from '@/lib/utils'
import {
    NotificationType,
    PartnerInfoDto,
    TotalValueProps,
    TotalValues,
} from '@/types/GlobalType'
import {
    deadlineType,
    defaultDataSubscriptionOnesTable,
    partnerSubscriptonOnesType,
} from '@/types/PaymentType'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import {
    ColumnFiltersState,
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getPaginationRowModel,
} from '@tanstack/react-table'
import { set } from 'date-fns'
import { ArrowRight, RotateCw } from 'lucide-react'
import {
    useParams,
    usePathname,
    useRouter,
    useSearchParams,
} from 'next/navigation'
import React, { Fragment, useEffect, useState } from 'react'

function DeadlinesOfSubscription({ id }: { id: string }) {
    const [partnerSubscripton, setPartnerSubscripton] = useState<
        partnerSubscriptonOnesType[]
    >(defaultDataSubscriptionOnesTable)
    const [partnerDeadlines, setPartnerDeadlines] = useState<deadlineType[]>([])
    const [partner, setPartner] = useState<PartnerInfoDto>({
        name: '',
        avatarPath: '',
        id: '',
    })
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [totals, setTotals] = useState<TotalValueProps>(TotalValues)
    const [year, setYear] = useState<number>(new Date().getFullYear())
    const query = useSearchParams()
    const notify = useNotification()
    const router = useRouter()
    const { data, isLoading, isRefetching, error, refetch } = useQuery({
        queryKey: ['subscription'],
        queryFn: async () => {
            try {
                const response = await fetchSubscription(
                    totals.currentPage,
                    totals.pageSize,
                    year.toString(),
                    id as string
                )
                if (response.status !== 200) {
                    throw new Error('Error fetching subscriptions')
                }
                const { partner, subscriptions } = response.data
                setPartner(partner)
                setTotals({
                    ...totals,
                    totalElements: subscriptions.totalElements,
                    totalPages: subscriptions.totalPages,
                })
                setPartnerSubscripton(subscriptions)
                return response.data
            } catch (error) {
                console.log('error', error)
                notify.notify(
                    NotificationType.ERROR,
                    "Erreur lors de la récupération des données de l'abonnement"
                )
            }
        },
        placeholderData: keepPreviousData,
    })

    const tableOperations = useReactTable({
        data: partnerSubscripton,
        columns: columnsSubscriptionOnesTable(setPartnerDeadlines),
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    const table = useReactTable({
        data: partnerDeadlines,
        columns: columnsValidationTable,
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })
    // useEffect(() => {
    //     if (!year) {
    //         const queryYear = query.get('year')!
    //         if (year) {
    //             setYear(parseInt(queryYear))
    //         }
    //     }
    // }, [query.get('year')]) // TODO: check the year logic

    return (
        <div className="flex flex-col gap-3 w-full">
            <div className="lg:flex hidden items-center gap-3 justify-between bg-white p-3 rounded-[14px]">
                <div className="flex justify-center items-center space-x-4">
                    <ColumnVisibilityModal table={table} />
                    <SwitchValidation />
                </div>
                <CustomButton
                    label={formatNumberWithSpaces(totals.totalElements)}
                    IconLeft={ArrowRight}
                    disabled
                    variant="destructive"
                />
            </div>
            {partnerDeadlines.length > 0 ? (
                <DataTable
                    table={table}
                    data={partnerDeadlines}
                    title="Tableau de validation des écheances"
                    transform={(data) => (
                        <OperationSubscriptionCard
                            subscription={data}
                            partner={partner!}
                        />
                    )}
                    partnerData={{
                        name: partner?.name!,
                        avatar: partner?.avatarPath!,
                        city: partner?.name.split(' ').slice(-1)[0]!,
                    }}
                    hideColumns={['payable']}
                    onBack={() => {
                        setPartnerDeadlines([])
                    }}
                    isLoading={isLoading || isRefetching}
                />
            ) : (
                <>
                    <DataTable
                        table={tableOperations}
                        data={partnerSubscripton}
                        title="Tableau de validation des écheances"
                        transform={(data) => (
                            <PaymentOnesSubscriptionCard
                                subscription={data}
                                partner={partner!}
                                setPartnerDeadlines={setPartnerDeadlines}
                            />
                        )}
                        partnerData={{
                            name: partner?.name!,
                            avatar: partner?.avatarPath!,
                            city: partner?.name.split(' ').slice(-1)[0]!,
                        }}
                        hideColumns={['payable']}
                        back
                        isLoading={isLoading || isRefetching}
                    />
                    <PaginationData
                        currentPage={totals.currentPage}
                        setCurrentPage={(page) =>
                            setTotals({ ...totals, currentPage: page })
                        }
                        totalPages={totals.totalPages}
                        pageSize={totals.pageSize}
                        refetch={refetch}
                    />
                </>
            )}
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

export default DeadlinesOfSubscription
