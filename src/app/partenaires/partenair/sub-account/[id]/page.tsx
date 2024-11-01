import { Layout } from '@/components/Layout/Layout'
// import { useParams } from 'next/navigation'
import React from 'react'
import SubAccount from '@/components/Partners/subAccount'

const ParnterSubAccount = async ({
    params,
}: {
    params: {
        id: string
    }
}) => {
    // const { id } = useParams()
    return (
        <Layout>
            <SubAccount id={params.id} />
        </Layout>
    )
}

export default ParnterSubAccount
