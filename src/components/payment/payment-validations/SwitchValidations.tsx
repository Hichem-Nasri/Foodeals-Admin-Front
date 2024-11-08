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
        <div className="flex justify-center items-center flex-flex-wrap  lg:inline-flex lg:space-x-3 space-x-0 p-0 lg:p-2 lg:bg-transparent h-fit bg-white rounded-[14px] w-fit max-w-fit ">
            <CustomButton
                label="Validation des commissions"
                className={cn(
                    'bg-transparent  lg:h-12 rounded-none lg:rounded-[12px] text-lynch-400 border-lynch-200 lg:border-2 lg:hover:bg-lynch-400/80 hover:bg-transparent lg:hover:text-white text-center transition-all whitespace-normal [&>.icon]:hidden lg:[&>.icon]:flex lg:text-sm lg:font-normal  font-[21.94px] text-[18px]',
                    typeValidation === 'commissions' &&
                        'text-primary border-primary lg:hover:bg-primary'
                )}
                IconRight={Percent}
                onClick={() => handleClick('commissions')}
            />
            <span className="w-[1px] h-9 bg-lynch-400 lg:hidden" />
            <CustomButton
                label="Validation des abonnements"
                className={cn(
                    'bg-transparent  lg:h-12 rounded-none lg:rounded-[12px] text-lynch-400 border-lynch-200 lg:border-2 hover:bg-transparent lg:hover:bg-lynch-400/80 lg:hover:text-white text-center transition-all whitespace-normal [&>.icon]:hidden lg:[&>.icon]:flex lg:text-sm lg:font-normal font-[21.94px] text-[18px]',
                    typeValidation === 'subscriptions' &&
                        'text-primary border-primary lg:hover:bg-primary'
                )}
                IconRight={FileBadge}
                onClick={() => handleClick('subscriptions')}
            />
        </div>
    )
}
