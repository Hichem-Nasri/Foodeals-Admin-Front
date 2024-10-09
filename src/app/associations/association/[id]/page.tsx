import { NewAssociation } from "@/components/Association/NewAssociation"
import { Layout } from "@/components/Layout/Layout"

interface AssociationPageProps {}

export default async function AssociationPage({}: AssociationPageProps) {
	return (
		<Layout formTitle="Nouvelle association">
			<NewAssociation />
		</Layout>
	)
}
