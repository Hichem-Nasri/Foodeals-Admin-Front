'use client'
import { CollaboratorCard } from '@/components/Collaborators/CollaboratorCard'
import {
    CollaboratorsType,
    columnsCollaboratorsTable,
} from '@/components/Collaborators/column/collaboratorColumn'
import { FilterCollaborators } from '@/components/Collaborators/FilterCollaborators'
import { DataTable } from '@/components/DataTable'
import PaginationData from '@/components/utils/PaginationData'
import { useNotification } from '@/context/NotifContext'
import { getCollaborator } from '@/lib/api/partner/getCollaborators'
import { SchemaFilter, defaultSchemaFilter } from '@/types/associationSchema'
import {
    defaultFilter,
    PartnerCollaboratorsFilerSchema,
} from '@/types/collaborators'
import {
    defaultSchemaCollaborators,
    SchemaCollaborators,
} from '@/types/collaboratorsUtils'
import {
    NotificationType,
    PartnerInfoDto,
    TotalValueProps,
    TotalValues,
} from '@/types/GlobalType'
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
import React, { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface CollaborateursProps {
    id: string
    type: string
    partnerType: string
}

const Collaborateurs: FC<CollaborateursProps> = ({ id, type, partnerType }) => {
    const [collaborators, setCollaborators] = useState<CollaboratorsType[]>([])
    const [totals, setTotals] = useState<TotalValueProps>(TotalValues)
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [FilterData, setFilterData] =
        useState<z.infer<typeof PartnerCollaboratorsFilerSchema>>(defaultFilter)
    const [open, setOpen] = useState(false)
    const [archive, setArchive] = useState(false)
    const [partner, setPartner] = useState<PartnerInfoDto & { city: string }>({
        id: '',
        name: '',
        avatarPath: '',
        city: '',
    })
    const notify = useNotification()
    const router = useRouter()
    const { error, isLoading, isRefetching, refetch } = useQuery({
        queryKey: ['partners', totals.currentPage, totals.pageSize],
        queryFn: async () => {
            try {
                const data = await getCollaborator(
                    id,
                    type,
                    archive,
                    totals.currentPage,
                    totals.pageSize,
                    FilterData,
                    partnerType
                )
                if (data.status === 500)
                    throw new Error('Error fetching partners')
                const { organization, users } = data.data
                setPartner(organization)
                setTotals({
                    ...totals,
                    totalPages: users?.totalPages,
                    totalElements: users?.totalElements,
                })
                setCollaborators(users?.content)
                return data.data
            } catch (error) {
                notify.notify(NotificationType.ERROR, 'Error fetching partners')
                console.log(error)
                setCollaborators([])
            }
        },
        refetchOnWindowFocus: false,
    })

    // handleArchive function
    const handleArchive = () => {
        // fetching Archived associations
        setArchive((prev) => !prev)
    }

    const form = useForm<z.infer<typeof PartnerCollaboratorsFilerSchema>>({
        resolver: zodResolver(PartnerCollaboratorsFilerSchema),
        mode: 'onBlur',
        defaultValues: FilterData,
    })

    const onSubmit = (
        data: z.infer<typeof PartnerCollaboratorsFilerSchema>
    ) => {
        console.log('data', data)
        setFilterData(data)
        setOpen(false)
    }

    const table = useReactTable({
        data: collaborators,
        columns: columnsCollaboratorsTable(router, id, archive, refetch),
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    useEffect(() => {
        if (isLoading || isRefetching) return
        setTotals({
            ...totals,
            currentPage: 0,
        })
        refetch()
    }, [archive, FilterData])

    return (
        <div className="flex flex-col gap-[0.625rem] w-full px-3 lg:mb-0 mb-4">
            <FilterCollaborators
                table={table}
                form={form}
                onSubmit={onSubmit}
                archive={archive}
                handleArchive={handleArchive}
                open={open}
                setOpen={setOpen}
                totalElements={totals.totalElements}
                isFetching={isLoading || isRefetching}
                type={type}
                partnerType={partnerType}
            />
            <DataTable
                data={collaborators}
                table={table}
                title="Liste des Collaborateurs"
                transform={(value) => (
                    <CollaboratorCard
                        User={value}
                        partnerId={id}
                        archive={archive}
                        refetch={refetch}
                    />
                )}
                isLoading={isLoading || isRefetching}
                hideColumns={['avatarPath']}
                partnerData={{
                    avatar: partner.avatarPath,
                    name: partner.name,
                    city: partner.city,
                }}
            />
            <PaginationData
                pageSize={totals.pageSize}
                currentPage={totals.currentPage}
                totalPages={totals.totalPages}
                setCurrentPage={(page) =>
                    setTotals({ ...totals, currentPage: page })
                }
                refetch={refetch}
            />
        </div>
    )
}

export default Collaborateurs
