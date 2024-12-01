// app/actions/auth-client.ts
'use client'

import { signIn } from 'next-auth/react'

export async function clientSignIn(email: string, password: string) {
    try {
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        })

        if (result?.error) {
            return { error: result.error }
        }

        return { success: true }
    } catch (error) {
        console.error('Client Sign In Error:', error)
        return { error: 'An unexpected error occurred' }
    }
}
