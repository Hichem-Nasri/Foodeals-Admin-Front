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
import {
    columnsDeliveriesTable,
    DeliveryType,
    exportDeliveryData,
} from '@/types/deliveries'
import { FiltersDeliveries } from './FilterDeliveries'
import { DeliveryCard } from './DeliveryCard'
import { useNotification } from '@/context/NotifContext'
import { NotificationType } from '@/types/GlobalType'
import { useQuery } from '@tanstack/react-query'
import { fetchDeliveryPartners } from '@/lib/api/delivery/fetchDeliveryParnters'
import { API_PARTNERS } from '@/lib/api_url'
import api from '@/api/Auth'
interface DeliveriesProps {
    deliveries: DeliveryType[]
}

export interface TableRowType {
    key: string
    label: string
}

export const Deliveries: FC<DeliveriesProps> = ({ deliveries }) => {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [currentPage, setCurrentPage] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const [totalPages, setTotalPages] = useState(0)
    const notify = useNotification()
    const router = useRouter()
    const [archive, setArchive] = useState(false)
    const [data, setData] = useState<DeliveryType[]>([])

    const { error, isLoading, refetch } = useQuery({
        queryKey: ['partners', currentPage, pageSize],
        queryFn: async () => {
            try {
                const data = await fetchDeliveryPartners(currentPage, pageSize)
                if (data.status === 500)
                    throw new Error('Error fetching partners')
                console.log('data', data)
                setData(data.data)
                return data.data
            } catch (error) {
                notify.notify(NotificationType.ERROR, 'Error fetching partners')
                console.log(error)
                setData([])
            }
        },
    })

    const table = useReactTable({
        data,
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
                    const response = await api
                        .get(
                            `${API_PARTNERS}/deleted?page=0&size=20&sort=deletedAt,desc&type=DELIVERY_PARTNER`
                        )
                        .then((res) => res.data)
                        .catch((error) => {
                            throw new Error(error)
                        })
                    const data = exportDeliveryData(response.content)
                    setData(data)
                } catch (error) {
                    notify.notify(
                        NotificationType.ERROR,
                        'Error fetching partners'
                    )
                    setData([])
                    console.log(error)
                }
            } //TODO: Check recive data from backend is correct
            fetchArchive()
        } else {
            refetch()
        }
    }, [archive, error])
    if (isLoading) return <div>Loading...</div>
    return (
        <div className="flex flex-col gap-[0.625rem] w-full px-3 lg:mb-0 mb-4">
            <FiltersDeliveries
                table={table}
                data={deliveries}
                setColumnFilters={setColumnFilters}
                setArchive={setArchive}
                archive={archive}
            />
            <DataTable
                data={data}
                table={table}
                title="Liste des partenaires de livraison"
                transform={(value) => <DeliveryCard delivery={value} />}
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
                    label="Ajouter un partenaire"
                    className="w-full"
                    IconRight={Store}
                />
            </div>
        </div>
    )
}
