import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { createColumnHelper } from "@tanstack/react-table"
import { PartnerSolutionType, PartnerStatusType } from "./partners"
import { PartnerStatus } from "@/components/Partners/PartnerStatus"
import { EmailBadge } from "@/components/Partners/EmailBadge"
import { PhoneBadge } from "@/components/Partners/PhoneBadge"
import { PartnerSolution } from "@/components/Partners/PartnerSolution"
import { z } from "zod"
import { ActionsMenu, ActionType } from "@/components/custom/ActionsMenu"

export interface PartnerCollaborators {
	id: string
	createdAt: Date
	logo: string
	companyName: string
	collaborators: number
	ref: string
	manager: {
		name: string
		avatar: string
	}
	status: PartnerStatusType
	email: string
	phone: string
	city: string
	solution: PartnerSolutionType[]
	offer: number
	order: number
}

export interface ScheduleDayType {
	morning: string
	afternoon: string
}
export interface ScheduleWeekType {
	monday: ScheduleDayType
	tuesday: ScheduleDayType
	wednesday: ScheduleDayType
	thursday: ScheduleDayType
	friday: ScheduleDayType
	saturday: ScheduleDayType
	sunday: ScheduleDayType
}

export interface CollaboratorDataType {
	id: string
	avatar: string
	civility: string
	firstName: string
	lastName: string
	origin: string
	idNumber: string
	role: string
	phone: string
	mail: string
	Assignment: {
		partner: {
			id: string
			name: string
			logo: string
		}
		subAccount: {
			id: string
			name: string
			logo: string
		}
		department: string
		manager: {
			id: string
			name: string
			avatar: string
		}
		city: string
		region: string
		solution: PartnerSolutionType[]
		phone: string
		mail: string
	}
	schedule: ScheduleWeekType
}

export const collaboratorData: CollaboratorDataType = {
	id: "1",
	avatar: "https://via.placeholder.com/150",
	civility: "M.",
	firstName: "John",
	lastName: "Doe",
	origin: "France",
	idNumber: "123456",
	role: "CEO",
	phone: "0123456789",
	mail: "email@ceo.ma",
	Assignment: {
		partner: {
			id: "1",
			name: "Marjane",
			logo: "https://via.placeholder.com/150",
		},
		subAccount: {
			id: "1",
			name: "Marjane G SC-023",
			logo: "https://via.placeholder.com/150",
		},
		department: "Laiterie",
		manager: {
			id: "1",
			name: "Amine SABIR",
			avatar: "https://via.placeholder.com/150",
		},
		city: "Casablanca",
		region: "Californie",
		solution: [PartnerSolutionType.DONATE_PRO, PartnerSolutionType.MARKET_PRO],
		phone: "0123456789",
		mail: "email@ceo.ma",
	},
	schedule: {
		monday: {
			morning: "09h-15h",
			afternoon: "16h-22h",
		},
		tuesday: {
			morning: "09h-15h",
			afternoon: "",
		},
		wednesday: {
			morning: "09h-15h",
			afternoon: "16h-22h",
		},
		thursday: {
			morning: "09h-15h",
			afternoon: "",
		},
		friday: {
			morning: "",
			afternoon: "",
		},
		saturday: {
			morning: "09h-15h",
			afternoon: "16h-22h",
		},
		sunday: {
			morning: "",
			afternoon: "16h-22h",
		},
	},
}

export const PartnerCollaboratorsFilerSchema = z.object({
	startDate: z.date().optional(),
	endDate: z.date().optional(),
	company: z
		.array(
			z.object({
				label: z.string().optional(),
				key: z.string().optional(),
				avatar: z.string().optional(),
			})
		)
		.optional(),
	email: z.string().optional(),
	phone: z.string().optional(),
	city: z.string().optional(),
	companyType: z.string().optional(),
	solution: z.array(z.enum(["MARKET_PRO", "DLC_PRO", "DONATE_PRO"])).optional(),
})

const columnHelper = createColumnHelper<PartnerCollaborators>()

interface ColumnsPartnerCollaboratorsTableProps {
	actionsList: (id: string) => ActionType[]
}

export const columnsPartnerCollaboratorsTable = ({ actionsList }: ColumnsPartnerCollaboratorsTableProps) => [
	columnHelper.accessor("createdAt", {
		cell: (info) => info.getValue<Date>().toLocaleDateString(),
		header: "Date de création",
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor("logo", {
		cell: (info) => (
			<Avatar>
				<AvatarImage src={info.getValue()} />
				<AvatarFallback>{info.getValue()[0].toUpperCase()}</AvatarFallback>
			</Avatar>
		),
		header: "Logo",
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor("companyName", {
		cell: (info) => info.getValue(),
		header: "Raison sociale",
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor("ref", {
		cell: (info) => info.getValue(),
		header: "Référence",
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor("offer", {
		cell: (info) => info.getValue(),
		header: "Raison sociale",
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor("manager", {
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
	columnHelper.accessor("status", {
		cell: (info) => <PartnerStatus status={info.getValue()} />,
		header: "Statut",
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor("email", {
		cell: (info) => <EmailBadge email={info.getValue()} />,
		header: "Email",
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor("phone", {
		cell: (info) => <PhoneBadge phone={info.getValue()} />,
		header: "Téléphone",
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor("city", {
		cell: (info) => info.getValue(),
		header: "Ville",
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor("solution", {
		cell: (info) => (
			<div className="flex items-center gap-1">
				{info.getValue().map((solution) => (
					<PartnerSolution solution={solution} key={solution} />
				))}
			</div>
		),
		header: "Solution",
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor("id", {
		cell: (info) => <ActionsMenu id={info.getValue()} menuList={actionsList(info.getValue()!)} />,
		header: "Activité",
		footer: (info) => info.column.id,
	}),
]

export const PartnerCollaboratorsData: PartnerCollaborators[] = [
	{
		id: "1",
		createdAt: new Date("2024-05-02"),
		logo: "https://api.dicebear.com/7.x/bottts/png?seed=MarjaneGourmet",
		companyName: "Marjane Gourmet",
		collaborators: 102,
		manager: {
			name: "Amine SABIR",
			avatar: "https://api.dicebear.com/7.x/bottts/png?seed=AmineSABIR",
		},
		status: PartnerStatusType.VALIDATED,
		email: "a.sabir@marjanegourmet.ma",
		phone: "+212 0663 65 36 98",
		city: "Casablanca",
		solution: [PartnerSolutionType.MARKET_PRO, PartnerSolutionType.DONATE_PRO],
		offer: 25,
		order: 233,
		ref: "REF-123456",
	},
	{
		id: "2",
		createdAt: new Date("2022-05-15"),
		logo: "https://api.dicebear.com/7.x/bottts/png?seed=MarjaneHolding",
		companyName: "Marjane Holding",
		collaborators: 50,
		manager: {
			name: "Michael Jone",
			avatar: "https://api.dicebear.com/7.x/bottts/png?seed=MichaelJone",
		},
		status: PartnerStatusType.PENDING,
		email: "m.jone@marjane.ma",
		phone: "+212 0663 65 36 98",
		city: "Rabat",
		solution: [PartnerSolutionType.MARKET_PRO, PartnerSolutionType.DLC_PRO, PartnerSolutionType.DONATE_PRO],
		offer: 25,
		order: 233,
		ref: "REF-123456",
	},
	{
		id: "3",
		createdAt: new Date("2022-05-15"),
		logo: "https://api.dicebear.com/7.x/bottts/png?seed=MarjaneMarket",
		companyName: "Marjane Market",
		collaborators: 26,
		manager: {
			name: "Jamila SARGHINI",
			avatar: "https://api.dicebear.com/7.x/bottts/png?seed=JamilaSARGHINI",
		},
		status: PartnerStatusType.PENDING,
		email: "j.sarghini@marjanemarket.ma",
		phone: "+212 0663 65 36 98",
		city: "Casablanca",
		solution: [PartnerSolutionType.MARKET_PRO, PartnerSolutionType.DLC_PRO],
		offer: 25,
		order: 233,
		ref: "REF-123456",
	},
	{
		id: "4",
		createdAt: new Date("2022-05-15"),
		logo: "https://api.dicebear.com/7.x/bottts/png?seed=BIM",
		companyName: "BIM",
		collaborators: 220,
		ref: "REF-123456",
		manager: {
			name: "Wade Warren",
			avatar: "https://api.dicebear.com/7.x/bottts/png?seed=WadeWarren",
		},
		status: PartnerStatusType.ANNULLED,
		email: "j.sarghini@marjanemarket.ma",
		phone: "+212 0663 65 36 98",
		city: "Fes",
		solution: [PartnerSolutionType.MARKET_PRO],
		offer: 25,
		order: 233,
	},
	{
		id: "5",
		createdAt: new Date("2022-05-15"),
		logo: "https://api.dicebear.com/7.x/bottts/png?seed=Chari",
		companyName: "Chari",
		collaborators: 66,
		ref: "REF-123456",
		manager: {
			name: "Esther Howard",
			avatar: "https://api.dicebear.com/7.x/bottts/png?seed=EstherHoward",
		},
		status: PartnerStatusType.VALIDATED,
		email: "j.sarghini@marjanemarket.ma",
		phone: "+212 0663 65 36 98",
		city: "Casablanca",
		solution: [PartnerSolutionType.DLC_PRO],
		offer: 25,
		order: 233,
	},
	{
		id: "6",
		createdAt: new Date("2022-05-15"),
		logo: "https://api.dicebear.com/7.x/bottts/png?seed=Paul",
		companyName: "Paul",
		collaborators: 56,
		ref: "REF-123456",
		manager: {
			name: "Arlene McCoy",
			avatar: "https://api.dicebear.com/7.x/bottts/png?seed=ArleneMcCoy",
		},
		status: PartnerStatusType.PENDING,
		email: "j.sarghini@marjanemarket.ma",
		phone: "+212 0663 65 36 98",
		city: "Agadir",
		solution: [PartnerSolutionType.DLC_PRO],
		offer: 25,
		order: 233,
	},
	{
		id: "7",
		createdAt: new Date("2022-05-15"),
		logo: "https://api.dicebear.com/7.x/bottts/png?seed=LabelVie",
		companyName: "Label vie",
		collaborators: 23,
		ref: "REF-123456",
		manager: {
			name: "Bessie Cooper",
			avatar: "https://api.dicebear.com/7.x/bottts/png?seed=BessieCooper",
		},
		status: PartnerStatusType.VALIDATED,
		email: "j.sarghini@marjanemarket.ma",
		phone: "+212 0663 65 36 98",
		city: "Casablanca",
		solution: [PartnerSolutionType.MARKET_PRO, PartnerSolutionType.DLC_PRO],
		offer: 25,
		order: 233,
	},
	{
		id: "8",
		createdAt: new Date("2022-05-15"),
		logo: "https://api.dicebear.com/7.x/bottts/png?seed=Ikea",
		companyName: "Ikea",
		collaborators: 50,
		ref: "REF-123456",
		manager: {
			name: "Robert Fox",
			avatar: "https://api.dicebear.com/7.x/bottts/png?seed=RobertFox",
		},
		status: PartnerStatusType.ANNULLED,
		email: "j.sarghini@marjanemarket.ma",
		phone: "+212 0663 65 36 98",
		city: "Casablanca",
		solution: [PartnerSolutionType.MARKET_PRO, PartnerSolutionType.DLC_PRO],
		offer: 25,
		order: 233,
	},
]
