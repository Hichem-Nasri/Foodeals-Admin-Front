import { FC, Fragment } from "react"

import { Label } from "@/components/Label"
import { Checkbox } from "@/components/ui/checkbox"
import { PartnerCompanyType, PartnerSolutionType } from "@/types/partners"
import { PartnerSolution } from "../PartnerSolution"
import { SelectField } from "@/components/custom/SelectField"
import { InputFieldForm } from "@/components/custom/InputField"
import { Percent } from "lucide-react"
import { UseFormReturn } from "react-hook-form"
import { PartnerSubscriptionSchema } from "@/types/PartnerSchema"
import { z } from "zod"
import { FormField } from "@/components/ui/form"

interface FormSubscriptionGeneralProps {
	form: UseFormReturn<z.infer<typeof PartnerSubscriptionSchema>>
}

export const FormSubscriptionGeneral: FC<FormSubscriptionGeneralProps> = ({ form }) => {
	const { dlcPro, donate, marketPro } = form.watch()
	return (
		<Fragment>
			<div className="flex items-start gap-3">
				<div className="flex flex-col gap-3 h-full text-lynch-400 lg:min-w-40">
					<Label
						label="Nos solution"
						htmlFor={PartnerSolutionType.MARKET_PRO}
						className="text-xs font-semibold text-lynch-950"
					/>
					<FormField
						control={form.control}
						name="marketPro.selected"
						render={({ field }) => (
							<div className="flex items-center my-auto h-full gap-2">
								<Checkbox
									name={PartnerSolutionType.MARKET_PRO}
									className="size-5"
									checked={field.value}
									onClick={() => field.onChange(!field.value)}
								/>
								<PartnerSolution
									solution={PartnerSolutionType.MARKET_PRO}
									className="px-4 py-[0.4rem] my-3"
									size={20}
								/>
							</div>
						)}
					/>
				</div>
				<SelectField
					control={form.control}
					name="marketPro.duration"
					label="Abonnement"
					options={[
						{ key: "6", label: "6 mois" },
						{ key: "12", label: "12 mois" },
						{ key: "24", label: "24 mois" },
					]}
					disabled={!marketPro?.selected}
				/>
				<InputFieldForm
					label="Montant"
					name="marketPro.amount"
					type="number"
					form={form}
					placeholder="Saisir le montant"
					disabled={!marketPro?.selected}
				/>
				<SelectField
					control={form.control}
					name="marketPro.expiration"
					label="Échéance"
					options={[
						{ key: "5", label: "5" },
						{ key: "10", label: "10" },
						{ key: "15", label: "15" },
					]}
					disabled={!marketPro?.selected}
				/>
			</div>
			<div className="flex items-start gap-3">
				<SelectField
					control={form.control}
					name="marketPro.managerId"
					label="Gérer par"
					options={[
						{ key: PartnerCompanyType.PRINCIPAL, label: "Principal" },
						{ key: PartnerCompanyType.UNDER_ACCOUNT, label: "Sous compte" },
					]}
					disabled={!marketPro?.selected}
				/>
				<InputFieldForm
					label="Montant"
					name="marketPro.commissionCash"
					type="number"
					form={form}
					placeholder="Saisir le montant"
					IconRight={Percent}
					className="pr-10"
					disabled={!marketPro?.selected}
				/>
				<InputFieldForm
					label="Montant"
					name="marketPro.commissionCard"
					type="number"
					form={form}
					placeholder="Saisir le montant"
					IconRight={Percent}
					className="pr-10"
					disabled={!marketPro?.selected}
				/>
			</div>
			<span className="w-fill h-[1px] bg-lynch-100" />
			<div className="flex items-start gap-3">
				<div className="flex flex-col gap-3 h-full text-lynch-400 lg:min-w-40">
					<Label
						label="Nos solution"
						htmlFor={PartnerSolutionType.DLC_PRO}
						className="text-xs font-semibold text-lynch-950"
					/>
					<FormField
						control={form.control}
						name="dlcPro.selected"
						render={({ field }) => (
							<div className="flex items-center my-auto h-full gap-2">
								<Checkbox
									name={PartnerSolutionType.DLC_PRO}
									className="size-5"
									checked={field.value}
									onClick={() => field.onChange(!field.value)}
								/>
								<PartnerSolution solution={PartnerSolutionType.DLC_PRO} className="px-4 py-[0.4rem] my-3" size={20} />
							</div>
						)}
					/>
				</div>
				<SelectField
					control={form.control}
					name="dlcPro.duration"
					label="Abonnement"
					options={[
						{ key: "6", label: "6 mois" },
						{ key: "12", label: "12 mois" },
						{ key: "24", label: "24 mois" },
					]}
					disabled={!dlcPro?.selected}
				/>
				<InputFieldForm
					label="Montant"
					name="dlcPro.amount"
					type="number"
					form={form}
					placeholder="Saisir le montant"
					disabled={!dlcPro?.selected}
				/>
				<SelectField
					control={form.control}
					name="dlcPro.expiration"
					label="Échéance"
					options={[
						{ key: "5", label: "5" },
						{ key: "10", label: "10" },
						{ key: "15", label: "15" },
					]}
					disabled={!dlcPro?.selected}
				/>
			</div>
			<span className="w-fill h-[1px] bg-lynch-100" />
			<div className="flex items-start gap-3">
				<div className="flex flex-col gap-3 h-full text-lynch-400 lg:min-w-40">
					<Label
						label="Nos solution"
						htmlFor={PartnerSolutionType.DONATE_PRO}
						className="text-xs font-semibold text-lynch-950"
					/>
					<FormField
						control={form.control}
						name="donate.selected"
						render={({ field }) => (
							<div className="flex items-center my-auto h-full gap-2">
								<Checkbox
									name={PartnerSolutionType.DONATE_PRO}
									className="size-5"
									checked={field.value}
									onClick={() => field.onChange(!field.value)}
								/>
								<PartnerSolution
									solution={PartnerSolutionType.DONATE_PRO}
									className="px-4 py-[0.4rem] my-3"
									size={20}
								/>
							</div>
						)}
					/>
				</div>
				<SelectField
					control={form.control}
					name="donate.duration"
					label="Abonnement"
					options={[
						{ key: "6", label: "6 mois" },
						{ key: "12", label: "12 mois" },
						{ key: "24", label: "24 mois" },
					]}
					disabled={!donate?.selected}
				/>
				<InputFieldForm
					label="Montant"
					name="donate.amount"
					type="number"
					form={form}
					placeholder="Saisir le montant"
					disabled={!donate?.selected}
				/>
				<SelectField
					control={form.control}
					name="donate.expiration"
					label="Échéance"
					options={[
						{ key: "5", label: "5" },
						{ key: "10", label: "10" },
						{ key: "15", label: "15" },
					]}
					disabled={!donate?.selected}
				/>
			</div>
		</Fragment>
	)
}
