'use client'
import {
    columnsPartnersTable,
    PartnerSolutionType,
    PartnerType,
} from '@/types/partners'
import { FC, useReducer, useState } from 'react'
import { FilterAndCreatePartners } from './FilterAndCreatePartners'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
    ColumnFiltersState,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { CustomButton } from '../custom/CustomButton'
import { RotateCw, Store } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { DataTable } from '../DataTable'
import { PartnerCard } from './PartnerCard'
import PaginationData from '../utils/PaginationData'

interface PartnersProps {
    partners: PartnerType[]
}

export interface TableRowType {
    key: string
    label: string
}

export const Partners: FC<PartnersProps> = ({ partners }) => {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const router = useRouter()
    const schema = z.object({
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        company: z
            .array(
                z.object({
                    label: z.string().optional(),
                    key: z.string().optional(),
                    avatar: z.string().optional(),
                })
            )
            .optional(),
        collaborators: z
            .array(
                z.object({
                    label: z.string().optional(),
                    key: z.string().optional(),
                    avatar: z.string().optional(),
                })
            )
            .optional(),
        email: z.string().optional(),
        phone: z.string().optional(),
        city: z.string().optional(),
        companyType: z.string().optional(),
        solution: z
            .array(z.enum(['MARKET_PRO', 'DLC_PRO', 'DONATE_PRO']))
            .optional(),
    })
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        mode: 'onBlur',
        defaultValues: {
            startDate: undefined,
            endDate: undefined,
            company: [],
            collaborators: [],
            email: '',
            phone: '',
            city: '',
            companyType: '',
            solution: [],
        },
    })

    const [data, _setData] = useState(() => [...partners])

    const table = useReactTable({
        data,
        columns: columnsPartnersTable(router),
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
        <div className="flex flex-col gap-[0.625rem] items-center w-full px-3 lg:mb-0 mb-4">
            <FilterAndCreatePartners
                table={table}
                form={form}
                partners={partners}
                setColumnFilters={setColumnFilters}
            />
            <DataTable
                data={data}
                table={table}
                title="Listes des partenaires"
                transform={(value) => (
                    <PartnerCard partner={value} key={value.id} />
                )}
            />
            <div className="lg:hidden flex flex-col items-center gap-4 ">
                <CustomButton
                    size="sm"
                    label="Voir plus"
                    className="text-sm font-semibold rounded-full border-lynch-400 text-lynch-400 py-[0.375rem] px-5"
                    variant="outline"
                    IconRight={RotateCw}
                />
                <CustomButton
                    label="Ajouter un partenaire"
                    className="w-full"
                    IconRight={Store}
                />
            </div>
        </div>
    )
}
