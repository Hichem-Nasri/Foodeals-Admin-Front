import { Layout } from "@/components/Layout/Layout"
import { NewPartner } from "@/components/Partners/NewPartner"
import { getPartnerData } from "@/lib/api/fetchPartnerData"

interface PartnersPageProps {
	params: { id: string }
}

export default async function PartnersPage({ params }: PartnersPageProps) {
	const partnerDetails = await getPartnerData(params.id)
	return (
		<Layout>
			<NewPartner partnerDetails={partnerDetails} />
		</Layout>
	)
}
