import { PaymentDetailsOperationsType, PaymentStatusType } from "@/types/PaymentType"
import { FC } from "react"
import { PaymentStatus } from "../PaymentStatus"
import { Label } from "@/components/Label"
import { cn } from "@/lib/utils"
import { Coins, CreditCard } from "lucide-react"

interface OperationCardProps {
	operation: PaymentDetailsOperationsType
	className?: string
}

export const OperationCard: FC<OperationCardProps> = ({ operation, className }) => {
	const dataArray = [
		{
			label: `V. carte : ${operation.withCard}`,
			icon: CreditCard,
		},
		{
			label: `v. espèce : ${operation.withCash}`,
			icon: Coins,
		},
		{
			label: `c. card : ${operation.commissionCard}`,
			icon: CreditCard,
		},
		{
			label: `c. espèce : ${operation.commissionCash}`,
			icon: Coins,
		},
		{
			label: `t. commission${operation.commissionTotal}`,
			icon: Coins,
		},
	]
	return (
		<div className={cn("flex flex-col gap-3 bg-white p-3 rounded-[20px]", className)}>
			<div className="flex justify-end gap-[0.375rem]">
				<PaymentStatus status={operation.status} />
			</div>
			<span className="h-[1px] w-full bg-lynch-100" />
			<div className="flex flex-wrap gap-[0.375rem]">
				{dataArray.map((data) => (
					<div
						key={data.label}
						className={cn("flex items-center gap-[0.375rem] bg-lynch-100 text-lynch-500 rounded-full py-[0.375rem] px-3")}>
						<data.icon size={14} key={data.label} />
						<Label label={data.label.toString().toUpperCase()} className={cn("text-lynch-500 text-[0.625rem] font-bold")} />
					</div>
				))}
			</div>
		</div>
	)
}
