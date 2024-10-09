"use client"
import { CustomButton } from "@/components/custom/CustomButton"
import { CollaboratorDataType, ScheduleDayType } from "@/types/collaborators"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { FC } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AvatarProfile } from "@/components/AvatarProfile"
import { Input } from "@/components/custom/Input"
import { Select } from "@/components/custom/Select"
import { PartnerSolution } from "../PartnerSolution"
import { InputSchedule } from "@/components/InputSchedule"
import { Label } from "@/components/Label"

interface CollaboratorDetailsProps {
	collaborator: CollaboratorDataType
}

export const CollaboratorDetails: FC<CollaboratorDetailsProps> = ({ collaborator }) => {
	const router = useRouter()
	const schedules = Object.keys(collaborator.schedule).map((key) => [
		key,
		collaborator.schedule[key as keyof typeof collaborator.schedule],
	])

	return (
		<div className="flex flex-col gap-2 w-full">
			<div className="flex justify-end p-2 bg-white w-full rounded-[18px]">
				<CustomButton label="Retour" IconLeft={ArrowLeft} variant="outline" onClick={router.back} size="sm" />
			</div>
			<Accordion
				type="single"
				collapsible
				className="bg-white lg:p-5 px-4 py-6 rounded-[14px]"
				defaultValue="CollaboratorDetails">
				<AccordionItem value="CollaboratorDetails" className="text-lynch-400 text-[1.375rem] font-normal">
					<AccordionTrigger className="font-normal text-[1.375rem] py-0">Information personnelle</AccordionTrigger>
					<AccordionContent className="pt-7">
						<div className="flex flex-col justify-center items-center gap-[1.875rem]">
							<div className="flex w-fit gap-5 lg:pb-0 pb-14">
								<AvatarProfile
									iUrl={collaborator.avatar}
									alt={collaborator.firstName}
									label="Photo de profil"
									className="!rounded-full size-[130px]"
									disabled
								/>
							</div>
							<div className="flex lg:flex-row flex-col items-center gap-3 w-full">
								<Input
									name={collaborator.civility}
									value={collaborator.civility}
									onChange={() => {}}
									label="Civilité (e)"
									disabled
								/>
								<Input
									name={collaborator.firstName}
									value={collaborator.firstName}
									onChange={() => {}}
									label="Prénom"
									disabled
								/>
								<Input
									name={collaborator.lastName}
									value={collaborator.lastName}
									onChange={() => {}}
									label="Nom"
									disabled
								/>
							</div>
							<div className="flex lg:flex-row flex-col items-center gap-3 w-full">
								<Input
									name={collaborator.origin}
									value={collaborator.origin}
									onChange={() => {}}
									label="Nationalité"
									disabled
								/>
								<Input
									name={collaborator.idNumber}
									value={collaborator.idNumber}
									onChange={() => {}}
									label="CIN"
									disabled
								/>
								<Input name={collaborator.role} value={collaborator.role} onChange={() => {}} label="Rôle" disabled />
							</div>
							<div className="grid lg:grid-flow-col grid-flow-row lg:grid-cols-3 items-center gap-3 w-full">
								<Input
									name={collaborator.phone}
									value={collaborator.phone}
									onChange={() => {}}
									label="Téléphone"
									disabled
								/>
								<Input name={collaborator.mail} value={collaborator.mail} onChange={() => {}} label="Email" disabled />
							</div>
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
			<Accordion
				type="single"
				collapsible
				className="bg-white lg:p-5 px-4 py-6 rounded-[14px]"
				defaultValue="CollaboratorDetails">
				<AccordionItem value="CollaboratorDetails" className="text-lynch-400 text-[1.375rem] font-normal">
					<AccordionTrigger className="font-normal text-[1.375rem] py-0">Affectation</AccordionTrigger>
					<AccordionContent className="pt-7">
						<div className="flex flex-col justify-center items-center gap-[1.875rem]">
							<div className="flex lg:flex-row flex-col items-center gap-3 w-full">
								<Select
									onChange={() => {}}
									value={collaborator.Assignment.partner.name}
									label="Partenaire"
									transform={() => (
										<div className="flex items-center gap-3 w-full">
											<AvatarProfile
												disabled
												iUrl={collaborator.Assignment.partner.logo}
												alt={collaborator.Assignment.partner.name}
												className="!rounded-full size-[40px]"
											/>
											{collaborator.Assignment.partner.name}
										</div>
									)}
									disabled
								/>
								<Select
									onChange={() => {}}
									value={collaborator.Assignment.subAccount.name}
									label="Sous compte"
									transform={() => (
										<div className="flex items-center gap-3 w-full">
											<AvatarProfile
												disabled
												iUrl={collaborator.Assignment.subAccount.logo}
												alt={collaborator.Assignment.subAccount.name}
												className="!rounded-full size-[40px] w-fit"
											/>
											{collaborator.Assignment.subAccount.name}
										</div>
									)}
									disabled
								/>
								<Input
									name={collaborator.Assignment.department}
									value={collaborator.Assignment.department}
									onChange={() => {}}
									label="Rayon"
									disabled
								/>
							</div>
							<div className="flex lg:flex-row flex-col items-center gap-3 w-full">
								<Select
									onChange={() => {}}
									value={collaborator.Assignment.manager.name}
									label="Responsable"
									transform={() => (
										<div className="flex items-center gap-3 w-full">
											<AvatarProfile
												disabled
												iUrl={collaborator.Assignment.manager.avatar}
												alt={collaborator.Assignment.manager.name}
												className="!rounded-full size-[40px] w-fit"
											/>
											{collaborator.Assignment.manager.name}
										</div>
									)}
									disabled
								/>
								<Input
									name={collaborator.Assignment.city}
									value={collaborator.Assignment.city}
									onChange={() => {}}
									label="Ville"
									disabled
								/>
								<Input
									name={collaborator.Assignment.region}
									value={collaborator.Assignment.region}
									onChange={() => {}}
									label="Région"
									disabled
								/>
							</div>
							<div className="flex lg:flex-row flex-col items-center gap-3 w-full">
								<Select
									onChange={() => {}}
									value={"s"}
									label="Solution"
									transform={() => (
										<div className="flex items-center gap-2">
											{collaborator.Assignment.solution.map((value) => (
												<PartnerSolution solution={value} key={value} />
											))}
										</div>
									)}
									disabled
								/>
								<Input
									name={collaborator.Assignment.phone}
									value={collaborator.Assignment.phone}
									onChange={() => {}}
									label="Téléphone"
									disabled
								/>
								<Input
									name={collaborator.Assignment.mail}
									value={collaborator.Assignment.mail}
									onChange={() => {}}
									label="Email"
									disabled
								/>
							</div>
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
			<Accordion
				type="single"
				collapsible
				className="bg-white lg:p-5 px-4 py-6 rounded-[14px]"
				defaultValue="CollaboratorDetails">
				<AccordionItem value="CollaboratorDetails" className="text-lynch-400 text-[1.375rem] font-normal">
					<AccordionTrigger className="font-normal text-[1.375rem] py-0">Affectation</AccordionTrigger>
					<AccordionContent className="pt-7 flex flex-wrap gap-8">
						{schedules.map((value, index) => (
							<div key={index} className="flex flex-col gap-4">
								<Label label={value[0].toString()} className="text-lg font-medium text-lynch-400" />
								<div className="flex items-center gap-3">
									<div className="flex flex-col gap-3">
										<Label label={"Horaire (matin)"} className="text-sm font-medium text-lynch-950" />
										<InputSchedule
											value={{
												start: (value[1] as ScheduleDayType).morning.split("-")[0],
												end: (value[1] as ScheduleDayType).morning.split("-")[1],
											}}
											onChange={() => {}}
											disabled
										/>
									</div>
									<div className="flex flex-col gap-3">
										<Label label={"Horaire (après-midi)"} className="text-sm font-medium text-lynch-950" />
										<InputSchedule
											value={{
												start: (value[1] as ScheduleDayType).afternoon.split("-")[0],
												end: (value[1] as ScheduleDayType).afternoon.split("-")[1],
											}}
											onChange={() => {}}
											disabled
										/>
									</div>
								</div>
							</div>
						))}
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	)
}
