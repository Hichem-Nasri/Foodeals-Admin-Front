'use client'
import React, { FC } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

type QueryProviderProps = {
    children: React.ReactNode
}

const QueryProvider: FC<QueryProviderProps> = ({ children }) => {
    return (
        <QueryClientProvider client={new QueryClient()}>
            {children}
        </QueryClientProvider>
    )
}

export default QueryProvider
