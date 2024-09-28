import { FC } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { flexRender } from "@tanstack/react-table"
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface DataTableProps<T> {
	title: string
	table: import("@tanstack/table-core").Table<T>
	data: T[]
	transform: (data: T) => JSX.Element[] | JSX.Element
	hideColumns?: string[]
}

export const DataTable: FC<DataTableProps<any>> = ({ title, transform, table, data, hideColumns }) => {
	return (
		<>
			<div className="lg:hidden grid gap-[0.625rem]">{data.map((value) => transform(value))}</div>
			<div className="lg:grid hidden gap-[0.625rem]">
				<h1 className="font-normal text-[1.375rem] text-lynch-400 mt-[0.625rem]">{title}</h1>
				<div className="w-full overflow-auto">
					<Table className="rounded-[14px] bg-white py-2">
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) =>
										hideColumns?.includes(header.id) ? (
											<></>
										) : (
											<TableHead
												key={header.id}
												onClick={header.column.getToggleSortingHandler()}
												className={
													header.id === "id" ? "sticky right-0 shadow-md bg-white min-w-none rounded-tl-[18px]" : ""
												}>
												<div className="flex justify-between items-center w-full">
													{header.isPlaceholder
														? null
														: flexRender(header.column.columnDef.header, header.getContext())}
													{(header.id !== "id" &&
														{
															asc: <ChevronUp />,
															desc: <ChevronDown />,
														}[header.column.getIsSorted() as string]) ?? <ChevronsUpDown />}
												</div>
											</TableHead>
										)
									)}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows.map((row) => (
								<TableRow key={row.id}>
									{row.getVisibleCells().map((cell) =>
										hideColumns?.includes(cell.column.id) ? (
											<></>
										) : (
											<TableCell
												key={cell.id}
												className={cn(
													"w-fit",
													cell.column.id === "id" ? "sticky right-0 shadow-md bg-white min-w-none" : ""
												)}>
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</TableCell>
										)
									)}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</>
	)
}
