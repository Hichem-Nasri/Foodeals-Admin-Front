import { CheckCheck, FileMinus, LoaderCircle, X } from 'lucide-react'
import { PartnerStatusType } from './CrmType'
import { SelectIconProps } from '@radix-ui/react-select'
import { MultiSelectOptionsType } from '@/components/MultiSelect'

export const StyleStatus: Record<string, string> = {
    [`VALIDER`]: 'bg-mountain-100 text-mountain-500',
    [`EN COURS`]: 'bg-amethyst-100 text-amethyst-500',
    [`BROUILLON`]: 'bg-lynch-100 text-lynch-500',
    [`ANNULER`]: 'bg-red-100 text-coral-500',
}

export const IconStatus: Record<string, React.FC<SelectIconProps>> = {
    [`VALIDER`]: CheckCheck as React.FC<SelectIconProps>,
    [`EN COURS`]: LoaderCircle as React.FC<SelectIconProps>,
    [`BROUILLON`]: FileMinus as React.FC<SelectIconProps>,
    [`ANNULER`]: X as React.FC<SelectIconProps>,
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
        key: 'PENDING',
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
