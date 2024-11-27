import NextAuth, { User } from 'next-auth'
import authConfig from './auth.config'

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    callbacks: {
        authorized: async ({ auth, request }) => {
            if (auth?.expires) {
                console.log('auth', auth)
                // console.log('request', request)
            }
            // Logged in users are authenticated, otherwise redirect to login page
            return !!auth
        },
        async jwt({ token, account, profile }) {
            // Persist the OAuth access_token and or the user id to the token right after signin
            if (account && profile) {
                token.accessToken = account.access_token
                token.id = profile.id
            }
            return token
        },
        session: async ({ session, token }) => {
            // Add access_token to the session right after signin
            // session.accessToken = token.accessToken
            return session
        },
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith('/')) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        },
    },
    pages: {
        signIn: '/',
        signOut: '/auth/signin',
    },
})
