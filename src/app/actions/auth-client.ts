// app/actions/auth-client.ts
'use server'

import { cookies } from 'next/headers'

export async function allowCookie(token: string) {
    if (!token || token == '') return
    try {
        const cookie = cookies()
        const authCookie = cookie.get('authjs.session-token')
        console.log('authCookie', authCookie)
        if (authCookie && authCookie.value == token) {
            return
        }
        console.log('token', token)
        cookie.set('authjs.session-token', token)
    } catch (error) {
        console.error('error', error)
    }
}

export async function removeCookie() {
    try {
        const cookie = cookies()
        cookie.delete('authjs.session-token')
    } catch (error) {
        console.error('error', error)
    }
}
