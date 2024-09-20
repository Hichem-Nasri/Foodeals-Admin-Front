import { Layout } from "@/components/Layout/Layout"
import { NewPartner } from "@/components/Partners/NewPartner"

interface PartnersPageProps {}

export default async function PartnersPage({}: PartnersPageProps) {
	return (
		<Layout>
      <NewPartner />
		</Layout>
	)
}
