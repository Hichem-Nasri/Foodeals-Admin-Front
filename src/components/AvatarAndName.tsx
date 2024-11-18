import { FC } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

interface AvatarAndName {
    avatar?: string
    name: string
    className?: string
    classNameAvatar?: string
    classNameName?: string
}

export const AvatarAndName: FC<AvatarAndName> = ({
    avatar,
    name,
    className,
    classNameAvatar,
    classNameName,
}) => {
    return (
        <div className={cn('flex gap-3 items-center', className)}>
            {avatar && (
                <Avatar className={classNameAvatar}>
                    <AvatarImage src={avatar} />
                    <AvatarFallback>
                        {name && name[0].toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            )}
            {name && (
                <span className={cn('line-clamp-1 text-input', classNameName)}>
                    {name}
                </span>
            )}
        </div>
    )
}
