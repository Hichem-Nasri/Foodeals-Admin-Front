import { FC, Fragment } from "react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Form } from "@/components/ui/form"
import { RadioButton } from "@/components/custom/RadioButton"
import { Label } from "@/components/Label"
import { SelectField } from "@/components/custom/SelectField"
import { InputFieldForm } from "@/components/custom/InputField"
import { UseFormReturn } from "react-hook-form"
import { PartnerSubscriptionSchema } from "@/types/PartnerSchema"
import { z } from "zod"
import { FormSubscriptionGeneral } from "./FormSubscriptionGeneral"
import { FormSubscriptionPersonalized } from "./FormSubscriptionPersonalized"
import { UploadFile } from "./UploadFile"

interface FormSubscriptionProps {
	form: UseFormReturn<z.infer<typeof PartnerSubscriptionSchema>>
	onSubmit: (data: z.infer<typeof PartnerSubscriptionSchema>) => void
	disabled?: boolean
	isContractGenerated?: boolean
}

export const FormSubscription: FC<FormSubscriptionProps> = ({ form, onSubmit, disabled, isContractGenerated }) => {
	const { handleSubmit } = form
	const { subscriptionType } = form.watch()
	return (
		<Accordion
			type="single"
			collapsible
			className="bg-white lg:p-5 px-4 py-6 rounded-[14px]"
			defaultValue="subscription">
			<AccordionItem value="subscription" className="text-lynch-400 text-[1.375rem] font-normal">
				<AccordionTrigger className="font-normal text-[1.375rem] py-0">Abonnement</AccordionTrigger>
				<AccordionContent className="flex flex-col gap-[1.875rem] pt-7">
					<form onSubmit={handleSubmit(onSubmit)}>
						<Form {...form}>
							<div className="flex flex-col gap-[1.875rem]">
								<div className="flex lg:flex-row flex-col justify-between gap-[1.875rem]">
									<Label label="Type d’abonnement" className="text-sm font-medium" />
									<RadioButton
										control={form.control}
										name="subscriptionType"
										options={[
											{ key: "general", label: "Abonnement générale" },
											{ key: "personalized", label: "Abonnement personnalisée" },
										]}
										disabled={disabled}
									/>
								</div>
								<div className="flex flex-col gap-[1.875rem]">
									<div className="flex lg:flex-row flex-col items-start gap-3">
										<SelectField
											control={form.control}
											name="bank"
											label="La banque"
											options={[
												{ key: "cih", label: "CIH" },
												{ key: "bank", label: "Bank" },
											]}
											disabled={disabled}
										/>
										<SelectField
											control={form.control}
											name="paymentMethod"
											label="Mode de paeiement"
											options={[
												{ key: "transfer", label: "Virement" },
												{ key: "check", label: "check" },
											]}
											disabled={disabled}
										/>
										<InputFieldForm
											label="Raison sociale"
											name="beneficiary"
											control={form.control}
											placeholder="Saisir le nom du bénéficaire"
											disabled={disabled}
										/>
									</div>
									<div className="flex lg:flex-row flex-col items-start gap-3">
										<InputFieldForm label="RIB" name="rib" control={form.control} placeholder="Saisir le rib" />
										<SelectField
											control={form.control}
											name="accountType"
											label="Type de compte"
											options={[
												{ key: "transfer", label: "Virement" },
												{ key: "check", label: "check" },
											]}
											className="lg:w-2/4"
											disabled={disabled}
										/>
									</div>
									<span className="w-fill h-[1px] bg-lynch-100" />
									{subscriptionType === "general" ? (
										<FormSubscriptionGeneral form={form} disabled={disabled} />
									) : (
										<FormSubscriptionPersonalized form={form} disabled={disabled} />
									)}
								</div>
							</div>
						</Form>
					</form>
					{isContractGenerated && (
						<Fragment>
							<span className="w-fill h-[1px] bg-lynch-100" />
							<div className="flex flex-col gap-3">
								<Label label="Ajouter le contrat" className="text-lynch-950 text-sm font-medium" />
								<UploadFile />
							</div>
						</Fragment>
					)}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}
