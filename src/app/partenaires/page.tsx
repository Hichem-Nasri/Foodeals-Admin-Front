'use client'
import { Layout } from '@/components/Layout/Layout'
import { Partners } from '@/components/Partners'
// import { useNotification } from '@/context/NotifContext'

interface PartnersPageProps {
    params: {
        pathParams: string[]
        lang: string
    }
    searchParams: {
        partnerId: string
    }
}

export default function PartnersPage({ searchParams }: PartnersPageProps) {
    return (
        <Layout>
            <Partners />
        </Layout>
    )
}
