import { createColumnHelper } from "@tanstack/react-table"
import { PartnerSolutionType } from "./partners"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PhoneBadge } from "@/components/Partners/PhoneBadge"
import { EmailBadge } from "@/components/Partners/EmailBadge"
import { PartnerSolution } from "@/components/Partners/PartnerSolution"
import { ActionsMenu } from "@/components/custom/ActionsMenu"
import { appRoutes } from "@/lib/routes"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { Eye, Users } from "lucide-react"

export interface DeliveryType {
	id: string
	createdAt: Date
	partner: {
		name: string
		avatar: string
	}
	responsible: {
		name: string
		avatar: string
	}
	numberOfDeliveries: number
	commands: number
	city: string
	phone: string
	email: string
	solution: PartnerSolutionType[]
}

const columnDeliveriesTableHelper = createColumnHelper<DeliveryType>()

export const columnsDeliveriesTable = (router: AppRouterInstance) => [
	columnDeliveriesTableHelper.accessor("createdAt", {
		cell: (info) => info.getValue().toLocaleDateString(),
		header: "Date de création",
		footer: (info) => info.column.id,
	}),
	columnDeliveriesTableHelper.accessor("partner", {
		cell: (info) => (
			<div className="flex items-center gap-1">
				<Avatar>
					<AvatarImage src={info.getValue().avatar} />
					<AvatarFallback>{info.getValue().name[0].toUpperCase()}</AvatarFallback>
				</Avatar>
				{info.getValue().name}
			</div>
		),
    header: "Partenaire",
    footer: (info) => info.column.id,
	}),
	columnDeliveriesTableHelper.accessor("responsible", {
		cell: (info) => (
			<div className="flex items-center gap-1">
				<Avatar>
					<AvatarImage src={info.getValue().avatar} />
					<AvatarFallback>{info.getValue().name[0].toUpperCase()}</AvatarFallback>
				</Avatar>
				{info.getValue().name}
			</div>
		),
    header: "Responsable",
    footer: (info) => info.column.id,
	}),
	columnDeliveriesTableHelper.accessor("numberOfDeliveries", {
		cell: (info) => info.getValue(),
		header: "Nombre de livraisons",
		footer: (info) => info.column.id,
	}),
	columnDeliveriesTableHelper.accessor("commands", {
		cell: (info) => info.getValue(),
		header: "Nombre de commandes",
		footer: (info) => info.column.id,
	}),
	columnDeliveriesTableHelper.accessor("city", {
		cell: (info) => info.getValue(),
		header: "Ville",
		footer: (info) => info.column.id,
	}),
	columnDeliveriesTableHelper.accessor("phone", {
		cell: (info) => <PhoneBadge phone={info.getValue()} />,
		header: "Téléphone",
		footer: (info) => info.column.id,
	}),
	columnDeliveriesTableHelper.accessor("email", {
		cell: (info) => <EmailBadge email={info.getValue()} />,
		header: "Email",
		footer: (info) => info.column.id,
	}),
	columnDeliveriesTableHelper.accessor("solution", {
		cell: (info) => (
			<div className="flex items-center gap-1">
				{info.getValue().map((solution) => (
					<PartnerSolution solution={solution} key={solution} />
				))}
			</div>
		),
		header: "Solutions",
		footer: (info) => info.column.id,
	}),
  columnDeliveriesTableHelper.accessor("id", {
		cell: (info) => (
			<ActionsMenu
				id={info.getValue()}
				menuList={[
					{
						actions: () => router.push(appRoutes.newDelivery.replace(":id", info.getValue()!)),
						icon: Eye,
						label: "Voir",
					},
					{
						actions: (id) => router.push(appRoutes.collaborator.replace(":id", id)),
						icon: Users,
						label: "Collaborateurs",
					},
				]}
			/>
		),
		header: "Activité",
    footer: (info) => info.column.id,
	}),
]

export const deliveriesData: DeliveryType[] = [
	{
		id: "1",
		city: "Paris",
		commands: 5,
		createdAt: new Date(),
		email: "email@test.com",
		numberOfDeliveries: 10,
		partner: {
			avatar: "https://via.placeholder.com/150",
			name: "Test Partner",
		},
		phone: "0123456789",
		responsible: {
			avatar: "https://via.placeholder.com/150",
			name: "Test User",
		},
		solution: [PartnerSolutionType.DLC_PRO, PartnerSolutionType.DONATE_PRO],
	},
	{
		id: "2",
		city: "Paris",
		commands: 5,
		createdAt: new Date(),
		email: "email@test.com",
		numberOfDeliveries: 10,
		partner: {
			avatar: "https://via.placeholder.com/150",
			name: "Test Partner",
		},
		phone: "0123456789",
		responsible: {
			avatar: "https://via.placeholder.com/150",
			name: "Test User",
		},
		solution: [PartnerSolutionType.DLC_PRO, PartnerSolutionType.DONATE_PRO, PartnerSolutionType.MARKET_PRO],
	},
]
