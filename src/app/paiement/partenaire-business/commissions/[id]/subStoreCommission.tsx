'use client'
import React, { Fragment, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ColumnVisibilityModal } from '@/components/Partners/ColumnVisibilityModal'
import { CustomButton } from '@/components/custom/CustomButton'
import { DataTable } from '@/components/DataTable'
import { CardTotalValue } from '@/components/payment/CardTotalValue'
import { FilterPayment } from '@/components/payment/FilterPayment'
import { SwitchValidation } from '@/components/payment/payment-validations/SwitchValidations'
import {
    ColumnFiltersState,
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getPaginationRowModel,
} from '@tanstack/react-table'
import { Coins, Percent, ArrowRight, RotateCw } from 'lucide-react'
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
import { NotificationType } from '@/types/GlobalType'

const SubStoreCommission = () => {
    const { id } = useParams()
    const [commissionSubStore, setCommissionSubStore] = useState<
        PaymentCommission[]
    >(defaultDataCommissionTable)
    const [dateAndPartner, setDateAndPartner] = useState({
        date: new Date(),
        partner: 'all',
    })
    const [options, setOptions] = useState([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [totalPages, setTotalPages] = useState(0)
    const [totalCommission, setTotalCommission] = useState(0)
    const [totalSales, setTotalSales] = useState(0)
    const [totalElements, setTotalElements] = useState(0)
    const notify = useNotification()
    const router = useRouter()

    const { data, isLoading, error } = useQuery({
        queryKey: ['commissions', id, currentPage, pageSize],
        queryFn: async () => {
            try {
                const response = await fetchPaymentCommission(
                    currentPage - 1,
                    pageSize,
                    new Date(),
                    id as string
                )
                console.log(response)
                const statistics = response.data.statistics
                setTotalCommission(statistics.totalCommission.amount)
                setTotalSales(statistics.total.amount)
                const data = response.data.commissions
                setTotalPages(data.totalPages)
                setTotalElements(data.totalElements)
                setCommissionSubStore(data.content)
                // setOptions(options)
                return response.data
                return []
            } catch (error) {
                notify.notify(
                    NotificationType.ERROR,
                    'Erreur lors de la récupération des données'
                )
                throw new Error('Error fetching commissions')
            } //TODO: add page of error
        },
    })

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
                    Icon={Coins}
                    title="Total des ventes"
                    value={totalCommission}
                    className="text-mountain-400 bg-mountain-400"
                />
                <CardTotalValue
                    Icon={Percent}
                    title="Total des commissions"
                    value={totalSales}
                    className="bg-amethyst-500 text-amethyst-500"
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
                    label={totalElements + ''}
                    IconLeft={ArrowRight}
                    disabled
                    variant="outline"
                    className="disabled:border-lynch-400 disabled:opacity-100 disabled:text-lynch-400 font-semibold text-lg py-3 px-5 h-fit"
                />
            </div>
            <DataTable
                table={table}
                data={commissionSubStore}
                title="Tableau de validation des commission"
                hideColumns={['payable', 'entityId', 'partnerType']}
                transform={(data) => (
                    <PaymentCommissionCard commission={data} path="subStore" />
                )}
                isLoading={isLoading}
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
    )
}

export default SubStoreCommission
