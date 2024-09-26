import { FC } from "react"
import { ArrowRight } from "lucide-react"
import { UseFormReturn } from "react-hook-form"
import { ColumnVisibilityModal } from "../ColumnVisibilityModal"
import { FilterTablePartnerCollaborators } from "./FilterTablePartnerCollaborators"
import { CustomButton } from "@/components/custom/CustomButton"
import { PartnerCollaborators } from "@/types/collaborators"

interface FilterAndCreatePartnerCollaboratorsProps {
	collaborators: PartnerCollaborators[]
	form: UseFormReturn<any>
	table: import("@tanstack/table-core").Table<PartnerCollaborators>
}

export const FilterAndCreatePartnerCollaborators: FC<FilterAndCreatePartnerCollaboratorsProps> = ({
	collaborators,
	form,
	table,
}) => {
	return (
		<div className="flex justify-between w-full rounded-[18px] lg:bg-white">
			<div className="flex lg:hidden items-center justify-between w-full">
				<h2 className="font-medium text-[1.375rem] text-lynch-950">Liste des collaborateurs</h2>
				<FilterTablePartnerCollaborators partners={collaborators} form={form} />
			</div>
			<div className="lg:flex hidden gap-3 p-2">
				<FilterTablePartnerCollaborators partners={collaborators} form={form} />
				<ColumnVisibilityModal table={table} />
			</div>
			<div className="lg:flex hidden gap-3 p-2">
				<CustomButton
					size="sm"
					className="bg-white text-primary border-[1.5px] border-primary hover:bg-primary/40"
					label={"1666"}
					IconLeft={ArrowRight}
				/>
			</div>
		</div>
	)
}
