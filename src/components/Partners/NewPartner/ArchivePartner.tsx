import { FC } from "react"

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { CustomButton } from "@/components/custom/CustomButton"
import { Archive, X } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { ArchivePartnerSchema, defaultArchivePartnerData } from "@/types/PartnerSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField } from "@/components/ui/form"
import { SelectField } from "@/components/custom/SelectField"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/Label"

interface ArchivePartnerProps {
	partnerId?: string
}

export const ArchivePartner: FC<ArchivePartnerProps> = ({ partnerId }) => {
	const form = useForm<z.infer<typeof ArchivePartnerSchema>>({
		resolver: zodResolver(ArchivePartnerSchema),
		mode: "onBlur",
		defaultValues: defaultArchivePartnerData,
	})

	const onSubmit = (data: z.infer<typeof ArchivePartnerSchema>) => {
		// Your logic here to archive the partner id= partnerId
	}

	const { handleSubmit, control } = form

	const options = [
		{ key: "supermarché", label: "Supermarché" },
		{ key: "autres", label: "Autres" },
	]
	return (
		<div className="flex items-center justify-end bg-white p-5">
			<Dialog>
				<DialogTrigger className="flex items-center gap-3 px-5 py-3 rounded-[12px] h-fit bg-red-50 border-[1.5px] border-red-500 text-red-500 hover:bg-red-500/40">
					<span className="text-sm font-medium">Archiver</span>
					<Archive />
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle className="text-lynch-400 text-[1.375rem] font-normal">Archiver le partenaire</DialogTitle>
						<DialogDescription>
							<Form {...form}>
								<form onSubmit={handleSubmit(onSubmit)}>
									<div className="flex flex-col gap-5 mt-8">
										<SelectField control={control} label="Type d’archive" name="archiveType" options={options} />
										<FormField
											name="archiveReason"
											control={control}
											render={({ field }) => (
												<div className="flex flex-col items-start gap-3 w-full text-lynch-400">
													<Label
														htmlFor="archiveReason"
														label="Motif"
														className="text-xs font-semibold text-lynch-950"
													/>
													<Textarea {...field} name="archiveReason" placeholder="Texte du motif" />
												</div>
											)}
										/>
										<div className="flex justify-end items-center gap-2.5">
											<CustomButton label="Annuler" IconRight={X} variant="outline" className="h-fit py-3" />
											<CustomButton label="Archiver" IconRight={Archive} type="submit" className="h-fit py-3" />
										</div>
									</div>
								</form>
							</Form>
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	)
}
