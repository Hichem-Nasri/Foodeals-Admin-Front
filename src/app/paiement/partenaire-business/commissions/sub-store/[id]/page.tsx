import { Layout } from '@/components/Layout/Layout'
import React, { FC } from 'react'
import CommissionMonth from './commissionMonth'

interface CommissionMonthProps {
    params: {
        id: string
    }
    searchParams: {
        type: string
    }
}

const CommissionMonthPage: FC<CommissionMonthProps> = ({
    params,
    searchParams,
}) => {
    return (
        <Layout>
            {['NORMAL_PARTNER', 'SUB_ENTITY'].includes(
                searchParams.type
            ) ? (
                <CommissionMonth
                    id={params.id}
                    type={searchParams.type as 'NORMAL_PARTNER' | 'SUB_ENTITY'}
                />
            ) : (
                <div>Invalid type</div>
            )}
        </Layout>
    )
}

export default CommissionMonthPage
