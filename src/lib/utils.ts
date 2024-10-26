import { PartnerSolutionType } from '@/types/partners'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const accessToken =
    'eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiTEVBRCIsInRva2VuX3R5cGUiOiJhY2Nlc3MiLCJwaG9uZSI6IisyMTI2MTIzNDU2NzgxMTUiLCJlbWFpbCI6ImFtaW5lLnNhYmlyQGV4YW1wbGUuY29tIiwic3ViIjoiYW1pbmUuc2FiaXJAZXhhbXBsZS5jb20iLCJpYXQiOjE3Mjk4MDgwNDIsImV4cCI6MTczMjQwMDA0Mn0.5oMMNpnpBvP5FuDA81h5zJFVKGFAbDdP2UGsGBmmvfPn5-ISJ6MCZkBJqJPVdVL_zQvn3i_S88pyntldVi7lIA'

export const headers = {
    Authorization: 'Bearer ' + accessToken,
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

export const countryCodes = [
    { value: '+212', flag: '🇲🇦' },
    { value: '+1', flag: '🇺🇸' },
    { value: '+86', flag: '🇨🇳' },
    { value: '+91', flag: '🇮🇳' },
    { value: '+81', flag: '🇯🇵' },
    { value: '+82', flag: '🇰🇷' },
    { value: '+7', flag: '🇷🇺' },
    { value: '+55', flag: '🇧🇷' },
    { value: '+49', flag: '🇩🇪' },
    { value: '+33', flag: '🇫🇷' },
    { value: '+44', flag: '🇬🇧' },
    { value: '+61', flag: '🇦🇺' },
    { value: '+52', flag: '🇲🇽' },
    { value: '+39', flag: '🇮🇹' },
    { value: '+34', flag: '🇪🇸' },
    { value: '+234', flag: '🇳🇬' },
    { value: '+20', flag: '🇪🇬' },
    { value: '+27', flag: '🇿🇦' },
    { value: '+62', flag: '🇮🇩' },
    { value: '+84', flag: '🇻🇳' },
    { value: '+31', flag: '🇳🇱' },
    { value: '+32', flag: '🇧🇪' },
    { value: '+41', flag: '🇨🇭' },
    { value: '+213', flag: '🇩🇿' },
    { value: '+221', flag: '🇸🇳' },
    { value: '+216', flag: '🇹🇳' },
    { value: '+225', flag: '🇨🇮' },
].sort((a, b) => a.value.localeCompare(b.value))

export const PartnerOptions = [
    { id: '0', name: 'All', avatar: 'https://via.placeholder.com/120' },
    { id: '1', name: 'Supermarché', avatar: 'https://via.placeholder.com/120' },
    { id: '2', name: 'Superettes', avatar: 'https://via.placeholder.com/120' },
] // Fetch options from API
