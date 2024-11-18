'use client'
import SplashScreen from '@/components/custom/SplashScreen'
import React from 'react'

const loading = () => {
    return (
        <div className="min-h-screen w-full overflow-hidden ">
            <SplashScreen finishLoading={() => {}} loop={true} />
        </div>
    )
}

export default loading
