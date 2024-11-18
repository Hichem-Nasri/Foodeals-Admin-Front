import { fetchActivities } from '@/lib/api/partner/fetchActivites'
import React, { FC, useEffect, useState } from 'react'
import { MultiSelectField } from '../custom/MultiSelectField'
import { MultiSelectOptionsType } from '../MultiSelect'
import { Control } from 'react-hook-form'

interface FieldActivitiesProps {
    control: Control<any>
    name: string
    label: string
    disabled: boolean
    type: 'PARTNER' | 'ASSOCIATION'
}

const FieldActivities: FC<FieldActivitiesProps> = ({
    control,
    disabled,
    name,
    label,
    type,
}) => {
    const [activities, setActivities] = useState<MultiSelectOptionsType[]>([
        {
            key: 'autre',
            label: 'Autre',
        },
    ])
    useEffect(() => {
        const fetchActivites = async () => {
            const activity = await fetchActivities(type)

            setActivities([...activity, ...activities])
        }
        fetchActivites()
    }, [])

    return (
        <MultiSelectField
            control={control}
            name={name}
            label={label}
            options={activities}
            disabled={disabled}
            placeholder="Sélectionner"
            transform={(value) =>
                value.map((item) => (
                    <span
                        key={item.key}
                        className="text-[0.625rem] font-bold text-lynch-500 bg-lynch-200 px-3 py-[0.469rem] rounded-full"
                    >
                        {item.label}
                    </span>
                ))
            }
            len={2}
        />
    )
}

export default FieldActivities
