import type { Metadata } from 'next'

import { Montserrat } from 'next/font/google'
import './globals.css'
import QueryProvider from '@/components/Layout/QueryProvider'

const montserrat = Montserrat({ subsets: ['latin'], weight: '500' })

export const metadata: Metadata = {
    //
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="fr">
            <QueryProvider>
                <body className={`${montserrat.className} `}>{children}</body>
            </QueryProvider>
        </html>
    )
}
