import React from 'react'
import { Skeleton } from './ui/skeleton'
import { cn } from '@/lib/utils'

const CardSkeleton = () => {
    const dataArray = [
        {
            label: '0236',
            className: '',
        },
        {
            label: 'PRIX: 1000',
        },
        {
            label: 'QTE 10',
        },
        {
            label: 'V.CARTE: 500',
        },
        {
            label: 'C.CARTE: 500',
        },
    ]
    return (
        <div className="lg:hidden flex flex-col gap-3 bg-white p-3 rounded-[20px] max-w-[400px] items-center justify-center animate-fade-down">
            <div className="w-full flex justify-between items-start">
                <div className="flex gap-[0.375rem]">
                    <Skeleton className="size-20 rounded-full" />
                    <div className="flex flex-col gap-1">
                        <Skeleton className="text-sm font-normal text-lynch-950" />
                    </div>
                </div>
            </div>
            <span className="h-[1px] w-full bg-lynch-100" />
            <div className="flex flex-wrap gap-[0.375rem]">
                {dataArray.map((data) => (
                    <div
                        key={data.label}
                        className={cn(
                            'flex gap-[0.375rem] bg-lynch-100 text-lynch-500 rounded-full py-[0.375rem] px-3',
                            data?.className
                        )}
                    >
                        <Skeleton className="size-6 rounded-full" />
                        <Skeleton
                            className={cn(
                                'w-24 text-lynch-500',
                                data?.className
                            )}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CardSkeleton
