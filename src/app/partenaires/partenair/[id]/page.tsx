import { Layout } from '@/components/Layout/Layout'
import { NewPartner } from '@/components/Partners/NewPartner/'
import { getPartnerData } from '@/lib/api/partner/fetchPartnerData'
import { defaultPartnerData } from '@/types/PartnerSchema'

interface PartnersPageProps {
    params: { id: string }
}

export default async function PartnersPage({ params }: PartnersPageProps) {
    const partnerDetails = await (params.id != 'new'
        ? getPartnerData(params.id)
        : defaultPartnerData) // TODO: add params.id to fetch data
    return (
        <Layout>
            <NewPartner partner={partnerDetails} id={params.id} />
        </Layout>
    )
}
