import api from '@/api/Auth'
import { MultiSelectOptionsType } from '@/components/MultiSelect'
import { API_CITIES, API_COUNTRIES } from '../api_url'

type AddressType = {
    countries: MultiSelectOptionsType[]
    city: MultiSelectOptionsType[]
    region: MultiSelectOptionsType[]
}

export const getCountries = async () => {
    const resCountry = await api
        .get(API_COUNTRIES)
        .then((res) => res.data)
        .then((data) => {
            console.log('data', data)
            return data.map(
                (country: {
                    id: string
                    name: string
                }): MultiSelectOptionsType => {
                    return {
                        key: country.name,
                        label: country.name,
                        id: country.id,
                    }
                }
            )
        })
        .catch((error) => console.error(error))
    console.log('resCountry', resCountry)
    return resCountry
}

export const getCities = async (countryID: string) => {
    const resCity = await api
        .get(`${API_COUNTRIES}/${countryID}/cities`)
        .then((res) => res.data)
        .then((data) => {
            return data.map(
                (city: {
                    id: string
                    name: string
                }): MultiSelectOptionsType => {
                    return {
                        key: city.name,
                        label: city.name,
                        id: city.id,
                    }
                }
            )
        })
        .catch((error) => console.error(error))
    return resCity
}

export const getRegions = async (cityID: string) => {
    const resRegion = await api
        .get(`${API_CITIES}/${cityID}/regions`)
        .then((res) => res.data)
        .then((data) => {
            return data.map(
                (region: {
                    id: string
                    name: string
                }): MultiSelectOptionsType => {
                    return {
                        key: region.name,
                        label: region.name,
                        id: region.id,
                    }
                }
            )
        })
        .catch((error) => console.error(error))
    return resRegion
}
