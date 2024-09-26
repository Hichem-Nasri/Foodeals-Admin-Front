"use client"
import { columnsPaymentsTable, PaymentFilterSchema, PaymentType } from "@/types/PaymentType"
import { FC, useState } from "react"
import { FilterPayment } from "./FilterPayment"
import { z } from "zod"
import { CardTotalValue } from "./CardTotalValue"
import { ArrowRight, CalendarClock, RotateCw } from "lucide-react"
import { ColumnVisibilityModal } from "../Partners/ColumnVisibilityModal"
import {
	ColumnFiltersState,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table"
import { DataTable } from "../DataTable"
import { CustomButton } from "../custom/CustomButton"
import { PaymentCardDetails } from "./PaymentCardDetails"

interface PaymentProps {
	payments: PaymentType[]
}

export const Payment: FC<PaymentProps> = ({ payments }) => {
	const [data, _setData] = useState(() => [...payments])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

	const onSubmit = (data: z.infer<typeof PaymentFilterSchema>) => {}
	const totalCommission = payments.reduce((acc, payment) => acc + payment.totalCommission, 0)
	const total = payments.reduce((acc, payment) => acc + payment.toPay, 0)

	const table = useReactTable({
		data,
		columns: columnsPaymentsTable,
		getCoreRowModel: getCoreRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(), //client side filtering
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	})

	return (
		<div className="flex flex-col gap-3 w-full">
			<div className="flex lg:flex-row flex-col items-center gap-3 w-full">
				<FilterPayment onSubmit={onSubmit} />
				<CardTotalValue Icon={CalendarClock} title="Echéance" value={total} className="text-red-500 bg-red-500" />
				<CardTotalValue Icon={CalendarClock} title="Total commission" value={totalCommission} />
			</div>
			<div className="lg:flex hidden items-center gap-3 justify-between bg-white p-3 rounded-[14px]">
				<ColumnVisibilityModal table={table} />
				<CustomButton
					label={payments.length.toString()}
					IconLeft={ArrowRight}
					disabled
					variant="outline"
					className="disabled:border-primary disabled:opacity-100 disabled:text-primary font-semibold text-lg py-3 px-5 h-fit"
				/>
			</div>
			<DataTable
				table={table}
				data={data}
				title="Tableau de validation des commission"
				transform={(data) => <PaymentCardDetails payment={data}  />}
			/>
			<div className="lg:hidden flex flex-col items-center gap-4 my-3">
				<CustomButton size="sm" label="Voir plus" className="text-sm font-semibold rounded-full border-lynch-400 text-lynch-400 py-[0.375rem] px-5" variant="outline" IconRight={RotateCw} />
			</div>
		</div>
	)
}
