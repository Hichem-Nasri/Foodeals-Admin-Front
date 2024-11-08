import { Associations } from '@/components/Association'
import { Layout } from '@/components/Layout/Layout'

interface AssociationPageProps {}

export default async function AssociationPage({}: AssociationPageProps) {
    return (
        <Layout>
            <Associations />
        </Layout>
    )
}
