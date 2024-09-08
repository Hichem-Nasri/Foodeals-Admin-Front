"use client"
import { PartnerType } from "@/types/partners"
import { FC, useState } from "react"
import { FilterAndCreatePartners } from "./FilterAndCreatePartners"
import { PartnerTable } from "./PartnerTable"

interface PartnersProps {
	partners: PartnerType[]
}

export interface TableRowType {
	key: string
	label: string
}

const tableRowsData = [
	{ key: "createdAt", label: "Date de création" },
	{ key: "logo", label: "Logo" },
	{ key: "companyName", label: "Raison sociale" },
	{ key: "collaborators", label: "Collaborateurs" },
	{ key: "underAccount", label: "Sous compte" },
	{ key: "manager", label: "Responsable" },
	{ key: "status", label: "Statut" },
	{ key: "email", label: "Email" },
	{ key: "phone", label: "Téléphone" },
	{ key: "city", label: "Ville" },
	{ key: "solution", label: "Solution" },
	{ key: "companyType", label: "Type de société" },
]

export const Partners: FC<PartnersProps> = ({ partners }) => {
	const [tableRows] = useState<TableRowType[]>(tableRowsData)
	return (
		<div className="flex flex-col gap-[0.625rem] w-full">
			<FilterAndCreatePartners />
			<PartnerTable partners={partners} tableRows={tableRows} />
		</div>
	)
}
