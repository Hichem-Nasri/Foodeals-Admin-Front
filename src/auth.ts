import NextAuth, { User } from 'next-auth'
import authConfig from './auth.config'
import { cookies } from 'next/headers'
import { API_URL } from './lib/api'
import axios from 'axios'
import api from './lib/Auth'
import { allowCookie } from './app/actions/auth-client'

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    callbacks: {
        authorized: async ({ auth, request }) => {
            console.log('authorized')
            if (!auth || !auth.accessToken || auth.accessToken === '') {
                return false
            }
            const token = auth.accessToken
            const cookie = cookies()
            if (cookie.get('authjs.session-token')?.value != token) {
                allowCookie(token)
            }
            // if (auth && auth.accessToken && auth.accessToken !== '') {
            //     const res = await api
            //         .post(`${API_URL}/v1/auth/verify-token`, {
            //             token: auth.accessToken,
            //         })
            //         .then((res) => res.data)
            //         .catch((err) => {
            //             console.log('err', err)
            //             return false
            //         })
            //     console.log('res: ', res)
            //     if (!res) {
            //         return false
            //     }
            // }
            console.log('authorized Done')
            // Logged in users are authenticated, otherwise redirect to login page
            return !!auth
        },
        async jwt({ token, account, user }) {
            // Persist the OAuth access_token and or the user id to the token right after signin
            if (user) {
                const co = cookies()
                co.set('authjs.session-token', user.accessToken, {
                    secure: true,
                    sameSite: 'lax',
                    httpOnly: true,
                    maxAge: 60 * 60 * 24 * 7,
                })
                token.accessToken = user.accessToken || ''
                token.id = user.id || ''
                token.role = user.role || ''
                token.image = user.image || ''
            }
            return token
        },
        session: async ({ session, token }) => {
            // Add access_token to the session right after signin

            session.accessToken = token.accessToken
            session.user.id = token.id || ''
            session.user.role = token.role || ''
            session.user.image = token.image || ''
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
    trustHost: true,
    cookies: {
        sessionToken: {
            name: 'next-auth.session-token',
            options: {
                httpOnly: true,
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production',
            },
        },
    },
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signin',
    },
})
