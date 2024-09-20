import { FC } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { flexRender } from "@tanstack/react-table"
import { PartnerType } from "@/types/partners"
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { PartnerCard } from "./PartnerCard"

interface PartnerTableProps {
	table: import("@tanstack/table-core").Table<PartnerType>
	data: PartnerType[]
}

export const PartnerTable: FC<PartnerTableProps> = ({ table, data }) => {
	return (
		<>
			<div className="lg:hidden grid gap-[0.625rem]">
				{data.map((partner) => (
					<PartnerCard partner={partner} key={partner.id} />
				))}
			</div>
			<div className="lg:grid hidden gap-[0.625rem]">
				<h1 className="font-normal text-[1.375rem] text-lynch-400 mt-[0.625rem]">Listes des partenaires</h1>
				<div className="w-full overflow-auto">
					<Table className="rounded-[14px] bg-white py-2">
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<TableHead
											key={header.id}
											className={cn(
												"cursor-pointer",
												header.column.id === "createdAt"
													? "min-w-48"
													: header.column.id === "logo"
													? "min-w-28"
													: "min-w-40"
											)}
											onClick={header.column.getToggleSortingHandler()}>
											<div className="flex justify-between items-center w-full">
												{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
												{{
													asc: <ChevronUp />,
													desc: <ChevronDown />,
												}[header.column.getIsSorted() as string] ?? <ChevronsUpDown />}
											</div>
										</TableHead>
									))}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows.map((row) => (
								<TableRow key={row.id}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id} className="w-fit">
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</>
	)
}
