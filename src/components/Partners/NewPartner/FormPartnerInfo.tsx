import { FC } from "react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PartnerInformationSchema } from "@/types/PartnerSchema"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { InputFieldForm } from "@/components/custom/InputField"
import { Form } from "@/components/ui/form"
import { SelectField } from "@/components/custom/SelectField"
import { InputPhoneField } from "@/components/custom/InputFieldPhone"
import { Link2, Mail } from "lucide-react"
import { AvatarField } from "@/components/custom/AvatarField"

interface FormPartnerInfoProps {
	form: UseFormReturn<z.infer<typeof PartnerInformationSchema>>
	onSubmit: (data: z.infer<typeof PartnerInformationSchema>) => void
	setCountryCode: (value: string) => void
	countryCode: string
}

export const FormPartnerInfo: FC<FormPartnerInfoProps> = ({ form, onSubmit, countryCode, setCountryCode }) => {
	const { handleSubmit } = form

	return (
		<Accordion type="single" collapsible className="bg-white p-5 rounded-[14px]" defaultValue="partnerInfo" >
			<AccordionItem value="partnerInfo" className="text-lynch-400 text-[1.375rem] font-normal">
				<AccordionTrigger className="font-normal text-[1.375rem] py-0">Information du partenaires</AccordionTrigger>
				<AccordionContent className="pt-7">
					<form onSubmit={handleSubmit(onSubmit)}>
						<Form {...form}>
							<div className="flex flex-col gap-[1.875rem]">
								<div className="flex gap-5">
									<AvatarField form={form} name="logo" alt="Logo" label="Image du logo" />
									<AvatarField
										form={form}
										name="cover"
										alt="cover"
										label="Photo de couverture"
										height="223"
										width="740"
									/>
								</div>
								<span className="w-fill h-[1px] bg-lynch-100" />
								<div className="flex flex-col gap-[1.875rem]">
									<div className="flex items-start gap-3">
										<InputFieldForm
											label="Raison sociale"
											name="companyName"
											form={form}
											placeholder="Nom de rasions sociale"
										/>
										<SelectField
											control={form.control}
											name="companyType"
											label="Type"
											options={[
												{ key: "1", label: "Partenariat" },
												{ key: "2", label: "Fournisseur" },
											]}
										/>
										<SelectField
											control={form.control}
											name="companyCategory"
											label="Responsable"
											options={[
												{ key: "1", label: "Responsable" },
												{ key: "2", label: "Fournisseur" },
											]}
										/>
									</div>
									<div className="flex items-start gap-3">
										<InputPhoneField
											control={form.control}
											name="phone"
											label="Téléphone"
											placeholder="Téléphone"
											countryCode={countryCode}
											onChangeCountryCode={setCountryCode}
										/>
										<InputFieldForm
											IconLeft={Mail}
											label="Email"
											name="email"
											form={form}
											placeholder="Email professionnelle"
										/>
										<InputFieldForm
											label="Numéro de registre de commerce"
											name="commercialRegisterNumber"
											form={form}
											placeholder="Saisir le RC"
										/>
									</div>
									<div className="flex items-start gap-3">
										<SelectField
											control={form.control}
											name="partnerType"
											label="Type de partenaire"
											options={[
												{ key: "1", label: "Responsable" },
												{ key: "2", label: "Fournisseur" },
											]}
										/>
										<SelectField
											control={form.control}
											name="country"
											label="Pays"
											options={[
												{ key: "1", label: "Responsable" },
												{ key: "2", label: "Fournisseur" },
											]}
										/>
										<SelectField
											control={form.control}
											name="managerId"
											label="Manager"
											options={[
												{ key: "1", label: "Responsable" },
												{ key: "2", label: "Fournisseur" },
											]}
										/>
									</div>
									<div className="flex items-start gap-3">
										<SelectField
											control={form.control}
											name="city"
											label="Ville"
											options={[
												{ key: "1", label: "Responsable" },
												{ key: "2", label: "Fournisseur" },
											]}
										/>
										<SelectField
											control={form.control}
											name="region"
											label="Région"
											options={[
												{ key: "1", label: "Responsable" },
												{ key: "2", label: "Fournisseur" },
											]}
										/>
										<InputFieldForm label="Adresse" name="address" form={form} placeholder="Saisir l’adresse" />
									</div>
									<InputFieldForm
										label="Intégrer une carte"
										name="address"
										form={form}
										placeholder="ifram"
										IconLeft={Link2}
									/>
								</div>
							</div>
						</Form>
					</form>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}
