'use client'
import { pagesData } from '@/lib/pages'
import { FC, Fragment } from 'react'
import { CustomButton } from '../custom/CustomButton'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { AppRoutes } from '@/lib/routes'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '../ui/accordion'

interface NavigationProps {}

export const Navigation: FC<NavigationProps> = () => {
    const pathname = usePathname()
    const router = useRouter()
    return (
        <nav className="lg:flex hidden flex-col p-[0.625rem] gap-[0.625rem] max-w-60 w-full h-fit rounded-[14px] bg-white">
            {pagesData.map((page, index) => (
                <Fragment key={index}>
                    {page.subPage ? (
                        <Accordion
                            type="single"
                            className="w-full"
                            defaultValue={page.label}
                            collapsible
                        >
                            <AccordionItem
                                value={page.label + index}
                                className="w-full justify-normal bg-transparent text-lynch-500  rounded-[6px] space-y-2"
                            >
                                <AccordionTrigger
                                    className={cn(
                                        'w-full justify-normal bg-transparent text-lynch-500  rounded-[6px] peer hover:bg-primary/90 hover:text-white h-auto py-0',
                                        (pathname.includes(page.href) &&
                                            page.href != AppRoutes.home) ||
                                            (pathname === page.href &&
                                                page.href === AppRoutes.home)
                                            ? 'bg-primary text-white'
                                            : ''
                                    )}
                                >
                                    <>
                                        <div
                                            onClick={() =>
                                                router.push(page.href)
                                            }
                                            className={cn(
                                                'w-full justify-normal bg-transparent text-lynch-500 hover:text-white rounded-[6px] hover:bg-transparent cursor-pointer inline-flex items-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none  disabled:pointer-events-none disabled:opacity-50 p-4 py-5',
                                                (pathname.includes(page.href) &&
                                                    page.href !=
                                                        AppRoutes.home) ||
                                                    (pathname === page.href &&
                                                        page.href ===
                                                            AppRoutes.home)
                                                    ? 'bg-primary text-white'
                                                    : ''
                                            )}
                                        >
                                            {
                                                <page.icon className="mr-2 icon shrink-0" />
                                            }
                                            {page.label}
                                        </div>
                                    </>
                                </AccordionTrigger>
                                <AccordionContent className="space-y-1">
                                    {page.ListSubPage?.map((item, index) => (
                                        <Fragment key={index}>
                                            <CustomButton
                                                onClick={() => {
                                                    router.push(item.href)
                                                }}
                                                className={cn(
                                                    'w-full justify-normal bg-transparent text-lynch-500 hover:text-white rounded-[6px] p-4',
                                                    (pathname.includes(
                                                        item.href
                                                    ) &&
                                                        item.href !=
                                                            AppRoutes.home) ||
                                                        (pathname ===
                                                            item.href &&
                                                            item.href ===
                                                                AppRoutes.home)
                                                        ? 'bg-lynch-100 '
                                                        : ''
                                                )}
                                                label={item.label}
                                                IconLeft={item.icon}
                                            />
                                        </Fragment>
                                    ))}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    ) : (
                        <Link key={index} href={page.href} passHref>
                            <CustomButton
                                className={cn(
                                    'w-full justify-normal bg-transparent text-lynch-500 hover:text-white rounded-[6px] p-4',
                                    (pathname.includes(page.href) &&
                                        page.href != AppRoutes.home) ||
                                        (pathname === page.href &&
                                            page.href === AppRoutes.home)
                                        ? 'bg-primary/90 text-white'
                                        : ''
                                )}
                                label={page.label}
                                IconLeft={page.icon}
                            />
                        </Link>
                    )}
                </Fragment>
            ))}
        </nav>
    )
}
