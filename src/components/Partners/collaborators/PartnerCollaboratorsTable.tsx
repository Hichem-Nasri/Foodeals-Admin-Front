import { FC } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { flexRender } from "@tanstack/react-table"
import { ArrowLeft, ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { PartnerCollaborators } from "@/types/collaborators"
import { PartnerCollaboratesCard } from "./PartnerCollaboratorsCard"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/Label"
import { useRouter } from "next/navigation"
import { CustomButton } from "@/components/custom/CustomButton"
import { AppRoutes } from "@/lib/routes"

interface PartnerCollaboratorsTableProps {
	table: import("@tanstack/table-core").Table<PartnerCollaborators>
	data: PartnerCollaborators[]
	partnerId: string
}

export const PartnerCollaboratorsTable: FC<PartnerCollaboratorsTableProps> = ({ table, data, partnerId }) => {
	const router = useRouter()
	return (
		<>
			<div className="lg:hidden grid gap-[0.625rem]">
				{data.map((partner) => (
					<PartnerCollaboratesCard partner={partner} key={partner.id} />
				))}
			</div>
			<div className="lg:grid hidden gap-[0.625rem]">
				<div className="flex items-center justify-between">
					<h1 className="font-normal text-[1.375rem] text-lynch-400 mt-[0.625rem]">Listes des collaborateurs</h1>
					<div className="flex items-center gap-3">
						<Avatar>
							<AvatarImage src={"https://api.dicebear.com/7.x/bottts/png?seed=Ikea"} />
							<AvatarFallback>{"Marjane"}</AvatarFallback>
						</Avatar>
						<div className="flex flex-col gap-1">
							<Label label="Marjane" className="text-base font-normal" />
							<Label label="Fès" className="text-primary text-xs font-semibold" />
						</div>
						<CustomButton
							className="h-fit py-4 text-lynch-500 ml-1"
							label="Retour"
							IconLeft={ArrowLeft}
							variant="outline"
							onClick={() => router.back()}
						/>
					</div>
				</div>
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
								<TableRow
									key={row.id}
									onClick={() =>
										router.push(
											AppRoutes.collaboratorDetails
												.replace(":PartnerId", partnerId)
												.replace(":CollaboratorID", row.original.id)
										)
									}>
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
