import { FC, ForwardRefExoticComponent, RefAttributes } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ListPlus, LucideProps } from "lucide-react"

export interface MenuListType {
	label: string
	actions: (id: string) => void
	icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}

interface ActionsMenuProps {
	id?: string
	menuList: MenuListType[]
}

export const ActionsMenu: FC<ActionsMenuProps> = ({ id = "", menuList }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="flex justify-center items-center bg-lynch-300 text-white rounded-full p-2 w-fit mx-auto focus:outline-none">
				<ListPlus size={18} />
			</DropdownMenuTrigger>
			<DropdownMenuContent className="flex flex-col gap-2 p-3 rounded-[16px]">
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
	)
}
