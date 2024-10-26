import React, { FC } from 'react'
import { MultiSelectField } from '../custom/MultiSelectField'
import { MultiSelectOptionsType } from '../MultiSelect'
import { PartnerSolution } from '../Partners/PartnerSolution'
import { PartnerSolutionType } from '@/types/partners'
import { Control } from 'react-hook-form'

interface FieldSolutionProps {
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
    control,
    options = defaultOptions,
    disabled,
}) => {
    return (
        <MultiSelectField
            control={control}
            name="solutions"
            className="h-auto"
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
            len={2}
            disabled={disabled}
        />
    )
}

export default FieldSolutions
