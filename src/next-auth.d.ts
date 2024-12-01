import NextAuth, { DefaultSession, DefaultUser } from 'next-auth'
import { JWT, DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
    interface Session {
        accessToken: string
        refreshToken: string
        user: {
            id: string
            name: string
            email: string
            image?: string | null
            role: string
        } & DefaultSession['user']
    }

    interface User extends DefaultUser {
        accessToken: string
        refreshToken: string
        role: string
    }
}

declare module 'next-auth/jwt' {
    interface JWT extends DefaultJWT {
        accessToken: string
        refreshToken: string
        id: string
        role: string
        image: string | null
    }
}
