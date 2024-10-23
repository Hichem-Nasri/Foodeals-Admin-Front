import { Label } from './Label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from './ui/input'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface AvatarProfileProps {
    iUrl: string
    alt?: string
    label?: string
    className?: string
    disabled?: boolean
    onChange?: (file: File | null) => void // Change to accept a File
}

export const AvatarProfile: React.FC<AvatarProfileProps> = ({
    alt = '',
    iUrl,
    label = '',
    className,
    disabled,
    onChange,
}) => {
    const [src, setSrc] = useState(iUrl)
    const [file, setFile] = useState<File | null>(null)

    useEffect(() => {
        if (onChange) onChange(file) // Send the file to the parent component
    }, [file, onChange])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files && e.currentTarget.files.length > 0) {
            const selectedFile = e.currentTarget.files[0]
            setSrc(URL.createObjectURL(selectedFile))
            setFile(selectedFile) // Store the file
        }
    }

    return (
        <div className="flex flex-col text-center gap-3 w-full">
            {label.length > 0 && (
                <Label
                    label={label}
                    className="text-xs font-semibold text-lynch-950 lg:inline hidden"
                />
            )}
            <Avatar
                className={cn(
                    `w-[7.5rem] h-[7.5rem] lg:rounded-[24px] border border-lynch-200`,
                    className
                )}
            >
                <Input
                    type="file"
                    disabled={disabled}
                    className="absolute w-full h-full top-0 left-0 opacity-0 cursor-pointer"
                    onChange={handleFileChange} // Update to use the new function
                />
                <AvatarImage
                    src={src || '/emptyImage.svg'}
                    className={`object-cover ${!src && 'w-1/2 m-auto'}`}
                />
                <AvatarFallback>{alt[0].toUpperCase()}</AvatarFallback>
            </Avatar>
        </div>
    )
}
