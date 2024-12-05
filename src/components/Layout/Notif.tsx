'use client'
import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, X, Info } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { NotificationType } from '@/types/GlobalType'

interface NotificationProps {
    type: NotificationType
    message: string
}

function Notif({ type, message }: NotificationProps) {
    const [show, setShow] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false)
        }, 5000)

        return () => {
            clearTimeout(timer)
        }
    }, [])

    if (!message) return null

    const handleClose = () => {
        setShow(false)
    }

    if (!show) return null

    return (
        <div
            className="w-full lg:w-auto fixed right-0 top-0 lg:animate-notification-slide-left animate-notification-slide-down p-2"
            style={{
                zIndex: 999,
            }}
        >
            <div
                className={`transition-opacity flex justify-between rounded-[20px] h-[72px] lg:h-fit items-center gap-2.5 duration-500 border-[2px] text-sm font-semibold relative  p-6 lg:p-4   ${
                    show ? 'opacity-100' : 'opacity-0'
                } ${
                    type === NotificationType.SUCCESS &&
                    ' bg-mountain-100 border-mountain-500 text-mountain-500'
                }
                ${
                    type === NotificationType.ERROR &&
                    ' bg-coral-50 border-coral-500 text-coral-500'
                }
                ${
                    type === NotificationType.INFO &&
                    ' bg-lynch-50 border-lynch-500 text-lynch-500'
                }
                `}
            >
                <div className="flex justify-start items-center space-x-2 animate-pulse">
                    <div className="rounded-full ">
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
                </div>
                <h4 className="text-xs lg:text-sm">{message}</h4>
                <button type="button" onClick={handleClose} className="">
                    <X />
                </button>
            </div>
        </div>
    )
}

export default Notif
