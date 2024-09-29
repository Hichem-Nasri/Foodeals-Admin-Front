import { cn } from "@/lib/utils"
import { PartnerSolutionType } from "@/types/partners"
import { HandCoins, HeartHandshake, ShoppingBag } from "lucide-react"
import { FC } from "react"

interface PartnerSolutionProps {
	solution: PartnerSolutionType
	className?: string
	size?: number
}

export const PartnerSolution: FC<PartnerSolutionProps> = ({ solution, className, size = 14 }) => {
	const solutionColor =
		solution === PartnerSolutionType.MARKET_PRO
			? "text-mountain-500 bg-mountain-100"
			: solution === PartnerSolutionType.DLC_PRO
			? "bg-tulip-100 text-tulip-500"
			: "text-scooter-500 bg-scooter-100"
	return (
		<span
			className={cn(
				`flex items-center gap-[0.375rem] text-[0.625rem] font-bold py-[0.375rem] px-3 rounded-full h-fit ${solutionColor}`,
				className
			)}>
			{solution === PartnerSolutionType.MARKET_PRO ? (
				<ShoppingBag size={size} />
			) : solution === PartnerSolutionType.DLC_PRO ? (
				<HandCoins size={size} />
			) : (
				<HeartHandshake size={size} />
			)}
			{solution}
		</span>
	)
}
