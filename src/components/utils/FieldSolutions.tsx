import React, { FC } from 'react'
import { MultiSelectField } from '../custom/MultiSelectField'
import { MultiSelectOptionsType } from '../MultiSelect'
import { PartnerSolution } from '../Partners/PartnerSolution'
import { PartnerSolutionType } from '@/types/partnersType'
import { Control } from 'react-hook-form'
import { cn } from '@/lib/utils'

interface FieldSolutionProps {
    className?: string
    name?: string
    control: Control<any>
    disabled: boolean
    options?: MultiSelectOptionsType[]
    selectedSolution?: string[]
    onChange?: (value: string[]) => void
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
    name,
    options = defaultOptions,
    disabled,
    selectedSolution = [],
    onChange,
}) => {
    return (
        <MultiSelectField
            control={control}
            name={name ? name : 'solutionsList'}
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
            onChange={onChange}
            disabled={disabled}
            selected={selectedSolution}
        />
    )
}

export default FieldSolutions
