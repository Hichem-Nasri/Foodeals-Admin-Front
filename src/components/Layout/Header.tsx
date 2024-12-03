'use client'
import Image from 'next/image'
import { SearchInput } from './SearchInput'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { pagesData } from '@/lib/pages'
import Link from 'next/link'
import {
    ForwardRefExoticComponent,
    Fragment,
    useState,
    useEffect,
    RefAttributes,
} from 'react'
import { Button } from '../ui/button'
import { CustomButton } from '../custom/CustomButton'
import { Label } from '../Label'
import { cn } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import MobileHeader from '../utils/MobileHeader'
import { mobileLayout } from '@/lib/routes'
import { useMediaQuery } from 'react-responsive'
import {
    LucideProps,
    ChevronLeft,
    User,
    Bell,
    ChevronRight,
    LogOut,
} from 'lucide-react'
import { UserMenu } from './UserMenu'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTrigger,
} from '../ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { SignOut } from '@/app/actions'
import { Skeleton } from '../ui/skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useUser } from '@/context/useUser'
import Logout from './Logout'

interface HeaderProps {
    formTitle?: string
}
interface SubPageType {
    label: string
    href: string
    icon: ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
    >
    subPage: boolean
    ListSubPage: SubPageType[]
}

export const Header: React.FC<HeaderProps> = ({ formTitle }) => {
    const router = useRouter()
    const { user, loading } = useUser()
    const [subPage, setSubPage] = useState<SubPageType | null>(null)
    const [open, setOpen] = useState(false)
    const handleLogout = async () => {
        const res = await SignOut()
    }
    return (
        <>
            <div
                className={cn(
                    'hidden justify-between  items-center border-b-2 w-full border-primary px-2 py-3 bg-white',
                    formTitle && formTitle.length > 0 ? 'lg:hidden flex' : ''
                )}
            >
                <CustomButton
                    label=""
                    variant="ghost"
                    size={'sm'}
                    IconLeft={ChevronLeft}
                    className="p-2 hover:bg-transparent hover:text-lynch-300 text-lynch-300 text-base font-medium"
                    onClick={router.back}
                />
                <Label
                    label={formTitle ? formTitle : ''}
                    className="text-lynch-950 text-[1.125rem] font-normal"
                />
            </div>
            <div
                className={cn(
                    'flex lg:flex-row flex-col bg-white lg:rounded-none lg:pb-0 pb-2 rounded-b-[30px]',
                    formTitle && formTitle.length > 0 ? 'hidden lg:flex' : ''
                )}
            >
                <div className="flex items-center justify-between lg:gap-11 gap-4 px-4 py-2 w-full h-16">
                    <Image
                        src="/logo-foodeals.svg"
                        alt="login Illustrator"
                        width={191}
                        height={32}
                        objectFit="cover"
                        className="lg:mr-0 mr-auto"
                    />
                    <div className="lg:inline-flex hidden mr-auto">
                        <SearchInput />
                    </div>
                    <UserMenu user={user} loading={loading} />
                    <Bell className="text-lynch-400 lg:hidden" size={30} />
                    <Sheet>
                        <SheetTrigger className="lg:hidden inline-flex">
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
                        </SheetTrigger>
                        <SheetContent
                            side="left"
                            className="px-4 overflow-auto"
                        >
                            <SheetHeader>
                                <SheetTitle
                                    className="ml-auto mb-3"
                                    onClick={() => setSubPage(null)}
                                >
                                    {subPage ? subPage.label : 'Menu'}
                                </SheetTitle>
                                <span className="h-[1px] w-full bg-lynch-100" />
                                <SheetDescription className="flex flex-col gap-4">
                                    {subPage ? (
                                        <Fragment>
                                            <Button
                                                className="w-full justify-normal gap-2 bg-transparent text-lynch-500 hover:bg-lynch-50 rounded-[6px] py-[0.375rem] px-0 shrink-0"
                                                onClick={() => setSubPage(null)}
                                            >
                                                <div className="flex justify-center items-center p-[0.625rem] icon rounded-full bg-transparent text-lynch-500   ">
                                                    <ChevronLeft />
                                                </div>
                                                {'Menu principal'}
                                            </Button>
                                            {subPage.ListSubPage.map(
                                                (page, index) => (
                                                    <Link
                                                        key={index}
                                                        href={page.href}
                                                        passHref
                                                    >
                                                        <Button className="w-full justify-normal gap-2 bg-transparent text-lynch-500 hover:bg-lynch-50 rounded-[6px] py-[0.375rem] px-0 shrink-0">
                                                            <div className="flex justify-center items-center p-[0.625rem] icon rounded-full bg-primary text-white">
                                                                <page.icon />
                                                            </div>
                                                            {page.label}
                                                        </Button>
                                                    </Link>
                                                )
                                            )}
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            {pagesData.map((page, index) => (
                                                <Fragment key={index}>
                                                    {page.subPage ? (
                                                        <Button
                                                            className="w-full justify-normal gap-2 bg-transparent text-lynch-500 hover:bg-lynch-50 rounded-[6px] py-[0.375rem] px-0 shrink-0"
                                                            onClick={() =>
                                                                setSubPage(
                                                                    page as SubPageType
                                                                )
                                                            }
                                                        >
                                                            <div className="flex justify-center items-center p-[0.625rem] icon rounded-full bg-primary text-white">
                                                                <page.icon />
                                                            </div>
                                                            {page.label}
                                                            <ChevronRight className="ml-auto" />
                                                        </Button>
                                                    ) : (
                                                        <Link
                                                            key={index}
                                                            href={page.href}
                                                            passHref
                                                        >
                                                            <Button className="w-full justify-normal gap-2 bg-transparent text-lynch-500 hover:bg-lynch-50 rounded-[6px] py-[0.375rem] px-0 shrink-0">
                                                                <div className="flex justify-center items-center p-[0.625rem] icon rounded-full bg-primary text-white">
                                                                    <page.icon />
                                                                </div>
                                                                {page.label}
                                                            </Button>
                                                        </Link>
                                                    )}
                                                    {page.href ===
                                                        '/marketing' && (
                                                        <span className="h-[1px] w-full bg-lynch-100" />
                                                    )}
                                                </Fragment>
                                            ))}
                                        <Button
                                            className="w-full justify-normal gap-2 bg-transparent text-lynch-500 hover:bg-lynch-50 rounded-[6px] py-[0.375rem] px-0 shrink-0"
                                            onClick={() => {
                                                handleLogout()
                                            }}
                                        >
                                            <div className="flex justify-center items-center p-[0.625rem] icon rounded-full bg-red-500 text-white">
                                                <LogOut />
                                            </div>
                                            Se déconnecter
                                            <ChevronRight className="ml-auto" />
                                        </Button>
                                        </Fragment>
                                    )}
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                    {/* Sheet and other UI components remain unchanged */}
                </div>
                <div className="inline-flex lg:hidden w-full">
                    <SearchInput />
                </div>
            </div>
        </>
    )
}
