'use client'
import { Layout } from '@/components/Layout/Layout'
import React from 'react'
import { Create } from './create'
import api from '@/api/Auth'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

const API_URL = 'http://localhost:8080/api/v1/crm/prospects/[:id]/events'

export default function CreatePage() {
    return (
        <Layout>
            <Create />
        </Layout>
    )
}
