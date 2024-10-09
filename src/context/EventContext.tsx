'use client'
import { EvenetType } from '@/types/CrmType'
import { useContext, useState, useEffect, createContext } from 'react'

interface EventContextType {
    evenement: EvenetType[]
    setEvenement: React.Dispatch<React.SetStateAction<EvenetType[]>>
}

const EmptyEvent: EvenetType[] = []

export const EventContext = createContext<EventContextType>({
    evenement: EmptyEvent,
    setEvenement: () => EmptyEvent,
})

export const useEventContext = () => {
    const context = useContext(EventContext)
    if (!context) {
        throw new Error('useEventContext must be used within an EventProvider')
    }
    return context
}

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [evenement, setEvenement] = useState<EvenetType[]>([])
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                // const response = await axios.get('http://localhost:8080/api/v1/crm/prospects/{id}/events)
                // setEvenement(response.data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchEvent()
    }, [])
    return (
        <EventContext.Provider value={{ evenement, setEvenement }}>
            {children}
        </EventContext.Provider>
    )
}
