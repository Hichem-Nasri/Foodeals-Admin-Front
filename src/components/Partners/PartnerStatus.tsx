import { PartnerStatusType } from "@/types/partners"
import { CheckCheck, Loader, LoaderCircle, X } from "lucide-react"
import { FC } from "react"

interface PartnerStatusProps {
	status: PartnerStatusType
}

export const PartnerStatus: FC<PartnerStatusProps> = ({ status }) => {
	const statusColor =
		status === PartnerStatusType.VALIDATED
			? "text-mountain-500 bg-mountain-100"
			: status === PartnerStatusType.PENDING
			? "bg-amethyst-100 text-amethyst-500"
			: "text-red-400 bg-red-100"
	return (
		<span
			className={`flex items-center gap-[0.375rem] text-[0.625rem] font-bold py-[0.375rem] px-3 rounded-full w-fit ${statusColor}`}>
			{status === PartnerStatusType.VALIDATED ? (
				<CheckCheck strokeWidth="3px" size={14} />
			) : status === PartnerStatusType.PENDING ? (
				<LoaderCircle strokeWidth="3px" size={14} />
			) : (
				<X strokeWidth="3px" size={14} />
			)}
			{status}
		</span>
	)
}
