"use client"

import { FileBadge, Save } from "lucide-react"
import { TopBar } from "./TopBar"
import { FormPartnerInfo } from "./FormPartnerInfo"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
	defaultPartnerFeaturesData,
	defaultPartnerInformationData,
	defaultPartnerSubscriptionData,
	PartnerDataType,
	PartnerFeaturesSchema,
	PartnerInformationSchema,
	PartnerSubscriptionSchema,
} from "@/types/PartnerSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { countryCodes } from "@/lib/utils"
import { FormSubscription } from "./FormSubscription"
import { FormFeatures } from "./FormFeatures"
import { PartnerStatusType } from "@/types/partners"

interface NewPartnerProps {
	partnerDetails?: PartnerDataType
}

export const NewPartner: React.FC<NewPartnerProps> = ({ partnerDetails }) => {
	const [countryCode, setCountryCode] = useState(countryCodes[0].value)
	const partnerInformation = useForm<z.infer<typeof PartnerInformationSchema>>({
		resolver: zodResolver(PartnerInformationSchema),
		mode: "onBlur",
		defaultValues: {
			...(partnerDetails ? partnerDetails : defaultPartnerInformationData),
		},
	})

	const partnerSubscription = useForm<z.infer<typeof PartnerSubscriptionSchema>>({
		resolver: zodResolver(PartnerSubscriptionSchema),
		mode: "onBlur",
		defaultValues: {
			...(partnerDetails ? partnerDetails : defaultPartnerSubscriptionData),
		},
	})

	const partnerFeatures = useForm<z.infer<typeof PartnerFeaturesSchema>>({
		resolver: zodResolver(PartnerFeaturesSchema),
		mode: "onBlur",
		defaultValues: {
			...(partnerDetails ? partnerDetails : defaultPartnerFeaturesData),
		},
	})

	const onSubmitPartnerInfo = (data: z.infer<typeof PartnerInformationSchema>) => { }

	const onSubmitSubscription = (data: z.infer<typeof PartnerSubscriptionSchema>) => { }

	const onSubmitFeatures = (data: z.infer<typeof PartnerFeaturesSchema>) => { }

	const onSubmit = () => {
		onSubmitPartnerInfo(partnerInformation.getValues())
		onSubmitSubscription(partnerSubscription.getValues())
		onSubmitFeatures(partnerFeatures.getValues())
	}

	const onSaveData = () => {
		console.log("Save data")
		console.log(partnerInformation.getValues(), partnerSubscription.getValues(), partnerFeatures.getValues())
	}
	console.log(
		partnerInformation.formState.isDirty,
		partnerInformation.formState.isValid,
		partnerSubscription.formState.isDirty,
		partnerSubscription.formState.isValid,
		partnerFeatures.formState.isValid,
		partnerFeatures.formState.isDirty
	)

	return (
		<div className="flex flex-col gap-[0.625rem] w-full lg:px-3 lg:mb-0 mb-20 overflow-auto">
			<TopBar
				status={partnerDetails ? partnerDetails.status : PartnerStatusType.DRAFT}
				primaryButtonLabel="Valider le contrat"
				secondaryButtonLabel="Enregistrer"
				primaryButtonIcon={FileBadge}
				secondaryButtonIcon={Save}
				primaryButtonDisabled={
					!partnerInformation.formState.isDirty &&
					!partnerInformation.formState.isValid &&
					!partnerSubscription.formState.isDirty &&
					!partnerSubscription.formState.isValid &&
					!partnerFeatures.formState.isValid &&
					!partnerFeatures.formState.isDirty
				}
				primaryButtonAction={onSubmit}
				secondaryButtonAction={onSaveData}
				secondaryButtonDisabled={partnerInformation.formState.isValid}
			/>
			<div className="flex flex-col gap-[1.875rem] h-full w-full">
				<FormPartnerInfo
					onSubmit={onSubmitPartnerInfo}
					form={partnerInformation}
					countryCode={countryCode}
					setCountryCode={setCountryCode}
					disabled={partnerDetails ? partnerDetails.status === PartnerStatusType.VALIDATED : false}
				/>
				<FormSubscription
					onSubmit={onSubmitSubscription}
					form={partnerSubscription}
					disabled={partnerDetails ? partnerDetails.status === PartnerStatusType.VALIDATED : false}
				/>
				<FormFeatures
					form={partnerFeatures}
					omSubmit={onSubmitFeatures}
					disabled={partnerDetails ? partnerDetails.status === PartnerStatusType.VALIDATED : false}
				/>
			</div>
		</div>
	)
}
