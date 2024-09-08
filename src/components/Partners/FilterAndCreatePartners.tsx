import { FC } from "react"
import { CustomButton } from "../custom/CustomButton"
import { ArrowLeft, ArrowRight, Columns2, ListFilter, Store } from "lucide-react"

interface FilterAndCreatePartnersProps {}

export const FilterAndCreatePartners: FC<FilterAndCreatePartnersProps> = ({}) => {
	return (
		<div className="flex justify-between w-full rounded-[18px] bg-white">
			<div className="flex gap-3 p-2">
				<CustomButton
					size="sm"
					className="text-lynch-500"
					variant="outline"
					label="Filtrer par"
					IconRight={ListFilter}
				/>
				<CustomButton size="sm" className="text-lynch-500" variant="outline" label="Afficher" IconRight={Columns2} />
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
