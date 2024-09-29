"use client"
import { CustomButton } from "@/components/custom/CustomButton"
import { FilterPayment } from "../FilterPayment"
import { CardTotalValue } from "../CardTotalValue"
import { CheckCheck, LoaderCircle, RotateCw } from "lucide-react"
import { DataTable } from "@/components/DataTable"
import {
	columnsPaymentsDetailsTable,
	columnsValidationTable,
	defaultDataPaymentsDetailsTable,
	defaultDataValidationTable,
} from "@/types/PaymentType"
import {
	ColumnFiltersState,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table"
import { useState } from "react"
import { OperationCard } from "./OperationCard"

interface OperationsProps {}

export const Operations = ({}: OperationsProps) => {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const onSubmit = () => {}
	const totalPending = 12222
	const totalSales = 51554516

	const tableOperations = useReactTable({
		data: defaultDataPaymentsDetailsTable,
		columns: columnsPaymentsDetailsTable,
		getCoreRowModel: getCoreRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	})

	const tableSubscription = useReactTable({
		data: defaultDataValidationTable,
		columns: columnsValidationTable,
		getCoreRowModel: getCoreRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	})

	const PaymentData = {
		name: "Marjane",
		avatar: "https://api.dicebear.com/7.x/bottts/png?seed=Ikea",
		city: "Casablanca",
	}

	return (
		<div className="flex flex-col gap-3 w-full">
			<div className="flex lg:flex-row flex-col items-center gap-3 w-full">
				<FilterPayment onSubmit={onSubmit} />
				<CardTotalValue
					Icon={LoaderCircle}
					title="En cours"
					value={totalPending}
					className="text-amethyst-500 bg-amethyst-500"
				/>
				<CardTotalValue Icon={CheckCheck} title="Total commission" value={totalSales} />
			</div>
			<DataTable
				table={tableOperations}
				data={defaultDataPaymentsDetailsTable}
				title="Opérations du mois"
				transform={(data) => <OperationCard operation={data} />}
				partnerData={PaymentData}
			/>
			<DataTable
				table={tableSubscription}
				data={defaultDataValidationTable}
				title="Tableau de validation des abonnement"
				transform={(data) => <OperationCard operation={data} />}
			/>
			<div className="lg:hidden flex flex-col items-center gap-4 my-3">
				<CustomButton
					size="sm"
					label="Voir plus"
					className="text-sm font-semibold rounded-full border-lynch-400 text-lynch-400 py-[0.375rem] px-5"
					variant="outline"
					IconRight={RotateCw}
				/>
			</div>
		</div>
	)
}
