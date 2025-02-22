import { CheckCheck, FileMinus, LoaderCircle, X } from 'lucide-react'
import { SelectIconProps } from '@radix-ui/react-select'
import { MultiSelectOptionsType } from '@/components/MultiSelect'
import { EventType } from './CrmType'

export const StyleStatus: Record<string, string> = {
    [`VALID`]: 'bg-mountain-100 text-mountain-500',
    [`IN_PROGRESS`]: 'bg-amethyst-100 text-amethyst-500',
    [`DRAFT`]: 'bg-lynch-100 text-lynch-500',
    [`CANCELED`]: 'bg-red-100 text-coral-500',
}

export const StringStatus: Record<string, string> = {
    [`VALID`]: 'VALIDER',
    [`IN_PROGRESS`]: 'EN COURS',
    [`DRAFT`]: 'BROUILLON',
    [`CANCELED`]: 'ANNULER',
}

export const IconStatus: Record<string, React.FC<SelectIconProps>> = {
    [`VALID`]: CheckCheck as React.FC<SelectIconProps>,
    [`IN_PROGRESS`]: LoaderCircle as React.FC<SelectIconProps>,
    [`DRAFT`]: FileMinus as React.FC<SelectIconProps>,
    [`CANCELED`]: X as React.FC<SelectIconProps>,
}

export const OptionStatus: Record<string, MultiSelectOptionsType> = {
    [`VALIDER`]: {
        label: 'valider',
        key: 'VALID',
        icon: CheckCheck,
        className:
            'text-mountain-500 border border-mountain-500 bg-mountain-100',
    },
    [`EN COURS`]: {
        label: 'en attente',
        key: 'IN_PROGRESS',
        icon: LoaderCircle,
        className:
            'text-amethyst-500 border border-amethyst-500 bg-amethyst-100',
    },
    [`BROUILLON`]: {
        label: 'brouillon',
        key: 'DRAFT',
        icon: FileMinus,
        className: 'text-Lynch-500 border border-Lynch-500 bg-Lynch-100',
    },
    [`ANNULER`]: {
        label: 'annulee',
        key: 'CANCELED',
        icon: X,
        className: 'text-coral-500 border border-coral-500 bg-coral-100',
    },
}

export function capitalize(str: string): string {
    if (!str || !str.length) return ''
    return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1)
}

export const extractDataEvent = (data: any): EventType => {
    return {
        id: data.id,
        createdAt: data.createdAt,
        object: data.object,
        message: data.message,
        dateAndTime: data.dateAndTime,
        lead: {
            id: data.lead.id,
            name: {
                firstName: data.lead.name.firstName,
                lastName: data.lead.name.lastName,
            },
            avatarPath: data.lead.avatarPath,
        },
    }
}

export const extractEvent = (data: any): EventType[] => {
    return data.map((event: any) => {
        extractDataEvent(event)
    })
}

let countryData: MultiSelectOptionsType[] = []

export const CountryData = () => {
    if (countryData.length === 0) {
        fetch('https://restcountries.com/v3.1/all?fields=name,flags')
            .then((response) => response.json())
            .then((data) => {
                countryData = data
                    .map((country: any) => {
                        return {
                            avatar: country.flags.svg,
                            label: country.name.common,
                            key: country.name.common,
                        }
                    })
                    .sort(
                        (
                            a: MultiSelectOptionsType,
                            b: MultiSelectOptionsType
                        ) => a.label.localeCompare(b.label)
                    )
            })
    }
    return countryData
}
