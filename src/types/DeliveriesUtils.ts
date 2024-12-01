import { MultiSelectOptionsType } from '@/components/MultiSelect'
import { DeliveryType } from './deliveries'
import { CityRegion } from './partenairUtils'

const OptionGenerator = (label: string, avatar?: string) => {
    return {
        key: label,
        label: label,
        avatar: avatar,
    }
}

export function transformCityRegionArray(
    arr: string[],
    country: string
): CityRegion[] {
    const cityMap: { [key: string]: string[] } = {}

    arr.forEach((item) => {
        const [city, region] = item.split('-')

        if (!cityMap[city]) {
            cityMap[city] = []
        }
        cityMap[city].push(region)
    })

    return Object.entries(cityMap).map(([city, regions]) => ({
        country,
        city,
        regions,
    }))
}

export type OptionsType = {
    id: MultiSelectOptionsType[]
    partner: MultiSelectOptionsType[]
    responsible: MultiSelectOptionsType[]
    city: MultiSelectOptionsType[]
    solution: MultiSelectOptionsType[]
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
