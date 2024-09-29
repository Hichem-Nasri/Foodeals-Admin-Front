import { defaultValuesPaymentFilter, PaymentFilterSchema } from "@/types/PaymentType"
import { zodResolver } from "@hookform/resolvers/zod"
import { FC } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormField } from "../ui/form"
import { SelectField } from "../custom/SelectField"
import { DatePicker } from "../DatePicker"
import { AvatarProfile } from "../AvatarProfile"
import { Label } from "../Label"
import { PartnerOptions } from "@/lib/utils"

interface FilterPayment {
	onSubmit: (data: z.infer<typeof PaymentFilterSchema>) => void
}

export const FilterPayment: FC<FilterPayment> = ({ onSubmit }) => {
	const form = useForm<z.infer<typeof PaymentFilterSchema>>({
		resolver: zodResolver(PaymentFilterSchema),
		mode: "onBlur",
		defaultValues: defaultValuesPaymentFilter,
	})
	const { handleSubmit, control } = form

	const adaptOptions = PartnerOptions.map((option) => ({ key: option.id, label: option.name }))
	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit)} className="w-full">
				<div className="flex lg:flex-row flex-col items-center gap-3 p-4 bg-white rounded-[14px] w-full">
					<div className="flex flex-col gap-3 w-full">
						<Label label="Etat mensuel en cours" className="text-sm font-medium text-lynch-950" />
						<FormField
							control={control}
							name={"date"}
							render={({ field }) => <DatePicker onChange={field.onChange} value={field.value} />}
						/>
					</div>
					<SelectField
						name="partner"
						options={adaptOptions}
						control={control}
						label="Partenaire"
            className="w-full"
						transform={(value) => {
							const option = PartnerOptions.find((option) => option.name === value)
							return (
								<div className="flex items-center gap-3">
									<AvatarProfile
										disabled
										iUrl={option?.avatar || ""}
										alt={option?.name}
										className="!rounded-full size-[40px]"
									/>
									<Label label={option?.name || ""} />
								</div>
							)
						}}
					/>
				</div>
			</form>
		</Form>
	)
}
