import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import { getUser } from '@/app/actions'
import { Skeleton } from '../ui/skeleton'

interface UserMenuProps {}

export const UserMenu: FC<UserMenuProps> = ({}) => {
    const [user, setUser] = useState<any | null>(null)
    // const user =  getUser()
    useEffect(() => {
        const getUserData = async () => {
            const user = await getUser()
            setUser(user)
        }
        if (!user) getUserData()
    }, [])
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="">
                <Button
                    variant="ghost"
                    className="lg:inline-flex hidden items-center gap-3 p-0 hover:bg-white shrink-0"
                >
                    <div className="flex gap-3 items-center">
                        {!user ? (
                            <Skeleton className="w-12 h-12 rounded-full bg-lynch-50" />
                        ) : (
                            <Image
                                src={
                                    'https://api.dicebear.com/7.x/lorelei/png?seed=alex'
                                }
                                alt="avatar"
                                width={42}
                                height={42}
                                className="rounded-full overflow-hidden"
                            />
                        )}
                        <div className="lg:flex hidden items-start flex-col gap-[3px]">
                            {!user ? (
                                <Skeleton className="w-24 h-6 rounded-full bg-lynch-50" />
                            ) : (
                                <p className="text-base font-normal text-mountain-500">
                                    {user?.name}
                                </p>
                            )}
                            {!user ? (
                                <Skeleton className="w-12 h-6 rounded-full bg-lynch-50" />
                            ) : (
                                <p className="text-xs font-semibold text-subtitle">
                                    {user?.role}
                                </p>
                            )}
                        </div>
                        <ChevronDown className="h-4 w-4" />
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuItem>Mon Profile</DropdownMenuItem>
                <DropdownMenuItem>Paramètres</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
