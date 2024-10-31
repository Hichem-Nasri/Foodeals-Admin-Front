import { Layout } from '@/components/Layout/Layout'
import DemandeSupport from '@/components/support/newDemande'
import React, { FC } from 'react'

interface DemandeSupportProps {
    params: { id: string }
}

const DemandeSupportPage: FC<DemandeSupportProps> = ({ params }) => {
    return (
        <Layout>
            <DemandeSupport id={params.id} />
        </Layout>
    )
}

export default DemandeSupportPage
