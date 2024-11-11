import React, { useEffect, useState, useRef } from 'react'
import { Control } from 'react-hook-form'

import { MultiSelectOptionsType } from '../MultiSelect'
import { SelectField } from '../custom/SelectField'
import { getPartners } from '../../lib/api/getPartners'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { AvatarFallback } from '../ui/avatar'
import { PartnerInfoDto } from '@/types/GlobalType'

const SelectParnter = ({
    control,
    disabled = false,
    name,
    label,
    type,
}: {
    control: Control<any>
    disabled?: boolean
    name: string
    label: string
    type: string[]
}) => {
    console.log('SelectParnter')
    const [search, setSearch] = useState('') // Initial search state
    const inputRef = useRef<HTMLInputElement>(null)
    const [options, setOptions] = useState<MultiSelectOptionsType[]>([])

    useEffect(() => {
        if (inputRef.current) inputRef.current.focus()
        const fetchManagerData = async () => {
            const data = await getPartners(type, search)
            console.log('options: ', data)
            setOptions([
                ...data.map((partner: PartnerInfoDto) => ({
                    value: partner.id,
                    label: partner.name,
                    avatar: partner.avatarPath,
                })),
                {
                    key: 'all',
                    label: 'Tous les partenaires',
                    avatar: '/all-partners.svg',
                },
            ])
        }
        fetchManagerData()
    }, [search])

    return (
        <SelectField
            control={control}
            name={name}
            label={label}
            options={options}
            disabled={disabled}
            search={true} // Enable search
            onChangeSearch={(value) => {
                inputRef.current?.focus()
                console.log('value', value)
                setSearch(value) // Update search term
            }}
            inputRef={inputRef}
            placeholder="Selectionner un partenaire"
        />
    )
}

export default SelectParnter
