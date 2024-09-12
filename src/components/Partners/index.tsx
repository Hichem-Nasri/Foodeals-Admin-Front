"use client"
import { columnsPartnersTable, PartnerSolutionType, PartnerType } from "@/types/partners"
import { FC, useReducer, useState } from "react"
import { FilterAndCreatePartners } from "./FilterAndCreatePartners"
import { PartnerTable } from "./PartnerTable"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
	ColumnFiltersState,
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table"

interface PartnersProps {
	partners: PartnerType[]
}

export interface TableRowType {
	key: string
	label: string
}

const tableColumData = [
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
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const schema = z.object({
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
		collaborators: z
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
	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		mode: "onBlur",
		defaultValues: {
			startDate: undefined,
			endDate: undefined,
			company: [],
			collaborators: [],
			email: "",
			phone: "",
			city: "",
			companyType: "",
			solution: [],
		},
	})

	const [data, _setData] = useState(() => [...partners])

	const table = useReactTable({
		data,
		columns: columnsPartnersTable,
		getCoreRowModel: getCoreRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(), //client side filtering
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	})

	return (
		<div className="flex flex-col gap-[0.625rem] w-full">
			<FilterAndCreatePartners table={table} form={form} partners={partners} />
			<PartnerTable table={table} />
		</div>
	)
}
