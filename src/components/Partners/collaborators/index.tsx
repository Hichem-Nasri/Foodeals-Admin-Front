"use client"
import { FC, useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
	ColumnFiltersState,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table"
import { ArrowLeft, RotateCw, Store } from "lucide-react"
import { CustomButton } from "@/components/custom/CustomButton"
import {
	columnsPartnerCollaboratorsTable,
	PartnerCollaborators,
	PartnerCollaboratorsFilerSchema,
} from "@/types/collaborators"
import { FilterAndCreatePartnerCollaborators } from "./FilterAndCreatePartnerCollaborators"
import { PartnerCollaboratorsTable } from "./PartnerCollaboratorsTable"

interface CollaboratorsProps {
	collaborators: PartnerCollaborators[]
	partnerId: string
}

export interface TableRowType {
	key: string
	label: string
}

export const Collaborators: FC<CollaboratorsProps> = ({ collaborators, partnerId }) => {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const form = useForm<z.infer<typeof PartnerCollaboratorsFilerSchema>>({
		resolver: zodResolver(PartnerCollaboratorsFilerSchema),
		mode: "onBlur",
		defaultValues: {
			startDate: undefined,
			endDate: undefined,
			company: [],
			email: "",
			phone: "",
			city: "",
			companyType: "",
			solution: [],
		},
	})

	const [data, _setData] = useState(() => [...collaborators])

	const table = useReactTable({
		data,
		columns: columnsPartnerCollaboratorsTable,
		getCoreRowModel: getCoreRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(), //client side filtering
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	})

	return (
		<div className="flex flex-col gap-[0.625rem] w-full px-3 lg:mb-0 mb-4">
			<FilterAndCreatePartnerCollaborators table={table} form={form} collaborators={collaborators} />
			<PartnerCollaboratorsTable table={table} data={data} partnerId={partnerId} />
			<div className="lg:hidden flex flex-col items-center gap-4 ">
				<CustomButton
					size="sm"
					label="Voir plus"
					className="text-sm font-semibold rounded-full border-lynch-400 text-lynch-400 py-[0.375rem] px-5"
					variant="outline"
					IconRight={RotateCw}
				/>
				<CustomButton label="Retour" className="w-full" IconLeft={ArrowLeft} />
			</div>
		</div>
	)
}
