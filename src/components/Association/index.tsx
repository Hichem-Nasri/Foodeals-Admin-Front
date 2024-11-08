'use client'
import { FC, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { CustomButton } from '../custom/CustomButton'
import { HeartHandshake, RotateCw, Store } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { DataTable } from '../DataTable'
import { AssociationType } from '@/types/association'
import { FiltersAssociation } from './FiltersAssociation'
import { AssociationCard } from './AssociationCard'
import { defaultSchemaFilter, SchemaFilter } from '@/types/associationSchema'
import { fetchAssociations } from '@/lib/api/association/getAssociations'
import { useNotification } from '@/context/NotifContext'
import { NotificationType } from '@/types/GlobalType'
import { PartnerType } from '@/types/partnersType'
import { useQuery } from '@tanstack/react-query'
import PaginationData from '../utils/PaginationData'
import { AppRoutes } from '@/lib/routes'
import { columnsAssociationsTable } from './column/associationColumn'

interface AssociationsProps {}

export interface TableRowType {
    key: string
    label: string
}

export const Associations: FC<AssociationsProps> = ({}) => {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [associations, setAssociations] = useState<AssociationType[]>([])
    const [currentPage, setCurrentPage] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const [totalPages, setTotalPages] = useState(0)
    const [archive, setArchive] = useState(true)
    const notify = useNotification()
    const router = useRouter()
    const { error, isLoading, refetch } = useQuery({
        queryKey: ['partners', currentPage, pageSize],
        queryFn: async () => {
            try {
                const data = await fetchAssociations(currentPage, pageSize)
                if (data.status === 500)
                    throw new Error('Error fetching partners')
                setTotalPages(data.data.totalPages)
                setAssociations(data.data?.content)
                return data.data
            } catch (error) {
                notify.notify(NotificationType.ERROR, 'Error fetching partners')
                console.log(error)
                setAssociations([])
            }
        },
    })

    // handleArchive function
    const handleArchive = () => {
        // fetching Archived associations
        setArchive((prev) => !prev)
    }

    const form = useForm<z.infer<typeof SchemaFilter>>({
        resolver: zodResolver(SchemaFilter),
        mode: 'onBlur',
        defaultValues: defaultSchemaFilter,
    })

    const table = useReactTable({
        data: associations,
        columns: columnsAssociationsTable(router),
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    return (
        <div className="flex flex-col gap-[0.625rem] w-full px-3 lg:mb-0 mb-4">
            <FiltersAssociation
                table={table}
                form={form}
                data={associations}
                archive={archive}
                handleArchive={handleArchive}
            />
            <DataTable
                data={associations}
                table={table}
                title="Liste des associations"
                transform={(value) => <AssociationCard association={value} />}
                isLoading={isLoading}
            />
            <PaginationData
                pageSize={pageSize}
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                refetch={refetch}
            />
            <div className="lg:hidden flex flex-col items-center gap-4 ">
                <CustomButton
                    size="default"
                    className="w-full"
                    label="Ajouter une association"
                    IconRight={HeartHandshake}
                    onClick={() =>
                        router.push(
                            AppRoutes.newAssociation.replace(':id', 'new')
                        )
                    }
                />
            </div>
        </div>
    )
}
