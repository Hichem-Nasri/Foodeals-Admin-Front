import { Layout } from "@/components/Layout/Layout"
import { Partners } from "@/components/Partners"
import { partnersData } from "@/types/partners"

interface PartnersPageProps {}

export default async function PartnersPage({}: PartnersPageProps) {
	return (
		<Layout>
			<Partners partners={partnersData} />
		</Layout>
	)
}
