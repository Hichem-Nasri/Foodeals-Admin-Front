'use server'

import { auth, signIn, signOut } from '@/auth'
import { UserType } from '@/auth.config'
import { LoginSchema } from '@/schemas'
import { z } from 'zod'

export async function SignOut() {
    return signOut({
        redirectTo: '/auth/signin',
    })
}

export async function LogIn(data: z.infer<typeof LoginSchema>) {
    try {
        const result = await signIn('credentials', {
            email: data.email,
            password: data.password,
            remember: data.remember as boolean,
            redirect: false,
        })

        console.log('the result is: ', result)

        // Check if there was an error during sign-in
        if (result?.error) {
            console.error('Login failed:', result.error)
            return { success: false, error: result.error }
        }

        // If successful, return the user session or user info
        return { success: true, user: result.user } // Assuming result.user contains user info
    } catch (e) {
        console.error('An error occurred during login:', e)
        return { success: false, error: 'An unexpected error occurred.' }
    }
}

export async function getUser() {
    const session = await auth()
    return session?.user as UserType
}
