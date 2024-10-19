'use client'
import React, { createContext, useContext, useState } from 'react'
import { NotificationType } from '@/types/Global-Type'
import Notif from '@/components/Layout/Notif'

interface Notification {
    type: NotificationType
    message: string
}

interface NotificationContextType {
    notify: (type: NotificationType, message: string) => void
    notifications: Notification[]
}

const NotificationContext = createContext<NotificationContextType | undefined>(
    undefined
)

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [notifications, setNotifications] = useState<Notification[]>([])

    const notify = (type: NotificationType, message: string) => {
        setNotifications((prev) => [...prev, { type, message }])
    }

    return (
        <NotificationContext.Provider value={{ notify, notifications }}>
            {children}
            {notifications.map((notif, index) => (
                <Notif key={index} type={notif.type} message={notif.message} />
            ))}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    const context = useContext(NotificationContext)
    if (!context) {
        throw new Error(
            'useNotification must be used within a NotificationProvider'
        )
    }
    return context
}
