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
import { NotificationType, PartnerInfoDto } from '@/types/GlobalType'
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

interface OperationsProps {}

export const ValidationSubscription = ({}: OperationsProps) => {
    const [subscriptionData, setSubscriptionData] = useState<
        partnerSubscriptionType[]
    >(defaultDataSubscriptionTable)
    const [partnerSubscripton, setParnterSubscription] = useState<
        partnerSubscriptonOnesType[]
    >(defaultDataSubscriptionOnesTable)
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [subscriptionID, setSubscriptionId] = useState('')
    const [store, setStore] = useState<PartnerInfoDto>({
        id: '',
        name: '',
        avatarPath: '',
    })
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [totalIN_PROGRESS, setTotalIN_PROGRESS] = useState(0)
    const [totalSales, setTotalSales] = useState(0)
    const notify = useNotification()
    const [options, setOptions] = useState<MultiSelectOptionsType[]>([])
    const router = useRouter()

    const { data, isLoading, error } = useQuery({
        queryKey: ['subscription'],
        queryFn: async () => {
            try {
                const response = await fetchSubscription(currentPage, pageSize)
                let totalIN_PROGRESS = 0,
                    totalSales = 0
                response.data.forEach((partner) => {
                    if (partner.payable) {
                        // totalCommission +=
                        //     partner.commissionCard || partner.cashCommission
                        // totalSales += partner.cashAmount || partner.cardAmount
                    }
                })
                setTotalIN_PROGRESS(totalIN_PROGRESS)
                setTotalSales(totalSales)
                // setCommissionMonth(response.data)
                // setOptions(options)
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
    const tableOperations = useReactTable({
        data: partnerSubscripton,
        columns: columnsSubscriptionOnesTable(router),
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })
    const [open, setOpen] = useState(false)

    const [dateAndPartner, setDateAndPartner] = useState<
        z.infer<typeof PaymentFilterSchema>
    >({
        date: new Date(),
        partner: 'all',
    })
    const form = useForm({
        resolver: zodResolver(PaymentFilterSchema),
        defaultValues: dateAndPartner,
        mode: 'onBlur',
    })
    const onSubmit = (data: z.infer<typeof PaymentFilterSchema>) => {
        console.log(data)
    }

    const { handleSubmit } = form

    const tableSubscription = useReactTable({
        data: subscriptionData,
        columns: columnsSubscriptionTable(router, setSubscriptionId),
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    useEffect(() => {
        if (subscriptionID) {
            console.log('subscriptionID', subscriptionID)
            const store = subscriptionData.find(
                (data) => data.id === subscriptionID
            )?.magasin
            setStore({
                id: store?.id!,
                name: store?.name!,
                avatarPath: store?.avatar!,
            })
            // const partnerSub =
        }
    }, [subscriptionID])

    return (
        <>
            {!open ? (
                <div className="flex flex-col gap-3 w-full">
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
                        />
                        <CardTotalValue
                            Icon={FileBadge}
                            title="Total des Subscriptions"
                            value={totalIN_PROGRESS}
                            className="text-mountain-400 bg-mountain-400"
                        />
                        <CardTotalValue
                            Icon={Percent}
                            title="Total des écheances"
                            value={totalSales}
                            className="bg-amethyst-500 text-amethyst-500"
                        />
                    </div>
                    <div className="lg:flex hidden items-center gap-3 justify-between bg-white p-3 rounded-[14px]">
                        <div className="flex justify-center items-center space-x-4">
                            <ColumnVisibilityModal table={tableSubscription} />
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
                    {subscriptionID ? (
                        <>
                            <DataTable
                                table={tableOperations}
                                data={partnerSubscripton}
                                title="Tableau de validation des Subscription"
                                transform={(data) => (
                                    <PaymentOnesSubscriptionCard
                                        subscription={data}
                                        store={store}
                                    />
                                )}
                                partnerData={{
                                    name: store.name,
                                    avatar: store.avatarPath,
                                    city: '',
                                }}
                            />
                        </>
                    ) : (
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
                        />
                    )}
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
                        <FormFilterPayment
                            options={[]}
                            form={form}
                            onSubmit={onSubmit}
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
