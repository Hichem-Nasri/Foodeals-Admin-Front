import { cn } from '@/lib/utils'
import React, { FC } from 'react'
import { Label } from '../Label'

interface LabelMultiItemsProps {
    placeholder?: string
    label: string
    options: string[]
    name: string
    disabled?: boolean
    className?: string
    transform?: (value: string | any) => JSX.Element[]
}

const Element = ({ option }: { option: string }) => {
    return (
        <div className="text-[0.625rem] font-bold text-lynch-500 bg-lynch-200 px-3 py-[0.469rem] rounded-full">
            {option}
        </div>
    )
}

const LabelMultiItems: FC<LabelMultiItemsProps> = ({
    placeholder = 'Sélectionnez',
    options,
    name,
    label,
    disabled = false,
    className,
    transform,
}) => {
    return (
        <div className={cn('flex flex-col w-full', className)}>
            <div className="flex flex-col items-start gap-3 w-full text-lynch-400">
                <Label
                    label={label}
                    className="text-sm font-semibold text-lynch-950"
                />
                <div className="w-full flex items-center space-x-1 h-14 bg-lynch-50 rounded-[14px] px-2">
                    {typeof options === 'string' ? (
                        <Element option={options} />
                    ) : (
                        options.map((option: string) => (
                            <div
                                key={option}
                                className="text-[0.625rem] font-bold text-lynch-500 bg-lynch-200 px-3 py-[0.469rem] rounded-full"
                            >
                                {option}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default LabelMultiItems
