'use client'
import { getUser } from '@/app/actions'
import React, { createContext, useState, useEffect, useContext } from 'react'

export async function fetchUserData(): Promise<User | null> {
    try {
        const userData = await getUser()
        return userData
    } catch (error) {
        console.error('Failed to fetch user:', error)
        return null
    }
}
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
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await fetchUserData()
            setUser(userData)
            setLoading(false)
        }

        fetchUser()
    }, [])

    return (
        <UserContext.Provider value={{ user, loading, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = (): UserContextType => {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider')
    }

    const { user, setUser, loading } = context

    useEffect(() => {
        const fetchAndSetUser = async () => {
            if (!user) {
                const userData = await fetchUserData()
                setUser(userData)
            }
        }

        fetchAndSetUser()
    }, [user, setUser])

    return context
}
