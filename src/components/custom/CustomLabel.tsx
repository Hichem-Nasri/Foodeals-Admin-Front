import { LucideProps } from 'lucide-react'
import React, { FC, ForwardRefExoticComponent, RefAttributes } from 'react'
import { AvatarAndName } from '../AvatarAndName'
import { cn } from '@/lib/utils'

type CustomeLabelProps = {
    label: string
    input: string
    IconLeft?: ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
    >
    IconRight?: ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
    >
    type?: 'avatar' | 'normal'
    className?: string
    classNameParent?: string
    avatar?: string
}

const CustomLabel: FC<CustomeLabelProps> = ({
    label,
    IconLeft,
    IconRight,
    type = 'normal',
    className,
    classNameParent,
    input,
    avatar,
}) => {
    return (
        <div
            className={cn(
                'w-full flex flex-col items-start justify-normal space-y-2 h-full',
                classNameParent
            )}
        >
            <div className="px-2 text-black font-normal">{label}</div>
            <div
                className={cn(
                    'w-full min-h-14 bg-lynch-50 text-lynch-400 rounded-[12px] text-start flex justify-start items-start space-x-2 text-wrap p-2 px-4',
                    className
                )}
            >
                {type === 'avatar' ? (
                    <AvatarAndName avatar={avatar} name={input} />
                ) : (
                    <>
                        {IconLeft && (
                            <IconLeft className="mr-2 icon shrink-0 text-mountain-400" />
                        )}
                        {input}
                        {IconRight && (
                            <IconRight className="ml-2 icon shrink-0 text-mountain-400" />
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default CustomLabel
