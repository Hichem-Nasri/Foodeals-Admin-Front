'use client'
import { Layout } from '@/components/Layout/Layout'
import React from 'react'
import { Create } from './create'
import api from '@/api/Auth'
import { useQuery } from '@tanstack/react-query'
import { useParams, usePathname, useSearchParams } from 'next/navigation'

const API_URL = 'http://localhost:8080/api/v1/crm/prospects/[:id]/events'

export default function CreatePage() {
    const query = useSearchParams()

    return (
        <Layout>
            <Create type={query.get('type')!} />
        </Layout>
    )
}
