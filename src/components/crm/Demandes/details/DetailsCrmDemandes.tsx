'use client'
import api from '@/lib/Auth'
import { Layout } from '@/components/Layout/Layout'
import { PartnerSolutionType } from '@/types/partnersType'
import { useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import React, { Fragment } from 'react'
import { DetailsDemandesDisplay } from './DetailsDemandesDisplay'
import { CrmDemandeType, TableNotificationType } from '@/types/CrmType'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { DataTable } from '@/components/DataTable'
import { TopBarDemandes } from './TobBarDemandes'
import { columnsNotificationTable } from '../column/NotificationColumn'
const data: TableNotificationType[] = [
    {
        id: '1',
        date: '2022-10-10T00:00:00.000Z',
        message: 'Title 1',
        object: 'Object 1',
        notifeFrom: {
            id: '1',
            name: {
                firstName: 'Alex',
                lastName: 'Smith',
            },
            avatarPath: 'https://via.placeholder.com/120',
        },
        image: 'https://via.placeholder.com/150',
    },
    {
        id: '2',
        date: '2022-10-10T00:00:00.000Z',
        message: 'Title 2',
        object: 'Object 2',
        notifeFrom: {
            id: '1',
            name: {
                firstName: 'Alex',
                lastName: 'Smith',
            },
            avatarPath: 'https://via.placeholder.com/120',
        },
        image: 'https://via.placeholder.com/150',
    },
    {
        id: '3',
        date: '2022-10-10T00:00:00.000Z',
        message: 'Title 3',
        object: 'Object 3',
        notifeFrom: {
            id: '1',
            name: {
                firstName: 'Alex',
                lastName: 'Smith',
            },
            avatarPath: 'https://via.placeholder.com/120',
        },
        image: 'https://via.placeholder.com/150',
    },
]

const ProspectElement = ({ demandes }: { demandes: CrmDemandeType }) => {
    const [countryCode, setCountryCode] = React.useState('')
    const [open, setOpen] = React.useState(false)
    const route = useRouter()
    const { id } = useParams()
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([])
    const table = useReactTable({
        data,
        columns: columnsNotificationTable(),
        state: {
            columnFilters,
        },
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })
    return (
        <div className="flex flex-col gap-[0.625rem] w-full lg:px-3 lg:mb-0 mb-20 overflow-auto">
            <TopBarDemandes
                label={'Notifier'}
                solution={PartnerSolutionType.DLC_PRO}
                onSubmit={() => {}}
            />
            <DetailsDemandesDisplay
                data={demandes}
                countryCode={'+212'}
                setCountryCode={setCountryCode}
                disabled={true}
            />
            <Accordion
                type="single"
                collapsible
                defaultValue="CrmDemandes"
                className="bg-white lg:p-5 px-4 py-6 rounded-[14px] w-full"
            >
                <AccordionItem
                    value="CrmDemandes"
                    className="text-lynch-400 text-[1.375rem] font-normal w-full"
                >
                    <AccordionTrigger className="font-normal text-[1.375rem] py-0 m-2">
                        Liste des notifications
                    </AccordionTrigger>
                    <AccordionContent className="pt-7 w-full">
                        <DataTable
                            table={table}
                            data={data}
                            title=""
                            transform={(data) => <Fragment />}
                        />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}
const useDemandes = (id: string) => {
    const { data, isSuccess, error } = useQuery({
        queryKey: ['demandes', id],
        queryFn: () => getProspect(id),
    })

    return { demandes: data, isSuccess, error }
}
const DimoDemandes: CrmDemandeType = {
    id: '1',
    companyName: 'Company 1',
    activity: ['Activity 1'],
    country: 'Country 1',
    city: 'City 1',
    role: 'Role 1',
    date: '2022-10-10T00:00:00.000Z',
    respansable: 'Respansable 1',
    address: 'Address 1',
    email: 'example@example.com',
    phone: '06459832456',
}

const DemandesPage = () => {
    const { id } = useParams()
    // const { demandes, isSuccess, error } = useDemandes(id as string)

    return (
        <Layout>
            {/* {!isSuccess ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error?.message}</div>
            ) : (
                <ProspectElement demandes={demandes} />
            )} */}
            <ProspectElement demandes={DimoDemandes} />
        </Layout>
    )
}

export default DemandesPage

const API_ENDPOINT_GET = '/api/crm/demandes'

const getProspect = async (id: string) => {
    if (id) {
        try {
            const res = await api
                .get(`${API_ENDPOINT_GET}/${id}`)
                .then((res) => res.data)
                .catch((err) => {
                    throw new Error(err)
                })
            return res
        } catch (e) {
            console.error(e)
        }
    }
    return {}
}
