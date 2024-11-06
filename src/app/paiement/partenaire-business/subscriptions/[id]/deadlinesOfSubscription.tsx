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
import { useNotification } from '@/context/NotifContext'
import { fetchSubscriptionEntity } from '@/lib/api/payment/getSubscription'
import { NotificationType, PartnerInfoDto } from '@/types/GlobalType'
import {
    deadlineType,
    defaultDataSubscriptionOnesTable,
    partnerSubscriptonOnesType,
} from '@/types/PaymentType'
import { useQuery } from '@tanstack/react-query'
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
import { useParams, usePathname, useRouter } from 'next/navigation'
import React, { Fragment, useEffect, useState } from 'react'

function DeadlinesOfSubscription() {
    const [partnerSubscripton, setPartnerSubscripton] = useState<
        partnerSubscriptonOnesType[]
    >(defaultDataSubscriptionOnesTable)
    const [partnerDeadlines, setPartnerDeadlines] = useState<deadlineType[]>([])
    const [partner, setPartner] = useState<PartnerInfoDto>({
        name: 'Marjane',
        avatarPath: 'https://i.pravatar.cc/300',
        id: '1',
    })
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [totalPages, setTotalPages] = useState(0)
    const [subscriptionId, setSubscriptionId] = useState('')
    const notify = useNotification()
    const router = useRouter()
    const params = useParams()
    const id = params.id
    console.log('id', id)
    const { data, isLoading, error } = useQuery({
        queryKey: ['subscription'],
        queryFn: async () => {
            try {
                const response = await fetchSubscriptionEntity(
                    new Date(),
                    id as string,
                    currentPage,
                    pageSize
                )
                if (response.status !== 200) {
                    throw new Error('Error fetching subscriptions')
                }
                const { partner, list } = response.data
                // setPartner(partner)
                setTotalPages(list.totalPages)
                // setPartnerSubscripton(list.content)
                return response.data
            } catch (error) {
                notify.notify(
                    NotificationType.ERROR,
                    'Erreur lors de la récupération des données'
                )
                console.log('error', error)
            }
        },
    })
    const onSubmit = () => {}
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
    useEffect(() => {
        console.log('partnerSubscripton', partnerSubscripton)
    }, [partnerDeadlines])

    return (
        <div className="flex flex-col gap-3 w-full">
            <div className="lg:flex hidden items-center gap-3 justify-between bg-white p-3 rounded-[14px]">
                <div className="flex justify-center items-center space-x-4">
                    <ColumnVisibilityModal table={table} />
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
            {partnerDeadlines.length > 0 ? (
                <DataTable
                    table={table}
                    data={partnerDeadlines}
                    title="Tableau de validation des écheances"
                    transform={(data) => (
                        <OperationSubscriptionCard
                            subscription={data}
                            partner={partner}
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
                />
            ) : (
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
                    back={false}
                />
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
