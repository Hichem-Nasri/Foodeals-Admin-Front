import { PartnerSolutionType } from '@/types/partnersType'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const accessToken =
    'eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiTEVBRCIsInRva2VuX3R5cGUiOiJhY2Nlc3MiLCJwaG9uZSI6IisyMTI2MTIzNDU2NzgxMTUiLCJlbWFpbCI6ImFtaW5lLnNhYmlyQGV4YW1wbGUuY29tIiwic3ViIjoiYW1pbmUuc2FiaXJAZXhhbXBsZS5jb20iLCJpYXQiOjE3MzExNDY0MTEsImV4cCI6MTczMzczODQxMX0.0B-hr0756WLocuX0Tgg4XekcGc6TMtLaWk2njejj9LckR-zrfprxROEoFGrnC982COmyzTo1nGsWOuktEmNHVA'

export const headers = {
    Authorization: 'Bearer ' + accessToken,
}

export const getFilterDate = (date: Date) => {
    return date
        .toISOString()
        .slice(0, 10)
        .split('-')
        .slice(0, 2)
        .join('-')
        .padStart(7, '0')
}

export function formatNumberWithSpaces(
    num: number,
    char: string = ' '
): string {
    if (typeof num !== 'number') {
        return ''
    }
    // Convert number to string
    const numStr = num.toString()

    // Use regex to format the number
    const formatted = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, char)

    return formatted
}

export const getSolutions = (solutions: string[]) => {
    return solutions.map((solution) => {
        switch (solution) {
            case 'pro_market':
                return PartnerSolutionType.MARKET_PRO
            case 'pro_dlc':
                return PartnerSolutionType.DLC_PRO
            case 'pro_donate':
                return PartnerSolutionType.DONATE_PRO
            default:
                return PartnerSolutionType.NONE
        }
    })
}

export function formatDate(
    date: Date,
    typeMonth: '2-digit' | 'numeric' | 'long' | 'short' | 'narrow' = 'short'
): string {
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: typeMonth,
        year: 'numeric',
    }
    return date.toLocaleDateString('en-US', options).replace(',', '')
}
// Define the type for country codes
interface CountryCode {
    value: string
    name: string
    flag: string
}

// Define the array with country codes, names, and a placeholder for flags
export const countryCodes: CountryCode[] = [
    { value: '+212', name: 'Morocco', flag: '' },
    { value: '+1', name: 'United States', flag: '' },
    { value: '+86', name: 'China', flag: '' },
    { value: '+91', name: 'India', flag: '' },
    { value: '+81', name: 'Japan', flag: '' },
    { value: '+82', name: 'South Korea', flag: '' },
    { value: '+7', name: 'Russia', flag: '' },
    { value: '+55', name: 'Brazil', flag: '' },
    { value: '+49', name: 'Germany', flag: '' },
    { value: '+33', name: 'France', flag: '' },
    { value: '+44', name: 'United Kingdom', flag: '' },
    { value: '+61', name: 'Australia', flag: '' },
    { value: '+52', name: 'Mexico', flag: '' },
    { value: '+39', name: 'Italy', flag: '' },
    { value: '+34', name: 'Spain', flag: '' },
    { value: '+234', name: 'Nigeria', flag: '' },
    { value: '+20', name: 'Egypt', flag: '' },
    { value: '+27', name: 'South Africa', flag: '' },
    { value: '+62', name: 'Indonesia', flag: '' },
    { value: '+84', name: 'Vietnam', flag: '' },
    { value: '+31', name: 'Netherlands', flag: '' },
    { value: '+32', name: 'Belgium', flag: '' },
    { value: '+41', name: 'Switzerland', flag: '' },
    { value: '+213', name: 'Algeria', flag: '' },
    { value: '+221', name: 'Senegal', flag: '' },
    { value: '+216', name: 'Tunisia', flag: '' },
    { value: '+225', name: 'Ivory Coast', flag: '' },
]

// Function to fetch flags and country names from REST Countries API
async function fetchCountryData() {
    const response = await fetch('https://restcountries.com/v3.1/all')
    const countries = await response.json()

    // Map country codes to their respective flags and names
    const countryCodeMap: { [key: string]: { name: string; flag: string } } = {}
    countries.forEach((country: any) => {
        const callingCode =
            country.idd?.root +
            (country.idd?.suffixes ? country.idd.suffixes[0] : '')
        if (callingCode) {
            countryCodeMap[callingCode] = {
                name: country.name.common,
                flag: country.flags?.png,
            }
        }
    })

    // Update the countryCodes array with the fetched names and flag URLs
    countryCodes.forEach((country) => {
        const countryData = countryCodeMap[country.value] // Remove '+' for matching
        if (countryData) {
            country.name = countryData.name
            country.flag = countryData.flag
        }
    })
}

// Call the function to fetch and update country data
fetchCountryData().then(() => {
    // console.log(countryCodes)
})

export const PartnerOptions = [
    { id: '0', name: 'All', avatar: 'https://via.placeholder.com/120' },
    { id: '1', name: 'Supermarché', avatar: 'https://via.placeholder.com/120' },
    { id: '2', name: 'Superettes', avatar: 'https://via.placeholder.com/120' },
] // Fetch options from API
