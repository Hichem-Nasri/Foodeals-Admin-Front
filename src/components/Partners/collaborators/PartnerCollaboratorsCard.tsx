import { FC } from "react"
import { PartnerCompanyType, PartnerType } from "@/types/partners"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/Label"
import { Boxes, Building, CalendarClock, HandCoins, ListPlus, Mail, PhoneCall, Store, Users } from "lucide-react"
import { CustomButton } from "@/components/custom/CustomButton"
import Link from "next/link"
import { PartnerStatus } from "../PartnerStatus"
import { PartnerCollaborators } from "@/types/collaborators"

interface PartnerCollaboratesCardProps {
	partner?: PartnerCollaborators
}

export const PartnerCollaboratesCard: FC<PartnerCollaboratesCardProps> = ({ partner }) => {
	if (!partner) return

	const dataArray = [
		{
			label: partner.collaborators,
			icon: Store,
		},
		{
			label: partner.offer,
			icon: Boxes,
		},
		{
			label: partner.order,
			icon: HandCoins,
		},
	]
	return (
		<div className="flex flex-col gap-3 bg-white p-3 rounded-[20px]">
			<div className="flex justify-between gap-[0.375rem]">
				<div className="flex gap-[0.375rem]">
					<Avatar className="size-[2.875rem] shrink-0">
						<AvatarImage className="" src={partner.logo} />
						<AvatarFallback>{partner.companyName[0].toUpperCase()}</AvatarFallback>
					</Avatar>
					<div className="flex flex-col gap-1">
						<Label label={partner.companyName} className="text-sm font-normal text-lynch-950" />
						<Label label={partner.city} className="text-xs font-medium text-primary" />
						<div className="flex items-center gap-2 text-lynch-500">
							<CalendarClock size={18} />
							<Label label={partner.createdAt.toLocaleDateString()} className="text-xs font-medium text-lynch-500" />
						</div>
					</div>
				</div>
				<div className="flex items-center gap-[0.375rem]">
					<Link href={`tel:${partner.phone}`}>
						<CustomButton
							label=""
							IconLeft={PhoneCall}
							className="p-[0.625rem] shrink-0 h-fit [&>.icon]:m-0 rounded-full"
						/>
					</Link>
					<Link href={`mailto:${partner.email}`}>
						<CustomButton
							label=""
							IconLeft={Mail}
							className="p-[0.625rem] shrink-0 h-fit [&>.icon]:m-0 rounded-full bg-amethyst-500"
						/>
					</Link>
					<CustomButton
						label=""
						IconLeft={ListPlus}
						className="p-[0.625rem] shrink-0 h-fit [&>.icon]:m-0 rounded-full bg-lynch-300"
					/>
				</div>
			</div>
			<span className="h-[1px] w-full bg-lynch-100" />
			<div className="flex items-start gap-3">
				<div className="flex flex-wrap gap-[0.375rem]">
					{dataArray.map((data) => (
						<div
							key={data.label}
							className="flex gap-[0.375rem] bg-lynch-100 text-lynch-500 rounded-full py-[0.375rem] px-3">
							<data.icon size={18} key={data.label} />
							<Label label={data.label.toString()} className="text-lynch-500" />
						</div>
					))}
				</div>
				<PartnerStatus status={partner.status} />
			</div>
		</div>
	)
}
