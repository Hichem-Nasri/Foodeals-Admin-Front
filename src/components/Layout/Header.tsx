import Image from "next/image"
import { SearchInput } from "./SearchInput"
import { UserMenu } from "./UserMenu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { pagesData } from "@/lib/pages"
import Link from "next/link"
import { Bell, ChevronRight, LogOut, MenuIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Fragment } from "react"

export const Header: React.FC = () => {
	return (
		<div className="flex lg:flex-row flex-col bg-white lg:rounded-none lg:pb-0 pb-2 rounded-b-[30px]">
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
				<Bell className="text-lynch-400 lg:hidden" size={30} />
				<Sheet>
					<SheetTrigger className="lg:hidden inline-flex">
						<Image
							src="https://api.dicebear.com/7.x/bottts/png"
							alt="avatar"
							width={42}
							height={42}
							className="rounded-full overflow-hidden"
						/>
					</SheetTrigger>
					<SheetContent side="left" className="px-4 overflow-auto">
						<SheetHeader>
							<SheetTitle className="ml-auto mb-3">Site map</SheetTitle>
							<span className="h-[1px] w-full bg-lynch-100" />
							<SheetDescription className="flex flex-col gap-4">
								{pagesData.map((page, index) => (
									<Fragment key={index}>
										<Link key={index} href={page.href} passHref>
											<Button className="w-full justify-normal gap-2 bg-transparent text-lynch-500 hover:bg-lynch-50 rounded-[6px] py-[0.375rem] px-0 shrink-0">
												<div className="flex justify-center items-center p-[0.625rem] icon rounded-full bg-primary text-white">
													<page.icon />
												</div>
												{page.label}
												<ChevronRight className="ml-auto" />
											</Button>
										</Link>
										{page.href === "/marketing" && <span className="h-[1px] w-full bg-lynch-100" />}
									</Fragment>
								))}
								<Button className="w-full justify-normal gap-2 bg-transparent text-lynch-500 hover:bg-lynch-50 rounded-[6px] py-[0.375rem] px-0 shrink-0">
									<div className="flex justify-center items-center p-[0.625rem] icon rounded-full bg-red-500 text-white">
										<LogOut />
									</div>
									Se déconnecter
									<ChevronRight className="ml-auto" />
								</Button>
							</SheetDescription>
						</SheetHeader>
					</SheetContent>
				</Sheet>
			</div>
			<div className="inline-flex lg:hidden w-full">
				<SearchInput />
			</div>
		</div>
	)
}
