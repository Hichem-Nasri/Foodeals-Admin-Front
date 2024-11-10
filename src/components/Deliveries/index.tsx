'use client'

import { FC, useEffect, useState } from 'react'

import {
    ColumnFiltersState,
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
import { DeliveryType } from '@/types/deliveries'
import { FiltersDeliveries } from './FilterDeliveries'
import { DeliveryCard } from './DeliveryCard'
import { useNotification } from '@/context/NotifContext'
import { NotificationType } from '@/types/GlobalType'
import { useQuery } from '@tanstack/react-query'
import { fetchDeliveryPartners } from '@/lib/api/delivery/fetchDeliveryParnters'
import { API_PARTNERS } from '@/lib/api_url'
import api from '@/api/Auth'
import archivePatner from '@/lib/api/partner/archiverPartner'
import getArchivedPartners from '@/lib/api/partner/getArchiver'
import PaginationData from '../utils/PaginationData'
import { columnsDeliveriesTable } from './column/deliveryColumn'
interface DeliveriesProps {}

export interface TableRowType {
    key: string
    label: string
}

export const Deliveries: FC<DeliveriesProps> = ({}) => {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [currentPage, setCurrentPage] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const [totalElement, setTotalElements] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const notify = useNotification()
    const router = useRouter()
    const [archive, setArchive] = useState(false)
    const [deliveries, setDeliveries] = useState<DeliveryType[]>([])

    const { error, isLoading, refetch } = useQuery({
        queryKey: ['partners', currentPage, pageSize],
        queryFn: async (data: any) => {
            try {
                const data = await fetchDeliveryPartners(currentPage, pageSize)
                if (data.status === 500)
                    throw new Error('Error fetching partners')
                console.log('data', data)
                setTotalElements(data.data.totalElements)
                setTotalPages(data.data.totalPages)
                setDeliveries(data.data.content)
                return data.data
            } catch (error) {
                notify.notify(NotificationType.ERROR, 'Error fetching partners')
                console.log(error)
                setDeliveries([])
            }
        },
    })

    const table = useReactTable({
        data: deliveries,
        columns: columnsDeliveriesTable(router),
        state: {
            columnFilters,
        },
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })
    useEffect(() => {
        if (error) {
            notify.notify(NotificationType.ERROR, error.message)
        }
        if (archive) {
            const fetchArchive = async () => {
                try {
                    const response = await getArchivedPartners(
                        'DELIVERY_PARTNER',
                        currentPage,
                        pageSize
                    )
                    const { status, data } = response
                    if (status === 500)
                        throw new Error('Error fetching partners')
                    console.log('data', data)
                    setTotalElements(data.totalElements)
                    setTotalPages(data.totalPages)
                    setDeliveries(data.content)
                } catch (error) {
                    notify.notify(
                        NotificationType.ERROR,
                        'Error fetching partners'
                    )
                    setDeliveries([])
                    console.log(error)
                }
            } //TODO: Check recive data from backend is correct
            fetchArchive()
        } else {
            refetch()
        }
    }, [archive, error])
    return (
        <div className="flex flex-col gap-[0.625rem] w-full px-3 lg:mb-0 mb-4">
            <FiltersDeliveries
                table={table}
                data={deliveries}
                setColumnFilters={setColumnFilters}
                setArchive={setArchive}
                archive={archive}
                totalElements={totalElement}
            />
            <DataTable
                data={deliveries}
                table={table}
                title="Liste des partenaires de livraison"
                transform={(value) => <DeliveryCard delivery={value} />}
                isLoading={isLoading}
            />
            <PaginationData
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                refetch={refetch}
            />

            <div className="lg:hidden flex flex-col items-center gap-4 ">
                <CustomButton
                    label="Ajouter un partenaire"
                    className="w-full"
                    IconRight={Store}
                />
            </div>
        </div>
    )
}
