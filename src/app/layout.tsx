import type { Metadata } from 'next'

import { Montserrat } from 'next/font/google'
import './globals.css'
import QueryProvider from '@/components/Layout/QueryProvider'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import { NotificationProvider } from '@/context/NotifContext'
import { UserProvider } from '@/context/useUser'

const montserrat = Montserrat({ subsets: ['latin'], weight: '500' })

export const metadata: Metadata = {}

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
