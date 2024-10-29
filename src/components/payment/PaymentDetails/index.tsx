'use client'
import { CustomButton } from '@/components/custom/CustomButton'
import { FilterPayment } from '../FilterPayment'
import { CardTotalValue } from '../CardTotalValue'
import { CheckCheck, LoaderCircle, RotateCw } from 'lucide-react'
import { DataTable } from '@/components/DataTable'
import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import { OperationCard } from './OperationCard'
import { SubscriptionCard } from './SubscriptionCard'
import { cn } from '@/lib/utils'
import { MultiSelectOptionsType } from '@/components/MultiSelect'
import { defaultDataCommissionTable } from '../business/column/commissionColumn'
import {
    columnsPaymentsDetailsTable,
    defaultDataPaymentsDetailsTable,
} from '../business/column/paymentDetailsColumn'
import {
    columnsValidationTable,
    defaultDataValidationTable,
} from '../business/column/subscriptionColumn'

interface OperationsProps {}

export const Operations = ({}: OperationsProps) => {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [showOperations, setShowOperations] = useState(true)
    const onSubmit = () => {}
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
    const [dateAndPartner, setDateAndPartner] = useState({
        date: new Date(),
        partner: 'all',
    })
    const totalIN_PROGRESS = 12222
    const totalSales = 51554516

    const tableOperations = useReactTable({
        data: defaultDataPaymentsDetailsTable,
        columns: columnsPaymentsDetailsTable,
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    const tableSubscription = useReactTable({
        data: defaultDataValidationTable,
        columns: columnsValidationTable,
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    const PaymentData = {
        name: 'Marjane',
        avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=Ikea',
        city: 'Casablanca',
    }

    return (
        <div className="flex flex-col gap-3 w-full">
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
                <div className="flex lg:hidden items-center gap-2.5 bg-white p-3 rounded-[14px]">
                    <CustomButton
                        label="Opération du mois"
                        variant="ghost"
                        className={
                            showOperations ? 'text-primary' : 'text-lynch-950'
                        }
                        onClick={() => setShowOperations(true)}
                    />
                    <span className="h-2/3 w-px bg-lynch-400" />
                    <CustomButton
                        label="Validation des paiement"
                        variant="ghost"
                        onClick={() => setShowOperations(false)}
                        className={
                            !showOperations ? 'text-primary' : 'text-lynch-950'
                        }
                    />
                </div>
                <CardTotalValue
                    Icon={LoaderCircle}
                    title="En cours"
                    value={totalIN_PROGRESS}
                    className="text-amethyst-500 bg-amethyst-500"
                />
                <CardTotalValue
                    Icon={CheckCheck}
                    title="Total commission"
                    value={totalSales}
                />
            </div>
            <DataTable
                table={tableOperations}
                data={defaultDataPaymentsDetailsTable}
                title="Opérations du mois"
                transform={(data) => (
                    <OperationCard
                        className={`${
                            showOperations ? 'inline-flex' : 'hidden'
                        }`}
                        operation={data}
                    />
                )}
                partnerData={PaymentData}
            />
            <DataTable
                table={tableSubscription}
                data={defaultDataValidationTable}
                title="Tableau de validation des Subscription"
                transform={(data) => (
                    <SubscriptionCard
                        className={`${
                            showOperations ? 'hidden' : 'inline-flex'
                        }`}
                        operation={data}
                    />
                )}
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
