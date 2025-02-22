'use client'
import { DataTable } from '@/components/DataTable'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import React, { FC, useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import Link from 'next/link'
import { CustomButton } from '@/components/custom/CustomButton'
import { FilePlus } from 'lucide-react'
import { CrmType, EventType } from '@/types/CrmType'
import DetailsEventCard from '../../NewEvent/DetailsEventCard'
import { columnsProspectTable } from '../column/EventColumn'

type TableProspectsProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    data: EventType[]
    prospect: CrmType
    disabled?: boolean
}

export const TableProspects: FC<TableProspectsProps> = ({
    setOpen,
    data,
    prospect,
    disabled,
}) => {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const router = useRouter()
    const table = useReactTable({
        data,
        columns: columnsProspectTable(router),
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })
    return (
        <Accordion
            type="single"
            collapsible
            defaultValue="list-Evenet"
            className="bg-white lg:p-5 px-4 py-6 rounded-[14px] w-full"
        >
            <AccordionItem
                value="list-Evenet"
                className="text-lynch-400 text-[1.375rem] font-normal w-full"
            >
                <AccordionTrigger className="font-normal text-[1.375rem] py-0 m-2">
                    List des Evenements
                </AccordionTrigger>
                <AccordionContent className="w-full">
                    <div className="flex flex-col justify-center items-center w-full p-2 space-y-4">
                        <div className="self-start w-full lg:border border-lynch-100 rounded-2xl">
                            <DataTable
                                title=""
                                hidden={true}
                                table={table}
                                data={data}
                                transform={(data) => (
                                    <DetailsEventCard
                                        detailsData={data}
                                        prospect={prospect}
                                    />
                                )}
                            />
                        </div>
                        <div className="lg:self-end lg:w-fit w-full">
                            <CustomButton
                                disabled={disabled}
                                variant="secondary"
                                onClick={() => setOpen((prev) => !prev)}
                                label="Ajouter un noueau événement"
                                IconRight={FilePlus}
                                className=" transition-all w-full"
                            />
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
