"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { countryCodes } from "@/lib/utils"
import { TopBar } from "@/components/Partners/NewPartner/TopBar"
import {
  CollaboratorDeliveryDataType,
  CollaboratorDeliveryScheduleSchema,
  CollaboratorDeliverySchema,
  defaultCollaboratorDeliveryData,
  defaultCollaboratorDeliveryScheduleData,
} from "@/types/DeliverySchema"
import { FormCollaboratorInfo } from "./FormCollaboratorInfo"
import { FormWorkSchedule } from "./FormWorkSchedule"

interface CollaboratorProps {
  partnerDetails?: CollaboratorDeliveryDataType
}

export const Collaborator: React.FC<CollaboratorProps> = ({ partnerDetails }) => {
  const [countryCode, setCountryCode] = useState(countryCodes[0].value)
  const deliveryCollaborator = useForm<z.infer<typeof CollaboratorDeliverySchema>>({
    resolver: zodResolver(CollaboratorDeliverySchema),
    mode: "onBlur",
    defaultValues: {
      ...(partnerDetails ? partnerDetails : defaultCollaboratorDeliveryData),
    },
  })

  const DeliveryPartnerSolution = useForm<z.infer<typeof CollaboratorDeliveryScheduleSchema>>({
    resolver: zodResolver(CollaboratorDeliveryScheduleSchema),
    mode: "onBlur",
    defaultValues: {
      ...(partnerDetails ? partnerDetails : defaultCollaboratorDeliveryScheduleData),
    },
  })

  const onSubmitPartnerInfo = (data: z.infer<typeof CollaboratorDeliverySchema>) => { }

  const onSubmitEngagement = (data: z.infer<typeof CollaboratorDeliveryScheduleSchema>) => { }

  const onSubmit = () => {
    onSubmitPartnerInfo(deliveryCollaborator.getValues())
    onSubmitEngagement(DeliveryPartnerSolution.getValues())
  }

  const onSaveData = () => {
    console.log("Save data")
    console.log(deliveryCollaborator.getValues(), DeliveryPartnerSolution.getValues())
  }

  return (
    <div className="flex flex-col gap-[0.625rem] w-full lg:px-3 lg:mb-0 mb-20 overflow-auto">
      <TopBar
        primaryButtonDisabled={
          !deliveryCollaborator.formState.isDirty &&
          !deliveryCollaborator.formState.isValid &&
          !DeliveryPartnerSolution.formState.isDirty &&
          !DeliveryPartnerSolution.formState.isValid
        }
        secondaryButtonDisabled={deliveryCollaborator.formState.isValid}
        onSaveData={onSaveData}
        onSubmit={onSubmit}
      />
      <div className="flex flex-col gap-[1.875rem] h-full w-full">
        <FormCollaboratorInfo
          onSubmit={onSubmitPartnerInfo}
          form={deliveryCollaborator}
          countryCode={countryCode}
          setCountryCode={setCountryCode}
          disabled={!!partnerDetails}
        />
        <FormWorkSchedule form={DeliveryPartnerSolution} />
      </div>
    </div>
  )
}
