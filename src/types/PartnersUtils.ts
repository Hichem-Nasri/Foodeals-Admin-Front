import { MultiSelectOptionsType } from '@/components/MultiSelect'
import { PartnerSolutionType, PartnerType } from './partnersType'
import { LucideProps } from 'lucide-react'
import { ForwardRefExoticComponent, RefAttributes } from 'react'

export const CheckedType = (
    target: HTMLInputElement,
    type: string,
    checked: string[],
    setSolutionChecked: (items: string[]) => void,
    setFilterData: any
) => {
    if (!target.checked && !checked.includes(type)) {
        setFilterData((filterData: any) => ({
            ...filterData,
            solution: filterData.solution.concat(type),
        }))
        setFilterData((filterData: any) => ({
            ...filterData,
            solution: filterData.solution.includes(type)
                ? filterData.solution
                : [...filterData.solution, type],
        }))
        setSolutionChecked([...checked, type])
    } else {
        setFilterData((filterData: any) => ({
            ...filterData,
            solution: filterData.solution.filter(
                (solution: string) => solution !== type
            ),
        }))
        setSolutionChecked(checked.filter((solution) => solution !== type))
    }
}

const OptionGenerator = (label: string, avatar?: string) => {
    return {
        key: label,
        label: label,
        avatar: avatar,
    }
}

export type OptionsType = {
    id: MultiSelectOptionsType[]
    companyName: MultiSelectOptionsType[]
    manager: MultiSelectOptionsType[]
    city: MultiSelectOptionsType[]
    status: MultiSelectOptionsType[]
    solution: MultiSelectOptionsType[]
    companyType: MultiSelectOptionsType[]
    collaborateurs: MultiSelectOptionsType[]
}
export const extractOptions = (partners: PartnerType[]): OptionsType => {
    const options: OptionsType = {
        id: Array.from(
            new Set(partners.map((partner) => OptionGenerator(partner.id!)))
        ),
        companyName: Array.from(
            new Set(
                partners.map((partner) => OptionGenerator(partner.companyName))
            )
        ),
        manager: Array.from(
            new Set(
                partners.map((partner) =>
                    OptionGenerator(
                        partner.manager.name,
                        partner.manager.avatar
                    )
                )
            )
        ),
        city: Array.from(new Set(partners.map((partner) => partner.city))).map(
            (element) => OptionGenerator(element)
        ),
        status: Array.from(
            new Set(partners.map((partner) => partner.status))
        ).map((element) => OptionGenerator(element)),
        solution: Array.from(
            new Set(partners.flatMap((partner) => partner.solution))
        ).map((element) => OptionGenerator(element)),
        companyType: Array.from(
            new Set(partners.map((partner) => partner.companyType))
        ).map((element) => OptionGenerator(element)),
        collaborateurs: Array.from(
            new Set(
                partners
                    .flatMap((partner) => partner.collaborators)
                    .map((collaborateur) =>
                        OptionGenerator(collaborateur.toString())
                    )
            )
        ),
    }
    return options
}

export interface PartnerFilerType {
    createdAt: string[]
    companyName: string[]
    manager: string[]
    city: string
    status: string[]
    solution: string[]
    companyType: string
    collaborators: string[]
    phone: string
    email: string
}
