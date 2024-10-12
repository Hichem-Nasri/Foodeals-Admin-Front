import { MultiSelectOptionsType } from '@/components/MultiSelect'
import { DeliveryType } from './deliveries'

const OptionGenerator = (label: string, avatar?: string) => {
    return {
        key: label,
        label: label,
        avatar: avatar,
    }
}

export type OptionsType = {
    id: MultiSelectOptionsType[]
    partner: MultiSelectOptionsType[]
    responsible: MultiSelectOptionsType[]
    city: MultiSelectOptionsType[]
    solution: MultiSelectOptionsType[]
}
export const extractOptions = (Delivery: DeliveryType[]) => {
    const options: OptionsType = {
        id: [
            ...new Set(
                Delivery.map((delivery) => OptionGenerator(delivery.id!))
            ),
        ],
        partner: [
            ...new Set(
                Delivery.map((delivery) =>
                    OptionGenerator(
                        delivery.partner.name,
                        delivery.partner.avatar
                    )
                )
            ),
        ],
        responsible: [
            ...new Set(
                Delivery.map((delivery) =>
                    OptionGenerator(
                        delivery.responsible.name,
                        delivery.responsible.avatar
                    )
                )
            ),
        ],
        city: [...new Set(Delivery.map((delivery) => delivery.city))].map(
            (element) => OptionGenerator(element)
        ),
        solution: [
            ...new Set(Delivery.flatMap((delivery) => delivery.solution)),
        ].map((element) => OptionGenerator(element)),
    }
    return options
}

export interface DeliveryFilterType {
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

export const valuesGetting = (cities: string[]) => {
    if (!cities || cities.length === 0) return []
    const result: { name: string; location: string[] }[] = []
    cities.forEach((city) => {
        const [cityName, region] = city.split('-')
        const existingCity = result.find((item) => item.name === cityName)
        if (existingCity) {
            existingCity.location.push(region)
        } else {
            result.push({ name: cityName, location: [region] })
        }
    })
    return result
}

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
