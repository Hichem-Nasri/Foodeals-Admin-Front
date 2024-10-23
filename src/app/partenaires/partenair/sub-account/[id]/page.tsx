import { Layout } from '@/components/Layout/Layout'
// import { useParams } from 'next/navigation'
import React from 'react'
import SubAccount from './SubAccount'
import fetchSubPartner from '@/lib/api/partner/fetchSubPartner'

const ParnterSubAccount = async ({
    params,
}: {
    params: {
        id: string
    }
}) => {
    // const { id } = useParams()
    const subAccount = await fetchSubPartner(params.id)
    return (
        <Layout>
            <SubAccount subAccount={subAccount.data} />
        </Layout>
    )
}

export default ParnterSubAccount
