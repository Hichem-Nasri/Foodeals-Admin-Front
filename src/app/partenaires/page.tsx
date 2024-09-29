import { Layout } from "@/components/Layout/Layout"
import { Partners } from "@/components/Partners"
import { partnersData, PartnerType } from "@/types/partners"

interface PartnersPageProps {
	params: {
		pathParams: string[]
		lang: string
	}
	searchParams: {
		partnerId: string
	}
}

export default async function PartnersPage({ searchParams }: PartnersPageProps) {
	const { subAccounts, partners } = await getPartners(searchParams.partnerId)
	return (
		<Layout>
			<Partners partners={partnersData} />
		</Layout>
	)
}

const getPartners = async (id: string) => {
	if (!id) {
		// TODO: fetch Partners
		return {
			partners: partnersData
		}
	}
	// TODO: fetch Sub-accounts with the partner id
	return {
		subAccounts: [] as PartnerType[],
	}
}
