import { FC } from "react"
import { Archive, ArrowRight, HeartHandshake } from "lucide-react"
import { UseFormReturn } from "react-hook-form"
import { CustomButton } from "@/components/custom/CustomButton"
import { ColumnVisibilityModal } from "../Partners/ColumnVisibilityModal"
import { FormFilter } from "./FormFilter"
import { useRouter } from "next/navigation"
import { appRoutes } from "@/lib/routes"

interface FiltersAssociationProps {
	data: any[]
	form: UseFormReturn<any>
	table: import("@tanstack/table-core").Table<any>
}

export const FiltersAssociation: FC<FiltersAssociationProps> = ({ data, form, table }) => {
	const router = useRouter()
	return (
		<div className="flex justify-between w-full rounded-[18px] lg:bg-white">
			<div className="flex lg:hidden items-center justify-between w-full">
				<h2 className="font-medium text-[1.375rem] text-lynch-950">Liste des collaborateurs</h2>
				<FormFilter />
			</div>
			<div className="lg:flex hidden gap-3 p-2">
				<FormFilter />
				<ColumnVisibilityModal table={table} />
				<CustomButton
					size="sm"
					variant="outline"
					label="Archive"
					className="flex items-center gap-3 rounded-[12px] border border-lynch-200 text-lynch-500 font-medium text-sm px-5 py-3 hover:text-black hover:bg-neutral-100 h-fit"
					IconRight={Archive}
				/>
			</div>
			<div className="lg:flex hidden gap-3 p-2">
				<CustomButton
					size="sm"
					label="Ajouter une association"
					IconRight={HeartHandshake}
					onClick={() => router.push(appRoutes.newAssociation.replace(":id", "new"))}
				/>
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
