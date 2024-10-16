import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const accessToken =
    'eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiTEVBRCIsInRva2VuX3R5cGUiOiJhY2Nlc3MiLCJwaG9uZSI6IisyMTI2MTIzNDU2NzgxMTUiLCJlbWFpbCI6ImFtaW5lLnNhYmlyQGV4YW1wbGUuY29tIiwic3ViIjoiYW1pbmUuc2FiaXJAZXhhbXBsZS5jb20iLCJpYXQiOjE3MjkwMjM0NjIsImV4cCI6MTcyOTEwOTg2Mn0.5UgtC47RivOFN-ENZh93l94p1DwEaVlx2T32Lwbi_kn9CekD3HjddhnIeKnH4-opyr3f-6Kqb9s65GPJDbMmVQ    '

export const headers = {
    Authorization: 'Bearer ' + accessToken,
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
