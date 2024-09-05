import Image from "next/image"
import { FC } from "react"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

interface UserMenuProps { }

export const UserMenu: FC<UserMenuProps> = ({ }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild className="lg:inline-flex hidden">
				<Button variant="ghost" className="flex items-center gap-3 p-0 hover:bg-white shrink-0">
					<div className="flex gap-3 items-center">
						<Image
							src="https://api.dicebear.com/7.x/bottts/png"
							alt="avatar"
							width={42}
							height={42}
							className="rounded-full overflow-hidden"
						/>
						<div className="lg:flex hidden items-start flex-col gap-[3px]">
							<p className="text-base font-normal text-Mountain-500">Choaib Abouelwafa</p>
							<p className="text-xs font-semibold text-subtitle">Super Admin</p>
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
