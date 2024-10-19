'use client'
import { CustomButton } from '@/components/custom/CustomButton'
import { cn } from '@/lib/utils'
import { Percent, FileBadge } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

export const SwitchValidation = () => {
    const path = usePathname().includes('subscriptions')
    const router = useRouter()
    const [typeValidation, setTypeValidation] = useState<
        'commissions' | 'subscriptions'
    >(path ? 'subscriptions' : 'commissions')
    const handleClick = (type: 'commissions' | 'subscriptions') => {
        if (type === typeValidation) return
        setTypeValidation(type)
        router.push(`/paiement/partenaire-business/${type}`)
    }
    return (
        <div className="inline-flex lg:space-x-3 space-x-0 lg:w-fit w-full">
            <CustomButton
                label="Validation des commissions"
                className={cn(
                    'bg-transparent h-12 rounded-[12px] text-lynch-400 border-lynch-400 border hover:bg-lynch-400/80 hover:text-white transition-all',
                    typeValidation === 'commissions' &&
                        'text-primary border-primary hover:bg-primary'
                )}
                IconRight={Percent}
                onClick={() => handleClick('commissions')}
            />
            <CustomButton
                label="Validation des Subscriptions"
                className={cn(
                    'bg-transparent h-12 rounded-[12px] text-lynch-400 border-lynch-400 border hover:bg-lynch-400/80 hover:text-white transition-all',
                    typeValidation === 'subscriptions' &&
                        'text-primary border-primary hover:bg-primary'
                )}
                IconRight={FileBadge}
                onClick={() => handleClick('subscriptions')}
            />
        </div>
    )
}
