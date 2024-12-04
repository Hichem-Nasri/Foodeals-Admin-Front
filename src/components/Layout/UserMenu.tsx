import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ChevronDown, LogOut, Settings, UserCircle } from 'lucide-react'
import { getUser, SignOut } from '@/app/actions'
import { Skeleton } from '../ui/skeleton'
import { User, useUser } from '@/context/useUser'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Logout from './Logout'

interface UserMenuProps {
    user: User | null
    loading: boolean
}

export const UserMenu: FC<UserMenuProps> = ({ user, loading }) => {
    console.log('user:', user)
    const handleLogout = () => {
        SignOut()
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="">
                <Button
                    variant="ghost"
                    className="lg:inline-flex hidden items-center gap-3 p-0 hover:bg-white shrink-0"
                >
                    <div className="flex gap-3 items-center">
                        {loading ? (
                            <Skeleton className="w-12 h-12 rounded-full bg-lynch-50" />
                        ) : (
                            <Avatar className="size-12 rounded-full bg-white border-[1px] border-bg-lynch-400 text-lynch-500 ">
                                <AvatarImage src={user?.image! || ''} />
                                <AvatarFallback>
                                    {user?.name &&
                                        user?.name
                                            .slice(0, 2)
                                            .toLocaleUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        )}
                        <div className="lg:flex hidden items-start flex-col gap-[3px]">
                            {loading ? (
                                <Skeleton className="w-24 h-6 rounded-full bg-lynch-50" />
                            ) : (
                                <p className="text-base font-normal text-mountain-500">
                                    {user?.name}
                                </p>
                            )}
                            {loading ? (
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
            <DropdownMenuContent align="start" className="min-w-44">
                <DropdownMenuItem className=" w-full flex justify-between items-center gap-1 p-4 text-lynch-950">
                    <UserCircle />
                    <span>Mon Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="w-full flex justify-between items-center gap-1 p-4 text-lynch-950">
                    <Settings />
                    <span>Paramètres</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="w-full flex justify-between items-center gap-1 p-4 text-coral-500"
                    onClick={() => {
                        handleLogout()
                    }}
                >
                    <LogOut />
                    <span>Déconnexion</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
