import { Layout } from '@/components/Layout/Layout'
import React, { FC } from 'react'
import CommissionMonth from './commissionMonth'

interface CommissionMonthProps {
    params: {
        id: string
    }
}

const CommissionMonthPage: FC<CommissionMonthProps> = ({ params }) => {
    return (
        <Layout>
            <CommissionMonth id={params.id} />
        </Layout>
    )
}

export default CommissionMonthPage
