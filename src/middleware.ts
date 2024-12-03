import { auth } from './auth'
import axios from 'axios'
import { signOut } from 'next-auth/react'
import { NextResponse } from 'next/server'

export default auth(async (req) => {
    const { nextUrl } = req
    const isAuth = !!req.auth
    console.log(req.url)
    try {
        if (req.url?.includes('/auth/signin')) {
            return NextResponse.redirect(new URL('/auth/signin', nextUrl))
        }
        if (!isAuth) {
            return NextResponse.redirect(new URL('/auth/signin', nextUrl))
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
                return NextResponse.redirect(new URL('/auth/signin', nextUrl))
            } else {
                return NextResponse.next()
            }
        }
    } catch (error) {
        return new NextResponse('Internal Server Error', { status: 500 })
    }
})

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
