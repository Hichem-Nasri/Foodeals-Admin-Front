'use client'
import React, { Fragment, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { CustomButton } from '@/components/custom/CustomButton'
import { DataTable } from '@/components/DataTable'
import { ColumnVisibilityModal } from '@/components/Partners/ColumnVisibilityModal'
import { CardTotalValue } from '@/components/payment/CardTotalValue'
import { FilterPayment } from '@/components/payment/FilterPayment'
import { SwitchValidation } from '@/components/payment/payment-validations/SwitchValidations'
import {
    defaultDataCommissionSSTable,
    columnsCommissionSSTable,
    defaultDataCommissionTable,
    columnsCommissionMonthTable,
    defaultDataCommissionMonthTable,
    partnerCommissionMonthType,
} from '@/types/PaymentType'
import {
    ColumnFiltersState,
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getPaginationRowModel,
} from '@tanstack/react-table'
import { Coins, Percent, ArrowRight, RotateCw, CheckCheck } from 'lucide-react'
import { PaymentValidation } from '@/components/payment/PaymentValidation'
import SwitchPayment from '@/components/payment/switchPayment'
import { MultiSelectOptionsType } from '@/components/MultiSelect'
import { useNotification } from '@/context/NotifContext'
import { fetchPaymentCommission } from '@/lib/api/payment/getPayment'
import { NotificationType } from '@/types/Global-Type'
import { PaymentCommision } from '@/types/paymentUtils'
import { useQuery } from '@tanstack/react-query'
import { fetchPaymentCommissionMonth } from '@/lib/api/payment/getCommissionMonth'

const CommissionMonth = () => {
    const { id } = useParams()
    const fetchCommissionMonth = async () => {
        // fetch CommissionMonth by id
    }
    const [commissionMonth, setCommissionMonth] = useState<
        partnerCommissionMonthType[]
    >(defaultDataCommissionMonthTable)
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [options, setOptions] = useState<MultiSelectOptionsType[]>(() => {
        return [
            ...defaultDataCommissionTable.map(
                (partner) =>
                    ({
                        key: partner.oraganizationId,
                        label: partner.partnerInfoDto.name,
                    } as MultiSelectOptionsType)
            ),
            {
                key: 'all',
                label: 'Tous les partenaires',
                avatar: '/all-partners.svg',
            },
        ]
    })
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [totalCommission, setTotalCommission] = useState(0)
    const [totalSales, setTotalSales] = useState(0)
    const notify = useNotification()
    const [dateAndPartner, setDateAndPartner] = useState({
        date: new Date(),
        partner: 'all',
    })
    const router = useRouter()

    const { data, isLoading, error } = useQuery({
        queryKey: ['commissionMonth', id],
        queryFn: async () => {
            try {
                const response = await fetchPaymentCommissionMonth(
                    currentPage,
                    pageSize,
                    id as string,
                    dateAndPartner.date
                )
                let totalCommission = 0,
                    totalSales = 0
                response.data.forEach((partner) => {
                    if (partner.payable) {
                        totalCommission +=
                            partner.commissionCard || partner.cashCommission
                        totalSales += partner.cashAmount || partner.cardAmount
                    }
                })
                setTotalCommission(totalCommission)
                setTotalSales(totalSales)
                setCommissionMonth(response.data)
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
                    <ColumnVisibilityModal table={tableCommission} />
                    <SwitchValidation />
                </div>
                <div className="flex justify-center items-center space-x-4">
                    <PaymentValidation
                        id={id as string}
                        label="Confirmer tout"
                        className="rounded-[12px] h-12"
                        IconRight={CheckCheck}
                    />

                    <CustomButton
                        label={'3025'}
                        IconLeft={ArrowRight}
                        disabled
                        variant="outline"
                        className="disabled:border-lynch-400 disabled:opacity-100 h-12 disabled:text-lynch-400 font-semibold text-lg py-3 px-5 "
                    />
                </div>
            </div>
            <DataTable
                table={tableCommission}
                data={defaultDataCommissionTable}
                title="Tableau de validation des commission"
                transform={(data) => <Fragment />}
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
export default CommissionMonth
