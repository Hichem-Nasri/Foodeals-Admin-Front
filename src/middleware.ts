import { auth } from './auth'
import axios from 'axios'
import { signOut } from 'next-auth/react'

export default auth(async (req) => {
    const { nextUrl } = req
    const isAuth = !!req.auth
    console.log(req.url)
    try {
        if (req.url?.includes('/auth/signin')) {
            return null
        }
        if (!isAuth) {
            return Response.redirect(new URL('/auth/signin', nextUrl))
        } else {
            const accessToken = req.auth?.accessToken
            const res = await axios
                .post(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/auth/verify-token`,
                    {
                        token: accessToken,
                    }
                )
                .then((res) => res.data)
                .catch((error) => {
                    throw new Error(error)
                })
            if (!res) {
                signOut()
            } else {
                return null
            }
        }
    } catch (error) {
        console.error('error', error)
        return Response.redirect(new URL('/auth/signin', nextUrl))
    }
})

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
