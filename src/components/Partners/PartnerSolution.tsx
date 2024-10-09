import { cn } from '@/lib/utils'
import { PartnerSolutionType } from '@/types/partners'
import {
    HandCoins,
    HeartHandshake,
    ShoppingBag,
    Smartphone,
} from 'lucide-react'
import { FC } from 'react'

interface PartnerSolutionProps {
    solution: PartnerSolutionType
    className?: string
    size?: number
}

export const PartnerSolution: FC<PartnerSolutionProps> = ({
    solution,
    className,
    size = 14,
}) => {
    var solutionColor: {
        className: string
        Icon: FC<any>
    } = { className: 'bg-lynch-100 text-lynch-500', Icon: Smartphone }
    switch (solution) {
        case PartnerSolutionType.MARKET_PRO:
            solutionColor = {
                className: 'bg-mountain-100 text-mountain-500',
                Icon: ShoppingBag,
            }
            break
        case PartnerSolutionType.DONATE_PRO:
            solutionColor = {
                className: 'bg-scooter-100 text-scooter-500',
                Icon: HandCoins,
            }
            break
        case PartnerSolutionType.DLC_PRO:
            solutionColor = {
                className: 'bg-tulip-100 text-tulip-500',
                Icon: HeartHandshake,
            }
            break
    }
    return (
        <span
            className={cn(
                `flex items-center gap-[0.375rem]   text-[0.625rem] font-bold py-[0.375rem] px-3 rounded-full h-fit ${solutionColor.className}`,
                className
            )}
        >
            <solutionColor.Icon size={size} />
            {solution}
        </span>
    )
}
