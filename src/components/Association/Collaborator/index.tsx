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
import React, { FC, useEffect, useState } from 'react'
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
import {
    NotificationType,
    PartnerInfoDto,
    TotalValueProps,
    TotalValues,
} from '@/types/GlobalType'
import { CollaboratorsUser } from '@/types/collaboratorsUtils'
import {
    PartnerCollaboratorsFilerSchema,
    defaultFilter,
} from '@/types/collaborators'
import { FilterUsers } from './FilterDeliveryCollaborators'

interface CollaboratorAssociationsProps {
    id: string
}

const CollaboratorAssociations: FC<CollaboratorAssociationsProps> = ({
    id,
}) => {
    const [collaborators, setCollaborators] = useState<CollaboratorsUser[]>([])
    const [totals, setTotals] = useState<TotalValueProps>(TotalValues)
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [FilterData, setFilterData] =
        useState<z.infer<typeof PartnerCollaboratorsFilerSchema>>(defaultFilter)
    const [open, setOpen] = useState(false)
    const [partner, setPartner] = useState<PartnerInfoDto & { city: string }>({
        id: '',
        name: '',
        city: '',
        avatarPath: '',
    })
    const [archive, setArchive] = useState(false)
    const notify = useNotification()
    const router = useRouter()
    const { error, isLoading, refetch, isRefetching } = useQuery({
        queryKey: ['partners', totals.currentPage, totals.pageSize],
        queryFn: async () => {
            try {
                const data = await getCollaborator(
                    id,
                    totals.currentPage,
                    totals.pageSize,
                    archive,
                    FilterData,
                    'ASSOCIATION,FOOD_BANK,FOOD_BANK_ASSO'
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
                notify.notify(
                    NotificationType.ERROR,
                    'Erreur lors de la récupération des collaborateurs'
                )
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
        setTotals({
            ...totals,
            currentPage: 0,
        })
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
        columns: columnsCollaboratorTable(router, archive, refetch),
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
            <FilterUsers
                table={table}
                form={form}
                onSubmit={onSubmit}
                archive={archive}
                handleArchive={handleArchive}
                open={open}
                setOpen={setOpen}
                totalElements={totals.totalElements}
                type="USERS"
            />
            <DataTable
                data={collaborators}
                table={table}
                title="Liste des Collaborateurs"
                transform={(value) => (
                    <UsersCard
                        User={value}
                        archive={archive}
                        refetch={refetch}
                    />
                )}
                isLoading={isLoading}
                partnerData={{
                    ...partner,
                    avatar: partner.avatarPath,
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

export default CollaboratorAssociations
