'use client'
import { CustomButton } from '@/components/custom/CustomButton'
import { ArrowRight, Coins, Percent, RotateCw } from 'lucide-react'
import { DataTable } from '@/components/DataTable'
import {
    columnsCommissionTable,
    defaultDataCommissionTable,
    partnerCommissionType,
} from '@/types/PaymentType'
import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { FC, Fragment, useEffect, useState } from 'react'
import { ColumnVisibilityModal } from '@/components/Partners/ColumnVisibilityModal'
import { CardTotalValue } from '@/components/payment/CardTotalValue'
import { FilterPayment } from '@/components/payment/FilterPayment'
import { useRouter } from 'next/navigation'
import { SwitchValidation } from '@/components/payment/payment-validations/SwitchValidations'
import SwitchPayment from '@/components/payment/switchPayment'
import { useQuery } from '@tanstack/react-query'
import { fetchPaymentCommission } from '@/lib/api/payment/getPayment'
import { useNotification } from '@/context/NotifContext'
import { NotificationType } from '@/types/Global-Type'
import { PaymentCommision } from '@/types/paymentUtils'
import { MultiSelectOptionsType } from '@/components/MultiSelect'
import PaymentCommissionCard from '@/components/payment/PaymentCommissionCard'

interface OperationsProps {}

export const ValidationCommissions: FC<OperationsProps> = ({}) => {
    const [commission, setCommission] = useState<PaymentCommision[]>(
        defaultDataCommissionTable
    )
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [totalCommission, setTotalCommission] = useState(0)
    const [totalSales, setTotalSales] = useState(0)
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
    const notify = useNotification()
    const [dateAndPartner, setDateAndPartner] = useState({
        date: new Date(),
        partner: 'all',
    })
    const onSubmit = () => {}
    const router = useRouter()

    const { data, isLoading, error } = useQuery({
        queryKey: ['commissions'],
        queryFn: async () => {
            try {
                const response = await fetchPaymentCommission(
                    currentPage,
                    pageSize,
                    new Date()
                )
                const options = response.data.map((partner) => ({
                    key: partner.oraganizationId,
                    label: partner.partnerInfoDto.name,
                }))
                let totalCommission = 0,
                    totalSales = 0
                response.data.forEach((partner) => {
                    if (partner.payable) {
                        totalCommission += partner.foodealsCommission
                        totalSales += partner.totalAmount
                    }
                })
                setTotalCommission(totalCommission)
                setTotalSales(totalSales)
                // setCommission(response.data)
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
        data: commission,
        columns: columnsCommissionTable(router),
        state: {
            columnFilters,
        },
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })
    useEffect(() => {}, [])

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
                <CustomButton
                    label={'3025'}
                    IconLeft={ArrowRight}
                    disabled
                    variant="outline"
                    className="disabled:border-lynch-400 disabled:opacity-100 disabled:text-lynch-400 font-semibold text-lg py-3 px-5 h-fit"
                />
            </div>
            <DataTable
                table={tableCommission}
                data={defaultDataCommissionTable}
                title="Tableau de validation des commission"
                transform={(data) => (
                    <PaymentCommissionCard commission={data} path="partner" />
                )}
                hideColumns={['payable', 'entityId']}
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
