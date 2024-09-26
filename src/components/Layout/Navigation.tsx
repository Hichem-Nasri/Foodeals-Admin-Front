"use client"
import { pagesData } from "@/lib/pages"
import { FC } from "react"
import { CustomButton } from "../custom/CustomButton"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { AppRoutes } from "@/lib/routes"

interface NavigationProps {}

export const Navigation: FC<NavigationProps> = () => {
	const pathname = usePathname()
	return (
		<nav className="lg:flex hidden flex-col p-[0.625rem] gap-[0.625rem] max-w-60 w-full h-fit rounded-[14px] bg-white">
			{pagesData.map((page, index) => (
				<Link key={index} href={page.href} passHref>
					<CustomButton
						className={cn(
							"w-full justify-normal bg-transparent text-lynch-500 hover:text-white rounded-[6px] p-4",
							(pathname.includes(page.href) && page.href != AppRoutes.home) ||
								(pathname === page.href && page.href === AppRoutes.home)
								? "bg-primary/90 text-white"
								: ""
						)}
						label={page.label}
						IconLeft={page.icon}
					/>
				</Link>
			))}
		</nav>
	)
}
