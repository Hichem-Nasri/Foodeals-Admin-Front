'use client'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import SwitchToggle from '../ui/SwitchToggle'
import { AppRoutes } from '@/lib/routes'

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
            router.push(AppRoutes.businessPartner)
        } else {
            router.push(AppRoutes.deliveryPayment)
        }
    }
    return (
        <div className="flex lg:justify-start justify-center items-center">
            <SwitchToggle
                options={options}
                selectedType={switchToggle}
                setSwitchTable={handleSwitch}
            />
        </div>
    )
}

export default SwitchPayment
