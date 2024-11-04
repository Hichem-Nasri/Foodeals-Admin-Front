'use client'
import React, { Fragment } from 'react'
import TopBar from './TopBar'
import { DataTable } from '../DataTable'
import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { columnsSupport, defaultColumnSupport } from './column/supportColumn'
import { CustomButton } from '../custom/CustomButton'
import { MessageCircleDashed, MessageCircleMore } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { AppRoutes } from '@/lib/routes'
import { SupportType } from '@/types/support'
import SupportCard from './SupportCard'

const Support = () => {
    const [data, setData] = React.useState<SupportType[]>(defaultColumnSupport)
    const router = useRouter()
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([])
    const table = useReactTable({
        data,
        columns: columnsSupport(router),
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
        <div className="flex flex-col gap-[0.625rem] w-full px-3 lg:mb-0 mb-4">
            <TopBar
                data={data}
                columnFilters={data}
                setColumnFilters={setData}
                table={table}
                router={router}
            />
            {data.length > 0 ? (
                <DataTable
                    data={data}
                    table={table}
                    title="Liste des demandes"
                    transform={(value) => <SupportCard detailsData={value} />}
                />
            ) : (
                <div className="flex flex-col justify-center items-start gap-4">
                    <h1 className="text-2xl	 text-lynch-400">
                        List des Support
                    </h1>
                    <div className="w-full min-h-[600px] flex-col flex justify-center items-center bg-white rounded-[14px] gap-7">
                        <Image
                            src="/no-data.svg"
                            alt="no message"
                            width={300}
                            height={300}
                        />
                        <h6 className="font-light">
                            &quot;Aucun message n&apos;est encore
                            disponible.&quot;
                        </h6>
                        <CustomButton
                            size="sm"
                            variant="outline"
                            label="Nouveau Message"
                            IconRight={MessageCircleMore}
                            onClick={() =>
                                router.push(AppRoutes.supportDetails)
                            }
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Support
