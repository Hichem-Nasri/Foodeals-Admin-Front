import { pagesData } from "@/lib/pages"
import { BarChartBig, CreditCard, Database, HeartHandshake, Hotel, Icon, Store, Truck } from "lucide-react"
import { FC } from "react"
import { CustomButton } from "../custom/CustomButton"
import Link from "next/link"

interface NavigationProps {}

export const Navigation: FC<NavigationProps> = () => {
	return (
		<nav className="lg:flex hidden flex-col p-[0.625rem] gap-[0.625rem] max-w-60 w-full h-fit rounded-[14px] bg-white">
			{pagesData.map((page, index) => (
				<Link key={index} href={page.href} passHref>
					<CustomButton className="w-full justify-normal bg-transparent text-lynch-500 hover:text-white rounded-[6px] p-4" label={page.label} IconLeft={page.icon} />
				</Link>
			))}
		</nav>
	)
}
