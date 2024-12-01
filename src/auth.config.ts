import Credentials from 'next-auth/providers/credentials'
import type { NextAuthConfig, User } from 'next-auth'
import { LoginSchema } from './schemas'
import { cookies } from 'next/headers'
import { parseSetCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { setCookie } from 'nookies'
import credentials from 'next-auth/providers/credentials'

export default {
    providers: [
        Credentials({
            async authorize(credentials, req) {
                const validatedFields = LoginSchema.safeParse({
                    email: credentials.email,
                    password: credentials.password,
                })
                if (!validatedFields.success) {
                    console.error('Validation error:', validatedFields.error)
                    return null // Return null if validation fails
                }

                const { email, password } = validatedFields.data

                try {
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/v1/auth/login`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ email, password }),
                        }
                    )
                    if (!response.ok) {
                        throw new Error('Invalid credentials.')
                    }

                    const res = await response.json()
                    console.log('auth response', res)
                    const user = {
                        name: `${res.name?.firstName} ${res.name?.lastName}`,
                        role: res.role,
                        accessToken: res.token.access_token,
                        refreshToken: res.token.refresh_token,
                        id: res.id,
                        image: res.avatarPath || null, // Ensure image is string or null
                    }
                    return user // Return the user object
                } catch (error) {
                    console.error('Authorization error:', error)
                    return null // Return null on error
                }
            },
        }),
    ],
} satisfies NextAuthConfig
