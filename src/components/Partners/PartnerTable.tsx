import { useState, FC } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TableRowType } from "."
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PartnerCompanyType, PartnerType } from "@/types/partners"
import { ChevronDown, ChevronsUpDown, ChevronUp, Mail, PhoneCall } from "lucide-react"
import { PartnerStatus } from "./PartnerStatus"
import { PartnerSolution } from "./PartnerSolution"
import { ScrollArea } from "@/components/ui/scroll-area"

interface PartnerTableProps {
	partners: PartnerType[]
	tableRows: TableRowType[]
}

type SortDirection = "ascending" | "descending"

interface SortState {
	column: string
	direction: SortDirection
}

export const PartnerTable: FC<PartnerTableProps> = ({ partners, tableRows }) => {
	const [sortState, setSortState] = useState<SortState>({ column: "createdAt", direction: "ascending" })

	const handleSort = (column: string) => {
		setSortState((prevSortState) => {
			const newDirection: SortDirection =
				prevSortState.column === column && prevSortState.direction === "ascending" ? "descending" : "ascending"
			return { column, direction: newDirection }
		})
	}

	const sortedPartners = [...partners].sort((a, b) => {
		const aValue = a[sortState.column as keyof PartnerType]
		const bValue = b[sortState.column as keyof PartnerType]

		if (aValue < bValue) return sortState.direction === "ascending" ? -1 : 1
		if (aValue > bValue) return sortState.direction === "ascending" ? 1 : -1
		return 0
	})

	return (
		<div className="grid gap-[0.625rem]">
			<h1 className="font-normal text-[1.375rem] text-lynch-400 mt-[0.625rem]">Listes des partenaires</h1>
			<ScrollArea className="w-full overflow-auto">
				<Table className="rounded-[14px] bg-white min-w-[800px]">
					<TableHeader>
						<TableRow className="">
							{tableRows.map((row) => (
								<TableHead
									aria-sort={sortState.column === row.key ? sortState.direction : "none"}
									key={row.key}
									onClick={() => handleSort(row.key)}
									className="cursor-pointer">
									<div className="flex items-center gap-[2px] justify-between">
										{row.label}
										{sortState.column === row.key ? (
											sortState.direction === "ascending" ? (
												<ChevronUp size={18} />
											) : (
												<ChevronDown size={18} />
											)
										) : (
											<ChevronsUpDown size={18} />
										)}
									</div>
								</TableHead>
							))}
						</TableRow>
					</TableHeader>
					<TableBody>
						{sortedPartners.map((partner) => (
							<TableRow key={partner.id} className="">
								<TableCell className="">{partner.createdAt.toDateString()}</TableCell>
								<TableCell>
									<Avatar>
										<AvatarImage src={partner.logo} />
										<AvatarFallback>{partner.companyName[0].toUpperCase()}</AvatarFallback>
									</Avatar>
								</TableCell>
								<TableCell>{partner.companyName}</TableCell>
								<TableCell>{partner.collaborators}</TableCell>
								<TableCell>{partner.underAccount}</TableCell>
								<TableCell>
									<div className="flex items-center gap-1">
										<Avatar>
											<AvatarImage src={partner.logo} />
											<AvatarFallback>{partner.manager.name[0].toUpperCase()}</AvatarFallback>
										</Avatar>
										{partner.manager.name}
									</div>
								</TableCell>
								<TableCell>
									<PartnerStatus status={partner.status} />{" "}
								</TableCell>
								<TableCell>
									<span className="flex items-center gap-1 text-sm font-medium text-lynch-400 py-[0.625rem] px-3 rounded-full border border-lynch-400 hover:border-amethyst-500 hover:text-amethyst-500">
										<Mail size={18} />
										{partner.email}
									</span>
								</TableCell>
								<TableCell>
									<span className="flex items-center gap-1 text-sm font-medium text-lynch-400 py-[0.625rem] px-3 rounded-full border border-lynch-400 hover:border-amethyst-500 hover:text-amethyst-500">
										<PhoneCall size={18} />
										{partner.phone}
									</span>
								</TableCell>
								<TableCell>{partner.city}</TableCell>
								<TableCell>
									<div className="flex flex-wrap items-center gap-1">
										{partner.solution.map((solution) => (
											<PartnerSolution solution={solution} key={solution} />
										))}
									</div>
								</TableCell>
								<TableCell>
									{partner.companyType === PartnerCompanyType.PRINCIPAL ? "Principal" : "Sous compte"}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</ScrollArea>
		</div>
	)
}
