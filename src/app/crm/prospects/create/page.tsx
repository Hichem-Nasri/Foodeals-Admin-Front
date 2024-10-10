import { Layout } from '@/components/Layout/Layout'
import React from 'react'
import { Create } from './create'
import { defaultDataProspectTable } from '@/types/CrmType'

export default function CRM() {
    return (
        <Layout>
            <Create prospect={defaultDataProspectTable} />
        </Layout>
    )
}
