'use client'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import SwitchToggle from '../ui/SwitchToggle'

function SwitchPayment() {
    const router = useRouter()
    const path = usePathname().includes('partenaire-business')
    const [switchToggle, setSwitchToggle] = useState<
        'Partenaire business' | 'Partenaire de livraison'
    >(path ? 'Partenaire business' : 'Partenaire de livraison')

    const options: ('Partenaire business' | 'Partenaire de livraison')[] = [
        'Partenaire business',
        'Partenaire de livraison',
    ]
    const handleSwitch = (
        type: 'Partenaire business' | 'Partenaire de livraison'
    ) => {
        if (type === switchToggle) return
        setSwitchToggle(type)
        if (type === 'Partenaire business') {
            router.push('/payment/partenaire-business')
        } else {
            router.push('/payment/partenaire-livraison')
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

export default SwitchPayment
