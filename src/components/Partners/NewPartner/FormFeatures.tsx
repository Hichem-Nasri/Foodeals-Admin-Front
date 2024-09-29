import { FC } from "react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { InputFieldForm } from "@/components/custom/InputField"
import { PartnerFeaturesSchema } from "@/types/PartnerSchema"
import { z } from "zod"
import { UseFormReturn } from "react-hook-form"
import { Form, FormField } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/Label"
import { FileSpreadsheet, LayoutList } from "lucide-react"
import { PartnerStatusType } from "@/types/partners"
import { CustomButton } from "@/components/custom/CustomButton"
import { useRouter } from "next/navigation"
import { appRoutes } from "@/lib/routes"

interface FormFeaturesProps {
	form: UseFormReturn<z.infer<typeof PartnerFeaturesSchema>>
	omSubmit: (data: z.infer<typeof PartnerFeaturesSchema>) => void
	disabled?: boolean
	status?: PartnerStatusType
}

export const FormFeatures: FC<FormFeaturesProps> = ({ form, omSubmit, disabled, status }) => {
	const { handleSubmit } = form
	const router = useRouter()
	const showAllPartners = () => {
		router.push(appRoutes.collaborator)
	}
	return (
		<Accordion type="single" collapsible className="bg-white lg:p-5 px-4 py-6 rounded-[14px]" defaultValue="features">
			<AccordionItem value="features" className="text-lynch-400 text-[1.375rem] font-normal">
				<AccordionTrigger className="font-normal text-[1.375rem] py-0">Fonctionnalités</AccordionTrigger>
				<AccordionContent className="pt-7">
					<form onSubmit={handleSubmit(omSubmit)}>
						<Form {...form}>
							<div className="flex lg:flex-row flex-col lg:items-end gap-[1.875rem]">
								<div className="lg:w-1/4">
									<InputFieldForm
										label="Nombre de magasin"
										name="numberOfStores"
										control={form.control}
										placeholder="Saisir le nombre des magasins"
										type="number"
										disabled={disabled}
									/>
								</div>
								{/* {status === PartnerStatusType.VALIDATED && ( */}
								<CustomButton
									className="h-fit py-4"
									label="Voir la liste"
									IconRight={LayoutList}
									onClick={showAllPartners}
								/>
								{/* )} */}
								<div className="flex items-center my-auto h-full gap-2 lg:w-1/4">
									<div className="flex flex-col items-start gap-3 w-full text-lynch-400">
										<Label label="Type de fichier Excel" className="text-xs font-semibold text-lynch-950" />
										<FormField
											control={form.control}
											name={"fileType"}
											render={({ field }) => {
												const checked = field.value.includes("excel")
												return (
													<div className="flex items-center gap-5">
														<Checkbox
															name="excel"
															className="size-5"
															checked={checked}
															onClick={() => field.onChange(checked ? [] : ["excel"])}
															disabled={disabled}
														/>
														<span className="flex justify-center items-center p-4 text-white rounded-full bg-mountain-400">
															<FileSpreadsheet />
														</span>
													</div>
												)
											}}
										/>
									</div>
								</div>
							</div>
						</Form>
					</form>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}
