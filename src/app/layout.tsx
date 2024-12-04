import type { Metadata } from 'next'

import { Montserrat } from 'next/font/google'
import './globals.css'
import QueryProvider from '@/components/Layout/QueryProvider'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import { NotificationProvider } from '@/context/NotifContext'
import { UserProvider } from '@/context/useUser'
import { Author } from 'next/dist/lib/metadata/types/metadata-types'

const montserrat = Montserrat({ subsets: ['latin'], weight: '500' })
const authore: Author = {
    name: 'Yassin BenTalbe',
    url: '',
}

export const metadata: Metadata = {
    title: 'Foodeals Admin',
    description: 'Admin panel for Foodeals',
    keywords: 'admin, foodeals, panel',
    authors: [authore],

    // Add any other metadata properties you need
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const session = await auth()
    // const cookieStore = await cookies()
    // if (!cookieStore.get('next-auth.session-token')) {
    //     console.log('no cookie')
    //     addCookie(session!.accessToken)
    // }
    return (
        <html lang="fr">
            <SessionProvider session={session}>
                <UserProvider>
                    <NotificationProvider>
                        <QueryProvider>
                            <body className={`${montserrat.className} `}>
                                {children}
                            </body>
                        </QueryProvider>
                    </NotificationProvider>
                </UserProvider>
            </SessionProvider>
        </html>
    )
}
