"use client"

import { FileBadge, Save } from "lucide-react"
import { TopBar } from "./TopBar"
import { FormPartnerInfo } from "./FormPartnerInfo"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
	defaultPartnerInformationData,
	defaultPartnerSubscriptionData,
	PartnerInformationSchema,
	PartnerSubscriptionSchema,
} from "@/types/PartnerSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { countryCodes } from "@/lib/utils"
import { FormSubscription } from "./FormSubscription"
import { Input } from "@/components/custom/Input"

interface NewPartnerProps {}

export const NewPartner: React.FC<NewPartnerProps> = ({}) => {
	const [countryCode, setCountryCode] = useState(countryCodes[0].value)
	const partnerInformation = useForm<z.infer<typeof PartnerInformationSchema>>({
		resolver: zodResolver(PartnerInformationSchema),
		mode: "onBlur",
		defaultValues: {
			...defaultPartnerInformationData,
		},
	})

	const partnerSubscription = useForm<z.infer<typeof PartnerSubscriptionSchema>>({
		resolver: zodResolver(PartnerSubscriptionSchema),
		mode: "onBlur",
		defaultValues: {
			...defaultPartnerSubscriptionData,
		},
	})

	const uploadContract = () => {}

	const onSubmitPartnerInfo = (data: z.infer<typeof PartnerInformationSchema>) => {}

	const onSubmitSubscription = (data: z.infer<typeof PartnerSubscriptionSchema>) => {}

	return (
		<div className="flex flex-col gap-[0.625rem] w-full px-3 lg:mb-0 mb-4 overflow-auto">
			<TopBar
				primaryButtonLabel="Valider le contrat"
				secondaryButtonLabel="Enregistrer"
				primaryButtonIcon={FileBadge}
				secondaryButtonIcon={Save}
				primaryButtonDisabled
				secondaryButtonDisabled
			/>
			<div className="flex flex-col gap-[1.875rem] h-full w-full">
				<FormPartnerInfo
					onSubmit={onSubmitPartnerInfo}
					form={partnerInformation}
					countryCode={countryCode}
					setCountryCode={setCountryCode}
				/>
				<FormSubscription onSubmit={onSubmitSubscription} form={partnerSubscription} />
				<Input name="file" value={""} onChange={uploadContract} type="file" />
			</div>
		</div>
	)
}
