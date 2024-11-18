'use client'
import React, { useEffect, useState } from 'react'
import anime from 'animejs'
import Lottie from 'react-lottie'
import foodealsLoading from '@/lotties/foodealsLoading.json'

const SplashScreen = ({
    finishLoading,
    loop = false,
}: {
    finishLoading: Function
    loop?: boolean
}) => {
    useEffect(() => {
        if (loop) {
            return
        }
        const loader = anime.timeline({
            complete: () => finishLoading(),
        })
        loader.add({
            overflow: 'hidden',
            targets: '#logo',
            delay: 0,
            scale: 2,
            duration: 2000,
            easing: 'easeInOutExpo',
        })
    }, [finishLoading])

    return (
        <div
            id="logo"
            className="flex w-full h-screen items-center justify-center bg-mountain-400 text-white overflow-hidden"
        >
            <div className="flex justify-center items-center space-x-4">
                <Lottie
                    style={{
                        width: '50px',
                        height: '50px',
                        marginBottom: '10px',
                    }}
                    options={{
                        loop: true,
                        autoplay: true,
                        animationData: foodealsLoading,
                    }}
                    width={50}
                    height={50}
                />
                <h1 className="text-3xl lg:text-5xl text-white">Foodeals</h1>
            </div>
        </div>
    )
}

export default SplashScreen
