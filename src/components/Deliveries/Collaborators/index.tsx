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
import { ArrowLeft, RotateCw } from "lucide-react"
import { CustomButton } from "@/components/custom/CustomButton"
import { PartnerCollaboratorsFilerSchema } from "@/types/collaborators"
import { useRouter } from "next/navigation"
import { DataTable } from "@/components/DataTable"
import { FilterDeliveryCollaborators } from "./FilterDeliveryCollaborators"
import { columnsDeliveryCollaboratorsTable, DeliveryCollaboratorsType } from "@/types/deliveries"
import { DeliveryCollaboratorCard } from "./DeliveryCollaboratorCard"

interface DeliveryCollaboratorsProps {
	deliveryCollaborators: DeliveryCollaboratorsType[]
	deliveryId: string
}

export interface TableRowType {
	key: string
	label: string
}

export const DeliveryCollaborators: FC<DeliveryCollaboratorsProps> = ({ deliveryCollaborators, deliveryId }) => {
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

	const [data, _setData] = useState(() => [...deliveryCollaborators])

	const table = useReactTable({
		data,
		columns: columnsDeliveryCollaboratorsTable(router),
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
			<FilterDeliveryCollaborators table={table} form={form} collaborators={deliveryCollaborators} />
			<DataTable
				title="Listes des collaborateurs"
				table={table}
				data={data}
				transform={(value) => <DeliveryCollaboratorCard collaborator={value} />}
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
