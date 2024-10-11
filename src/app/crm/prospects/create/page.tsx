'use client'
import { Layout } from '@/components/Layout/Layout'
import React from 'react'
import { Create } from './create'
import { defaultDataProspectTable } from '@/types/CrmType'
import api from '@/api/Auth'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

const API_URL = 'http://localhost:8080/api/v1/crm/prospects/[:id]/events'

export default function CreatePage() {
    const { id } = useParams()
    // const { data, isSuccess, error } = useQuery({
    //     queryKey: ['prospects', 'events'],
    //     queryFn: () => fetchProspects(id as string),
    // })
    return (
        <Layout>
            <Create prospect={defaultDataProspectTable} />
        </Layout>
    )
}

const fetchProspects = async (id: string) => {
    const url = API_URL.replace('[:id]', id)
    console.log('url', url)
    const res = await api
        .get(url)
        .then((res) => res.data)
        .catch((err) => console.error(err))
    return res
}
