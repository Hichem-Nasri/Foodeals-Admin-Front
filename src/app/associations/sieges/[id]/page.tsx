import { Associations } from '@/components/Association'
import { Sieges } from '@/components/Association/Sieges'
import { Layout } from '@/components/Layout/Layout'

interface SiegesPageProps {
    params: {
        id: string
    }
}

export default async function SiegesPage({ params }: SiegesPageProps) {
    return (
        <Layout>
            <Sieges id={params.id} />
        </Layout>
    )
}
