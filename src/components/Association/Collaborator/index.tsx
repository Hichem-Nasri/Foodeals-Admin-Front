'use client'
import { DataTable } from '@/components/DataTable'
import PaginationData from '@/components/utils/PaginationData'
import { useNotification } from '@/context/NotifContext'
import { CollaboratorAssociationsType } from '@/types/association'
import { defaultSchemaFilter, SchemaFilter } from '@/types/associationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import {
    ColumnFiltersState,
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getPaginationRowModel,
} from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
    CollaboratorAssociationsData,
    columnsCollaboratorTable,
} from '../column/collaboratorColumn'
import { FiltersAssociation } from '../FiltersAssociation'
import { SiegeCard } from '../Sieges/SiegeCard'
import { UsersCard } from './UserCard'
import { getCollaborator } from '@/lib/api/association/getCollaborator'
import { NotificationType } from '@/types/GlobalType'

interface CollaboratorAssociationsProps {
    id: string
}

const CollaboratorAssociations: FC<CollaboratorAssociationsProps> = ({
    id,
}) => {
    const [collaborators, setCollaborators] = useState<
        CollaboratorAssociationsType[]
    >(CollaboratorAssociationsData)
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [currentPage, setCurrentPage] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const [totalPages, setTotalPages] = useState(0)
    const [filterData, setFilterData] =
        useState<z.infer<typeof SchemaFilter>>(defaultSchemaFilter)
    const [open, setOpen] = useState(false)
    const [totalElements, setTotalElements] = useState(0)
    const [archive, setArchive] = useState(true)
    const notify = useNotification()
    const router = useRouter()
    const { error, isLoading, refetch } = useQuery({
        queryKey: ['partners', currentPage, pageSize],
        queryFn: async () => {
            try {
                const data = await getCollaborator(id, currentPage, pageSize)
                if (data.status === 500)
                    throw new Error('Error fetching partners')
                setTotalPages(data.data.totalPages)
                setTotalElements(data.data.totalElements)
                // setCollaborators(data.data?.content)
                return data.data
            } catch (error) {
                notify.notify(NotificationType.ERROR, 'Error fetching partners')
                console.log(error)
                // setCollaborators([])
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
        defaultValues: filterData,
    })

    const onSubmit = (data: z.infer<typeof SchemaFilter>) => {
        setFilterData(data)
        setOpen(false)
    }

    const table = useReactTable({
        data: collaborators,
        columns: columnsCollaboratorTable(router),
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
                onSubmit={onSubmit}
                archive={archive}
                handleArchive={handleArchive}
                open={open}
                setOpen={setOpen}
                totalElements={totalElements}
                siege
            />
            <DataTable
                data={collaborators}
                table={table}
                title="Liste des Collaborateurs"
                transform={(value) => <UsersCard User={value} />}
                isLoading={isLoading}
                back={false}
                onBack={() => router.back()}
            />
            <PaginationData
                pageSize={pageSize}
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                refetch={refetch}
            />
        </div>
    )
}

export default CollaboratorAssociations
