'use client'
import { FC, useEffect, useState } from 'react'
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
import { ArrowLeft, Eye, RotateCw, Store } from 'lucide-react'
import { CustomButton } from '@/components/custom/CustomButton'
import {
    columnsPartnerCollaboratorsTable,
    defaultFilter,
    PartnerCollaborators,
    PartnerCollaboratorsFilerSchema,
} from '@/types/collaborators'
import { FilterAndCreatePartnerCollaborators } from './FilterAndCreatePartnerCollaborators'
import { useRouter } from 'next/navigation'
import { ActionType } from '@/components/custom/ActionsMenu'
import { AppRoutes } from '@/lib/routes'
import { DataTable } from '@/components/DataTable'
import { PartnerCollaboratesCard } from './PartnerCollaboratorsCard'
import { useNotification } from '@/context/NotifContext'
import { SchemaFilter, defaultSchemaFilter } from '@/types/associationSchema'
import {
    CollaboratorsType,
    CollaboratorsUser,
    SchemaCollaborators,
    defaultSchemaCollaborators,
} from '@/types/collaboratorsUtils'
import {
    TotalValueProps,
    TotalValues,
    PartnerInfoDto,
    NotificationType,
} from '@/types/GlobalType'
import { useQuery } from '@tanstack/react-query'
import { type } from 'os'
import PaginationData from '@/components/utils/PaginationData'
import { getCollaborator } from '@/lib/api/partner/getCollaborators'

interface CollaboratorsProps {
    partnerId: string
}

export interface TableRowType {
    key: string
    label: string
}

export const Collaborators: FC<CollaboratorsProps> = ({ partnerId }) => {
    const [collaborators, setCollaborators] = useState<CollaboratorsUser[]>([])
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
                    partnerId,
                    'PARTNER_WITH_SB,NORMAL_PARTNER',
                    archive,
                    totals.currentPage,
                    totals.pageSize,
                    FilterData,
                    ''
                )
                if (data.status === 500)
                    throw new Error('Error fetching partners')
                const { organization, users } = data.data
                setTotals({
                    ...totals,
                    totalPages: users.totalPages,
                    totalElements: users.totalElements,
                })
                setPartner(organization)
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

    const table = useReactTable({
        data: collaborators,
        columns: columnsPartnerCollaboratorsTable({
            router,
            archive,
            refetch,
            partnerId,
        }),
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

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
            <FilterAndCreatePartnerCollaborators
                table={table}
                form={form}
                open={open}
                setOpen={setOpen}
                onSubmit={onSubmit}
                archive={archive}
                totalElements={totals.totalElements}
                handleArchive={handleArchive}
            />
            <DataTable
                title="Listes des collaborateurs"
                table={table}
                data={collaborators}
                transform={(value) => (
                    <PartnerCollaboratesCard
                        partner={value}
                        key={value.id}
                        partnerId={partnerId}
                        archive={archive}
                        refetch={refetch}
                    />
                )}
                partnerData={{
                    ...partner,
                    avatar: partner.avatarPath,
                }}
            />
            <PaginationData
                refetch={refetch}
                pageSize={totals.pageSize}
                totalPages={totals.totalPages}
                currentPage={totals.currentPage}
                setCurrentPage={(page) =>
                    setTotals({ ...totals, currentPage: page })
                }
            />
        </div>
    )
}
