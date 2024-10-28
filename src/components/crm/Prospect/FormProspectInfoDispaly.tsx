import { FC, useState } from 'react'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { CrmInformationSchema } from '@/types/CrmScheme'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { InputFieldForm } from '@/components/custom/InputField'
import { Form } from '@/components/ui/form'
import { SelectField } from '@/components/custom/SelectField'
import { InputPhoneField } from '@/components/custom/InputFieldPhone'
import { Mail, PhoneCall } from 'lucide-react'
import { AvatarField } from '@/components/custom/AvatarField'
import { MultiSelectField } from '@/components/custom/MultiSelectField'
import { CountryData } from '@/types/utils'
import { useQuery } from '@tanstack/react-query'
import api from '@/api/Auth'
import { useNotification } from '@/context/NotifContext'
import { NotificationType } from '@/types/GlobalType'
import FieldActivities from '@/components/utils/FieldActivities'
import FieldCountry from '@/components/utils/FieldCountry'
import FieldCity from '@/components/utils/FieldCity'
import FieldRegion from '@/components/utils/FieldRegion'
import SelectManager from '@/components/utils/SelectManager'
import FieldSolutions from '@/components/utils/FieldSolutions'

interface FormCrmInfoProps {
    form: UseFormReturn<z.infer<typeof CrmInformationSchema>>
    onSubmit: (data: z.infer<typeof CrmInformationSchema>) => void
    disabled?: boolean
    setCountryCode: (value: string) => void
    countryCode: string
}

export const FormCrmInfoDisplay: FC<FormCrmInfoProps> = ({
    form,
    onSubmit,
    countryCode,
    setCountryCode,
    disabled = false,
}) => {
    const [address, setAddress] = useState<{
        countryId: string
        cityId: string
        regionId: string
    }>({
        countryId: '',
        cityId: '',
        regionId: '',
    })
    const { handleSubmit, control } = form
    return (
        <Accordion
            type="single"
            collapsible
            className="bg-white lg:p-5 px-4 py-6 rounded-[14px]"
            defaultValue="CrmInfo"
        >
            <AccordionItem
                value="CrmInfo"
                className="text-lynch-400 text-[1.375rem] font-normal"
            >
                <AccordionTrigger className="font-normal text-[1.375rem] py-0">
                    Information du prospect
                </AccordionTrigger>
                <AccordionContent className="pt-7 w-full">
                    <Form {...form}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-[1.875rem] w-full">
                                <div className="flex flex-col gap-[1.875rem] w-full">
                                    <div className="flex lg:flex-row flex-col items-start gap-3 w-full">
                                        <FieldSolutions
                                            control={control}
                                            disabled={disabled}
                                        />
                                    </div>
                                    <div className="flex lg:flex-row flex-col items-start gap-3 w-full">
                                        <InputFieldForm
                                            label="Raison sociale"
                                            name="companyName"
                                            control={control}
                                            placeholder="Nom de rasions sociale"
                                            disabled={disabled}
                                        />
                                        <FieldActivities
                                            control={control}
                                            name="category"
                                            label="Catégorie"
                                            disabled={disabled}
                                        />
                                        <InputFieldForm
                                            control={control}
                                            name="responsable"
                                            label="Responsable"
                                            placeholder="Nom du responsable"
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
                                            IconLeft={PhoneCall}
                                        />
                                        <InputFieldForm
                                            IconLeft={Mail}
                                            label="Email"
                                            name="email"
                                            control={control}
                                            placeholder="Email professionnelle"
                                            disabled={disabled}
                                        />
                                        <SelectManager
                                            control={control}
                                            name="creatorInfo"
                                            label="Alimenté par"
                                            disabled={disabled}
                                        />
                                    </div>
                                    <div className="flex lg:flex-row flex-col items-start gap-3">
                                        <SelectManager
                                            control={control}
                                            name="managerInfo"
                                            label="Manager"
                                            disabled={disabled}
                                        />
                                        <FieldCountry
                                            control={control}
                                            name="country"
                                            label="Pays"
                                            placeholder="Pays"
                                            disabled={disabled}
                                            country={address.countryId}
                                            onChange={(value) => {
                                                setAddress((prev) => ({
                                                    ...prev,
                                                    countryId: value,
                                                }))
                                            }}
                                        />
                                        <FieldCity
                                            control={control}
                                            name="city"
                                            label="Ville"
                                            placeholder="Ville"
                                            disabled={disabled}
                                            country={address.countryId}
                                            onChange={(value) => {
                                                setAddress((prev) => ({
                                                    ...prev,
                                                    cityId: value,
                                                }))
                                            }}
                                        />
                                    </div>
                                    <div className="flex lg:grid lg:grid-cols-3 flex-col items-start justify-start gap-3 ">
                                        <FieldRegion
                                            control={control}
                                            name="region"
                                            label="Région"
                                            placeholder="Région"
                                            disabled={disabled}
                                            country={address.countryId}
                                            city={address.cityId}
                                            onChange={(value) => {
                                                setAddress((prev) => ({
                                                    ...prev,
                                                    regionId: value,
                                                }))
                                            }}
                                        />
                                        <InputFieldForm
                                            classNameParent="cols-span-2"
                                            className=" flex-1 w-full"
                                            placeholder="Adresse"
                                            control={control}
                                            name="address"
                                            label="Adresse"
                                            disabled={disabled}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Form>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
