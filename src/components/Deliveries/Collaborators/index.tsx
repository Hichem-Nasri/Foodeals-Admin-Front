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
import { ArrowLeft, RotateCw } from 'lucide-react'
import { CustomButton } from '@/components/custom/CustomButton'
import {
    defaultFilter,
    PartnerCollaboratorsFilerSchema,
} from '@/types/collaborators'
import { useRouter } from 'next/navigation'
import { DataTable } from '@/components/DataTable'
import { FilterDeliveryCollaborators } from './FilterDeliveryCollaborators'
import { DeliveryCollaboratorsType } from '@/types/deliveries'
import { DeliveryCollaboratorCard } from './DeliveryCollaboratorCard'
import { useNotification } from '@/context/NotifContext'
import { getCollaboratorDelivery } from '@/lib/api/delivery/getCollaborator'
import {
    NotificationType,
    PartnerInfoDto,
    TotalValueProps,
    TotalValues,
} from '@/types/GlobalType'
import { useQuery } from '@tanstack/react-query'
import PaginationData from '@/components/utils/PaginationData'
import { columnsDeliveryCollaboratorsTable } from '../column/collaboratorsColumn'

interface DeliveryCollaboratorsProps {
    deliveryCollaborators: DeliveryCollaboratorsType[]
    deliveryId: string
}

export interface TableRowType {
    key: string
    label: string
}

export const DeliveryCollaborators: FC<DeliveryCollaboratorsProps> = ({
    deliveryId,
}) => {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [collaborator, setCollaborator] = useState<
        DeliveryCollaboratorsType[]
    >([])
    const [FilterData, setFilterData] =
        useState<z.infer<typeof PartnerCollaboratorsFilerSchema>>(defaultFilter)
    const [totals, setTotals] = useState<TotalValueProps>(TotalValues)
    const [open, setOpen] = useState(false)
    const notify = useNotification()
    const router = useRouter()
    const [partner, setPartner] = useState<PartnerInfoDto & { city: string }>({
        id: '',
        name: '',
        city: '',
        avatarPath: '',
    })
    const [archive, setArchive] = useState(false)

    const { error, isLoading, refetch, isRefetching } = useQuery({
        queryKey: ['partners', totals.currentPage, totals.pageSize],
        queryFn: async () => {
            try {
                const data = await getCollaboratorDelivery(
                    deliveryId,
                    totals.currentPage,
                    totals.pageSize,
                    FilterData,
                    archive
                )
                if (data.status === 500)
                    throw new Error('Error fetching partners')
                const { organization, users } = data.data
                setPartner(organization)
                console.log('data', data)
                setTotals({
                    ...totals,
                    totalElements: users?.totalElements,
                    totalPages: users?.totalPages,
                })
                setCollaborator(users?.content)
                return data.data
            } catch (error) {
                notify.notify(
                    NotificationType.ERROR,
                    'Error fetching Collaborateurs'
                )
                console.log(error)
                // setCollaborator([])
            }
        },
        refetchOnWindowFocus: false,
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

    const table = useReactTable({
        data: collaborator,
        columns: columnsDeliveryCollaboratorsTable(router, archive, refetch),
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
            <FilterDeliveryCollaborators
                onSubmit={onSubmit}
                table={table}
                form={form}
                setArchive={setArchive}
                archive={archive}
                totalElements={totals.totalElements}
                open={open}
                setOpen={setOpen}
            />
            <DataTable
                title="Listes des collaborateurs"
                table={table}
                data={collaborator}
                transform={(value) => (
                    <DeliveryCollaboratorCard collaborator={value} archive={archive} refetch={refetch} />
                )}
                isLoading={isLoading || isRefetching}
                partnerData={{
                    ...partner,
                    avatar: partner.avatarPath,
                }}
            />
            <PaginationData
                currentPage={totals.currentPage}
                totalPages={totals.totalPages}
                setCurrentPage={(page) =>
                    setTotals({ ...totals, currentPage: page })
                }
                refetch={refetch}
                pageSize={totals.pageSize}
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
                    label="Retour"
                    className="w-full"
                    IconLeft={ArrowLeft}
                />
            </div>
        </div>
    )
}
