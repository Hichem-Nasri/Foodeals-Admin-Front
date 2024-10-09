import { FC } from "react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { CollaboratorDeliveryScheduleSchema } from "@/types/DeliverySchema"
import { Label } from "@/components/Label"
import { InputSchedule } from "@/components/InputSchedule"
import { FormField } from "@/components/ui/form"
import { ScheduleDayType, ScheduleWeekType } from "@/types/collaborators"

interface FormWorkScheduleProps {
	disabled?: boolean
	form: UseFormReturn<z.infer<typeof CollaboratorDeliveryScheduleSchema>>
}

export interface DayScheduleType {
	morning: {
		start: string
		end: string
	}
	afternoon: {
		start: string
		end: string
	}
}

export const FormWorkSchedule: FC<FormWorkScheduleProps> = ({ form, disabled }) => {
	const { control } = form
	const schedules = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
	const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]
	return (
		<Accordion
			type="single"
			collapsible
			className="bg-white lg:p-5 px-4 py-6 rounded-[14px]"
			defaultValue="CollaboratorDetails">
			<AccordionItem value="CollaboratorDetails" className="text-lynch-400 text-[1.375rem] font-normal">
				<AccordionTrigger className="font-normal text-[1.375rem] py-0">Affectation</AccordionTrigger>
				<AccordionContent className="pt-7 grid grid-cols-3 gap-x-8 gap-y-5">
					{schedules.map((value, index) => (
						<div key={value} className="flex flex-col gap-4">
							<Label label={days[index]} className="text-lg font-medium text-lynch-400" />
							<div className="flex items-center gap-3">
								<FormField
									control={control}
									key={value}
									name={`${value}.morning` as any}
									render={({ field }) => (
										<div className="flex flex-col gap-3 w-full">
											<Label label={"Horaire (matin)"} className="text-sm font-medium text-lynch-950" />
											<InputSchedule
												value={field.value as DayScheduleType["morning"]}
												onChange={field.onChange}
												disabled={disabled}
											/>
										</div>
									)}
								/>
								<FormField
									control={control}
									key={value}
									name={`${value}.afternoon` as any}
									render={({ field }) => (
										<div className="flex flex-col gap-3 w-full">
											<Label label={"Horaire (après-midi)"} className="text-sm font-medium text-lynch-950" />
											<InputSchedule
												value={field.value as DayScheduleType["afternoon"]}
												onChange={field.onChange}
												disabled={disabled}
											/>
										</div>
									)}
								/>
							</div>
						</div>
					))}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}
