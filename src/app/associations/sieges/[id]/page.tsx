import { Associations } from "@/components/Association";
import { Sieges } from "@/components/Association/Sieges";
import { Layout } from "@/components/Layout/Layout";
import { siegesData } from "@/types/association";

interface SiegesPageProps {}

export default async function SiegesPage({}: SiegesPageProps) {
	return (
		<Layout>
      <Sieges sieges={siegesData} />
		</Layout>
	)
}
