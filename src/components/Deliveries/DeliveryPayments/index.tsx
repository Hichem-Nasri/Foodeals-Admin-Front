'use client'
import { PaymentFilterSchema, PaymentType } from '@/types/PaymentType'
import { FC, useState } from 'react'
import { z } from 'zod'
import { ArrowRight, CalendarClock, RotateCw } from 'lucide-react'
import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { CardTotalValue } from '@/components/payment/CardTotalValue'
import { ColumnVisibilityModal } from '@/components/Partners/ColumnVisibilityModal'
import { CustomButton } from '@/components/custom/CustomButton'
import { DataTable } from '@/components/DataTable'
import { PaymentCardDetails } from '@/components/payment/PaymentCardDetails'
import {
    columnsDeliveryPaymentsTable,
    DeliveryPaymentsType,
} from '@/types/deliveries'
import { DeliveryPaymentCard } from './DeliveryPaymentCard'
import { MultiSelectOptionsType } from '@/components/MultiSelect'
import { defaultDataCommissionTable } from '@/components/payment/business/column/commissionColumn'

interface DeliveryPaymentsProps {
    payments: DeliveryPaymentsType[]
}

export const DeliveryPayments: FC<DeliveryPaymentsProps> = ({ payments }) => {
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
    const totalCommission = payments.reduce(
        (acc, payment) => acc + payment.commissionTotal,
        0
    )
    const total = payments.reduce((acc, payment) => acc + payment.toPay, 0)

    const table = useReactTable({
        data,
        columns: columnsDeliveryPaymentsTable,
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    return (
        <div className="flex flex-col gap-3 w-full">
            <div className="flex lg:flex-row flex-col items-center gap-3 w-full">
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
                transform={(data) => <DeliveryPaymentCard payment={data} />}
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
