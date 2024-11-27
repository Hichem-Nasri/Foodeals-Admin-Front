import Credentials from 'next-auth/providers/credentials'
import type { NextAuthConfig, User } from 'next-auth'
import { LoginSchema } from './schemas'
import { getUserByEmail } from './data/user'

export type UserType = User & { accessToken: any }

export default {
    providers: [
        Credentials({
            async authorize(credentials, request): Promise<UserType | null> {
                const { callbackUrl, remember, ...data } = credentials
                console.log('credentials', data)
                const validatedFields = LoginSchema.safeParse(data)
                console.log('validatedFields', validatedFields)

                if (validatedFields.success) {
                    const { email, password } = validatedFields.data

                    const user = await getUserByEmail(email)
                    console.log('user', user)

                    const res = await fetch(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/v1/auth/login`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ email, password }),
                        }
                    )
                        .then((res) => res.json())
                        .catch((err) => {
                            console.log('err', err)
                            throw new Error('Invalid credentials.')
                        })

                    // Check if the response contains a valid token
                    if (!res || !res.access_token) {
                        throw new Error('Invalid credentials.')
                    }

                    // Return the user object along with the token
                    return {
                        ...user,
                        accessToken: res.access_token as string, // Include the token in the user object
                    }
                }

                console.log(validatedFields.error)
                return null
            },
        }),
    ],
} satisfies NextAuthConfig
