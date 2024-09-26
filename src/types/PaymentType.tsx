import { PaymentStatus } from "@/components/payment/PaymentStatus"
import { PaymentValidation } from "@/components/payment/PaymentValidation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { createColumnHelper } from "@tanstack/react-table"
import { z } from "zod"

export enum PaymentStatusType {
	PAID = "PAID",
	PENDING = "PENDING",
	CANCELED = "CANCELED",
}

export interface PaymentType {
	ref: string
	date: Date
	type: string
	store: {
		id: string
		name: string
		logo: string
	}
	engagement: number
	totalSales: number
	totalCommission: number
	toPay: number
	receiver: number
	status: PaymentStatusType
}

export const PaymentFilterSchema = z.object({
	date: z.date().optional(),
	partner: z
		.object({
			id: z.string(),
			name: z.string(),
			avatar: z.string(),
		})
		.optional(),
})

export const defaultValuesPaymentFilter = {
	date: undefined,
	partner: undefined,
}

export enum PaymentMethod {
	CASH = "cash",
	CARD_BANK = "card_bank",
	TRANSFER = "transfer",
	CHECK = "check",
}

export const paymentSchemas = {
	[PaymentMethod.CASH]: z.object({
		date: z.string().min(1, "La date est obligatoire"),
		amount: z.number().min(1, "Le montant doit être supérieur à 0"),
	}),
	[PaymentMethod.CARD_BANK]: z.object({
		amount: z.number().min(1, "Le montant doit être supérieur à 0"),
	}),
	[PaymentMethod.TRANSFER]: z.object({
		amount: z.number().min(1, "Le montant doit être supérieur à 0"),
		document: z.string().min(1, "Le fichier est obligatoire"),
	}),
	[PaymentMethod.CHECK]: z.object({
		amount: z.number().min(1, "Le montant doit être supérieur à 0"),
		checkNumber: z.string().min(1, "Le numéro du chèque est obligatoire"),
		dateOfWrite: z.string().min(1, "La date d'émission du chèque est obligatoire"),
		dateOfGet: z.string().min(1, "La date de réception du chèque est obligatoire"),
		bankCompany: z.string().min(1, "La banque est obligatoire"),
		issuerName: z.string().min(1, "Le nom de l'émetteur est obligatoire"),
		document: z.string().min(1, "Le fichier est obligatoire"),
	}),
}

export const defaultValuesPayment = {
	date: "",
	amount: 0,
	document: "",
	checkNumber: "",
	dateOfWrite: "",
	dateOfGet: "",
	bankCompany: "",
	issuerName: "",
}

export interface FormData {
	paymentMethod: PaymentMethod
	date?: string
	amount?: number
	checkNumber?: string
	dateOfWrite?: string
	dateOfGet?: string
	bankCompany?: string
	issuerName?: string
	document?: string
	file?: string
}

const columnHelper = createColumnHelper<PaymentType>()

export const columnsPaymentsTable = [
	columnHelper.accessor("ref", {
		cell: (info) => info.getValue(),
		header: "Réf",
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor("date", {
		cell: (info) => info.getValue().toLocaleDateString(),
		header: "Mois",
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor("type", {
		cell: (info) => info.getValue(),
		header: "Type",
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor("store", {
		cell: (info) => (
			<div className="flex items-center gap-1">
				<Avatar>
					<AvatarImage src={info.getValue().logo} />
					<AvatarFallback>{info.getValue().name[0].toUpperCase()}</AvatarFallback>
				</Avatar>
				{info.getValue().name}
			</div>
		),
		header: "Magasin",
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor("engagement", {
		cell: (info) => info.getValue(),
		header: "Engagement",
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor("totalSales", {
		cell: (info) => info.getValue(),
		header: "Ventes totales",
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor("totalCommission", {
		cell: (info) => info.getValue(),
		header: "Commission totale",
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor("toPay", {
		cell: (info) => info.getValue(),
		header: "A payer",
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor("receiver", {
		cell: (info) => info.getValue(),
		header: "Reçu",
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor("status", {
		cell: (info) => <PaymentStatus status={info.getValue()} />,
		header: "Statut",
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor("ref", {
		cell: (info) => (
			<PaymentValidation
				id={info.getValue()}
				label="Confirmer"
				disabled={!(info.row.getValue("status") === PaymentStatusType.PENDING)}
			/>
		),
		header: "Validation",
		footer: (info) => info.column.id,
	}),
]

export const defaultDataPaymentsTable: PaymentType[] = [
	{
		ref: "1",
		date: new Date(),
		type: "Type",
		store: {
			id: "1",
			name: "Nom du magasin",
			logo: "https://api.dicebear.com/7.x/bottts/png?seed=Ikea",
		},
		engagement: 1000,
		totalSales: 1000,
		totalCommission: 1000,
		toPay: 1000,
		receiver: 1000,
		status: PaymentStatusType.PAID,
	},
	{
		ref: "2",
		date: new Date(),
		type: "Type",
		store: {
			id: "2",
			name: "Nom du magasin",
			logo: "https://api.dicebear.com/7.x/bottts/png?seed=Ikea",
		},
		engagement: 1000,
		totalSales: 1000,
		totalCommission: 1000,
		toPay: 1000,
		receiver: 1000,
		status: PaymentStatusType.PENDING,
	},
	{
		ref: "3",
		date: new Date(),
		type: "Type",
		store: {
			id: "3",
			name: "Nom du magasin",
			logo: "https://api.dicebear.com/7.x/bottts/png?seed=Ikea",
		},
		engagement: 1000,
		totalSales: 1000,
		totalCommission: 1000,
		toPay: 1000,
		receiver: 1000,
		status: PaymentStatusType.CANCELED,
	},
]
