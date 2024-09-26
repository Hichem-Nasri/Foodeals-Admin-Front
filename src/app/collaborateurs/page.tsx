import { Layout } from "@/components/Layout/Layout"
import { partnersData, PartnerType } from "@/types/partners"

interface CollaboratorsPageProps {
	params: {
		pathParams: string[]
		lang: string
	}
	searchParams: {
		partnerId: string
	}
}

export default async function CollaboratorsPage({ searchParams }: CollaboratorsPageProps) {
	const { subAccounts, partners } = await getCollaborators(searchParams.partnerId)
	return (
		<Layout>

		</Layout>
	)
}

const getCollaborators = async (id: string) => {
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
