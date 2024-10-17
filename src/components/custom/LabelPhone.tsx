import React, { FC, ForwardRefExoticComponent, RefAttributes } from 'react'
import { Label } from '../Label'
import { countryCodes } from '@/lib/utils'
import { LucideProps } from 'lucide-react'

interface LabelPhoneProsps {
    label: string
    value: string
    countryCode: string
    IconLeft?: ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
    >
    IconRight?: ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
    >
}

const LabelPhone: FC<LabelPhoneProsps> = ({
    label,
    value,
    countryCode,
    IconLeft,
    IconRight,
}) => {
    return (
        <div className="w-full flex flex-col items-start justify-center gap-3 text-lynch-500">
            <label className="text-sm font-semibold text-lynch-950">
                {label}
            </label>
            <div className="w-full flex items-center justify-center space-x-1 h-14">
                <div className="rounded-[12px] border-0 font-light text-base flex gap-[0.625rem] w-fit min-w-fit px-2 items-center justify-center bg-lynch-50 h-full ">
                    {countryCodes.map((option) =>
                        option.value == countryCode ? option.flag : null
                    )}
                    <span>{countryCode}</span>
                </div>
                <div className="flex-1 h-full bg-lynch-50 rounded-[12px] flex items-center justify-start space-x-1  text-base font-normal">
                    {IconLeft && (
                        <IconLeft className="text-mountain-400 ml-2" />
                    )}
                    <span>{value}</span>
                    {IconRight && (
                        <IconRight className="text-mountain-400 mr-2" />
                    )}
                </div>
            </div>
        </div>
    )
}

export default LabelPhone
