'use client'
import { CustomButton } from '@/components/custom/CustomButton'
import { ArrowRight, FileBadge, Percent, RotateCw } from 'lucide-react'
import { DataTable } from '@/components/DataTable'
import {
    columnsSubscriptionTable,
    defaultDataSubscriptionTable,
    columnsSubscriptionOnesTable,
    partnerSubscriptionType,
    partnerSubscriptonOnesType,
    defaultDataSubscriptionOnesTable,
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
import { FilterPayment } from '@/components/payment/FilterPayment'
import { useRouter } from 'next/navigation'
import { SwitchValidation } from '@/components/payment/payment-validations/SwitchValidations'
import SwitchPayment from '@/components/payment/switchPayment'
import { useQuery } from '@tanstack/react-query'
import { NotificationType, PartnerInfoDto } from '@/types/Global-Type'
import { useNotification } from '@/context/NotifContext'
import { fetchSubscription } from '@/lib/api/payment/getSubscription'
import { MultiSelectOptionsType } from '@/components/MultiSelect'
import PaymentSubscriptionCard from '@/components/payment/paymentSubscriptionCard'
import PaymentOnesSubscriptionCard from '@/components/payment/paymentOneSubscriptionCard'

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
        name: '',
        avatarPath: '',
    })
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [totalPending, setTotalPending] = useState(0)
    const [totalSales, setTotalSales] = useState(0)
    const notify = useNotification()
    const [options, setOptions] = useState<MultiSelectOptionsType[]>([])
    const [dateAndPartner, setDateAndPartner] = useState({
        date: new Date(),
        partner: 'all',
    })
    const router = useRouter()

    const { data, isLoading, error } = useQuery({
        queryKey: ['subscription'],
        queryFn: async () => {
            try {
                const response = await fetchSubscription(currentPage, pageSize)
                let totalPending = 0,
                    totalSales = 0
                response.data.forEach((partner) => {
                    if (partner.payable) {
                        // totalCommission +=
                        //     partner.commissionCard || partner.cashCommission
                        // totalSales += partner.cashAmount || partner.cardAmount
                    }
                })
                setTotalPending(totalPending)
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
                name: store?.name!,
                avatarPath: store?.avatar!,
            })
            // const partnerSub =
        }
    }, [subscriptionID])

    return (
        <div className="flex flex-col gap-3 w-full">
            <SwitchPayment />
            <div className="flex lg:flex-row flex-col items-center gap-3 w-full">
                <FilterPayment
                    date={dateAndPartner.date}
                    setData={(date) =>
                        setDateAndPartner({ ...dateAndPartner, date })
                    }
                    partener={dateAndPartner.partner}
                    setPartener={(partner) =>
                        setDateAndPartner({
                            ...dateAndPartner,
                            partner: partner,
                        })
                    }
                    options={options}
                />
                <CardTotalValue
                    Icon={FileBadge}
                    title="Total des Subscriptions"
                    value={totalPending}
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
