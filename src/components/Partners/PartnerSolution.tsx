import { PartnerSolutionType } from "@/types/partners"
import { HandCoins, HeartHandshake, ShoppingBag } from "lucide-react"
import { FC } from "react"

export const PartnerSolution: FC<{ solution: PartnerSolutionType }> = ({ solution }) => {
	const solutionColor =
		solution === PartnerSolutionType.MARKET_PRO
			? "text-mountain-500 bg-mountain-100"
			: solution === PartnerSolutionType.DLC_PRO
			? "bg-tulip-100 text-tulip-500"
			: "text-scooter-500 bg-scooter-100"
	return (
		<span
			className={`flex items-center gap-[0.375rem] text-[0.625rem] font-bold py-[0.375rem] px-3 rounded-full h-fit ${solutionColor}`}>
			{solution === PartnerSolutionType.MARKET_PRO ? (
				<ShoppingBag size={14} />
			) : solution === PartnerSolutionType.DLC_PRO ? (
				<HandCoins size={14} />
			) : (
				<HeartHandshake size={14} />
			)}
			{solution}
		</span>
	)
}
