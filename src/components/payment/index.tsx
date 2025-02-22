'use client'
import { PaymentFilterSchema, PaymentType } from '@/types/PaymentType'
import { FC, useState } from 'react'
import { FormFilterPayment } from './FormFilterPayment'
import { z } from 'zod'
import { CardTotalValue } from './CardTotalValue'
import { ArrowRight, CalendarClock, RotateCw } from 'lucide-react'
import { ColumnVisibilityModal } from '../Partners/ColumnVisibilityModal'
import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { DataTable } from '../DataTable'
import { CustomButton } from '../custom/CustomButton'
import { PaymentCardDetails } from './PaymentCardDetails'
import { useRouter } from 'next/navigation'
import SwitchPayment from './switchPayment'
import { MultiSelectOptionsType } from '../MultiSelect'
import { defaultDataCommissionTable } from './business/column/commissionColumn'
import { columnsPaymentsTable } from './business/column/paymentColumn'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FilterTablePayment } from './FilterTablePayment'

interface PaymentProps {
    payments: PaymentType[]
}

const Payment: FC<PaymentProps> = ({ payments }) => {
    const [data, _setData] = useState(() => [...payments])
    const router = useRouter()
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [dateAndPartner, setDateAndPartner] = useState<
        z.infer<typeof PaymentFilterSchema>
    >({
        date: new Date().toISOString(),
        partner: 'all',
    })
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
    const form = useForm({
        resolver: zodResolver(PaymentFilterSchema),
        defaultValues: dateAndPartner,
        mode: 'onBlur',
    })
    const onSubmit = (data: z.infer<typeof PaymentFilterSchema>) => {}
    const totalCommission = payments.reduce(
        (acc, payment) => acc + payment.totalCommission,
        0
    )
    const total = payments.reduce((acc, payment) => acc + payment.toPay, 0)

    const table = useReactTable({
        data,
        columns: columnsPaymentsTable(router),
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
                {/* <F  ilterTablePayment form={form} onSubmit={onSubmit} /> */}
                <FormFilterPayment form={form} onSubmit={onSubmit} />
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
                <CustomButton
                    label={payments.length.toString()}
                    IconLeft={ArrowRight}
                    disabled
                    variant="outline"
                    className="disabled:border-primary disabled:opacity-100 disabled:text-primary font-semibold text-lg py-3 px-5 h-fit"
                />
            </div>
            <DataTable
                table={table}
                data={data}
                title="Tableau commission des livraison"
                transform={(data) => <PaymentCardDetails payment={data} />}
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

export default Payment
