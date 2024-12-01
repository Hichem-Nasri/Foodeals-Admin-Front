import api from '@/lib/Auth'
import { MultiSelectOptionsType } from '@/components/MultiSelect'
import { API_CITIES, API_COUNTRIES } from '../api_url'
import { API_URL } from '.'

type AddressType = {
    countries: MultiSelectOptionsType[]
    city: MultiSelectOptionsType[]
    region: MultiSelectOptionsType[]
}

export const getAllStates = async () => {
    const resState = await api
        .get(API_URL.replace('api', 'v1') + '/states')
        .then((res) => res.data)
        .then((data) => {
            return data.map(
                (state: {
                    id: string
                    name: string
                }): MultiSelectOptionsType => {
                    return {
                        key: state.name,
                        label: state.name,
                        id: state.id,
                    }
                }
            )
        })
        .catch((error) => {
            throw new Error(error)
        })
    return resState
}

export const getAllCities = async () => {
    // TODO: handle exception
    const resCity = await api
        .get(API_CITIES)
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
        .catch((error) => {
            throw new Error(error)
        })
    return resCity
}

export const getCountries = async () => {
    const resCountry = await api
        .get(API_URL.replace('api', 'v1') + '/countries')
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
        .catch((error) => {
            throw new Error(error)
        })
    console.log('resCountry', resCountry)
    return resCountry
}

export const getState = async (countryID: string) => {
    const resState = await api
        .get(`${API_URL.replace('api', 'v1')}/countries/${countryID}/states`)
        .then((res) => res.data)
        .then((data) => {
            return data.map(
                (state: {
                    id: string
                    name: string
                }): MultiSelectOptionsType => {
                    return {
                        key: state.name,
                        label: state.name,
                        id: state.id,
                    }
                }
            )
        })
        .catch((error) => {
            throw new Error(error)
        })
    return resState
}

export const getCities = async (stateID: string) => {
    const resCity = await api
        .get(`${API_URL.replace('api', 'v1')}/states/${stateID}/cities`)
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
        .catch((error) => {
            throw new Error(error)
        })
    return resCity
}

export const getRegions = async (cityID: string) => {
    const resRegion = await api
        .get(`${API_URL.replace('api', 'v1')}/cities/${cityID}/regions`)
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
        .catch((error) => {
            throw new Error(error)
        })
    return resRegion
}
