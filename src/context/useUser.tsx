'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { getUser } from '@/app/actions/index' // Adjust the import path
import { useSession } from 'next-auth/react'

export interface User {
    id: string
    name: string
    email: string
    image?: string | null
    role?: string
    // Add other properties as needed
}

interface UserContextType {
    user: User | null
    loading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { data: session, status } = useSession()
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchUser = async () => {
            if (status === 'authenticated' && session?.user?.email) {
                try {
                    const userData = await getUser()
                    setUser(userData)
                } catch (error) {
                    console.error('Failed to fetch user:', error)
                }
            }
            setLoading(false)
        }

        fetchUser()
    }, [session, status])

    return (
        <UserContext.Provider value={{ user, loading }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = (): UserContextType => {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider')
    }
    return context
}
