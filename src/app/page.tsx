import { Layout } from '@/components/Layout/Layout'
import { auth } from '@/auth'

interface HomePageProps {}

export default async function HomePage({}: HomePageProps) {
    const session = await auth()

    console.log('user:', session)
    return (
        <Layout>
            <h1>Home Page</h1>
        </Layout>
    )
}
