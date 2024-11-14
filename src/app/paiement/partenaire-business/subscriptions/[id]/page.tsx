import { Layout } from '@/components/Layout/Layout'
import React from 'react'
import DeadlinesOfSubscription from './deadlinesOfSubscription'

function SubscriptionsDeadlinesPage({
    params,
}: {
    params: {
        id: string
    }
}) {
    return (
        <Layout>
            <DeadlinesOfSubscription id={params.id} />
        </Layout>
    )
}

export default SubscriptionsDeadlinesPage
