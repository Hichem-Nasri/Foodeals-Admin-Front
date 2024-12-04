import React, { useEffect, useState } from 'react'
import { Control } from 'react-hook-form'
import { MultiSelectOptionsType } from '../MultiSelect'
import api from '@/lib/Auth'
import { API_URL } from '@/lib/api'
import { set } from 'date-fns'
import { MultiSelectField } from '../custom/MultiSelectField'

interface MultiSelectProspectsProps {
    control: Control<any>
    name: string
    label: string
    placeholder?: string
    transform?: (value: MultiSelectOptionsType[]) => JSX.Element[]
    disabled?: boolean
    length?: number
    normalTransform?: boolean
    emptyAvatar?: string
    type?: string
}

const MultiSelectProspects: React.FC<MultiSelectProspectsProps> = ({
    control,
    name,
    label,
    placeholder,
    transform,
    ...rest
}) => {
    const [options, setOptions] = useState<MultiSelectOptionsType[]>([])
    useEffect(() => {
        const fetchProspcts = async () => {
            const res = await api
                .get(
                    `${API_URL}/v1/crm/prospects/search?name=&page=0&size=11&types=PARTNER`
                )
                .then((res) => res.data)
                .catch((err) => {
                    console.error(err)
                    return []
                })
            const prospects = res.content.map((prospect: any) => ({
                key: prospect.id,
                label: prospect.name,
                avatar: prospect.avatar,
            }))
            setOptions(prospects)
        }
        fetchProspcts()
    }, [])
    return (
        <MultiSelectField
            options={options}
            control={control}
            name={name}
            label={label}
            placeholder={placeholder}
            transform={transform}
            {...rest}
        />
    )
}

export default MultiSelectProspects
