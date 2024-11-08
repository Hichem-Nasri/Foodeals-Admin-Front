import { Currency, LucideProps } from 'lucide-react'
import { FC, ForwardRefExoticComponent, RefAttributes } from 'react'
import { Label } from '../Label'
import { cn } from '@/lib/utils'
import { Skeleton } from '../ui/skeleton'

interface CardTotalValueProps {
    Icon: ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
    >
    title: string
    value: number
    currency?: boolean
    className?: string
    isLoading?: boolean
}

export const CardTotalValue: FC<CardTotalValueProps> = ({
    title,
    value,
    className,
    currency,
    Icon,
    isLoading,
}) => {
    const total = !currency ? `${value} MAD` : `${value}`
    return (
        <div className="flex flex-col flex-1 gap-1 p-4 bg-white rounded-[14px] h-full w-full lg:min-w-72 lg:w-auto">
            <div className="flex items-center gap-3">
                <span
                    className={cn('bg-primary p-2.5 rounded-full', className)}
                >
                    {<Icon className="text-white" />}
                </span>
                <Label
                    label={title}
                    className="text-lg font-medium text-lynch-950 whitespace-nowrap overflow-hidden"
                />
            </div>
            {isLoading ? (
                <Skeleton className="size-8 text-[1.375rem] font-semibold text-primary ml-auto whitespace-nowrap overflow-hidden text-ellipsis" />
            ) : (
                <div
                    className={cn(
                        'text-[1.375rem] font-semibold text-primary ml-auto whitespace-nowrap overflow-hidden text-ellipsis',
                        className?.replace('bg', '')
                    )}
                >
                    {total}
                </div>
            )}
        </div>
    )
}
