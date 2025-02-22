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
import { capitalize, CountryData } from '@/types/utils'
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/Auth'
import { useNotification } from '@/context/NotifContext'
import { NotificationType } from '@/types/GlobalType'
import FieldActivities from '@/components/utils/FieldActivities'
import FieldCountry from '@/components/utils/FieldCountry'
import FieldCity from '@/components/utils/FieldCity'
import FieldRegion from '@/components/utils/FieldRegion'
import SelectManager from '@/components/utils/SelectManager'
import FieldSolutions from '@/components/utils/FieldSolutions'
import { Label } from '@/components/Label'
import { AvatarAndName } from '@/components/AvatarAndName'
import { LabelAndAvatar } from '@/components/custom/LabelAndAvatar'
import FieldState from '@/components/utils/FieldState'

interface FormCrmInfoProps {
    form: UseFormReturn<z.infer<typeof CrmInformationSchema>>
    onSubmit: (data: z.infer<typeof CrmInformationSchema>) => void
    disabled?: boolean
    setCountryCode: (value: string) => void
    countryCode: string
    type?: 'PARTNER' | 'ASSOCIATION'
}

export const FormCrmInfoDisplay: FC<FormCrmInfoProps> = ({
    form,
    onSubmit,
    countryCode,
    setCountryCode,
    disabled = false,
    type = 'PARTNER',
}) => {
    const { country, city, state, region } = form.watch()
    const [address, setAddress] = useState<{
        countryId: string
        stateId: string
        cityId: string
        regionId: string
    }>({
        countryId: country.id || '',
        stateId: state.id || '',
        cityId: city.id || '',
        regionId: region.id || '',
    })
    const { handleSubmit, control } = form
    const creatorInfo = form.watch('creatorInfo')
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
                                    <div className="flex lg:grid grid-cols-3 flex-col items-start gap-3 w-full">
                                        <FieldSolutions
                                            name="solutions"
                                            className="col-span-2"
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
                                            type={type!}
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

                                        <LabelAndAvatar
                                            value={
                                                capitalize(
                                                    creatorInfo?.name
                                                        .firstName || ''
                                                ) +
                                                ' ' +
                                                capitalize(
                                                    creatorInfo?.name
                                                        ?.lastName || ''
                                                )
                                            }
                                            onChange={() => {}}
                                            name="creatorInfo"
                                            label={'Alimenter par'}
                                            avatar={creatorInfo?.avatarPath!}
                                            disabled={true}
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
                                            name="country.name"
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
                                        <FieldState
                                            control={control}
                                            name="state.name"
                                            label="State"
                                            disabled={disabled}
                                            country={address.countryId}
                                            onChange={(value) => {
                                                setAddress((prev) => ({
                                                    ...prev,
                                                    stateId: value,
                                                }))
                                            }}
                                        />
                                    </div>
                                    <div className="flex lg:grid lg:grid-cols-3 flex-col items-start justify-start gap-3 ">
                                        <FieldCity
                                            control={control}
                                            name="city.name"
                                            label="Ville"
                                            placeholder="Ville"
                                            disabled={disabled}
                                            country={address.countryId}
                                            state={address.stateId}
                                            onChange={(value) => {
                                                setAddress((prev) => ({
                                                    ...prev,
                                                    cityId: value,
                                                }))
                                            }}
                                        />
                                        <FieldRegion
                                            control={control}
                                            name="region.name"
                                            label="Région"
                                            placeholder="Région"
                                            disabled={disabled}
                                            country={address.countryId}
                                            city={address.cityId}
                                            state={address.stateId}
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
                                    <div className="flex lg:flex-row flex-col items-start gap-3">
                                        {type != 'PARTNER' && (
                                            <SelectField
                                                control={control}
                                                name="type"
                                                label="Type"
                                                disabled={disabled}
                                                options={[
                                                    {
                                                        label: 'Association',
                                                        key: 'ASSOCIATION',
                                                    },
                                                    {
                                                        label: 'Food Bank',
                                                        key: 'FOOD_BANK',
                                                    },
                                                ]}
                                            />
                                        )}
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
