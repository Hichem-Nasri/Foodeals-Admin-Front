"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { countryCodes } from "@/lib/utils"
import { TopBar } from "@/components/Partners/NewPartner/TopBar"
import { FormDeliveryPartner } from "./FormDeliveryPartner"
import { defaultDeliveryPartnerData, defaultDeliveryPartnerSolutionData, DeliveryPartnerSchema, DeliveryPartnerSchemaType, DeliveryPartnerSolutionSchema } from "@/types/DeliverySchema"
import { FormSolution } from "./FormSolution"

interface NewDeliveryProps {
  partnerDetails?: DeliveryPartnerSchemaType
}

export const NewDelivery: React.FC<NewDeliveryProps> = ({ partnerDetails }) => {
  const [countryCode, setCountryCode] = useState(countryCodes[0].value)
  const deliveryPartner = useForm<z.infer<typeof DeliveryPartnerSchema>>({
    resolver: zodResolver(DeliveryPartnerSchema),
    mode: "onBlur",
    defaultValues: {
      ...(partnerDetails ? partnerDetails : defaultDeliveryPartnerData),
    },
  })

  const DeliveryPartnerSolution = useForm<z.infer<typeof DeliveryPartnerSolutionSchema>>({
    resolver: zodResolver(DeliveryPartnerSolutionSchema),
    mode: "onBlur",
    defaultValues: {
      ...(partnerDetails ? partnerDetails : defaultDeliveryPartnerSolutionData),
    },
  })

  const onSubmitPartnerInfo = (data: z.infer<typeof DeliveryPartnerSchema>) => { }

  const onSubmitEngagement = (data: z.infer<typeof DeliveryPartnerSolutionSchema>) => { }

  const onSubmit = () => {
    onSubmitPartnerInfo(deliveryPartner.getValues())
    onSubmitEngagement(DeliveryPartnerSolution.getValues())
  }

  const onSaveData = () => {
    console.log("Save data")
    console.log(deliveryPartner.getValues(), DeliveryPartnerSolution.getValues())
  }

  return (
    <div className="flex flex-col gap-[0.625rem] w-full lg:px-3 lg:mb-0 mb-20 overflow-auto">
      <TopBar
        primaryButtonDisabled={
          !deliveryPartner.formState.isDirty &&
          !deliveryPartner.formState.isValid &&
          !DeliveryPartnerSolution.formState.isDirty &&
          !DeliveryPartnerSolution.formState.isValid
        }
        secondaryButtonDisabled={deliveryPartner.formState.isValid}
        onSaveData={onSaveData}
        onSubmit={onSubmit}
      />
      <div className="flex flex-col gap-[1.875rem] h-full w-full">
        <FormDeliveryPartner
          onSubmit={onSubmitPartnerInfo}
          form={deliveryPartner}
          countryCode={countryCode}
          setCountryCode={setCountryCode}
          disabled={!!partnerDetails}
        />
        <FormSolution form={DeliveryPartnerSolution} onSubmit={onSubmitEngagement} disabled={!partnerDetails} />
      </div>
    </div>
  )
}
