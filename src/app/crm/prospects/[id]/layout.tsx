import { EventProvider } from '@/context/EventContext'
import { EvenetType } from '@/types/CrmType'
import React, { FC } from 'react'

const LayoutProspects: FC<{ children: React.ReactNode }> = ({ children }) => {
    return <EventProvider>{children}</EventProvider>
}

export default LayoutProspects
