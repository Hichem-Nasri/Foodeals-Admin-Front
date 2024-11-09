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
import { LucideProps, ChevronLeft, User, Bell } from 'lucide-react'
import { UserMenu } from './UserMenu'

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
    const path = usePathname()
    const isMobile = useMediaQuery({ query: '(max-width: 1024px)' })
    const [subPage, setSubPage] = useState<SubPageType | null>(null)
    const [mobile, setMobile] = useState<SubPageType | null>(null)

    useEffect(() => {
        const mobileMatch =
            isMobile && mobileLayout.find((route) => path.includes(route.href))
        if (mobileMatch) setMobile(mobileMatch as SubPageType)
    }, [isMobile, path])

    return (
        <>
            {mobile ? (
                <MobileHeader
                    title={mobile.label}
                    onClick={() => {
                        router.back()
                    }}
                />
            ) : (
                <>
                    <div
                        className={cn(
                            'hidden items-center justify-between bg-white py-3 px-2 rounded-b-[30px]',
                            formTitle && formTitle.length > 0
                                ? 'lg:hidden flex'
                                : ''
                        )}
                    >
                        <CustomButton
                            label=""
                            variant="ghost"
                            IconLeft={ChevronLeft}
                            className="p-0 text-lynch-300 text-base font-medium"
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
                            formTitle && formTitle.length > 0
                                ? 'hidden lg:flex'
                                : ''
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
                            <UserMenu />
                            <Bell
                                className="text-lynch-400 lg:hidden"
                                size={30}
                            />
                            {/* Sheet and other UI components remain unchanged */}
                        </div>
                        <div className="inline-flex lg:hidden w-full">
                            <SearchInput />
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
