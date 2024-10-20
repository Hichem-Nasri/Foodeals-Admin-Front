'use client'
import { useState, useEffect, useContext } from 'react'
import { Terminal, CheckCircle, XCircle, X, Info } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { NotificationType } from '@/types/Global-Type'

interface NotificationProps {
    type: NotificationType
    message: string
}

function Notif({ type, message }: NotificationProps) {
    if (!message) return null
    const [show, setShow] = useState(true)
    const [progress, setProgress] = useState(100)
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)
    const [hideTimerId, setHideTimerId] = useState<NodeJS.Timeout | null>(null)

    useEffect(() => {
        const id = setInterval(() => {
            setProgress((prev) => {
                if (prev <= 0) {
                    clearInterval(id)
                    setShow(false)
                    return 0
                }
                return prev - 5
            })
        }, 100)

        setIntervalId(id)

        const timer = setTimeout(() => {
            setShow(false)
            clearInterval(id)
        }, 5000)

        setHideTimerId(timer)

        return () => {
            clearTimeout(timer)
            clearInterval(id)
        }
    }, [])

    const handleClose = () => {
        setShow(false)
        if (intervalId) clearInterval(intervalId)
        if (hideTimerId) clearTimeout(hideTimerId)
    }

    const handleMouseEnter = () => {
        if (intervalId) clearInterval(intervalId)
        if (hideTimerId) clearTimeout(hideTimerId)
    }

    const handleMouseLeave = () => {
        if (progress > 0) {
            const id = setInterval(() => {
                setProgress((prev) => {
                    if (prev <= 0) {
                        setShow(false)
                        clearInterval(id)
                        return 0
                    }
                    return prev - 5
                })
            }, 100)
            setIntervalId(id)
        }
        // Resume hiding after mouse leaves
        const timer = setTimeout(() => {
            setShow(false)
        }, 5000)
        setHideTimerId(timer)
    }

    if (!show) return null

    return (
        <div
            className="w-full lg:w-auto absolute right-0 top-0 lg:animate-notification-slide-left animate-notification-slide-down p-2 "
            style={{
                zIndex: 999,
            }}
        >
            <Alert
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`transition-opacity duration-500 min-w-60 relative text-white p-0 ${
                    show ? 'opacity-100' : 'opacity-0'
                } ${
                    type === NotificationType.SUCCESS &&
                    ' bg-mountain-400 border-mountain-50'
                }
            ${
                type === NotificationType.ERROR &&
                ' bg-coral-500 border-coral-50'
            }
            ${type === NotificationType.INFO && ' bg-lynch-500 border-lynch-50'}
            `}
            >
                <AlertTitle className="flex justify-start items-center space-x-2 px-4 pt-4 ">
                    <div className="rounded-full animate-bounce">
                        {type === NotificationType.SUCCESS && (
                            <CheckCircle className="size-6 " />
                        )}
                        {type === NotificationType.ERROR && (
                            <XCircle className="size-6" />
                        )}
                        {type === NotificationType.INFO && (
                            <Info className="size-6" />
                        )}
                    </div>
                    <div className="text-sm font-semibold">
                        {type === NotificationType.SUCCESS && 'Success!'}
                        {type === NotificationType.ERROR && 'Error!'}
                        {type === NotificationType.INFO && 'Info!'}
                    </div>
                </AlertTitle>
                <AlertDescription className="px-4 py-2 text-xs">
                    {message}
                </AlertDescription>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-lynch-50/20">
                    <div
                        className="progress-bar h-1 bg-white rounded-xl"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <button
                    type="button"
                    onClick={handleClose}
                    className="top-1 right-1 absolute"
                >
                    <X />
                </button>
            </Alert>
        </div>
    )
}

export default Notif
