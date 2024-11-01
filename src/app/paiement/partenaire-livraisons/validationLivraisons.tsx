'use client'
import { CustomButton } from '@/components/custom/CustomButton'
import { DataTable } from '@/components/DataTable'
import { MultiSelectOptionsType } from '@/components/MultiSelect'
import { ColumnVisibilityModal } from '@/components/Partners/ColumnVisibilityModal'
import { defaultDataCommissionTable } from '@/components/payment/business/column/commissionColumn'
import { columnsPaymentDeliveriesTable } from '@/components/payment/business/column/paymentDeliveriesColumn'
import { CardTotalValue } from '@/components/payment/CardTotalValue'
import { ConfirmPayment } from '@/components/payment/ConfirmPayment'
import { FilterPayment } from '@/components/payment/FilterPayment'
import SwitchPayment from '@/components/payment/switchPayment'
import { PaymentFilterSchema, PaymentDeliveriesType } from '@/types/PaymentType'
import {
    ColumnFiltersState,
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getPaginationRowModel,
} from '@tanstack/react-table'
import { CalendarClock, ArrowRight, RotateCw, CheckCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC, Fragment, useState } from 'react'
import { z } from 'zod'

interface PaymentProps {
    payments: PaymentDeliveriesType[]
}

export const PaymentDeliveries: FC<PaymentProps> = ({ payments }) => {
    const [data, _setData] = useState(() => [...payments])
    const router = useRouter()
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [options, setOptions] = useState<MultiSelectOptionsType[]>(() => {
        return [
            ...defaultDataCommissionTable.map(
                (partner) =>
                    ({
                        key: partner.organizationId,
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
    const [dateAndPartner, setDateAndPartner] = useState({
        date: new Date(),
        partner: 'all',
    })

    const onSubmit = (data: z.infer<typeof PaymentFilterSchema>) => {}
    const totalCommission = 12222
    const total = 9948652

    const table = useReactTable({
        data,
        columns: columnsPaymentDeliveriesTable(),
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
                    Icon={CalendarClock}
                    title="Echéance"
                    value={total}
                    className="text-red-500 bg-red-500"
                />
                <CardTotalValue
                    Icon={CalendarClock}
                    title="Total commission"
                    value={totalCommission}
                />
            </div>
            <div className="lg:flex hidden items-center gap-3 justify-between bg-white p-3 rounded-[14px]">
                <ColumnVisibilityModal table={table} />
                <div className="flex justify-center items-center space-x-2">
                    <ConfirmPayment
                        id=""
                        label="Confirmer tout"
                        className="rounded-[12px]"
                        IconRight={CheckCheck}
                    />
                    <CustomButton
                        label={payments.length.toString()}
                        IconLeft={ArrowRight}
                        disabled
                        variant="outline"
                        className="disabled:border-primary h-12 disabled:opacity-100 disabled:text-primary font-semibold text-lg py-3 px-5 "
                    />
                </div>
            </div>
            <DataTable
                table={table}
                data={data}
                title="Tableau de validation des commission"
                transform={(data) => <Fragment />}
                hideColumns={['payByFoodeals']}
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
