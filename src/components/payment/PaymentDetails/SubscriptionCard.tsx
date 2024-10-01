import { ValidationSubscriptionType } from "@/types/PaymentType"
import { FC } from "react"
import { Label } from "@/components/Label"
import { cn } from "@/lib/utils"
import { Calendar, Coins, Frame } from "lucide-react"
import { PartnerSolution } from "@/components/Partners/PartnerSolution"

interface SubscriptionCardProps {
	operation: ValidationSubscriptionType
	className?: string
}

export const SubscriptionCard: FC<SubscriptionCardProps> = ({ operation, className }) => {
	const dataArray = [
		{
			label: `Réf : ${operation.ref}`,
			icon: Frame,
		},
		{
			label: `échéance : ${operation.deadline.toLocaleDateString()}`,
			icon: Calendar,
		},
		{
			label: `prix : ${operation.price} MAD`,
			icon: Coins,
		},
	]
	return (
		<div className={cn("flex flex-col gap-3 bg-white p-3 rounded-[20px]", className)}>
			<div className="flex flex-wrap gap-[0.375rem]">
				{dataArray.map((data) => (
					<div
						key={data.label}
						className={cn(
							"flex items-center gap-[0.375rem] bg-lynch-100 text-lynch-500 rounded-full py-[0.375rem] px-3"
						)}>
						<data.icon size={14} key={data.label} />
						<Label
							label={data.label.toString().toUpperCase()}
							className={cn("text-lynch-500 text-[0.625rem] font-bold")}
						/>
					</div>
				))}
			</div>
			<span className="h-[1px] w-full bg-lynch-100" />
			<div className="flex flex-wrap gap-[0.375rem]">
				{operation.solution.map((solution) => (
					<PartnerSolution key={solution} solution={solution} />
				))}
			</div>
		</div>
	)
}
