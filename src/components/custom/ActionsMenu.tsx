import { FC, ForwardRefExoticComponent, RefAttributes } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ListPlus, LucideProps } from "lucide-react"
import { cn } from "@/lib/utils"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"

export interface ActionType {
	label: string
	actions: (id: string) => void
	icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}

interface ActionsMenuProps {
	id?: string
	menuList: ActionType[]
	className?: string
}

export const ActionsMenu: FC<ActionsMenuProps> = ({ id = "", menuList, className }) => {
	return (
		<>
			<Drawer>
				<DrawerTrigger
					className={cn(
						"flex lg:hidden justify-center items-center bg-lynch-300 text-white rounded-full p-2 w-fit mx-auto focus:outline-none [&>svg]:size-[1.125rem]",
						className
					)}>
					<ListPlus />
				</DrawerTrigger>
				<DrawerContent className="flex flex-col gap-2 p-3 rounded-[16px] lg:hidden">
					{menuList.map((item) => (
						<button
							key={item.label}
							onClick={() => item.actions(id)}
							className="flex items-center
					gap-3 px-3 py-2 hover:bg-lynch-50 rounded-[6px] text-lynch-500 cursor-pointer">
							<item.icon size={20} />
							{item.label}
						</button>
					))}
				</DrawerContent>
			</Drawer>
			<DropdownMenu>
				<DropdownMenuTrigger
					className={cn(
						"lg:flex hidden justify-center items-center bg-lynch-300 text-white rounded-full p-2 w-fit mx-auto focus:outline-none [&>svg]:size-[1.125rem]",
						className
					)}>
					<ListPlus />
				</DropdownMenuTrigger>
				<DropdownMenuContent className="lg:flex hidden flex-col gap-2 p-3 rounded-[16px]">
					{menuList.map((item) => (
						<DropdownMenuItem
							key={item.label}
							onClick={() => item.actions(id)}
							className="flex items-center
					gap-3 px-3 py-2 hover:bg-lynch-50 rounded-[6px] text-lynch-500 cursor-pointer">
							<item.icon size={20} />
							{item.label}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	)
}
