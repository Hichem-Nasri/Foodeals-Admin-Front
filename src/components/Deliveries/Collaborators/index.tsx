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
import { NotificationType } from '@/types/GlobalType'
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
    const [currentPage, setCurrentPage] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const [totalElement, setTotalElements] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [open, setOpen] = useState(false)
    const notify = useNotification()
    const router = useRouter()
    const [archive, setArchive] = useState(false)

    const { error, isLoading, refetch } = useQuery({
        queryKey: ['partners', currentPage, pageSize],
        queryFn: async () => {
            try {
                const data = await getCollaboratorDelivery(
                    deliveryId,
                    currentPage,
                    pageSize
                )
                if (data.status === 500)
                    throw new Error('Error fetching partners')
                console.log('data', data)
                setTotalElements(data.data.totalElements)
                setTotalPages(data.data.totalPages)
                setCollaborator(data.data.content)
                return data.data
            } catch (error) {
                notify.notify(NotificationType.ERROR, 'Error fetching partners')
                console.log(error)
                // setCollaborator([])
            }
        },
    })

    const form = useForm<z.infer<typeof PartnerCollaboratorsFilerSchema>>({
        resolver: zodResolver(PartnerCollaboratorsFilerSchema),
        mode: 'onBlur',
        defaultValues: FilterData,
    })

    const onSubmit = (
        data: z.infer<typeof PartnerCollaboratorsFilerSchema>
    ) => {
        setFilterData(data)
        setOpen(false)
        refetch()
    }

    const table = useReactTable({
        data: collaborator,
        columns: columnsDeliveryCollaboratorsTable(router),
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    const partnerData = {
        name: 'Marjane',
        avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=Ikea',
        city: 'Fès',
    }
    if (error) {
        return <div>Error: {error.message}</div>
    }
    return (
        <div className="flex flex-col gap-[0.625rem] w-full px-3 lg:mb-0 mb-4">
            <FilterDeliveryCollaborators
                onSubmit={onSubmit}
                table={table}
                form={form}
                setArchive={setArchive}
                archive={archive}
                totalElements={totalElement}
                open={open}
                setOpen={setOpen}
            />
            <DataTable
                title="Listes des collaborateurs"
                table={table}
                data={collaborator}
                transform={(value) => (
                    <DeliveryCollaboratorCard collaborator={value} />
                )}
                partnerData={partnerData}
                isLoading={isLoading}
            />
            <PaginationData
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                refetch={refetch}
                pageSize={pageSize}
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
