import { Associations } from '@/components/Association'
import { Layout } from '@/components/Layout/Layout'
import { associationsData } from '@/types/association'

interface AssociationPageProps {}

export default async function AssociationPage({}: AssociationPageProps) {
    return (
        <Layout>
            <Associations />
        </Layout>
    )
}
