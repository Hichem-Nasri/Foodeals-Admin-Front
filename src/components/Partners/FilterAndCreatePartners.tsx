import { FC } from "react"
import { CustomButton } from "../custom/CustomButton"
import { ArrowRight, Store } from "lucide-react"
import { FilterTablePartner } from "./FilterTablePartner"
import { PartnerType } from "@/types/partners"
import { UseFormReturn } from "react-hook-form"
import { ColumnVisibilityModal } from "./ColumnVisibilityModal"

interface FilterAndCreatePartnersProps {
	partners: PartnerType[]
	form: UseFormReturn<any>
	table: import("@tanstack/table-core").Table<PartnerType>
}

export const FilterAndCreatePartners: FC<FilterAndCreatePartnersProps> = ({
	partners,
	form,
	table,
}) => {
	return (
		<div className="flex justify-between w-full rounded-[18px] bg-white">
			<div className="flex gap-3 p-2">
				<FilterTablePartner partners={partners} form={form} />
				<ColumnVisibilityModal table={table} />
			</div>
			<div className="flex gap-3 p-2">
				<CustomButton size="sm" label="Ajouter un partenaire" IconRight={Store} />
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
