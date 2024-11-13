'use client'
import SwitchToggle from '@/components/ui/SwitchToggle'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'

function SwitchProspects({
    setSwitch,
}: {
    setSwitch: React.Dispatch<
        React.SetStateAction<'partenaires' | 'associations'>
    >
}) {
    const [switchToggle, setSwitchToggle] = useState<
        'Prospect des partenaires' | 'Prospect des associations'
    >('Prospect des partenaires')

    const options: (
        | 'Prospect des partenaires'
        | 'Prospect des associations'
    )[] = ['Prospect des partenaires', 'Prospect des associations']
    const handleSwitch = (
        type: 'Prospect des partenaires' | 'Prospect des associations'
    ) => {
        if (type === switchToggle) return
        setSwitchToggle(type)
        if (type === 'Prospect des partenaires') {
            setSwitch('partenaires')
            // handle partenaires
        } else {
            setSwitch('associations')
            // handle association
        }
    }
    return (
        <SwitchToggle
            options={options}
            selectedType={switchToggle}
            setSwitchTable={handleSwitch}
        />
    )
}

export default SwitchProspects
