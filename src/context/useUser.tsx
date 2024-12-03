'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { getUser } from '@/app/actions/index' // Adjust the import path
import { useSession } from 'next-auth/react'

export interface User {
    // Define user properties based on your user object
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
    const auth = useSession()
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getUser()
            if (userData) {
                setUser(userData)
                setLoading(false)
            }
        }

        fetchUser()
    }, [auth])

    return (
        <UserContext.Provider value={{ user, loading }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error('useUser  must be used within a UserProvider')
    }
    return context
}
