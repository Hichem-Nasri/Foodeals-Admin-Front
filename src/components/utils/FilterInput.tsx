import { PhoneCall } from 'lucide-react'
import { FC } from 'react'
import { Input } from '../custom/Input'
import { Label } from '../Label'

interface FilterInputProps {
    input: string
    setInput: (input: string) => void
    label: string
    placeholder?: string
    LeftIcon?: any
}

export const FilterInput: FC<FilterInputProps> = ({
    input,
    setInput,
    label,
    placeholder,
    LeftIcon,
}) => {
    return (
        <div className="flex flex-col gap-3 w-full">
            <Label label={label} htmlFor={label} />
            <Input
                name={label}
                onChange={(e: string | number) => {
                    setInput(e + '')
                }}
                placeholder={placeholder || `Saisir ${label}`}
                value={input}
                IconLeft={LeftIcon}
            />
        </div>
    )
}
