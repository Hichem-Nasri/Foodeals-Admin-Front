'use client'
import { CrmCardDetails } from '@/components/crm/CrmCard'
import { FilterCrm } from '@/components/crm/FilterCrm'
import { DataTable } from '@/components/DataTable'
import { columnsCrmTable, defaultDataCrmTable } from '@/types/CrmType'
import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import axios from 'axios'
import Statistics from './statistics'

export default function Crm() {
    /* This Part is for fetching data of table and change it to CrmType */
    // const [data, setData] = useState<CrmType[]>([])
    // useEffect(() => {
    //     axios
    //         .get('https://localhost:8080/api/v1/crm/prospects')
    //         .then((response) => {
    //              const parsedData = JSON.parse(response.data);
    //             setData(AllDataToCrm(parseData.content))
    //         })
    //         .catch((error) => {
    //             console.error(error)
    //         })
    // }, [])
    const data = defaultDataCrmTable
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const router = useRouter()
    const table = useReactTable({
        data,
        columns: columnsCrmTable(router),
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
        <div className="flex flex-col gap-3 w-full p-1">
            <Statistics />
            <FilterCrm
                table={table}
                columnFilters={columnFilters}
                setColumnFilters={setColumnFilters}
            />
            <DataTable
                table={table}
                data={data}
                title="Listes des prospects"
                transform={(data: any) => <CrmCardDetails crm={data} />}
            />
        </div>
    )
}

const fetchData = async () => {
    const response = await axios.get(
        'http://localhost:8080/api/v1/crm/prospects'
    )
    return response.data
}

// {
//     "id": "b2eb74fe-6af7-4c83-88bf-b1a8391bc0d8",
//     "createdAt": "2024-10-03",
//     "companyName": "Example Company",
//     "category": "Activity 2",
//     "contact": {
//         "name": {
//             "firstName": "John",
//             "lastName": "Doe"
//         },
//         "email": "john.doe1234@example.com",
//         "phone": "1234567890"
//     },
//     "address": {
//         "city": "Casablanca",
//         "address": "123 Main St",
//         "region": "maarif"
//     },
//     "creatorInfo": {
//         "name": {
//             "firstName": "test ",
//             "lastName": "test "
//         },
//         "avatarPath": null
//     },
//     "managerInfo": {
//         "name": {
//             "firstName": "test 1 ",
//             "lastName": "test 1"
//         },
//         "avatarPath": null
//     },
//     "eventObject": "",
//     "status": "IN_PROGRESS",
//     "events": [],
//     "solutions": []
// }
