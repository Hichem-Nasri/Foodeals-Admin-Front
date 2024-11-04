import { Layout } from '@/components/Layout/Layout'
import { PartnerType } from '@/types/partnersType'

interface CollaboratorsPageProps {
    params: {
        pathParams: string[]
        lang: string
    }
    searchParams: {
        partnerId: string
    }
}

export default async function CollaboratorsPage({
    searchParams,
}: CollaboratorsPageProps) {
    const { subAccounts, partners } = await getCollaborators(
        searchParams.partnerId
    )
    return <Layout></Layout>
}

const getCollaborators = async (id: string) => {
    if (!id) {
        // TODO: fetch Partners
        return {
            partners: [],
        }
    }
    // TODO: fetch Sub-accounts with the partner id
    return {
        subAccounts: [] as PartnerType[],
    }
}
