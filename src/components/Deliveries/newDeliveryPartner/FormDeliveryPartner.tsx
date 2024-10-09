import { FC } from "react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { InputFieldForm } from "@/components/custom/InputField"
import { Form, FormField } from "@/components/ui/form"
import { SelectField } from "@/components/custom/SelectField"
import { InputPhoneField } from "@/components/custom/InputFieldPhone"
import { Mail } from "lucide-react"
import { AvatarField } from "@/components/custom/AvatarField"
import { MultiSelectField } from "@/components/custom/MultiSelectField"
import { IframeRenderer } from "@/components/Partners/NewPartner/IframeRender"
import { DeliveryPartnerSchema } from "@/types/DeliverySchema"
import { PartnerSolutionType } from "@/types/partners"
import { Label } from "@/components/Label"
import { Checkbox } from "@/components/ui/checkbox"
import { PartnerSolution } from "@/components/Partners/PartnerSolution"

interface FormDeliveryPartnerProps {
	form: UseFormReturn<z.infer<typeof DeliveryPartnerSchema>>
	onSubmit: (data: z.infer<typeof DeliveryPartnerSchema>) => void
	setCountryCode: (value: string) => void
	countryCode: string
	disabled?: boolean
}

export const FormDeliveryPartner: FC<FormDeliveryPartnerProps> = ({
	countryCode,
	form,
	onSubmit,
	setCountryCode,
	disabled,
}) => {
	const { handleSubmit, control } = form
	const companyTypeOptions = [
		{ key: "supermarché", label: "Supermarché" },
		{ key: "superettes", label: "Superettes" },
		{ key: "épiceries", label: "Épiceries" },
		{ key: "boulangeries", label: "Boulangeries" },
		{ key: "cafés", label: "Cafés" },
		{ key: "restaurants", label: "Restaurants" },
		{ key: "hôtels", label: "Hôtels" },
		{ key: "traiteurs", label: "Traiteurs" },
		{ key: "autres", label: "Autres" },
	]
	return (
		<Accordion
			type="single"
			collapsible
			className="bg-white lg:p-5 px-4 py-6 rounded-[14px]"
			defaultValue="partnerInfo">
			<AccordionItem value="partnerInfo" className="text-lynch-400 text-[1.375rem] font-normal">
				<AccordionTrigger className="font-normal text-[1.375rem] py-0">Information de l’asociation</AccordionTrigger>
				<AccordionContent className="pt-7">
					<Form {...form}>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="flex flex-col gap-[1.875rem]">
								<div className="flex relative gap-5 lg:pb-0 pb-14">
									<AvatarField
										form={form}
										name="logo"
										alt="Logo"
										label="Image du logo"
										className="lg:static lg:translate-x-0 absolute -bottom-5 left-1/2 -translate-x-1/2 z-10"
										classNameAvatar="rounded-full"
									/>
									<AvatarField
										form={form}
										name="cover"
										alt="cover"
										label="Photo de couverture"
										className="lg:w-fit w-full"
										classNameAvatar="lg:h-[223px] h-[160px] lg:w-[740px] w-full rounded-[24px]"
									/>
								</div>
								<span className="w-fill h-[1px] bg-lynch-100" />
								<div className="flex flex-col gap-[1.875rem]">
									<div className="flex lg:flex-row flex-col items-start gap-3">
										<InputFieldForm
											label="Raison sociale"
											name="companyName"
											control={control}
											placeholder="Nom de rasions sociale"
											disabled={disabled}
										/>
										<MultiSelectField
											control={control}
											name="companyType"
											label="Type"
											options={companyTypeOptions}
											disabled={disabled}
											placeholder="Sélectionner"
											transform={(value) =>
												value.map((item) => (
													<span
														key={item.key}
														className="text-[0.625rem] font-bold text-lynch-500 bg-lynch-200 px-3 py-[0.469rem] rounded-full">
														{item.label}
													</span>
												))
											}
										/>
										<SelectField
											control={control}
											name="responsibleId"
											label="Responsable"
											options={[
												{ key: "1", label: "Responsable" },
												{ key: "2", label: "Fournisseur" },
											]}
											disabled={disabled}
										/>
									</div>
									<div className="flex lg:flex-row flex-col items-start gap-3">
										<InputPhoneField
											control={control}
											name="phone"
											label="Téléphone"
											placeholder="Téléphone"
											countryCode={countryCode}
											onChangeCountryCode={setCountryCode}
											disabled={disabled}
										/>
										<InputFieldForm
											IconLeft={Mail}
											label="Email"
											name="email"
											control={control}
											placeholder="Email professionnelle"
											disabled={disabled}
										/>
										<SelectField
											control={control}
											name="siege"
											label="Siège"
											options={[
												{ key: "1", label: "Responsable" },
												{ key: "2", label: "Fournisseur" },
											]}
											disabled={disabled}
										/>
									</div>
									<div className="flex lg:flex-row flex-col items-start gap-3">
										<SelectField
											control={control}
											name="region"
											label="Région"
											options={[
												{ key: "1", label: "Responsable" },
												{ key: "2", label: "Fournisseur" },
											]}
											disabled={disabled}
										/>
										<InputFieldForm
											label="Adresse"
											name="address"
											control={control}
											placeholder="Saisir l’adresse"
											disabled={disabled}
										/>
										<SelectField
											control={control}
											name="associationType"
											label="Type d’association"
											options={[
												{ key: "1", label: "Responsable" },
												{ key: "2", label: "Fournisseur" },
											]}
											disabled={disabled}
										/>
									</div>
									{/* <div className="flex flex-col gap-3 h-full text-lynch-400 lg:min-w-40">
										<Label
											label="Solution"
											htmlFor={PartnerSolutionType.DLC_PRO}
											className="text-xs font-semibold text-lynch-950"
										/>
										<FormField
											control={form.control}
											name="solutions"
											render={({ field }) => (
												<div className="flex gap-3 items-center">
													<div className="flex items-center my-auto h-full gap-2">
														<Checkbox
															name={PartnerSolutionType.DONATE_PRO}
															className="size-5"
															checked={field.value.includes(PartnerSolutionType.DONATE_PRO)}
															onClick={() =>
																field.onChange(
																	field.value.includes(PartnerSolutionType.DONATE_PRO)
																		? [...field.value.filter((item) => item !== PartnerSolutionType.DONATE_PRO)]
																		: [...field.value, PartnerSolutionType.DONATE_PRO]
																)
															}
														/>
														<PartnerSolution
															solution={PartnerSolutionType.DONATE_PRO}
															className="px-4 py-[0.4rem] my-3"
															size={20}
														/>
													</div>
													<div className="flex items-center my-auto h-full gap-2">
														<Checkbox
															name={PartnerSolutionType.DLC_PRO}
															className="size-5"
															checked={field.value.includes(PartnerSolutionType.DLC_PRO)}
															onClick={() =>
																field.onChange(
																	field.value.includes(PartnerSolutionType.DLC_PRO)
																		? [...field.value.filter((item) => item !== PartnerSolutionType.DLC_PRO)]
																		: [...field.value, PartnerSolutionType.DLC_PRO]
																)
															}
														/>
														<PartnerSolution
															solution={PartnerSolutionType.DLC_PRO}
															className="px-4 py-[0.4rem] my-3"
															size={20}
														/>
													</div>
													<div className="flex items-center my-auto h-full gap-2">
														<Checkbox
															name={PartnerSolutionType.MARKET_PRO}
															className="size-5"
															checked={field.value.includes(PartnerSolutionType.MARKET_PRO)}
															onClick={() =>
																field.onChange(
																	field.value.includes(PartnerSolutionType.MARKET_PRO)
																		? [...field.value.filter((item) => item !== PartnerSolutionType.MARKET_PRO)]
																		: [...field.value, PartnerSolutionType.MARKET_PRO]
																)
															}
														/>
														<PartnerSolution
															solution={PartnerSolutionType.MARKET_PRO}
															className="px-4 py-[0.4rem] my-3"
															size={20}
														/>
													</div>
												</div>
											)}
										/>
									</div> */}
								</div>
							</div>
						</form>
					</Form>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}
