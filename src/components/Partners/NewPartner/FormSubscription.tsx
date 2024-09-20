import { FC } from "react"

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

interface FormSubscriptionProps {
	form: UseFormReturn<z.infer<typeof PartnerSubscriptionSchema>>
	onSubmit: (data: z.infer<typeof PartnerSubscriptionSchema>) => void
}

export const FormSubscription: FC<FormSubscriptionProps> = ({ form, onSubmit }) => {
	const { handleSubmit } = form
	const { subscriptionType } = form.watch()
	return (
		<Accordion type="single" collapsible className="bg-white p-5 rounded-[14px]" defaultValue="subscription">
			<AccordionItem value="subscription" className="text-lynch-400 text-[1.375rem] font-normal">
				<AccordionTrigger className="font-normal text-[1.375rem] py-0">Abonnement</AccordionTrigger>
				<AccordionContent className="pt-7">
					<form onSubmit={handleSubmit(onSubmit)}>
						<Form {...form}>
							<div className="flex flex-col gap-[1.875rem]">
								<div className="flex justify-between gap-[1.875rem]">
									<Label label="Type d’abonnement" className="text-primary text-sm font-medium" />
									<RadioButton
										control={form.control}
										name="subscriptionType"
										options={[
											{ key: "general", label: "Abonnement générale" },
											{ key: "personalized", label: "Abonnement personnalisée" },
										]}
									/>
								</div>
								<div className="flex flex-col gap-[1.875rem]">
									<div className="flex items-start gap-3">
										<SelectField
											control={form.control}
											name="bank"
											label="La banque"
											options={[
												{ key: "cih", label: "CIH" },
												{ key: "bank", label: "Bank" },
											]}
										/>
										<SelectField
											control={form.control}
											name="paymentMethod"
											label="Mode de paeiement"
											options={[
												{ key: "transfer", label: "Virement" },
												{ key: "check", label: "check" },
											]}
										/>
										<InputFieldForm
											label="Raison sociale"
											name="beneficiary"
											form={form}
											placeholder="Saisir le nom du bénéficaire"
										/>
									</div>
									<div className="flex items-start gap-3">
										<InputFieldForm
											label="Raison sociale"
											name="beneficiary"
											form={form}
											placeholder="Saisir le nom du bénéficaire"
										/>
										<SelectField
											control={form.control}
											name="accountType"
											label="Type de compte"
											options={[
												{ key: "transfer", label: "Virement" },
												{ key: "check", label: "check" },
											]}
											className="lg:w-2/4"
										/>
									</div>
									<span className="w-fill h-[1px] bg-lynch-100" />
									{subscriptionType === "general" ? (
										<FormSubscriptionGeneral form={form} />
									) : (
										<FormSubscriptionPersonalized form={form} />
									)}
								</div>
							</div>
						</Form>
					</form>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}
