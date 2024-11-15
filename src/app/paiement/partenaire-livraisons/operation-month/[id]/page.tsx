import { Layout } from '@/components/Layout/Layout'
import React, { FC } from 'react'
import { OperationMonthDeliveries } from './operationMonth'

interface OperationMonthPageProps {
    params: {
        pathParams: string[]
        lang: string
        id: string
    }
    searchParams: {
        month: string
    }
}
const OperationMonthPage: FC<OperationMonthPageProps> = ({
    params,
    searchParams,
}) => {
    console.log('params:', params)
    console.log('searchParams:', searchParams)

    return (
        <Layout>
            <OperationMonthDeliveries
                id={params.id}
                month={searchParams.month}
            />
        </Layout>
    )
}

export default OperationMonthPage
