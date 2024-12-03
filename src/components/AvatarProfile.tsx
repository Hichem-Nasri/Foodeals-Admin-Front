import { Label } from './Label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from './ui/input'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ImageUp } from 'lucide-react'
import { Skeleton } from './ui/skeleton'

interface AvatarProfileProps {
    iUrl: string
    alt?: string
    label?: string
    className?: string
    disabled?: boolean
    onChange?: (file: File | null) => void // Change to accept a File
    isLoaded?: boolean
}

export const AvatarProfile: React.FC<AvatarProfileProps> = ({
    alt = '',
    iUrl,
    label = '',
    className,
    disabled,
    onChange,
    isLoaded = false,
}) => {
    const [src, setSrc] = useState(iUrl)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files && e.currentTarget.files.length > 0) {
            const selectedFile = e.currentTarget.files[0]
            setSrc(URL.createObjectURL(selectedFile))
            if (onChange) onChange(selectedFile) // Send the file to the parent component
        } else {
            setSrc(iUrl)
            if (onChange) onChange(null) // Send null to the parent component
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
                    `w-[7.5rem] h-[7.5rem] lg:rounded-[24px] border ${
                        src ? 'border-lynch-200' : 'border-2 border-lynch-200'
                    }`,
                    className
                )}
            >
                {isLoaded ? (
                    <Skeleton className="w-full h-full rounded-[24px]" />
                ) : (
                    <>
                        <Input
                            type="file"
                            disabled={disabled}
                            className="absolute w-full h-full top-0 left-0 opacity-0 cursor-pointer"
                            onChange={handleFileChange} // Update to use the new function
                        />
                        {src ? (
                            <>
                                <AvatarImage
                                    src={src || '/emptyImage.svg'}
                                    className={`object-cover ${
                                        !src && 'w-[20%] m-auto'
                                    }`}
                                />
                                <AvatarFallback>
                                    {alt && alt[0].toUpperCase()}
                                </AvatarFallback>
                            </>
                        ) : (
                            <div
                                className={cn(
                                    ' rounded-[24px] text-lynch-200 w-full h-full flex flex-col space-y-2 justify-center items-center bg-lynch-50',
                                    className
                                )}
                            >
                                <ImageUp className="w-full" size={56} />
                                {alt == 'cover' && (
                                    <Label
                                        label="Photo du couverture"
                                        className="text-[14px] font-[17.07px]  text-lynch-300 lg:hidden flex"
                                    />
                                )}
                            </div>
                        )}
                    </>
                )}
            </Avatar>
        </div>
    )
}
