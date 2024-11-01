import React, { FC } from 'react'
import { MultiSelectField } from '../custom/MultiSelectField'
import { MultiSelectOptionsType } from '../MultiSelect'
import { PartnerSolution } from '../Partners/PartnerSolution'
import { PartnerSolutionType } from '@/types/partnersType'
import { Control } from 'react-hook-form'
import { cn } from '@/lib/utils'

interface FieldSolutionProps {
    className?: string
    control: Control<any>
    disabled: boolean
    options?: MultiSelectOptionsType[]
}
const defaultOptions: MultiSelectOptionsType[] = [
    {
        key: PartnerSolutionType.MARKET_PRO,
        label: PartnerSolutionType.MARKET_PRO,
    },
    {
        key: PartnerSolutionType.DONATE_PRO,
        label: PartnerSolutionType.DONATE_PRO,
    },
    {
        key: PartnerSolutionType.DLC_PRO,
        label: PartnerSolutionType.DLC_PRO,
    },
]

const FieldSolutions: FC<FieldSolutionProps> = ({
    className,
    control,
    options = defaultOptions,
    disabled,
}) => {
    return (
        <MultiSelectField
            control={control}
            name="solutions"
            className={cn('h-auto', className)}
            label="Solutions"
            options={options}
            transform={(values) => {
                return values.map((value) => (
                    <PartnerSolution
                        key={value.key}
                        solution={value.label as PartnerSolutionType}
                        className="py-[0.4rem] text-[0.75rem]"
                        size={12}
                    />
                ))
            }}
            disabled={disabled}
        />
    )
}

export default FieldSolutions
