import { FC } from 'react'
import { AvatarProfile } from '../AvatarProfile'
import { FormField, FormMessage } from '../ui/form'
import { UseFormReturn } from 'react-hook-form'
import { cn } from '@/lib/utils'

interface AvatarFieldProps {
    form: UseFormReturn<any>
    name: string
    alt?: string
    label?: string
    className?: string
    classNameAvatar?: string
    disabled?: boolean
    isLoaded?: boolean
}

export const AvatarField: FC<AvatarFieldProps> = ({
    form,
    name,
    alt = '',
    classNameAvatar,
    label,
    className,
    disabled = false,
    isLoaded = false,
}) => {
    const { control } = form
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div
                    className={cn(
                        'flex flex-col items-start w-fit h-fit',
                        className
                    )}
                >
                    <AvatarProfile
                        onChange={(file) => field.onChange(file)} // Pass the file to the form state
                        iUrl={field.value}
                        alt={alt}
                        className={classNameAvatar}
                        label={label}
                        disabled={disabled}
                        isLoaded={isLoaded}
                    />
                    <FormMessage />
                </div>
            )}
        />
    )
}
