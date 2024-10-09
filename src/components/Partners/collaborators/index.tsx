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
import { ArrowLeft, Eye, RotateCw, Store } from "lucide-react"
import { CustomButton } from "@/components/custom/CustomButton"
import {
	columnsPartnerCollaboratorsTable,
	PartnerCollaborators,
	PartnerCollaboratorsFilerSchema,
} from "@/types/collaborators"
import { FilterAndCreatePartnerCollaborators } from "./FilterAndCreatePartnerCollaborators"
import { useRouter } from "next/navigation"
import { ActionType } from "@/components/custom/ActionsMenu"
import { appRoutes } from "@/lib/routes"
import { DataTable } from "@/components/DataTable"
import { PartnerCollaboratesCard } from "./PartnerCollaboratorsCard"

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
	const router = useRouter()
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

	const actionsList = (id: string) =>
		[
			{
				actions: () =>
					router.push(appRoutes.collaboratorDetails.replace(":CollaboratorID", id).replace(":PartnerId", partnerId)),
				icon: Eye,
				label: "Voir",
			},
		] as ActionType[]

	const table = useReactTable({
		data,
		columns: columnsPartnerCollaboratorsTable({ actionsList: actionsList }),
		getCoreRowModel: getCoreRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	})

	const partnerData = {
		name: "Marjane",
		avatar: "https://api.dicebear.com/7.x/bottts/png?seed=Ikea",
		city: "Fès",
	}

	return (
		<div className="flex flex-col gap-[0.625rem] w-full px-3 lg:mb-0 mb-4">
			<FilterAndCreatePartnerCollaborators table={table} form={form} collaborators={collaborators} />
			<DataTable
				title="Listes des collaborateurs"
				table={table}
				data={data}
				transform={(value) => <PartnerCollaboratesCard partner={value} key={value.id} />}
				partnerData={partnerData}
			/>
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
