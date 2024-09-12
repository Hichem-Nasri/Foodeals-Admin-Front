import { FC, useState } from "react"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { CustomButton } from "../custom/CustomButton"
import { Check, ListFilter, Mail, PhoneCall, X } from "lucide-react"
import { PartnerType } from "@/types/partners"
import { DatePicker } from "../DatePicker"
import { Label } from "../Label"
import { MultiSelect } from "../MultiSelect"
import { InputField } from "../custom/InputField"
import { UseFormReturn } from "react-hook-form"
import { Select } from "../custom/Select"

interface FilterTablePartnerProps {
	partners: PartnerType[]
	form: UseFormReturn<any>
}

export const FilterTablePartner: FC<FilterTablePartnerProps> = ({ partners, form }) => {
	const options = [
		{
			label: "Option 1",
			key: "option1",
			avatar: "https://api.dicebear.com/7.x/bottts/png?seed=MarjaneGourmet",
		},
		{
			label: "Option 2",
			key: "option2",
			avatar: "https://api.dicebear.com/7.x/bottts/png?seed=MarjaneHolding",
		},
	]
	const [selectedValues, setSelectedValues] = useState<string[]>([])
	const [selectedValue, setSelectedValue] = useState<string>("")
	return (
		<Dialog>
			<DialogTrigger className="flex items-center gap-3 rounded-[12px] border border-lynch-200 text-lynch-500 font-medium text-sm px-5 py-3 hover:text-black hover:bg-neutral-100">
				Filtrer par
				<ListFilter />
			</DialogTrigger>
			<DialogContent className="[&>.Icon]:hidden p-5 rounded-[14px] w-full max-w-[36.25rem] gap-[1.875rem]">
				<DialogTitle className="text-[1.375rem] font-normal text-lynch-400">Filtrer par</DialogTitle>
				<div className="flex flex-col gap-5">
					<div className="flex flex-col gap-3 w-full">
						<Label label="Date de création (Début et fin)" htmlFor="start" />
						<div className="flex items-center gap-3 w-full">
							<DatePicker id="start" />
							<DatePicker />
						</div>
					</div>
					<div className="flex gap-3 w-full">
						<div className="flex flex-col gap-3 w-full">
							<Label label="Raison sociale" htmlFor="raisonSociale" />
							<MultiSelect
								onSelect={setSelectedValues}
								options={options}
								id="raisonSociale"
								selectedValues={selectedValues}
								emptyAvatar="/avatar/emptyPartner.png"
							/>
						</div>
						<div className="flex  flex-col gap-3 w-full">
							<Label label="Collaborateurs" htmlFor="collaborateurs" />
							<MultiSelect
								onSelect={setSelectedValues}
								options={options}
								id="collaborateurs"
								selectedValues={selectedValues}
								emptyAvatar="/avatar/emptyUser.png"
							/>
						</div>
					</div>
					<div className="flex gap-3 w-full">
						<div className="flex flex-col gap-3 w-full">
							<Label label="Email" htmlFor="email" />
							<InputField name="email" onChange={() => {}} placeholder="Email" value={""} IconLeft={Mail} />
						</div>
						<div className="flex  flex-col gap-3 w-full">
							<Label label="Téléphone" htmlFor="Téléphone" />
							<InputField
								name="Téléphone"
								onChange={() => {}}
								placeholder="Téléphone"
								value={""}
								IconLeft={PhoneCall}
							/>
						</div>
					</div>
					<div className="flex gap-3 w-full">
						<div className="flex flex-col gap-3 w-full">
							<Label label="ville" htmlFor="city" />
							<Select
								placeholder="Sélectionner la ville"
								onChange={setSelectedValue}
								options={[
									{
										key: "option1",
										label: "Option 1",
									},
									{
										key: "option2",
										label: "Option 2",
									},
								]}
								value={selectedValue}
							/>
						</div>
						<div className="flex  flex-col gap-3 w-full">
							<Label label="Type de compte" htmlFor="accountType" />
							<Select
								placeholder="Sélectionner"
								onChange={setSelectedValue}
								options={[
									{
										key: "option1",
										label: "Option 1",
									},
									{
										key: "option2",
										label: "Option 2",
									},
								]}
								value={selectedValue}
							/>
						</div>
					</div>
				</div>
				<DialogDescription className="flex justify-end gap-[0.625rem]">
					<CustomButton
						variant="secondary"
						label="Annuler"
						onClick={() => {}}
						className="px-5 py-3 h-fit"
						IconRight={X}
						type="submit"
					/>
					<CustomButton
						label="Confirmer"
						onClick={() => {}}
						className="px-5 py-3 h-fit"
						IconRight={Check}
						type="submit"
					/>
				</DialogDescription>
			</DialogContent>
		</Dialog>
	)
}
