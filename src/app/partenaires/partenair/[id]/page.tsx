import { Layout } from '@/components/Layout/Layout'
import { NewPartner } from '@/components/Partners/NewPartner'
import { getPartnerData } from '@/lib/api/partner/fetchPartnerData'

interface PartnersPageProps {
    params: { id: string }
}

export default async function PartnersPage({ params }: PartnersPageProps) {
    const partnerDetails = await getPartnerData(params.id) // TODO: add params.id to fetch data
    return (
        <Layout>
            <NewPartner partner={partnerDetails} id={params.id} />
        </Layout>
    )
}
