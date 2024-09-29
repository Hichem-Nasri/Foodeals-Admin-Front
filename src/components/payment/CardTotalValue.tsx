import { LucideProps } from "lucide-react"
import { FC, ForwardRefExoticComponent, RefAttributes } from "react"
import { Label } from "../Label"
import { cn } from "@/lib/utils"

interface CardTotalValueProps {
	Icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
	title: string
	value: number
	className?: string
}

export const CardTotalValue: FC<CardTotalValueProps> = ({ title, value, className, Icon }) => {
	const total = `${value} MAD`
	return (
		<div className="flex flex-col gap-1 p-4 bg-white rounded-[14px] h-full w-full lg:max-w-72">
			<div className="flex items-center gap-3">
				<span className={cn("bg-primary p-2.5 rounded-full", className)}>
					{<Icon className="text-white" />}
				</span>
				<Label label={title} className="text-lg font-medium text-lynch-950" />
			</div>
			<Label label={total} className={cn("text-[1.375rem] font-semibold text-primary ml-auto", className?.replace('bg', ''))} />
		</div>
	)
}
